import sys
import os
sys.path.append(os.getcwd())

from knowledgebase.dbconnect import SQLiteDB
import os

def test_batch_insert():
    db_path = "data/test_batch.db"
    if os.path.exists(db_path):
        os.remove(db_path)
        
    db = SQLiteDB("test_table", db_path=db_path)
    
    data_to_insert = [
        {"name": "batch1", "value": 100},
        {"name": "batch2", "value": 200},
        {"name": "batch3", "value": 300}
    ]
    
    print(f"Inserting {len(data_to_insert)} records...")
    ids = db.inserts(data_to_insert)
    
    print(f"Generated IDs: {ids}")
    
    assert len(ids) == 3
    
    records = db.select()
    print(f"Total records in DB: {len(records)}")
    for r in records:
        print(r)
    
    assert len(records) == 3
    
    for i, record in enumerate(reversed(records)): # records are ordered by at DESC
        assert record["json"]["name"] == data_to_insert[i]["name"]
        assert record["json"]["value"] == data_to_insert[i]["value"]
        
    print("Verification successful!")

if __name__ == "__main__":
    test_batch_insert()
