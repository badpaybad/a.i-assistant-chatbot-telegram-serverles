import os
import sys
import torch
import asyncio
from fastapi.testclient import TestClient

# Ensure project root is in sys.path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from gemma4.program import app

def test_update6_preload_and_health():
    print("=== Testing Gemma 4 Update 6: Pre-download & Pre-loading Models ===")
    
    # Test lifespan execution using TestClient
    with TestClient(app) as client:
        print("[*] TestClient entered lifespan context (Models pre-downloaded & pre-loaded into GPU VRAM).")
        
        # Query health endpoint
        resp = client.get("/health")
        print(f"[*] Health Check Response: {resp.json()}")
        
        assert resp.status_code == 200, "Health check should return 200 OK"
        data = resp.json()
        assert data.get("ready") == True, "Server ready status should be True after lifespan pre-loading"
        assert data.get("model") == "gemma-4-e4b-it", "Model name should be gemma-4-e4b-it"
        
        print("[SUCCESS] Update 6 Pre-load and Health Check Verification Passed!")

if __name__ == "__main__":
    test_update6_preload_and_health()
