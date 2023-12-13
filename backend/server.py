from flask import Flask, jsonify, request
from datetime import datetime, timedelta
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, origins="*")

def load_config():
    with open('config.json', 'r') as file:
        config = json.load(file)
    return config

def update_unavailable_date(object_id, date_range, mode):
    with open('config.json', 'r') as file:
        json_data = json.load(file)

    start_date, end_date = date_range.split('/')
    start_date = datetime.strptime(start_date, '%d-%m-%Y')
    end_date = datetime.strptime(end_date, '%d-%m-%Y')

    date_list = [start_date + timedelta(days=x) for x in range((end_date-start_date).days + 1)]
    date_list = [date.strftime('%d-%m-%Y') for date in date_list]

    for item in json_data:
        if item.get("id") == object_id:
            if mode == "add":
                for date_string in date_list:
                    if date_string not in item["unavailable"]:
                        item["unavailable"].append(date_string)
            elif mode == "remove":
                for date_string in date_list:
                    if date_string in item["unavailable"]:
                        item["unavailable"].remove(date_string)

            with open('config.json', 'w') as file:
                json.dump(json_data, file, indent=2)

            return True

    return False

@app.route('/data', methods=['GET'])
def get_data():
    return load_config()

@app.route('/rez', methods=['POST'])
def change_unavailable():
    id = request.form.get('id')
    range = request.form.get('range')
    mode = request.form.get('mode')

    success = update_unavailable_date(id, range, mode)

    if success:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"}), 500


if __name__ == '__main__':
    app.run(debug=True)
