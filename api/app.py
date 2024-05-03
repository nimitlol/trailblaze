from flask import Flask, request, jsonify
import tensorflow as tf
from utils import load_and_prep_image, get_class_names

app = Flask(__name__)

# Load class names
data_directory = "C:/Users/NIMIT/Desktop/cnnmodel/archive/Indian-monuments/images/train"
class_names = get_class_names(data_directory)

# Load your trained model
model_path = 'C:/Users/NIMIT/Desktop/heroku/model/my_combined_model.h5'
model = tf.keras.models.load_model(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    # Check if the request contains a file
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    # Get the uploaded file
    file = request.files['image']
    
    # Preprocess the image
    image = load_and_prep_image(file)
    
    # Make predictions using your model
    predictions = model.predict(image)
    
    # Find the index of the class with the highest probability
    max_index = tf.argmax(predictions, axis=1)[0]
    
    # Get the class name and corresponding probability
    max_class_name = class_names[max_index]
    max_probability = predictions[0][max_index]
    
    # Construct the response JSON
    results = {
        'predicted_class': max_class_name,
        'probability': float(max_probability)
    }
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
