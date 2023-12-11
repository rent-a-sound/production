from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins="*")

@app.route('/data', methods=['GET'])
def get_data():
    dummy_data = [
        {
            "id": 'pb100-1',
            "name": "JBL PartyBox 100",
            "desc": 'nesto nesto nesto nesto',
            "battery": False,
            "city": 'ns',
            "unavailable": ['12-12-2023', '10-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw41368c09/1_JBL_PARTYBOX_110_HERO_x2.png?sw=1605&sh=1605'
        },
        {
            "id": 'pb310-1',
            "name": "JBL PartyBox 310",
            "desc": 'nesto nesdwdwto nesto nesto',
            "battery": False,
            "city": 'ns',
            "unavailable": ['05-05-2024', '14-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5c882674/JBL_PartyBox_310_Hero_0176_x3.png?sw=1605&sh=1605'
        },
        {
            "id": 'pb110-1',
            "name": "JBL PartyBox 110",
            "desc": 'nesto nesto nesto nestdwdwdwo',
            "battery": False,
            "city": 'ns',
            "unavailable": ['11-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw41368c09/1_JBL_PARTYBOX_110_HERO_x2.png?sw=1605&sh=1605'
        },
        {
            "id": 'pb100-2',
            "name": "JBL PartyBox 100",
            "desc": 'nesto nesto nesto nesto',
            "battery": False,
            "city": 'ns',
            "unavailable": ['12-12-2023', '10-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw41368c09/1_JBL_PARTYBOX_110_HERO_x2.png?sw=1605&sh=1605'
        },
        {
            "id": 'pb100-2',
            "name": "JBL PartyBox 310",
            "desc": 'nesto nesdwdwto nesto nesto',
            "battery": False,
            "city": 'bg',
            "unavailable": ['05-05-2024', '14-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw5c882674/JBL_PartyBox_310_Hero_0176_x3.png?sw=1605&sh=1605'
        },
        {
            "id": 'pb100-3',
            "name": "JBL PartyBox 110",
            "desc": 'nesto nesto nesto nestdwdwdwo',
            "battery": False,
            "city": 'bg',
            "unavailable": ['11-12-2023'],
            "image": 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw41368c09/1_JBL_PARTYBOX_110_HERO_x2.png?sw=1605&sh=1605'
        }
    ]

    return jsonify(dummy_data)

if __name__ == '__main__':
    app.run(debug=True)
