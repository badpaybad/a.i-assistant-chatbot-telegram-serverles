import sys
import os
import asyncio
import unittest
from unittest.mock import MagicMock, patch

# Thêm đường dẫn gốc vào sys.path để import các module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import skills.new_feature_dev.main as new_feature_dev

class TestNewFeatureDevSkill(unittest.IsolatedAsyncioTestCase):
    
    @patch('skills.new_feature_dev.main.clientGemini')
    @patch('bot_telegram.send_telegram_message')
    @patch('subprocess.run')
    async def test_exec_flow(self, mock_subproc, mock_send_msg, mock_gemini):
        # 1. Mock Gemini response for slug extraction
        mock_resp_slug = MagicMock()
        mock_resp_slug.text = '{"feature_name_slug": "test-feature", "feature_title": "Test Feature", "summary": "A test feature description"}'
        
        # 2. Mock Gemini response for phattrien.md generation
        mock_resp_plan = MagicMock()
        mock_resp_plan.text = "Chi tiết giải pháp cho Test Feature..."
        
        mock_gemini.models.generate_content.side_effect = [mock_resp_slug, mock_resp_plan]
        
        # 3. Setup input parameters
        skill = {"target_folder": "skills/new_feature_dev", "reasoning": "User wants new feature", "intent": "create_feature"}
        curret_message = MagicMock()
        curret_message.text = "Tạo nghiệp vụ test-feature"
        curret_message.chat_id = 123456
        
        list_current_msg = []
        list_summary_chat = []
        unique_urls = []
        contents_from_url = []
        
        # 4. Execute skill
        print("Executing skill...")
        try:
            await new_feature_dev.exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls, contents_from_url)
        except Exception as e:
            print(f"Error during exec: {e}")
            import traceback
            traceback.print_exc()
        
        # 5. Verify results
        print(f"Checking path: TreeOfThought/docs/test-feature/yeucau.md")
        exists = os.path.exists("TreeOfThought/docs/test-feature/yeucau.md")
        print(f"Exists: {exists}")
        self.assertTrue(exists)
        
        # Cleanup
        import shutil
        if os.path.exists("TreeOfThought/docs/test-feature"):
            shutil.rmtree("TreeOfThought/docs/test-feature")
        if os.path.exists("TreeOfThought/backend/test-feature"):
            shutil.rmtree("TreeOfThought/backend/test-feature")
        if os.path.exists("TreeOfThought/frontend/web/src/modules/test-feature"):
            shutil.rmtree("TreeOfThought/frontend/web/src/modules/test-feature")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        unittest.main(argv=[sys.argv[0]])
    else:
        print("Vui lòng chạy với tham số config_dunp")
