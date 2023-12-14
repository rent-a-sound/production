from flask import Flask, request
from flask_cors import CORS
from typing import Final
import json

app = Flask(__name__)

CORS(app, origins="*")
DATA_PATH: Final = '../backend/config.json'

def load_config():
    with open(DATA_PATH, 'r') as file:
        config = json.load(file)
    return config

@app.route('/data', methods=['GET'])
def get_data():
    return load_config()

@app.route('/single', methods=['GET'])
def get_single():
    config = load_config()

    item_id = request.args.get('id')
                               
    result = next((item for item in config if item['id'] == item_id), None)

    if result:
        return json.dumps(result)
    else:
        return json.dumps({"error": "Item not found"}), 404
    

if __name__ == '__main__':
    app.run(debug=True)