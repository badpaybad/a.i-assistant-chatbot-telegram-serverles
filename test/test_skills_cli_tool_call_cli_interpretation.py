import sys
import os
import asyncio
from unittest.mock import MagicMock, patch, AsyncMock

# Add root to sys.path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(root_dir)

# import telegram_types # No longer needed globally

async def test_skills_cli_tool_call_cli_interpretation():
    print("Starting CLI skill interpretation verification test...")
    
    # 1. Setup Mock Data
    skill = {"target_folder": "skills/cli", "reasoning": "Test", "intent": "list files"}
    
    # Simple mock for curret_message instead of relying on telegram_types
    curret_message = MagicMock()
    curret_message.text = "liệt kê các file"
    curret_message.chat_id = "123456789"
    curret_message.files = []
    
    list_current_msg = [curret_message]
    list_summary_chat = []
    unique_urls = []
    
    # 2. Mock external dependencies
    with patch('google.genai.Client') as mock_genai_client, \
         patch('sys.modules', new=dict(sys.modules)) as mock_modules:
        
        # Mocking modules that tool_call_cli will import inside exec
        mock_bot_telegram = AsyncMock()
        mock_modules['bot_telegram'] = mock_bot_telegram
        mock_modules['knowledgebase.orchestrationcontext'] = MagicMock()
        
        mock_send = mock_bot_telegram.send_telegram_message
        
        mock_client_instance = mock_genai_client.return_value
        
        # Setup mock responses for two Gemini calls
        # 1st call: Generate Bash command
        mock_response_1 = MagicMock()
        mock_response_1.text = "```bash\nls\n```"
        
        # 2nd call: Interpret result
        mock_response_2 = MagicMock()
        mock_response_2.text = "Dưới đây là danh sách các tệp tin trong thư mục của bạn. Mọi thứ trông có vẻ ổn."
        
        # side_effect to return different responses for sequential calls
        mock_client_instance.models.generate_content.side_effect = [mock_response_1, mock_response_2]
        
        # Import tool_call_cli AFTER patching Client
        import skills.cli.tool_call_cli as tool_call_cli
        tool_call_cli.clientGemini = mock_client_instance
        
        # 3. Run the skill
        print("Executing skill...")
        await tool_call_cli.exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls)
        
        # 4. Verify results
        print("\nChecking verification points:")
        
        # Check if Gemini was called twice
        call_count = mock_client_instance.models.generate_content.call_count
        print(f"- Gemini API calls: {call_count} (Expected: 2)")
        if call_count >= 2:
             print("- Gemini interpretation call: OK")
        else:
             print("- Gemini interpretation call: FAILED")
        
        # Check if telegram message contains interpreted result
        if mock_send.called:
            call_args = mock_send.call_args[0]
            message_text = call_args[1]
            print("- Telegram message sent: OK")
            
            if "### [Giải thích kết quả]" in message_text:
                 print("- Interpretation header detected: OK")
            else:
                 print("- Interpretation header detected: FAILED")
                 
            if "Dưới đây là danh sách các tệp tin" in message_text:
                 print("- Interpreted content detected: OK")
            else:
                 print("- Interpreted content detected: FAILED")
        else:
            print("- Telegram message sent: FAILED")

    print("\nVerification test completed!")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'config_dunp':
        asyncio.run(test_skills_cli_tool_call_cli_interpretation())
    else:
        print("Error: Vui lòng chạy với tham số config_dunp")
        sys.exit(1)
