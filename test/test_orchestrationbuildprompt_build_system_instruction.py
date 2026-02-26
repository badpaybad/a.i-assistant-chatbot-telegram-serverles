import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from knowledgebase.orchestrationbuildprompt import build_system_instruction

def test_build_system_instruction():
    print("--- Testing build_system_instruction() ---")
    instruction = build_system_instruction()
    
    print("Generated Instruction:")
    print("-" * 50)
    print(instruction)
    print("-" * 50)
    
    # Assertions
    assert "# ROLE" in instruction
    assert "# SKILL INVENTORY" in instruction
    assert "# DECISION LOGIC" in instruction
    assert "skills/cli" in instruction
    assert "skills/common_question_answer" in instruction
    assert "skills/http" in instruction
    assert "skills/orchestrations" in instruction
    
    print("\nTest passed successfully!")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_orchestrationbuildprompt_build_system_instruction.py config_dunp")
        sys.exit(1)
    
    try:
        test_build_system_instruction()
    except AssertionError as e:
        print(f"Test failed: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)
