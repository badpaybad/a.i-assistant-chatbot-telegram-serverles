
PORT = 8888
import socket
import random

def get_random_free_port(start=8999, end=9999):
    while True:
        port = random.randint(start, end)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                # Thử bind (chiếm) port này
                s.bind(('', port))
                return port
            except OSError:
                # Nếu port đã bận, tiếp tục vòng lặp
                continue

PORT = get_random_free_port()

print(f"Port trống tìm được: {PORT}")

GEMINI_APIKEY = ""
GEMINI_MODEL = "gemini-2.0-flash" 
# GEMINI_MODEL="gemini-2.5-flash"

REPLY_ON_TAG_BOT_USERNAME=True

DISCORD_PUBKEY = ""
DISCORD_APPID = ""
DISCORD_TOKEN = ""

TELEGRAM_BOT_CHATID="" 

TELEGRAM_BOT_USERNAME = "@dunp_assitant_bot" 
TELEGRAM_BOT_TOKEN = ""
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

TELEGRAM_API_ID=""
TELEGRAM_API_HASH=""