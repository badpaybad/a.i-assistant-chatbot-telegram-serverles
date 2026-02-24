
import os
import sys
# Add parent directory to path to import knowledgebase
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from knowledgebase.dbvectorconnect import LocalVectorDB

def test_basic_flow():
    db = LocalVectorDB("test_db")
    
    texts = [
        "Hà Nội là thủ đô của Việt Nam.",
        "Sài Gòn được đổi tên thành Thành phố Hồ Chí Minh năm 1976.",
        "Phở là một món ăn truyền thống của người Việt.",
        "Đà Nẵng là thành phố đáng sống nhất Việt Nam."
    ]
    
    print("--- Adding texts ---")
    db.add_texts(texts)
    
    print("\n--- Searching for 'Thủ đô' ---")
    results = db.search("Thủ đô", top_k=2)
    for r in results:
        print(f"Result: {r['text']} (Distance: {r['distance']})")
    
    assert any("Hà Nội" in r['text'] for r in results), "Search for 'Thủ đô' failed to find Hà Nội"

    print("\n--- Deleting 'Hà Nội là thủ đô của Việt Nam.' ---")
    db.delete_texts("Hà Nội là thủ đô của Việt Nam.")
    
    print("\n--- Searching again for 'Thủ đô' ---")
    results = db.search("Thủ đô", top_k=2)
    for r in results:
        print(f"Result: {r['text']} (Distance: {r['distance']})")
    
    # Check if 'Hà Nội' is still there (it shouldn't be)
    assert not any("Hà Nội" in r['text'] for r in results), "Hà Nội was found after deletion!"
    
    # Check if other texts are still there
    print("\n--- Searching for 'Sài Gòn' ---")
    results = db.search("Sài Gòn", top_k=1)
    assert any("Sài Gòn" in r['text'] for r in results), "Sài Gòn missing after deletion of unrelated text"

    print("\nTest basic flow and deletion passed!")

if __name__ == "__main__":
    db_path = "data/vector_db/test_db"
    if not os.path.exists(db_path):
        os.makedirs(db_path, exist_ok=True)
    try:
        test_basic_flow()
    except Exception as e:
        print(f"Test failed with error: {e}")
        import traceback
        traceback.print_exc()
