
import sys
import os
import unittest
from unittest.mock import MagicMock, patch

# Thêm thư mục gốc và kiến thức vào path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../knowledgebase')))

import knowledgebase.orchestrationcontext as orchestrationcontext
import telegram_types

class TestDispatcher(unittest.TestCase):

    @patch('knowledgebase.orchestrationcontext.get_summary_chat')
    @patch('knowledgebase.orchestrationcontext.clientGemini')
    def test_dispatcher_prompt_construction(self, mock_client, mock_get_summary):
        # 1. Setup Mock Data
        chat_id = -12345678
        mock_get_summary.return_value = [
            {"chat_id": chat_id, "at": 1772014184, "summary": "Nhóm \"Test Group\" đã gửi 10 tin nhắn liên tiếp, được đánh số từ 0 đến 9."}
        ]
        
        # Giả lập chat_buffers
        orchestrationcontext.chat_buffers[chat_id] = [
            MagicMock(text=f"Recent message {i}") for i in range(5)
        ]
        
        # Giả lập tin nhắn hiện tại
        current_message = MagicMock(spec=telegram_types.OrchestrationMessage)
        current_message.chat_id = chat_id
        current_message.text = "Liệt kê các file trong thư mục hiện tại bằng ls -la"
        current_message.files = []

        # Giả lập response từ Gemini
        mock_response = MagicMock()
        mock_response.text = '{"target_folder": "skills/cli", "reasoning": "User wants to run a shell command", "intent": "list files"}'
        mock_response.candidates = [MagicMock(finish_reason="STOP", content=MagicMock(parts=[MagicMock()]))]
        mock_client.models.generate_content.return_value = mock_response

        # 2. Run
        reply, history = orchestrationcontext.chat_with_knowledgebase(current_message)

        # 3. Verify
        # Kiểm tra xem generate_content được gọi với context đúng không
        call_args = mock_client.models.generate_content.call_args
        contents = call_args.kwargs['contents']
        
        prompt_sent = contents[0].parts[0].text
        
        self.assertIn("### [Summarized History]", prompt_sent)
        self.assertIn("### [Recent Messages]", prompt_sent)
        self.assertIn("### [Current Message]", prompt_sent)
        self.assertIn("ls -la", prompt_sent)
        self.assertIn("Nhóm \"Test Group\"", prompt_sent)
        
        print("Dispatcher prompt construction verified!")
        print(f"Reply: {reply}")

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'config_dunp':
        # Remove custom arg before running unittest
        sys.argv.pop(1)
        unittest.main()
    else:
        print("Vui lòng chạy với tham số config_dunp")
