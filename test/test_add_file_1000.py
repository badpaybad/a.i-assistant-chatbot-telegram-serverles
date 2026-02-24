
import os
import sys
# Add parent directory to path to import knowledgebase
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from knowledgebase.dbvectorconnect import LocalVectorDB

def test_add_file_1000():
    db_name = "test_1000_db"
    db = LocalVectorDB(db_name)
    file_path = "test_1000_words.txt"
    
    if not os.path.exists(file_path):
        print(f"ERROR: {file_path} not found!")
        return

    print(f"--- Adding file: {file_path} ---")
    db.add_file(file_path)
    print("--- File added successfully ---")
    
    # Search for a specific word to verify (since we used random words, we'll just search for a common one)
    # Actually, we can just check if metadata exists and has the file_path
    
    print("\n--- Searching for 'apple' ---")
    results = db.search("apple", top_k=5)
    
    found_file = False
    for r in results:
        print(f"Result: {r['text'][:50]}... (Distance: {r['distance']})")
        if r['metadata'].get('file_path') == file_path:
            found_file = True
            
    if found_file:
        print("\nSUCCESS: Found chunks associated with the test file!")
    else:
        print("\nFAILURE: Could not find chunks associated with the test file.")
        
    # Cleanup (optional, but good practice for tests)
    # db.delete_texts(...) # Not easy to delete all if we don't know the exact chunks
    
if __name__ == "__main__":
    try:
        test_add_file_1000()
    except Exception as e:
        print(f"Test failed with error: {e}")
        import traceback
        traceback.print_exc()
