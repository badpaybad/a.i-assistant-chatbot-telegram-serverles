import requests
import sys
import os

# Mocking config_dunp for this test script if not imported properly
# In a real scenario, this would be imported
try:
    import config_dunp as config
except ImportError:
    class MockConfig:
        BASE_URL = "http://localhost:5000/api"
    config = MockConfig()

def test_upload():
    base_url = getattr(config, "BASE_URL", "http://localhost:5000/api")
    
    # 1. Login
    login_url = f"{base_url}/Auth/login"
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    print(f"Logging in to {login_url}...")
    response = requests.post(login_url, json=login_data)
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        return

    token = response.json().get("token")
    print("Login successful. Token obtained.")

    # 2. Upload file
    upload_url = f"{base_url}/FirebaseTest/upload"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # Create a dummy file
    test_file_path = "test_upload_sample.txt"
    with open(test_file_path, "w") as f:
        f.write("This is a test file for GCS upload.")

    print(f"Uploading file to {upload_url}...")
    with open(test_file_path, "rb") as f:
        files = {"file": ("test_upload_sample.txt", f, "text/plain")}
        response = requests.post(upload_url, headers=headers, files=files)

    # Cleanup
    if os.path.exists(test_file_path):
        os.remove(test_file_path)

    if response.status_code == 200:
        result = response.json()
        print("Upload successful!")
        print(f"Public URL: {result.get('url')}")
        print(f"File Name: {result.get('fileName')}")
    else:
        print(f"Upload failed with status {response.status_code}: {response.text}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_FirebaseTestController_UploadFile.py config_dunp")
        sys.exit(1)
    
    test_upload()
