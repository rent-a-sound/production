import json, os
from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters
from datetime import datetime, timedelta

TOKEN: Final = os.environ.get('TOKEN')
CHAT_ID: Final = os.environ.get('CHAT_ID')
BOT_USERNAME: Final = '@rentasound_admin_bot'
DATA_PATH: Final = './config.json'

def rez(update: Update, context: ContextTypes.DEFAULT_TYPE):
    object_id, start_date, end_date, mode = update.message.text.lstrip('/rez ').split(';')

    if update.message.chat_id == int(CHAT_ID):

        with open(DATA_PATH, 'r') as file:
            json_data = json.load(file)

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

                with open(DATA_PATH, 'w') as file:
                    json.dump(json_data, file, indent=2)

async def error(update: Update,context: ContextTypes.DEFAULT_TYPE):
    pass

if __name__ == '__main__':

    app = Application.builder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('rez', rez))

    # Errors
    app.add_error_handler(error)

    # Polls
    app.run_polling(poll_interval=0, drop_pending_updates=True)