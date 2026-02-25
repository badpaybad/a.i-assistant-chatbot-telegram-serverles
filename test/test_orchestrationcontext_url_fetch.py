
import sys
import os
import unittest
from unittest.mock import MagicMock, patch

# Thêm thư mục gốc và kiến thức vào path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../knowledgebase')))

import knowledgebase.orchestrationcontext as orchestrationcontext
import telegram_types

class TestURLFetch(unittest.TestCase):

    @patch('knowledgebase.orchestrationcontext.get_summary_chat')
    @patch('knowledgebase.orchestrationcontext.fetch_url_content')
    @patch('knowledgebase.orchestrationcontext.clientGemini')
    def test_url_extraction_and_fetching(self, mock_client, mock_fetch, mock_get_summary):
        # 1. Setup Mock Data
        chat_id = "test_chat_123"
        mock_get_summary.return_value = []
        
        # Reset chat_buffers
        orchestrationcontext.chat_buffers = {}
        
        # Mock fetch_url_content to return text for one URL and file for another
        def side_effect(url):
            if "text.com" in url:
                return "Mock text content", "text/plain", "text"
            elif "file.com" in url:
                return "/tmp/mock_file.pdf", "application/pdf", "file"
            return "", "text/plain", "text"
        
        mock_fetch.side_effect = side_effect

        # Mock Gemini response
        mock_response = MagicMock()
        mock_response.text = '{"target_folder": "skills/common_question_answer", "reasoning": "Test", "intent": "Test"}'
        mock_response.candidates = [MagicMock(finish_reason="STOP", content=MagicMock(parts=[MagicMock()]))]
        mock_client.models.generate_content.return_value = mock_response

        # 2. Run with URLs in text
        current_message = telegram_types.OrchestrationMessage()
        current_message.chat_id = chat_id
        current_message.text = "Check this out: https://text.com/info and download https://file.com/data.pdf"
        current_message.files = []

        orchestrationcontext.chat_with_knowledgebase(current_message)

        # 3. Verify
        # Check if fetch_url_content was called for both URLs
        self.assertEqual(mock_fetch.call_count, 2)
        
        # Check user_parts in the API call
        call_args = mock_client.models.generate_content.call_args
        contents = call_args.kwargs['contents']
        user_parts = contents[0].parts
        
        # Part 0 is the context block
        # Part 1 should be the text content from text.com (or vice versa depending on set order)
        text_contents = [p.text for p in user_parts if hasattr(p, 'text') and p.text]
        self.assertTrue(any("Mock text content" in t for t in text_contents))
        self.assertTrue(any("Content from https://text.com/info" in t for t in text_contents))

        # Check if file was added to message.files
        self.assertIn("/tmp/mock_file.pdf", current_message.files)
        
        print("URL extraction and fetching integration verified!")

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'config_dunp':
        # Remove custom arg before running unittest
        sys.argv.pop(1)
        unittest.main()
    else:
        print("Vui lòng chạy với tham số config_dunp")
