import sys
import os
import time
import json

# Add project root to sys.path
sys.path.append(os.getcwd())

from knowledgebase.dbconnect import SQLiteDB

def test_inserts():
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Error: Missing or incorrect config argument. Use 'config_dunp'.")
        sys.exit(1)

    test_db_path = "test/test_knowledgebase.db"
    table_name = "test_table"
    
    # Ensure clean state
    if os.path.exists(test_db_path):
        os.remove(test_db_path)

    try:
        db = SQLiteDB(table_name, db_path=test_db_path)
        
        test_data = [
            {"name": "Alice", "age": 30},
            {"name": "Bob", "age": 25},
            {"content": "Just a string content inside a dict"},
            ["item1", "item2"]
        ]
        
        print(f"Testing batch insertion of {len(test_data)} records...")
        record_ids = db.inserts(test_data)
        
        if len(record_ids) != len(test_data):
            print(f"FAIL: Expected {len(test_data)} IDs, got {len(record_ids)}")
            return False
            
        # Verify records in DB
        all_records = db.select()
        if len(all_records) != len(test_data):
            print(f"FAIL: Expected {len(test_data)} records in DB, got {len(all_records)}")
            return False
            
        # Verify content (order might be by 'at' DESC, and they all have same 'at' epoch probably)
        # So we check by ID existence and matching content
        id_to_record = {r['id']: r for r in all_records}
        
        for i, original_data in enumerate(test_data):
            rid = record_ids[i]
            if rid not in id_to_record:
                print(f"FAIL: Record ID {rid} not found in DB")
                return False
            
            stored_data = id_to_record[rid]['json']
            if stored_data != original_data:
                print(f"FAIL: Data mismatch for {rid}. Expected {original_data}, got {stored_data}")
                return False
                
        print("SUCCESS: All records inserted and verified correctly.")
        return True

    finally:
        # Cleanup
        if os.path.exists(test_db_path):
            os.remove(test_db_path)

if __name__ == "__main__":
    if test_inserts():
        print("Test PASSED")
        sys.exit(0)
    else:
        print("Test FAILED")
        sys.exit(1)
