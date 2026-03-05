
import sys
import os

# Base directory for imports
sys.path.append(os.getcwd())

import knowledgebase.dbcontext as dbcontext
import json

def test_get_latest():
    # Use a chat_id found in previous DB check
    chat_id = "-893317332" 
    print(f"--- Testing get_20_latest_messages for chat_id: {chat_id} (type: {type(chat_id)}) ---")
    
    results = dbcontext.get_20_latest_messages(chat_id)
    
    print(f"Found {len(results)} messages.")
    for i, res in enumerate(results):
        try:
            msg_data = res["json"]
            if isinstance(msg_data, str):
                msg_data = json.loads(msg_data)
            
            text = "N/A"
            if "message" in msg_data and "text" in msg_data["message"]:
                text = msg_data["message"]["text"]
            elif "result" in msg_data and "text" in msg_data["result"]:
                 text = msg_data["result"]["text"]
            
            print(f"{i+1:2d}. ID: {res['id']} | At: {res['at']} | Text: {text[:50]}...")
        except Exception as e:
            print(f"{i+1:2d}. Error processing record: {e}")

if __name__ == "__main__":
    test_get_latest()
