
from google import genai
import sys
import os

# Set API key from config_dunp
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config_dunp import GEMINI_APIKEY

client = genai.Client(api_key=GEMINI_APIKEY)
print("Listing models...")
for m in client.models.list():
    if "embed" in m.name:
        print(f"Name: {m.name}, Supported Actions: {m.supported_actions}")
