import sys
import os
import time
import json
import datetime

# Add project root to sys.path
sys.path.append(os.getcwd())

from knowledgebase.summarychat import SummaryChat
from knowledgebase.dbconnect import SQLiteDB
import telegram_types

def test_summary_chat():
    print("Starting test_summary_chat...")
    
    # Initialize SummaryChat
    sc = SummaryChat()
    
    # Mock update object using TelegramUpdate model
    def create_mock_update(i):
        msg = telegram_types.Message(
            message_id=500 + i,
            from_user=telegram_types.FromUser(
                id=730806080,
                first_name="User",
                last_name=str(i),
                username=f"user_{i}"
            ),
            chat=telegram_types.Chat(
                id=-12345678,
                title="Test Group",
                type="group"
            ),
            date=int(time.time()) - (10 - i) * 60,
            text=f"This is message number {i} for testing summarization."
        )
        return telegram_types.TelegramUpdate(
            update_id=1000 + i,
            message=msg
        )

    # Enqueue 10 mock updates
    batch_size = 10
    print(f"Enqueuing {batch_size} mock updates...")
    for i in range(batch_size):
        sc.enqueue_update(create_mock_update(i))
    
    # Wait for the batch to be processed (max 15 seconds)
    print("Waiting for processing loop to catch up...")
    time.sleep(12) 
    
    # Stop the background thread first to ensure all tasks are marked as finished
    print("Stopping SummaryChat loop...")
    sc.stop()
    
    # Check the database
    db = SQLiteDB(table_name="summary_chat")
    results = db.select() # select all records from summary_chat, ordered by 'at' DESC
    
    print(f"Found {len(results)} records in summary_chat table.")
    
    if len(results) > 0:
        latest = results[0]
        print("Latest record content:")
        # SQLiteDB.select returns [{"id": row[0], "json": json.loads(row[1]), "at": row[2]}]
        print(json.dumps(latest, indent=2, ensure_ascii=False))
        
        # Verify content
        summary_data = latest["json"]
        if "summary" in summary_data:
            print(f"Summary text: {summary_data['summary']}")
        else:
            print("FAILED: No 'summary' field found in record.")
    else:
        print("FAILED: No records found in database.")

    # Stop the background thread
    sc.stop()
    print("Test finished.")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        test_summary_chat()
    else:
        print("Please run with config_dunp")
