import asyncio
import httpx
import json

async def simulate_webhook():
    url = "http://localhost:8088/webhook"
    
    # Simulate a document message
    payload = {
        "update_id": 12345,
        "message": {
            "chat": {"id": 12345678, "first_name": "Tester"},
            "date": 1707700000,
            "text": "Here is a document",
            "document": {
                "file_id": "doc_file_id_123",
                "file_unique_id": "unique_123",
                "file_name": "test_document.pdf",
                "mime_type": "application/pdf",
                "file_size": 1024
            }
        }
    }
    
    print(f"Sending simulated document webhook to {url}...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=10.0)
            print(f"Response: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(simulate_webhook())
