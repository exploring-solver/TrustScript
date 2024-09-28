from flask import Flask, request, jsonify
import cv2
import easyocr
from ultralytics import YOLO
from huggingface_hub import hf_hub_download
from supervision import Detections
import os
import numpy as np
import io
import pandas as pd
from PIL import Image

from flask_cors import CORS  # Import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=True)

# Load YOLO model
repo_config = dict(
    repo_id="arnabdhar/YOLOv8-nano-aadhar-card",
    filename="model.pt",
    local_dir="./models"
)
model = YOLO(hf_hub_download(**repo_config))

# Load CSV file for verification
csv_path = 'aadhar_details_train.csv'
df = pd.read_csv(csv_path)
valid_aadhar_numbers = df['Document_Number'].astype(str).tolist()

def process_image(image_bytes):
    # Convert image bytes to OpenCV format
    image = Image.open(io.BytesIO(image_bytes))
    image = np.array(image)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB for matplotlib

    # Perform YOLO prediction
    results = model.predict(image)
    detections = Detections.from_ultralytics(results[0])

    # Prepare the output dictionary
    output = {
        'AADHAR_NUMBER': '',
        'DATE_OF_BIRTH': '',
        'GENDER': '',
        'NAME': '',
        'ADDRESS': ''
    }

    # Loop through detections, crop the bounding boxes, and use EasyOCR to extract text
    for bbox, label in zip(detections.xyxy, detections.data['class_name']):
        x1, y1, x2, y2 = map(int, bbox)  # Convert bbox coordinates to integers
        cropped_img = image[y1:y2, x1:x2]  # Crop the detected region

        # Use EasyOCR to read text from the cropped image
        ocr_result = reader.readtext(cropped_img, detail=0)  # detail=0 returns just the text
        extracted_text = " ".join(ocr_result)

        # Map the detected class to the corresponding field in the dictionary
        if label == 'NAME':
            output['NAME'] = extracted_text
        elif label == 'AADHAR_NUMBER':
            output['AADHAR_NUMBER'] = extracted_text
        elif label == 'DATE_OF_BIRTH':
            output['DATE_OF_BIRTH'] = extracted_text
        elif label == 'ADDRESS':
            output['ADDRESS'] = extracted_text

    return output

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.jpg'):
        image_bytes = file.read()
        extracted_data = process_image(image_bytes)
        
        # Check if Aadhar number is verified
        aadhar_number = extracted_data['AADHAR_NUMBER']
        status = 'VERIFIED' if aadhar_number in valid_aadhar_numbers else 'UNVERIFIED'
        
        response = {
            'extracted_data': extracted_data,
            'status': status
        }
        return jsonify(response)

    return jsonify({'error': 'Invalid file format. Only .jpg files are accepted.'}), 400




# from sklearn.preprocessing import LabelEncoder
# categories = ['No Failure', 'Heat Dissipation Failure', 'Power Failure', 'Overstrain Failure', 'Tool Wear Failure', 'Random Failures']
# custom_encoder = {cat: i for i, cat in enumerate(categories)}

# import joblib

# model_path = 'model2.joblib'
# model = joblib.load(model_path)

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get parameters from request
#     data = request.json
#     try:
#         type_value = data['Type']
#         air_temp = data['Air temperature [K]']
#         process_temp = data['Process temperature [K]']
#         rotational_speed = data['Rotational speed [rpm]']
#         torque = data['Torque [Nm]']
#         tool_wear = data['Tool wear [min]']
#     except KeyError as e:
#         return jsonify({'error': f'Missing parameter: {str(e)}'}), 400

#     # Convert parameters to a 2D DataFrame
#     input_data = pd.DataFrame([[type_value, air_temp, process_temp, rotational_speed, torque, tool_wear]],
#                               columns=['Type', 'Air temperature [K]', 'Process temperature [K]', 
#                                        'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]'])

#     # Make prediction using model
#     prediction = model.predict(input_data)

#     # Find the value from custom_encoder based on prediction
#     value = {i for i in custom_encoder if custom_encoder[i] == prediction[0]}

#     # Return the value as JSON
#     return jsonify({'value': list(value)})

# Load the LightGBM model
# model_path_2 = "lgbm_model.pkl"
# lgbm_model = joblib.load(model_path_2)

# @app.route('/predict2', methods=['POST'])
# def predict_sales():
#     # Get data from the request
#     data = request.get_json()
    
#     # Extract inputs from the request JSON
#     dates = data.get("date", [])
#     stores = data.get("store", [])
#     items = data.get("item", [])
    
#     # Check if the input is valid
#     if not dates or not stores or not items:
#         return jsonify({"error": "Missing 'date', 'store', or 'item' in the input data"}), 400

#     # Create a DataFrame from the input data
#     test_data = pd.DataFrame({"date": dates, "store": stores, "item": items})
    
#     # Predict sales using the loaded LightGBM model
#     test_preds = lgbm_model.predict(test_data)
    
#     # Prepare the forecast DataFrame
#     forecast = pd.DataFrame({
#         "date": test_data["date"],
#         "store": test_data["store"],
#         "item": test_data["item"],
#         "sales": test_preds
#     })

#     # Convert the DataFrame to JSON and return the response
#     return jsonify(forecast.to_dict(orient="records"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
