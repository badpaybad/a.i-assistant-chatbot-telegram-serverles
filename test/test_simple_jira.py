import asyncio
import httpx
import sys
import os

# Add project root to sys.path
sys.path.append(os.getcwd())

from config import JIRA_PERSONAL_ACCESS_TOKEN, JIRA_SERVER_URL, JIRA_PROJECT_KEY

async def test_simple_jira():
    print("--- Starting Simple Jira API Test ---")
    headers = {
        "Authorization": f"Bearer {JIRA_PERSONAL_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "fields": {
            "project": { "key": JIRA_PROJECT_KEY },
            "summary": "Test issue from Simple Script",
            "issuetype": { "name": "Task" },
            "description": "Test description"
        }
    }
    
    print(f"URL: {JIRA_SERVER_URL}")
    print(f"Headers: {headers}")
    
    try:
        async with httpx.AsyncClient() as client:
            print("Sending POST request...")
            response = await client.post(JIRA_SERVER_URL, headers=headers, json=payload, timeout=10.0)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_simple_jira())
