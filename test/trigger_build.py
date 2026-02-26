import os
import sys
# Add current directory to path
sys.path.append(os.getcwd())
from knowledgebase.orchestrationbuildprompt import build_system_instruction

print("Starting build...")
instr = build_system_instruction()
print("Build complete.")
print(f"Instruction length: {len(instr)}")
