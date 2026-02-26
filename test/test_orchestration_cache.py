import os
import time
import sys
from knowledgebase.orchestrationbuildprompt import build_system_instruction

def test_caching():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    kb_dir = os.path.join(base_dir, "knowledgebase")
    cache_path = os.path.join(kb_dir, "system_instruction.txt")
    skills_dir = os.path.join(base_dir, "skills")
    
    # 0. Cleanup
    if os.path.exists(cache_path):
        os.remove(cache_path)
    
    print("--- Test 1: Initial creation ---")
    instr1 = build_system_instruction()
    assert os.path.exists(cache_path), "Cache file should be created"
    mtime1 = os.path.getmtime(cache_path)
    print("Created cache file.")
    
    time.sleep(1.1) # Wait for mtime resolution
    
    print("--- Test 2: Load from cache ---")
    instr2 = build_system_instruction()
    assert instr1 == instr2, "Content should match"
    mtime2 = os.path.getmtime(cache_path)
    assert mtime1 == mtime2, "Cache file should not have been updated"
    print("Loaded from cache successfully.")

    print("--- Test 3: Trigger rebuild via README change ---")
    # Find a skill with readme
    skill_with_readme = None
    for item in os.listdir(skills_dir):
        if os.path.isdir(os.path.join(skills_dir, item)):
            rpath = os.path.join(skills_dir, item, "readme.md")
            if os.path.exists(rpath):
                skill_with_readme = rpath
                break
    
    if skill_with_readme:
        print(f"Modifying mtime of {skill_with_readme}")
        os.utime(skill_with_readme, (time.time(), time.time()))
        instr3 = build_system_instruction()
        mtime3 = os.path.getmtime(cache_path)
        assert mtime3 > mtime1, "Cache file should have been updated after readme change"
        print("Rebuild triggered by README successfully.")
    else:
        print("No readme found to test Test 3.")

    print("--- Test 4: Trigger rebuild via folder change ---")
    dummy_skill = os.path.join(skills_dir, "dummy_test_skill")
    if not os.path.exists(dummy_skill):
        os.makedirs(dummy_skill)
    
    try:
        # Need to wait a bit because folders sometimes have same mtime if created fast
        time.sleep(1.1)
        instr4 = build_system_instruction()
        mtime4 = os.path.getmtime(cache_path)
        assert mtime4 > mtime3 if skill_with_readme else mtime4 > mtime1, "Cache file should have been updated after folder addition"
        assert "dummy_test_skill" in instr4, "New skill should be in inventory"
        print("Rebuild triggered by folder addition successfully.")
    finally:
        os.rmdir(dummy_skill)
        # Rebuild again to clean up cache
        build_system_instruction()

    print("\nAll caching tests passed!")

if __name__ == "__main__":
    # Ensure we are in the right directory to import
    sys.path.append(os.getcwd())
    test_caching()
