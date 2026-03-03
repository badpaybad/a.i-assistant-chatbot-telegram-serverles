
import os
import sys
import unittest
from unittest.mock import MagicMock

# Add root folder to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import domain_handlers.ngoc_ddd as ngoc_ddd
import telegram_types

class TestProcessUserMapping(unittest.TestCase):
    def setUp(self):
        self.mock_msg = MagicMock(spec=telegram_types.OrchestrationMessage)
        self.mock_msg.message = MagicMock()
        self.mock_from_user = MagicMock()
        self.mock_from_user.id = 123
        self.mock_from_user.username = "bot_user"
        self.mock_from_user.first_name = "Bot"
        self.mock_from_user.last_name = "User"
        self.mock_from_user.is_bot = False
        self.mock_msg.message.get_message_from_user.return_value = self.mock_from_user

    def test_valid_mapping(self):
        self.mock_msg.text = "@test_user tên: Nguyễn Văn A"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNotNone(result)
        self.assertEqual(result["username"], "test_user")
        self.assertEqual(result["fullname"], "Nguyễn Văn A")
        self.assertEqual(result["id"], 123)

    def test_missing_username(self):
        self.mock_msg.text = "tên: Nguyễn Văn A"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNone(result)

    def test_missing_fullname(self):
        self.mock_msg.text = "@test_user"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNone(result)

    def test_neither(self):
        self.mock_msg.text = "Hello world"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNone(result)

    def test_alternate_keywords(self):
        self.mock_msg.text = "@test_user ten: Nguyễn Văn B"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNotNone(result)
        self.assertEqual(result["fullname"], "Nguyễn Văn B")

        self.mock_msg.text = "@test_user name: Nguyễn Văn C"
        result = ngoc_ddd.process_user_mapping(self.mock_msg)
        self.assertIsNotNone(result)
        self.assertEqual(result["fullname"], "Nguyễn Văn C")

if __name__ == "__main__":
    unittest.main()
