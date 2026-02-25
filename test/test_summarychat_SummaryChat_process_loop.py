import sys
import os
import time
import json

# Add project root to sys.path
sys.path.append(os.getcwd())

from knowledgebase.summarychat import SummaryChat
from knowledgebase.dbconnect import SQLiteDB

def test_summary_chat():
    print("Starting test_summary_chat...")
    
    # Initialize SummaryChat
    sc = SummaryChat()
    
    # Mock update object template
    def create_mock_update(i):
        return {
            "update_id": 1000 + i,
            "message": {
                "message_id": 500 + i,
                "from": {
                    "id": 730806080,
                    "first_name": "User",
                    "last_name": str(i)
                },
                "chat": {
                    "id": -12345678,
                    "title": "Test Group",
                    "type": "group"
                },
                "date": int(time.time()) - (10 - i) * 60,
                "text": f"This is message number {i} for testing summarization."
            }
        }

    # Enqueue 10 mock updates
    print("Enqueuing 10 mock updates...")
    for i in range(10):
        sc.enqueue_update(create_mock_update(i))
    
    # Wait for the batch to be processed (max 15 seconds)
    print("Waiting for processing loop to catch up...")
    time.sleep(12) 
    
    # Check the database
    db = SQLiteDB(table_name="summary_chat")
    results = db.select() # select all records from summary_chat
    
    print(f"Found {len(results)} records in summary_chat table.")
    
    if len(results) > 0:
        latest = results[0]
        # In summary_chat, select returns rows with columns: id, chat_id, chat_datetime, at, chat_summary
        # Wait, SQLiteDB.select in dbconnect.py assumes id, json, at
        # Let's check how select works for custom table
        print("Latest record content:")
        # Since SQLiteDB.select expects (id, json, at), it might fail to parse json if we didn't store it that way
        # Actually, I should check dbconnect.py select implementation
        pass

    # Stop the background thread
    sc.stop()
    print("Test finished.")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        test_summary_chat()
    else:
        print("Please run with config_dunp")
