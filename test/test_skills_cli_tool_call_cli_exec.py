import sys
import os
import asyncio
from unittest.mock import MagicMock, patch, AsyncMock

# Add root to sys.path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(root_dir)

import telegram_types

async def test_skills_cli_tool_call_cli_exec():
    print("Starting CLI skill verification test...")
    
    # 1. Setup Mock Data
    skill = {"target_folder": "skills/cli", "reasoning": "Test", "intent": "list files"}
    
    curret_message = telegram_types.OrchestrationMessage()
    curret_message.text = "liệt kê các file trong thư mục hiện tại"
    curret_message.chat_id = "123456789"
    
    list_current_msg = [curret_message]
    list_summary_chat = []
    unique_urls = []
    
    # 2. Mock external dependencies
    # Note: tool_call_cli initializes clientGemini at module level.
    # We will patch google.genai.Client to return a mock.
    with patch('google.genai.Client') as mock_genai_client, \
         patch('bot_telegram.send_telegram_message', new_callable=AsyncMock) as mock_send:
        
        # Setup mock response from Gemini
        mock_response = MagicMock()
        mock_response.text = "Dưới đây là lệnh để liệt kê các file:\n```bash\nls -la\n```"
        
        mock_client_instance = mock_genai_client.return_value
        mock_client_instance.models.generate_content.return_value = mock_response
        
        # Import tool_call_cli AFTER patching Client
        import skills.cli.tool_call_cli as tool_call_cli
        
        # We also need to ensure tool_call_cli.clientGemini is the mock if it was already imported
        tool_call_cli.clientGemini = mock_client_instance
        
        # 3. Run the skill
        print("Executing skill...")
        await tool_call_cli.exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls)
        
        # 4. Verify results
        print("\nChecking verification points:")
        
        # Check if Gemini was called
        if mock_client_instance.models.generate_content.called:
             print("- Gemini API call: OK")
        else:
             print("- Gemini API call: FAILED")
        
        # Check if telegram message was sent
        if mock_send.called:
            call_args = mock_send.call_args[0]
            print(f"- Telegram message sent: OK")
            print(f"- Target Chat ID: {call_args[0]}")
            
            # The message should contain the output of 'ls -la' because execute_bash_shell runs it.
            if "**Output:**" in call_args[1]:
                 print("- Command output (ls -la) detected: OK")
                 # Check if some expected file names are in the output (e.g., program.py)
                 if "program.py" in call_args[1]:
                      print("- Correct command execution verified: OK")
            else:
                 print("- Command output detected: FAILED")
        else:
            print("- Telegram message sent: FAILED")

    print("\nVerification test completed!")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'config_dunp':
        asyncio.run(test_skills_cli_tool_call_cli_exec())
    else:
        print("Error: Vui lòng chạy với tham số config_dunp")
        sys.exit(1)
