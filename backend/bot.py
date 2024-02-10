import json, os
from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters
from datetime import datetime, timedelta

TOKEN: Final = os.environ.get('TOKEN')
CHAT_ID: Final = os.environ.get('CHAT_ID')
BOT_USERNAME: Final = '@rentasound_admin_bot'
DATA_PATH: Final = './config.json'

async def rez(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        valueArray = update.message.text.lstrip('/rez ').split(' ')
        object_id = valueArray[0]
        start_date = valueArray[1]
        if len(valueArray) > 2:
            end_date = valueArray[2]
        else:
            end_date = None

        with open(DATA_PATH, 'r') as file:
            json_data = json.load(file)

        start_date = datetime.strptime(start_date, '%d-%m-%Y')

        if end_date is not None:
            end_date = datetime.strptime(end_date, '%d-%m-%Y')
            date_list = [start_date + timedelta(days=x) for x in range((end_date-start_date).days + 1)]
            date_list = [date.strftime('%d-%m-%Y') for date in date_list]
        else:
            date_list = [start_date.strftime('%d-%m-%Y')]

        for item in json_data:
            if item.get("id") == object_id:
                for date_string in date_list:
                    if date_string not in item["unavailable"]:
                        item["unavailable"].append(date_string)
                with open(DATA_PATH, 'w') as file:
                    json.dump(json_data, file, indent=2)
                if end_date is not None:
                    await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} reserved from {start_date.strftime('%d-%m-%Y')} to {end_date.strftime('%d-%m-%Y')}.")
                else:
                    await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} reserved for {start_date.strftime('%d-%m-%Y')}.")
                return
            
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} not found.")
    
    except ValueError as ve:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"Error parsing dates: {str(ve)}")
    except Exception as e:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"An error occurred: {str(e)}")

async def otkazi(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        valueArray = update.message.text.lstrip('/otkazi ').split(' ')
        object_id = valueArray[0]
        start_date = valueArray[1]
        if len(valueArray) > 2:
            end_date = valueArray[2]
        else:
            end_date = None

        with open(DATA_PATH, 'r') as file:
            json_data = json.load(file)

        start_date = datetime.strptime(start_date, '%d-%m-%Y')

        if end_date is not None:
            end_date = datetime.strptime(end_date, '%d-%m-%Y')
            date_list = [start_date + timedelta(days=x) for x in range((end_date-start_date).days + 1)]
            date_list = [date.strftime('%d-%m-%Y') for date in date_list]
        else:
            date_list = [start_date.strftime('%d-%m-%Y')]

        for item in json_data:
            if item.get("id") == object_id:
                for date_string in date_list:
                    if date_string in item["unavailable"]:
                        item["unavailable"].remove(date_string)
                with open(DATA_PATH, 'w') as file:
                    json.dump(json_data, file, indent=2)
                if end_date is not None:
                    await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} unreserved from {start_date.strftime('%d-%m-%Y')} to {end_date.strftime('%d-%m-%Y')}.")
                else:
                    await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} unreserved for {start_date.strftime('%d-%m-%Y')}.")
                return
        
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"Speaker id:{object_id} not found.")
    
    except ValueError as ve:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"Error parsing dates: {str(ve)}")
    except Exception as e:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"An error occurred: {str(e)}")

async def remove_speaker(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        object_id = update.message.text.lstrip('/remove ')

        with open(DATA_PATH, 'r') as file:
            json_data = json.load(file)

        updated_data = [obj for obj in json_data if obj["id"] != object_id]

        with open(DATA_PATH, 'w') as file:
            json.dump(updated_data, file, indent=2)

        await context.bot.send_message(chat_id=update.message.chat_id, text="Speaker id:" + object_id + " removed.")
    
    except Exception as e:
        error_message = f"An error occurred while removing speaker id {object_id}: {str(e)}"
        await context.bot.send_message(chat_id=update.message.chat_id, text=error_message)

async def add_speaker(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        new_speaker = json.loads(update.message.text.lstrip('/add '))
        
        with open(DATA_PATH, 'r') as file:
            json_data = json.load(file)

        json_data.append(new_speaker)

        with open(DATA_PATH, 'w') as file:
            json.dump(json_data, file, indent=2)

        await context.bot.send_message(chat_id=update.message.chat_id, text="Speaker added.")
    
    except ValueError as ve:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"Error parsing input: {str(ve)}")
    except Exception as e:
        await context.bot.send_message(chat_id=update.message.chat_id, text=f"An error occurred: {str(e)}")
    
async def clean_dates(update: Update, context: ContextTypes.DEFAULT_TYPE):
    today = datetime.now().date()

    with open(DATA_PATH, 'r') as file:
        json_data = json.load(file)

    for product in json_data:
        for date_str in product["unavailable"]:
            date = datetime.strptime(date_str, "%d-%m-%Y").date()
            if date < today:
                product["unavailable"].remove(date_str)

    with open(DATA_PATH, 'w') as file:
        json.dump(json_data, file, indent=2)

    await context.bot.send_message(chat_id=update.message.chat_id, text="Outdated dates have been removed.")


async def move_speaker(update: Update, context: ContextTypes.DEFAULT_TYPE):
    speaker_id, new_city = update.message.text.lstrip('/move ').split(' ')
    success = False

    with open(DATA_PATH, 'r') as file:
        json_data = json.load(file)

    for speaker in json_data:
        if speaker['id'] == speaker_id:
            speaker['city'] = new_city
            success = True

    with open(DATA_PATH, 'w') as file:
         json.dump(json_data, file, indent=2)
        
    message_text = f"Speaker id:{speaker_id} moved to {new_city}" if success else f"Speaker id:{speaker_id} not found."

    await context.bot.send_message(chat_id=update.message.chat_id, text=message_text)

async def list_config(update: Update, context: ContextTypes.DEFAULT_TYPE):
    id = update.message.text.lstrip('/list ')

    with open(DATA_PATH, 'r') as file:
        json_data = json.load(file)
    if id == "":
        for item in json_data:
            formatted_data = json.dumps(item, indent=2, ensure_ascii=False)
            await context.bot.send_message(chat_id=update.message.chat_id, text=formatted_data)
    else:
        for item in json_data:
            if item["id"] == id:
                formatted_data = json.dumps(item, indent=2, ensure_ascii=False)
                await context.bot.send_message(chat_id=update.message.chat_id, text=formatted_data)

async def error(update: Update,context: ContextTypes.DEFAULT_TYPE):
    pass

if __name__ == '__main__':

    app = Application.builder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('rez', rez, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('otkazi', otkazi, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('remove', remove_speaker, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('add', add_speaker, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('clean', clean_dates, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('move', move_speaker, filters=filters.Chat(chat_id=int(CHAT_ID))))
    app.add_handler(CommandHandler('list', list_config, filters=filters.Chat(chat_id=int(CHAT_ID))))

    # Errors
    app.add_error_handler(error)

    # Polls
    app.run_polling(poll_interval=0, drop_pending_updates=True)