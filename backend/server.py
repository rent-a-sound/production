from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="*")

@app.route('/data', methods=['GET'])    
def get_data():
    dummy_data = {
        "id": 1,
        "name": "John Doe",
        "age": 25,
        "city": "Sample City"
    }

    return jsonify(dummy_data)

if __name__ == '__main__':
    app.run(debug=True)
