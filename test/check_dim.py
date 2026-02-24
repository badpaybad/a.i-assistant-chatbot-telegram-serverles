
from google import genai
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config_dunp import GEMINI_APIKEY

client = genai.Client(api_key=GEMINI_APIKEY)
response = client.models.embed_content(
    model="models/gemini-embedding-001",
    contents=["test"]
)
print(f"Dimension: {len(response.embeddings[0].values)}")
