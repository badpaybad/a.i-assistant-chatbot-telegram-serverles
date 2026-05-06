import requests
import time
import json
import sys

BASE_URL = "http://localhost:5000"

def test_cqrs_dashboard():
    print("Testing CQRS Dashboard Features...")
    
    try:
        # 0. Check if server is up
        try:
            requests.get(f"{BASE_URL}/api/cqrs/dashboard/stats", timeout=2)
        except:
            print(f"Server is not running at {BASE_URL}. Please start the backend first.")
            return False

        # 1. Send a failing command
        print("Sending failing command...")
        resp = requests.post(f"{BASE_URL}/api/CqrsTest/sample-command", json={"payload": "This will FAIL"})
        if resp.status_code != 200:
            print(f"Failed to send command: {resp.status_code} {resp.text}")
            return False
        
        tracking_id = resp.json()["trackingId"]
        print(f"Command sent. TrackingId: {tracking_id}")
        
        # 2. Wait for processing (it should move to DLQ)
        print("Waiting for processing...")
        time.sleep(5)
        
        # 3. Check DLQ
        print("Checking DLQ...")
        resp = requests.get(f"{BASE_URL}/api/cqrs/dashboard/queues")
        queues = resp.json()
        dead_queue = next((q for q in queues if q["name"] == "sample.command:dead"), None)
        
        if not dead_queue or dead_queue["length"] == 0:
            print("DLQ is empty. Failure simulation failed or message not moved.")
            # List all queues for debugging
            print("Available queues:", [q["name"] for q in queues])
            return False
        print(f"DLQ confirmed. Length: {dead_queue['length']}")
        
        # 4. Get message from DLQ
        resp = requests.get(f"{BASE_URL}/api/cqrs/dashboard/messages/sample.command:dead")
        messages = resp.json()
        failed_msg = messages[0]
        print(f"Found failed message: {failed_msg[:100]}...")
        
        # 5. Check tracking
        print("Checking tracking history...")
        resp = requests.get(f"{BASE_URL}/api/cqrs/dashboard/tracking/{tracking_id}")
        history = resp.json()
        print(f"History items: {len(history)}")
        if not any("Error" in h for h in history):
            print("Error not found in tracking history.")
            # Print history for debugging
            for h in history: print(f"  {h}")
            return False
        
        # 6. Retry
        print("Retrying message...")
        resp = requests.post(f"{BASE_URL}/api/cqrs/dashboard/retry", json={
            "queueName": "sample.command",
            "messageJson": failed_msg
        })
        if resp.status_code != 200:
            print(f"Retry failed: {resp.text}")
            return False
        
        print("Retry successful. Checking queues again...")
        time.sleep(2)
        
        resp = requests.get(f"{BASE_URL}/api/cqrs/dashboard/queues")
        queues = resp.json()
        dead_queue_after = next((q for q in queues if q["name"] == "sample.command:dead"), None)
        
        # Current length might be 0 or just less than before
        current_len = dead_queue_after["length"] if dead_queue_after else 0
        if current_len < dead_queue["length"]:
            print(f"Message moved out of DLQ successfully. New length: {current_len}")
        else:
            print(f"Message still in DLQ or length didn't decrease. Old: {dead_queue['length']}, New: {current_len}")
            return False

        print("All CQRS Dashboard features tested successfully!")
        return True
    except Exception as e:
        print(f"Test error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        if test_cqrs_dashboard():
            print("Tests PASSED")
        else:
            print("Tests FAILED")
            sys.exit(1)
    else:
        print("Usage: python test/test_CqrsDashboardController_All_Features.py config_dunp")
