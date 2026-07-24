from config import TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY, GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH


import re
import time
from typing import Any
import httpx
import os
import aiofiles

import telegram_types

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

import knowledgebase
import knowledgebase.orchestrationcontext
import knowledgebase.dbcontext

async def get_user_info(username: str):
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getChat"

    params = {"chat_id": f"{username}"}
    
    async with httpx.AsyncClient() as client:
        try:
            # response = await client.post(url, json=params)
            # Dùng params thay vì json cho phương thức getChat
            response = await client.get(url, params=params)
            # Kiểm tra lỗi HTTP (4xx, 5xx)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("ok"):
                user = data["result"]
                # Build object theo đúng yêu cầu của bạn
                user_info = {
                    "id": user.get("id"),
                    "username": user.get("username"),
                    "fullname": f"{user.get('first_name', '')} {user.get('last_name', '')}".strip(),
                    "is_bot": False, # getChat thường dùng cho người dùng
                    "first_name": user.get("first_name"),
                    "last_name": user.get("last_name")
                }
                return user_info
            else:
                print( {"error": data.get("description")})
                return None
                
        except httpx.HTTPStatusError as e:
            print( {"error": str(e)})
            print( {"error": f"Lỗi API: {e.response.json().get('description')}"})
            return None
        except Exception as e:
            print( {"error": str(e)})
            return None

async def send_telegram_welcome(chat_id: int , text:str|None=None):
    botuname=TELEGRAM_BOT_USERNAME.replace("@","")
    async with httpx.AsyncClient() as client:
        try:
            boturl=f"t.me/{botuname}?start=welcome"
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            text=f"Bot AI @{botuname}, {text if text else ''}, gửi link https://{boturl} để cho người dùng kích hoạt bot"
          
            response = await client.post(url, json={"chat_id": chat_id, "text": text,
            "reply_markup": {
                "inline_keyboard": [
                    [{"text": "Kích hoạt Bot (Inbox)", "url": boturl}]
                ]
            }
            }, timeout=30.0)
        
            pass
        except:
            pass
    pass

def format_user_mention(user_id: int | str | None = None, username: str | None = None, fullname: str | None = None) -> str:
    """Tạo chuỗi tag/mention phù hợp cho người dùng Telegram (HTML format hoặc @username)."""
    if username:
        clean_user = username.replace("@", "").strip()
        if clean_user:
            return f"@{clean_user}"
    if user_id and fullname:
        return f'<a href="tg://user?id={user_id}">{fullname}</a>'
    elif user_id:
        return f'<a href="tg://user?id={user_id}">User {user_id}</a>'
    elif fullname:
        return fullname
    return ""


async def send_telegram_message(
    chat_id: int | str,
    text: str | None = None,
    files: list[str] | None = None,
    isSendToGroup: bool = True,
    reply_to_message_id: int | str | None = None,
    parse_mode: str | None = "HTML"
) -> telegram_types.TelegramUpdate | None:
    """
    Hàm gửi tin nhắn Telegram nâng cấp hỗ trợ:
    - Text, Photo, Audio/Voice, Video, Document
    - Gửi kèm reply_to_message_id để trả lời đúng tin nhắn/người cần trả lời
    - Format parse_mode HTML/Markdown
    """
    if (text is None or text == "") and not files:
        return None

    last_telegram_response = None

    async with httpx.AsyncClient() as client:
        try:
            if files and len(files) > 0:
                for idx, file_path in enumerate(files):
                    caption_text = text if idx == 0 else ""
                    if not os.path.exists(file_path):
                        print(f"File không tồn tại: {file_path}")
                        if caption_text:
                            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
                            data_payload = {"chat_id": chat_id, "text": caption_text}
                            if reply_to_message_id:
                                data_payload["reply_to_message_id"] = reply_to_message_id
                            if parse_mode:
                                data_payload["parse_mode"] = parse_mode
                            try:
                                response = await client.post(url, json=data_payload, timeout=30.0)
                                response.raise_for_status()
                                last_telegram_response = telegram_types.TelegramUpdate(**response.json())
                            except Exception as ex_html:
                                if parse_mode and "can't parse entities" in str(ex_html).lower():
                                    data_payload.pop("parse_mode", None)
                                    response = await client.post(url, json=data_payload, timeout=30.0)
                                    response.raise_for_status()
                                    last_telegram_response = telegram_types.TelegramUpdate(**response.json())
                                else:
                                    raise ex_html
                        continue

                    ext = os.path.splitext(file_path)[1].lower()
                    if ext in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']:
                        method = "sendPhoto"
                        file_key = "photo"
                    elif ext in ['.mp3', '.wav', '.aac', '.flac', '.m4a']:
                        method = "sendAudio"
                        file_key = "audio"
                    elif ext in ['.ogg']:
                        method = "sendVoice"
                        file_key = "voice"
                    elif ext in ['.mp4', '.avi', '.mov', '.mkv', '.webm']:
                        method = "sendVideo"
                        file_key = "video"
                    else:
                        method = "sendDocument"
                        file_key = "document"

                    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/{method}"

                    async with aiofiles.open(file_path, "rb") as f:
                        file_content = await f.read()

                    files_payload = {file_key: (os.path.basename(file_path), file_content)}
                    data_payload = {"chat_id": chat_id}
                    if caption_text:
                        data_payload["caption"] = caption_text
                    if reply_to_message_id:
                        data_payload["reply_to_message_id"] = reply_to_message_id
                    if parse_mode:
                        data_payload["parse_mode"] = parse_mode

                    try:
                        response = await client.post(url, data=data_payload, files=files_payload, timeout=30.0)
                        response.raise_for_status()
                    except Exception as ex_html:
                        resp_text = ""
                        if 'response' in locals() and response is not None:
                            try:
                                resp_text = response.text.lower()
                            except:
                                pass
                        err_msg = (str(ex_html) + " " + resp_text).lower()
                        if "parse_mode" in data_payload and ("can't parse entities" in err_msg or "unsupported" in err_msg or "400" in err_msg):
                            data_payload.pop("parse_mode", None)
                            response = await client.post(url, data=data_payload, files=files_payload, timeout=30.0)
                            response.raise_for_status()
                        else:
                            raise ex_html

                    last_telegram_response = telegram_types.TelegramUpdate(**response.json())
            else:
                url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
                data_payload = {"chat_id": chat_id, "text": text}
                if reply_to_message_id:
                    data_payload["reply_to_message_id"] = reply_to_message_id
                if parse_mode:
                    data_payload["parse_mode"] = parse_mode

                try:
                    response = await client.post(url, json=data_payload, timeout=30.0)
                    response.raise_for_status()
                except Exception as ex_err:
                    resp_text = ""
                    if 'response' in locals() and response is not None:
                        try:
                            resp_text = response.text.lower()
                        except:
                            pass
                    err_msg = (str(ex_err) + " " + resp_text).lower()

                    if "parse_mode" in data_payload and ("can't parse entities" in err_msg or "unsupported" in err_msg or "400" in err_msg):
                        print(f"[Telegram API] HTML parse failed due to unescaped tags. Retrying in plain text format...")
                        data_payload.pop("parse_mode", None)

                    try:
                        response = await client.post(url, json=data_payload, timeout=30.0)
                        response.raise_for_status()
                    except Exception as ex_retry:
                        # Final safe fallback: strip both parse_mode and reply_to_message_id
                        data_payload.pop("parse_mode", None)
                        data_payload.pop("reply_to_message_id", None)
                        response = await client.post(url, json=data_payload, timeout=30.0)
                        response.raise_for_status()

                last_telegram_response = telegram_types.TelegramUpdate(**response.json())

            if last_telegram_response:
                try:
                    knowledgebase.dbcontext.sqllite_all_message.insert(last_telegram_response.json())
                    knowledgebase.orchestrationcontext.summarychat.enqueue_update(last_telegram_response)
                except Exception as ex_db:
                    print(f"Error persisting sent message to DB: {ex_db}")

            return last_telegram_response
        except Exception as e:
            print(f"Lỗi khi gửi tin: {e}")
            if 'response' in locals() and response is not None:
                try:
                    print(f"Chi tiết lỗi từ Telegram: {response.text}")
                except:
                    pass
            return None



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
        res_json = response.json()
        print("Telegram Response:", res_json)
        if response.status_code != 200 or not res_json.get("ok"):
            desc = res_json.get("description", "Unknown error")
            raise Exception(f"Không đăng ký webhook cho telegram được: {desc}")

    print(f"Webhook đang chạy: {webhook_url}")
    # Lưu ý: Khi dùng cách này, tunnel sẽ chạy song song với ứng dụng của bạn.
