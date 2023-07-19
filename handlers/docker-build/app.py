import json
import base64
import pickle


def handler(event, context):
    body = event.get('body')

    if body is None or body == "":
        return "Body is empty", 422

    body = json.loads(base64.b64decode(body))
    input_text = body.get("inputText")

    print(f"Let's see what you sent: {input_text}")

    # Load model here
    ### with open("model.pkl", 'r') as file:
    ### model = pickle.load(file)

    # Make predictions 
    ### predictions = model.predict(input_text)

    # Return predictions
    return {
        "status": 200,
        "response": "done",
        # "predictions": predictions
    }