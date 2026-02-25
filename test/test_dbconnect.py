import sys
import os
import time

# Add the project root to sys.path to import knowledgebase
sys.path.append(os.getcwd())

from knowledgebase.dbconnect import SQLiteDB

def test_sqlite_db():
    db = SQLiteDB(table_name="test_table", db_path="data/test_knowledgebase.db")
    
    # 1. Test Insert
    print("Testing Insert...")
    data = {"name": "Test Item", "description": "This is a test"}
    record_id = db.insert(data)
    print(f"Inserted record with ID: {record_id}")
    
    # 2. Test Select One
    print("\nTesting Select One...")
    record = db.select(record_id)
    print(f"Retrieved record: {record}")
    assert record is not None
    assert record["id"] == record_id
    assert record["json"]["name"] == "Test Item"
    
    # 3. Test Select All
    print("\nTesting Select All...")
    all_records = db.select()
    print(f"Total records retrieved: {len(all_records)}")
    assert len(all_records) >= 1
    
    # 4. Test Update
    print("\nTesting Update...")
    updated_data = {"name": "Updated Test Item", "description": "Updated description"}
    success = db.update(record_id, updated_data)
    print(f"Update success: {success}")
    assert success is True
    
    record = db.select(record_id)
    print(f"Retrieved updated record: {record}")
    assert record["json"]["name"] == "Updated Test Item"
    
    # 5. Test Delete
    print("\nTesting Delete...")
    success = db.delete(record_id)
    print(f"Delete success: {success}")
    assert success is True
    
    record = db.select(record_id)
    assert record is None
    print("Delete verified.")
    
    # 6. Test Keyword Search
    print("\nTesting Keyword Search...")
    import json
    db.insert({"topic": "python", "content": "learning sqlite"})
    db.insert({"topic": "javascript", "content": "learning nodejs"})
    db.insert({"topic": "python", "content": "learning advanced python"})
    
    results = db.select(keyword="python")
    print(f"Found {len(results)} records for 'python'")
    # We inserted 2 python records here, and there might be more if the test database wasn't clean
    assert len(results) >= 2
    for r in results:
        assert "python" in json.dumps(r["json"])
    print("Keyword search verified.")
    
    # 7. Test JSON Field Search
    print("\nTesting JSON Field Search (search_json)...")
    db.insert({"user": {"id": 123, "name": "Antigravity"}})
    db.insert({"user": {"id": 456, "name": "User"}})
    
    # Simple key search
    python_records = db.search_json("topic", "python")
    print(f"Found {len(python_records)} records with topic='python'")
    assert len(python_records) >= 2
    
    # Nested path search
    nested_records = db.search_json("$.user.name", "Antigravity")
    print(f"Found {len(nested_records)} records with $.user.name='Antigravity'")
    assert len(nested_records) == 1
    assert nested_records[0]["json"]["user"]["id"] == 123
    
    print("JSON Field Search verified.")
    
    # Cleanup
    if os.path.exists("data/test_knowledgebase.db"):
        os.remove("data/test_knowledgebase.db")
        print("\nCleanup: Removed test database.")

if __name__ == "__main__":
    try:
        test_sqlite_db()
        print("\nAll tests passed successfully!")
    except Exception as e:
        print(f"\nTest failed: {e}")
        sys.exit(1)
