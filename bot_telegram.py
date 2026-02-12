from config import TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH


import re
import time
from typing import Any
import httpx
import os
import aiofiles


if not os.path.isdir("downloads"):
    os.makedirs("downloads")
async def download_telegram_file(file_id: str, chat_id: int, custom_file_name: str | None = None, sub_dir: str | None = None):
    """
    Downloads a file from Telegram and saves it to a directory named after the chat_id.
    If sub_dir is provided, saves it in a nested directory.
    Returns the absolute path of the saved file.
    """
    async with httpx.AsyncClient() as client:
        # 1. Get file path from Telegram
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile"
        try:
            response = await client.post(get_file_url, json={"file_id": file_id})
            response.raise_for_status()
            file_info = response.json()
            file_path = file_info["result"]["file_path"]
        except (httpx.HTTPStatusError, KeyError) as e:
            print(f"Error getting file path from Telegram: {e}")
            return None

        # 2. Download the file
        file_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        try:
            response = await client.get(file_url)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            print(f"Error downloading file: {e}")
            return None

        # 3. Save the file
        save_dir = f"downloads/{chat_id}"
        if sub_dir:
            save_dir = os.path.join(save_dir, sub_dir)
            
        os.makedirs(save_dir, exist_ok=True)
        
        if custom_file_name:
            file_name = custom_file_name
        else:
            file_name = os.path.basename(file_path)
            
        save_path = os.path.join(save_dir, file_name)

        try:
            async with aiofiles.open(save_path, "wb") as f:
                await f.write(response.content)
            print(f"File saved to {save_path}")
            return os.path.abspath(save_path)
        except Exception as e:
            print(f"Error saving file: {e}")
            return None




async def send_telegram_message(chat_id: int, text: str):
    if text is None or text == "":
        return
    async with httpx.AsyncClient() as client:
        payload = {"chat_id": chat_id, "text": text}
        try:
            await client.post(TELEGRAM_API_URL, json=payload)
        except Exception as e:
            print(f"Lỗi khi gửi tin: {e}")


async def register_webhook(webhook_base_url: str):
    # 1. Khởi tạo tunnel tới cổng 8088
    if not webhook_base_url:
        print(f"Không lấy được webhook_url")
        return

    # 2. Bắt đầu chạy tunnel và lấy URL
    # Lệnh này sẽ trả về URL có dạng https://xxx.trycloudflare.com
    webhook_url = f"{webhook_base_url}/webhook"

    print(f"Webhook đang cần đăng ký: {webhook_url}")

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook",
            params={"url": webhook_url}
        )
        print("Telegram Response:", response.json())
        if response.status_code != 200:
            raise Exception("Không đăng ký webhook cho telegram được")

    print(f"Webhook đang chạy: {webhook_url}")
    # Lưu ý: Khi dùng cách này, tunnel sẽ chạy song song với ứng dụng của bạn.
