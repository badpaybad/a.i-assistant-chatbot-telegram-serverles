
import sys
import os
import unittest
from unittest.mock import MagicMock, patch

# Thêm thư mục gốc vào path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../knowledgebase')))

import knowledgebase.orchestrationcontext as orchestrationcontext

class TestDynamicLoading(unittest.TestCase):

    def setUp(self):
        # Tạo folder skill giả lập
        self.test_skill_dir = "skills/test_mock_skill"
        if not os.path.exists(self.test_skill_dir):
            os.makedirs(self.test_skill_dir)
        
        self.main_file = os.path.join(self.test_skill_dir, "main.py")
        with open(self.main_file, "w") as f:
            f.write("""
def exec(curret_message, list_current_msg, list_summary_chat):
    print("MOCK SKILL EXECUTED")
    curret_message.mock_executed = True
""")

    def tearDown(self):
        # Dọn dẹp
        import shutil
        if os.path.exists(self.test_skill_dir):
            shutil.rmtree(self.test_skill_dir)

    def test_do_decision_dynamic_load(self):
        skill = {
            "target_folder": self.test_skill_dir,
            "reasoning": "testing",
            "intent": "test"
        }
        mock_msg = MagicMock()
        mock_msg.mock_executed = False
        
        # Chạy do_decision
        orchestrationcontext.do_decision(skill, mock_msg, [], [])
        
        # Kiểm tra xem mock_skill có được thực thi không
        self.assertTrue(mock_msg.mock_executed)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'config_dunp':
        # Remove custom arg before running unittest
        sys.argv.pop(1)
        unittest.main()
    else:
        print("Vui lòng chạy với tham số config_dunp")
