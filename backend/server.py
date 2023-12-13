from flask import Flask
from flask_cors import CORS
from typing import Final
import json

app = Flask(__name__)

CORS(app, origins="*")
DATA_PATH: Final = './config.json'

def load_config():
    with open(DATA_PATH, 'r') as file:
        config = json.load(file)
    return config

@app.route('/data', methods=['GET'])
def get_data():
    return load_config()

if __name__ == '__main__':
    app.run(debug=True)