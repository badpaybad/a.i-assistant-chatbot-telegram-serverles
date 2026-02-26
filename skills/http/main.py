import gemini_truyenkieu

from config import HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

import bot_telegram
import asyncio

async def exec(skill, curret_message, list_current_msg, list_summary_chat,unique_urls) :
    user_text=curret_message.text
    chat_id=curret_message.chat_id
    webhook_base_url=curret_message.webhook_base_url


    target_folder= skill["target_folder"]
    reasoning= skill["reasoning"]
    intent= skill["intent"]

    if REPLY_ON_TAG_BOT_USERNAME is not None and REPLY_ON_TAG_BOT_USERNAME:
        if curret_message.text and TELEGRAM_BOT_USERNAME in curret_message.text:

            clean_message = user_text.replace(TELEGRAM_BOT_USERNAME, "").strip()
            
            await bot_telegram.send_telegram_message(chat_id, f"Hiện tại không hỗ trợ bạn chạy crawle url do chưa được cấp quyền, từ chối yêu cầu: {intent}")

    # if TELEGRAM_BOT_CHATID is not None and TELEGRAM_BOT_CHATID != "" and TELEGRAM_BOT_CHATID != 0:
    #     await bot_telegram.send_telegram_message(TELEGRAM_BOT_CHATID, webhook_base_url)