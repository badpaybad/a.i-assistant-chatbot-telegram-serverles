import sys
import os
import shutil

# Add parent directory to path to import knowledgebase
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from knowledgebase.dbvectorconnect import LocalVectorDB

def setup_test_folder(folder_path):
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    os.makedirs(folder_path)
    
    # Root level file
    with open(os.path.join(folder_path, "root.txt"), "w") as f:
        f.write("This is a text file in the root folder.")
    
    # Subfolder
    subfolder = os.path.join(folder_path, "subfolder")
    os.makedirs(subfolder)
    with open(os.path.join(subfolder, "sub.txt"), "w") as f:
        f.write("This is a text file in a subfolder.")
        
    # Unsupported file
    with open(os.path.join(folder_path, "ignore.me"), "w") as f:
        f.write("This file should be ignored.")

def test_add_folder():
    test_folder = "test_data_folder"
    setup_test_folder(test_folder)
    
    db = LocalVectorDB("test_folder_db")
    
    print(f"--- Testing add_folder with {test_folder} ---")
    try:
        db.add_folder(test_folder)
        print("--- add_folder execution completed ---")
        
        # Verify root file indexing
        print("\n--- Verifying root file indexing ---")
        results = db.search("root folder", top_k=1)
        if results and "root" in results[0]['text'].lower():
            print("SUCCESS: Root file indexed correctly.")
        else:
            print("FAILURE: Root file not found or incorrect.")
            
        # Verify subfolder file indexing
        print("\n--- Verifying subfolder file indexing ---")
        results = db.search("subfolder", top_k=1)
        if results and "subfolder" in results[0]['text'].lower():
            print("SUCCESS: Subfolder file indexed correctly.")
        else:
            print("FAILURE: Subfolder file not found or incorrect.")

        # Cleanup test folder
        shutil.rmtree(test_folder)
            
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_add_folder()
