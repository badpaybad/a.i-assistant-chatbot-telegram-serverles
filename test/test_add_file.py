import sys
import os

# Add parent directory to path to import knowledgebase
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from knowledgebase.dbvectorconnect import LocalVectorDB

def test_add_file():
    db = LocalVectorDB("test_db")
    file_path = "dunp.png"
    
    print(f"--- Testing add_file with {file_path} ---")
    try:
        db.add_file(file_path)
        print("--- add_file execution completed ---")
        
        # Search for something that might be in the image to verify
        print("\n--- Testing search to verify indexing ---")
        results = db.search("mô tả hình ảnh", top_k=1)
        for i, res in enumerate(results):
            print(f"Result {i+1}:")
            print(f"Text: {res['text'][:200]}...")
            print(f"Metadata: {res['metadata']}")
            print(f"Distance: {res['distance']}")
            
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_add_file()
