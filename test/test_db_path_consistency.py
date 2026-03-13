import os
import sys

# Add project root to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(root_dir)

from knowledgebase.dbconnect import SQLiteDB

def test_db_path():
    print(f"Current working directory: {os.getcwd()}")
    
    # Initialize DB (should use default data/knowledgebase.db)
    db = SQLiteDB("test_table")
    print(f"Database path used: {db.db_path}")
    
    expected_path = os.path.join(root_dir, "data/knowledgebase.db")
    if os.path.abspath(db.db_path) == os.path.abspath(expected_path):
        print("SUCCESS: Database path is absolute and correctly points to project root data/ directory.")
    else:
        print(f"FAILURE: Database path mismatch.")
        print(f"  Expected: {os.path.abspath(expected_path)}")
        print(f"  Got:      {os.path.abspath(db.db_path)}")
        sys.exit(1)

if __name__ == "__main__":
    # Test from root
    os.chdir(root_dir)
    test_db_path()
    
    # Test from a subdirectory
    sub_dir = os.path.join(root_dir, "skills/zalo")
    if os.path.exists(sub_dir):
        os.chdir(sub_dir)
        test_db_path()
    else:
        print(f"Skipping subdirectory test: {sub_dir} does not exist.")
