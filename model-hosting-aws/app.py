from flask import Flask, request
import json
import numpy as np
import tflite_runtime.interpreter as tflite

interpreter = tflite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

app = Flask(__name__)


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
