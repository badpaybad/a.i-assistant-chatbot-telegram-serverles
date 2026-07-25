import unittest
import os
import sys

# Ensure root dir is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

import knowledgebase.dbcontext as dbcontext
import knowledgebase.orchestrationcontext as orch_ctx
from program import CLEAR_CHAT_HISTORY_TOOL_DEF, is_clear_history_requested

class TestClearChatHistory(unittest.TestCase):
    def test_tool_definition(self):
        self.assertEqual(CLEAR_CHAT_HISTORY_TOOL_DEF["name"], "clear_chat_history")
        self.assertIn("lịch sử", CLEAR_CHAT_HISTORY_TOOL_DEF["description"])

    def test_keyword_detection(self):
        self.assertTrue(is_clear_history_requested("Hãy xóa hết message giúp tôi"))
        self.assertTrue(is_clear_history_requested("quên hết message đi nhé"))
        self.assertTrue(is_clear_history_requested("xoá lịch sử chat"))
        self.assertFalse(is_clear_history_requested("Xin chào bạn có khỏe không"))

    def test_clear_chat_history_data(self):
        test_chat_id = "test_chat_99999"
        
        # 1. Insert dummy records into DB
        dbcontext.db_orchestration_all_message.insert({"chat_id": test_chat_id, "text": "Hello 1"})
        dbcontext.sqllite_all_message.insert({"message": {"chat": {"id": test_chat_id}, "text": "Hello 1"}})
        dbcontext.db_summary_chat.insert({"chat_id": test_chat_id, "summary": "Summary 1"})
        
        # 2. Add dummy item to in-memory buffers
        orch_ctx.chat_buffers[test_chat_id] = [{"text": "Hello memory"}]
        if hasattr(orch_ctx.summarychat, "chat_buffers"):
            orch_ctx.summarychat.chat_buffers[test_chat_id] = [("update", "formatted")]

        # 3. Call clear_chat_history_data
        deleted_count = orch_ctx.clear_chat_history_data(test_chat_id)
        self.assertGreaterEqual(deleted_count, 1)

        # 4. Verify DB records cleared
        res_orch = dbcontext.db_orchestration_all_message.search_json("$.chat_id", test_chat_id)
        self.assertEqual(len(res_orch), 0)

        res_sum = dbcontext.db_summary_chat.search_json("$.chat_id", test_chat_id)
        self.assertEqual(len(res_sum), 0)

        # 5. Verify memory cleared
        self.assertNotIn(test_chat_id, orch_ctx.chat_buffers)
        if hasattr(orch_ctx.summarychat, "chat_buffers"):
            self.assertNotIn(test_chat_id, orch_ctx.summarychat.chat_buffers)

if __name__ == "__main__":
    unittest.main()
