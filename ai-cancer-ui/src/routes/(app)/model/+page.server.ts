import type { Actions } from './$types';

export const actions = {
	default: async ({request, fetch}) => {
        const formData = await request.formData();
        const file = formData.get('cancerFile') as File;
        const text = await file.text();
        const data = text
            .split(/[\s,]+/)
            .filter((_, i) => i & 1)
            .map(Number);
        const response = await fetch("http://3.21.35.65/model-9", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data
            })
        });
        const serverData = await response.json();
        const { predictions: prediction } = JSON.parse(serverData.body);

        return {prediction};
	},
} satisfies Actions;
