import os
import json
import time
import sys
import hashlib
from knowledgebase.orchestrationbuildprompt import build_system_instruction

def get_file_hash(filepath):
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

def test_robust_caching():
    kb_dir = os.path.join(os.getcwd(), "knowledgebase")
    cache_path = os.path.join(kb_dir, "system_instruction.txt")
    metadata_path = os.path.join(kb_dir, ".system_instruction_metadata.json")
    skills_dir = os.path.join(os.getcwd(), "skills")

    print("--- 1. Initial Build ---")
    if os.path.exists(cache_path): os.remove(cache_path)
    if os.path.exists(metadata_path): os.remove(metadata_path)
    
    instr1 = build_system_instruction()
    assert os.path.exists(cache_path), "Cache file should exist"
    assert os.path.exists(metadata_path), "Metadata file should exist"
    mtime1 = os.path.getmtime(cache_path)
    print("Initial build successful.")

    time.sleep(0.1) # Small delay

    print("--- 2. Load from Cache (No changes) ---")
    instr2 = build_system_instruction()
    assert instr1 == instr2, "Content should be identical"
    assert os.path.getmtime(cache_path) == mtime1, "Cache file should NOT have been updated"
    print("Load from cache successful.")

    print("--- 3. Trigger Rebuild (New Folder) ---")
    dummy_skill = os.path.join(skills_dir, "test_dummy_skill")
    os.makedirs(dummy_skill, exist_ok=True)
    try:
        instr3 = build_system_instruction()
        mtime3 = os.path.getmtime(cache_path)
        assert mtime3 > mtime1, "Cache file should have been updated after folder addition"
        assert "test_dummy_skill" in instr3, "New skill should be in instruction"
        print("Rebuild after folder addition successful.")
    finally:
        os.rmdir(dummy_skill)

    print("--- 4. Trigger Rebuild (README Content Change) ---")
    # Find a skill to modify
    target_skill = None
    for d in os.listdir(skills_dir):
        if os.path.isdir(os.path.join(skills_dir, d)) and d != "__pycache__":
            target_skill = d
            break
    
    if target_skill:
        readme_path = os.path.join(skills_dir, target_skill, "readme.md")
        original_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, "r") as f: original_content = f.read()
        
        # Build to stabilize
        build_system_instruction()
        mtime_base = os.path.getmtime(cache_path)
        time.sleep(1.1)
        
        with open(readme_path, "w") as f: f.write(original_content + "\n# Test Change")
        try:
            instr4 = build_system_instruction()
            mtime4 = os.path.getmtime(cache_path)
            assert mtime4 > mtime_base, "Cache file should have been updated after readme change"
            print("Rebuild after README change successful.")
        finally:
            with open(readme_path, "w") as f: f.write(original_content)
    
    print("\nAll robust caching tests passed!")

if __name__ == "__main__":
    sys.path.append(os.getcwd())
    test_robust_caching()
