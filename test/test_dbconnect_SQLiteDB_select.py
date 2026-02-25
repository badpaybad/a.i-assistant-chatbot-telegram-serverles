import os
import sys
import time

# Add the project root to sys.path
sys.path.append(os.getcwd())

from knowledgebase.dbconnect import SQLiteDB

def test_select_order():
    # Use an absolute path for safety
    db_path = os.path.join(os.getcwd(), "test", "test_knowledgebase_simple.db")
    db = SQLiteDB(table_name="test_order_table", db_path=db_path)
    
    # Cleanup
    with db._get_connection() as conn:
        conn.execute(f"DROP TABLE IF EXISTS {db.table_name}")
        conn.commit()
    db._create_table()
    
    print("Inserting records...")
    db.insert({"msg": "first"})
    db.insert({"msg": "second"})
    db.insert({"msg": "third"})
    
    # In SQLite, if inserts are too fast, 'at' might be the same.
    # But for testing the SORT logic in Python, we can manually set 'at' if needed.
    # However, let's see what happens.
    
    print("Testing select()...")
    results = db.select()
    ats = [r['at'] for r in results]
    print(f"Timestamps: {ats}")
    
    # If ats are same, sort is stable but we can't be sure it's ASC.
    # Let's manually update them to be sure.
    for i, res in enumerate(results):
        record_id = res['id']
        new_at = 1000 + i
        with db._get_connection() as conn:
            conn.execute(f"UPDATE {db.table_name} SET at = ? WHERE id = ?", (new_at, record_id))
            conn.commit()
    
    print("Testing select() after manual 'at' update...")
    results = db.select()
    ats = [r['at'] for r in results]
    print(f"Timestamps: {ats}")
    
    is_ascending = all(ats[i] <= ats[i+1] for i in range(len(ats)-1))
    
    if is_ascending:
        print("SUCCESS: select() results are in ascending order.")
    else:
        print(f"FAILURE: select() results are NOT in ascending order. Results: {results}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_dbconnect_SQLiteDB_select.py config_dunp")
        sys.exit(1)
    test_select_order()
