# Model Hosting AWS

## First Attempt: Lambda

My first thought to set up a model on AWS was to use lambda. This would allow effortless scalability, and provide all the benefits of serverless. The initial thoughts for implementation were the following:

- Save the model to a `.keras` file
- Install the `tensorflow` dependency
- Create a python lambda script to get the data out of the `event` object and feed it into the model, and return the result
- Zip all of this up and put it in the lambda
- Add API Gateway as a trigger for the lambda and call this from the UI code

```python
import json
import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model("model9.keras")

def lambda_handler(event, context):
    input_data = json.loads(event['body'])['data']
    input_data = np.array(input_data, dtype=np.float32)
    
    input_shape = model.input_shape[1:]
    input_data = np.reshape(input_data, (1,) + input_shape)
    
    output_data = model.predict(input_data)
    
    response = {
        'statusCode': 200,
        'body': json.dumps({'predictions': str(output_data[0][0])})
    }
    
    return response
```

This had a big problem: the max size of an unziped lambda is `250 Mb`. Tensorflow is *over `500 Mb`*.

**Solution**: use tensorflow lite!

```python
import json
import numpy as np
import tflite_runtime.interpreter as tflite

interpreter = tflite.Interpreter(model_path="model9.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def lambda_handler(event, context):
    input_data = json.loads(event['body'])['data']
    input_data = np.array(input_data, dtype=np.float32)

    input_shape = input_details[0]['shape']
    input_data = np.reshape(input_data, input_shape)

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    
    response = {
        'statusCode': 200,
        'body': json.dumps({'predictions': str(output_data[0][0])})
    }
    
    return response
```

Next problem: `Do not import numpy from a directory` error from the lambda

> What

After some investigation, I discovered the issue was not with importing numpy from a directory, but rather that numpy uses `binary code` to stay fast, and my laptops architecture was different from that of the lambda

There are a couple ways I could have solved this:

- Use docker on my machine to build the zip file. **This would probably have worked**, but I didn't want to install docker
- Build the zip file on an EC2 instance running with `Amazon Linux`. I tried this option, and **I think it would have worked**, but I made a few mistakes:
    - I wrongly thought I would have to compile all dependencies from source. When I tried this the EC2 on free tier ran out of memory and froze
    - Next I tried to download the `.whl` file for my needed dependencies, and then create the zip file. However, `tflite_runtime`'s latest `.whl` file is for `python3.11`, and the lambda only comes pre-configured with `python3.12`, so I would have needed to use a custom lambda runtime

Altogether, I decided I would just run a server on the EC2 instance.

I found [this amazing tutorial](https://www.youtube.com/watch?v=ct1GbTvgVNM) on how to setup a Flask server in an EC2 instance, that held my hand through the following:

- Configuring the security to allow `ssh`, `http`, and `https` connections onto the lambda
- Create a Flask server on the Ec2 instance
- Configure it to run in production mode with `gunicorn`
- Set up `nginx` to correctly route Ec2 traffic to the `gunicorn` server
- Wrap this all behind a `systemd` service so it starts on launch of the machine

I had to do some things different because his Ec2 was on `Ubuntu`, and mine was on `Amazon Linux`, but I was able to figure out the differences with some research

Next, I added `tflite_runtime` to the virtual environment, and modified the server to have an endpoint to run the model. This was suprisingly easy and **WORKED FIRST TRY!**

In the end, the running code was the following:

```python
from flask import Flask, request
import json
import numpy as np
import tflite_runtime.interpreter as tflite

interpreter = tflite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

app = Flask(__name__)


@app.route("/hello")
def hello():
    return "Hello, world"


@app.route("/")
def base():
    return "I am different now!"


@app.route("/model", methods=["POST"])
def model():
    data = request.json["data"]
    input_data = np.array(data, dtype=np.float32)

    input_shape = input_details[0]["shape"]
    input_data = np.reshape(input_data, input_shape)
    interpreter.set_tensor(input_details[0]["index"])

    interpreter.invoke()

    output_data = interpreter.get_tensor(output_details[0]["index"])

    return {
        "statusCode": 200,
        "body": json.dumps({"predictions": str(output_data[0][0])})
    }


if __name__ == "__main__":
    app.run()
```
