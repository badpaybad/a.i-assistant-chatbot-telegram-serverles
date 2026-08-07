import unittest
from unittest.mock import patch, MagicMock
from myassitant.agent import _build_smart_history_context, GroupChatAgent


class TestSmartHistoryAndIntent(unittest.TestCase):

    @patch("myassitant.db.get_recent_processed_messages")
    def test_build_smart_history_context(self, mock_get_recent):
        mock_get_recent.return_value = [
            {
                "id": 1,
                "message_id": 101,
                "from_user_id": "111",
                "from_username": "alice",
                "from_full_name": "Alice Wonderland",
                "text": "Chào bot, giúp mình tính 1 + 1",
                "created_at": "2026-08-05 10:00:00",
                "is_chatbot_reply": 0,
                "reply_to_message_id": None,
                "file_summaries": None,
            },
            {
                "id": 2,
                "message_id": 102,
                "from_user_id": "999",
                "from_username": "my_bot",
                "from_full_name": "My Chatbot",
                "text": "1 + 1 = 2 bạn nhé!",
                "created_at": "2026-08-05 10:00:05",
                "is_chatbot_reply": 2,
                "reply_to_message_id": 101,
                "file_summaries": None,
            },
            {
                "id": 3,
                "message_id": 103,
                "from_user_id": "222",
                "from_username": "bob",
                "from_full_name": "Bob Builder",
                "text": "Cảm ơn bot!",
                "created_at": "2026-08-05 10:00:10",
                "is_chatbot_reply": 0,
                "reply_to_message_id": 102,
                "file_summaries": "photo:Bản thiết kế.jpg",
            },
        ]

        with patch("myassitant.agent.TELEGRAM_BOT_USERNAME", "my_bot"):
            history_text = _build_smart_history_context("group_123", limit=10)

        self.assertIn("1. [2026-08-05 10:00:00] Message #101 - [USER] Alice Wonderland (@alice): Chào bot, giúp mình tính 1 + 1", history_text)
        self.assertIn("[BOT / CHATBOT]", history_text)
        self.assertIn("(Trả lời Message #101)", history_text)
        self.assertIn("[📎 File: photo:Bản thiết kế.jpg]", history_text)

    @patch("myassitant.agent._call_gemma4")
    @patch("myassitant.db.get_files_of_message")
    @patch("myassitant.db.get_message_by_telegram_id")
    @patch("myassitant.db.update_message_chatbot_replied")
    @patch("myassitant.agent._send_telegram_message")
    def test_handle_message_no_reply(self, mock_send, mock_update_db, mock_get_reply_msg, mock_get_files, mock_call_gemma4):
        mock_get_files.return_value = []
        mock_get_reply_msg.return_value = None
        mock_call_gemma4.return_value = {"text": "[NO_REPLY]"}

        agent = GroupChatAgent(group_id="-1001234567")
        msg = {
            "id": 10,
            "message_id": 50,
            "text": "vâng ok bạn",
            "from_username": "user1",
            "from_full_name": "User One",
            "from_user_id": "123",
            "created_at": "2026-08-05 10:05:00",
            "reply_to_message_id": None,
        }

        agent._handle_message(msg)

        # Confirm AI returned [NO_REPLY] so _send_telegram_message was NOT called
        mock_send.assert_not_called()
        # Confirm message was marked as processed/replied in DB
        mock_update_db.assert_called_once_with(10)

    @patch("myassitant.agent._call_gemma4")
    @patch("myassitant.agent.execute_tool")
    @patch("myassitant.db.get_files_of_message")
    @patch("myassitant.db.get_message_by_telegram_id")
    @patch("myassitant.db.update_message_chatbot_replied")
    @patch("myassitant.agent._send_telegram_message")
    def test_handle_message_temporal_tool_call(self, mock_send, mock_update_db, mock_get_reply_msg, mock_get_files, mock_exec_tool, mock_call_gemma4):
        mock_get_files.return_value = []
        mock_get_reply_msg.return_value = None

        # Loop 1: returns tool_call to search past messages
        # Loop 2: returns final reply text based on search results
        mock_call_gemma4.side_effect = [
            {
                "text": "Đang tìm lại tin nhắn hôm qua...",
                "tool_calls": [{"name": "db_search_messages", "args": {"query": "báo cáo"}}],
            },
            {
                "text": "Báo cáo hôm qua cho biết doanh số tăng 15%.",
                "tool_calls": [],
            }
        ]

        mock_exec_tool.return_value = "🔍 Tìm thấy 1 tin nhắn: [2026-08-04 15:00:00] @alice: Báo cáo doanh số tăng 15%"
        mock_send.return_value = {"ok": True, "result": {}}

        agent = GroupChatAgent(group_id="-1001234567")
        msg = {
            "id": 11,
            "message_id": 51,
            "text": "Bot ơi cho hỏi nội dung báo cáo hôm qua là gì?",
            "from_username": "user2",
            "from_full_name": "User Two",
            "from_user_id": "124",
            "created_at": "2026-08-05 10:10:00",
            "reply_to_message_id": None,
        }

        agent._handle_message(msg)

        # Confirm tool execute_tool was called for db_search_messages
        mock_exec_tool.assert_called_once_with(
            tool_name="db_search_messages",
            args={"query": "báo cáo"},
            group_id="-1001234567",
            user_id="124",
            username="user2"
        )
        # Confirm _send_telegram_message sent the final response
        mock_send.assert_called_once()
        self.assertIn("Báo cáo hôm qua", mock_send.call_args[1]["text"])


if __name__ == "__main__":
    unittest.main()
