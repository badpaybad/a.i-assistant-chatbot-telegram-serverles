import sys
import os
import time
import json
import unittest
from unittest.mock import MagicMock, patch

# Add project root to sys.path
sys.path.append(os.getcwd())

from knowledgebase.summarychat import SummaryChat
from knowledgebase.dbconnect import SQLiteDB

class TestSummaryChatPerChat(unittest.TestCase):
    @patch('knowledgebase.summarychat.genai.Client')
    @patch('knowledgebase.summarychat.SQLiteDB')
    def test_per_chat_grouping(self, mock_db_class, mock_genai_class):
        # Setup mocks
        mock_db = MagicMock()
        mock_db_class.return_value = mock_db
        
        mock_client = MagicMock()
        mock_genai_class.return_value = mock_client
        
        mock_response = MagicMock()
        mock_response.text = "Mocked Summary"
        mock_client.models.generate_content.return_value = mock_response
        
        # Initialize SummaryChat
        sc = SummaryChat(api_key="mock_key")
        sc.batch_size = 3 # Small batch size for faster testing
        
        def create_mock_update(chat_id, msg_id, text):
            return {
                "update_id": 1000 + msg_id,
                "message": {
                    "message_id": msg_id,
                    "from": {"first_name": "User", "last_name": str(msg_id)},
                    "chat": {"id": chat_id, "title": f"Chat {chat_id}"},
                    "date": int(time.time()),
                    "text": text
                }
            }
        
        print("Enqueuing messages for Chat A (3 messages)...")
        sc.enqueue_update(create_mock_update(111, 1, "A1"))
        sc.enqueue_update(create_mock_update(111, 2, "A2"))
        
        print("Enqueuing messages for Chat B (2 messages)...")
        sc.enqueue_update(create_mock_update(222, 3, "B1"))
        sc.enqueue_update(create_mock_update(222, 4, "B2"))
        
        # Wait a bit
        time.sleep(2)
        
        # Verify no summary yet (batch size is 3)
        mock_client.models.generate_content.assert_not_called()
        print("Verified: No summary generated yet as batch size (3) not reached for any chat.")
        
        print("Enqueuing 3rd message for Chat A...")
        sc.enqueue_update(create_mock_update(111, 5, "A3"))
        
        # Wait for processing
        time.sleep(1)
        
        # Verify summary for Chat A
        mock_client.models.generate_content.assert_called_once()
        args, kwargs = mock_client.models.generate_content.call_args
        prompt = kwargs.get('contents', '')
        self.assertIn("A1", prompt)
        self.assertIn("A2", prompt)
        self.assertIn("A3", prompt)
        self.assertNotIn("B1", prompt)
        print("Verified: Summary generated for Chat A containing A1, A2, A3.")
        
        # Verify DB insert for Chat A
        mock_db.insert_summary.assert_called_once()
        call_args = mock_db.insert_summary.call_args[0]
        self.assertEqual(call_args[0], "111") # chat_id
        
        # Reset mocks
        mock_client.models.generate_content.reset_mock()
        mock_db.insert_summary.reset_mock()
        
        print("Enqueuing 3rd message for Chat B...")
        sc.enqueue_update(create_mock_update(222, 6, "B3"))
        
        # Wait for processing
        time.sleep(1)
        
        # Verify summary for Chat B
        mock_client.models.generate_content.assert_called_once()
        args, kwargs = mock_client.models.generate_content.call_args
        prompt = kwargs.get('contents', '')
        self.assertIn("B1", prompt)
        self.assertIn("B2", prompt)
        self.assertIn("B3", prompt)
        self.assertNotIn("A1", prompt)
        print("Verified: Summary generated for Chat B containing B1, B2, B3.")
        
        # Verify DB insert for Chat B
        mock_db.insert_summary.assert_called_once()
        call_args = mock_db.insert_summary.call_args[0]
        self.assertEqual(call_args[0], "222") # chat_id
        
        sc.stop()
        print("Test passed!")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        unittest.main(argv=[sys.argv[0]])
    else:
        print("Please run with config_dunp")
