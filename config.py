
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

GEMINI_APIKEY = ""
GEMINI_MODEL = "gemini-2.0-flash"

TELEGRAM_BOT_TOKEN = ""
TELEGRAM_BOT_CHATID = "" # id chat rieng cua chat bot 
TELEGRAM_BOT_USERNAME = "" # id chat rieng cua chat bot 

# https://my.telegram.org/apps find it here
TELEGRAM_API_ID=""
TELEGRAM_API_HASH="" 

TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

DISCORD_PUBKEY = ""
DISCORD_APPID = ""
DISCORD_TOKEN = ""
