
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH

import re
import time
from typing import Any
import httpx

async def update_discord_endpoint(webhook_base_url: str):
    """Cập nhật URL tương tác cho Discord tự động"""

    # Discord yêu cầu endpoint phải là đường dẫn cụ thể
    full_url = f"{webhook_base_url}/discord"

    # API URL của Discord để sửa thông tin Application
    api_url = f"https://discord.com/api/v10/applications/{DISCORD_APPID}"

    headers = {
        "Authorization": f"Bot {DISCORD_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "interactions_endpoint_url": full_url
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.patch(api_url, json=payload, headers=headers)
            if response.status_code == 200:
                print(f"Discord Endpoint updated to: {full_url}")
            else:
                print(
                    f"❌ Discord Update Failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error updating Discord: {e}")
