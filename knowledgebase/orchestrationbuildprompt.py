import os
import json
import hashlib

def get_file_hash(filepath):
    """Calculates the MD5 hash of a file's content."""
    if not os.path.exists(filepath):
        return None
    try:
        with open(filepath, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    except Exception:
        return None

def build_system_instruction():
    """
    Dynamically builds the system instruction based on the skills available in the 'skills' directory.
    Saves the result to knowledgebase/system_instruction.txt and loads it if no changes are detected.
    Rebuilds if:
    - Number of sub-folders in skills/ changes.
    - Content of any readme.md changes (detected via hash).
    - Modification time (mtime) of any readme.md changes.
    """
    # Determine the directory paths
    kb_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(kb_dir)
    skills_dir = os.path.join(base_dir, "skills")
    cache_path = os.path.join(kb_dir, "system_instruction.txt")
    metadata_path = os.path.join(kb_dir, ".system_instruction_metadata.json")

    print("metadata_path", metadata_path)
    print("cache_path", cache_path)
    print("skills_dir", skills_dir)
    
    # 1. Get current state of skills
    current_skills = []
    if os.path.exists(skills_dir):
        current_skills = sorted([d for d in os.listdir(skills_dir) 
                                if os.path.isdir(os.path.join(skills_dir, d)) and d != "__pycache__"])
    
    skill_states = {}
    for skill in current_skills:
        readme_path = os.path.join(skills_dir, skill, "readme.md")
        if not os.path.exists(readme_path):
            continue
        mtime = os.path.getmtime(readme_path) if os.path.exists(readme_path) else 0
        file_hash = get_file_hash(readme_path) if os.path.exists(readme_path) else None
        skill_states[skill] = {
            "mtime": mtime,
            "hash": file_hash
        }

    # 2. Check for changes to decide if we should rebuild
    should_rebuild = True
    if os.path.exists(cache_path) and os.path.exists(metadata_path):
        try:
            with open(metadata_path, "r", encoding="utf-8") as f:
                cached_metadata = json.load(f)
            
            # Check folder count
            if len(current_skills) == cached_metadata.get("folder_count"):
                # Check each skill's state
                cached_states = cached_metadata.get("skill_states", {})
                changes_detected = False
                
                # Check if all current skills were in cache and haven't changed
                for skill in current_skills:
                    current_state = skill_states.get(skill)
                    cached_state = cached_states.get(skill)
                    
                    if not cached_state:
                        changes_detected = True
                        break
                    
                    if (current_state["mtime"] != cached_state.get("mtime") or 
                        current_state["hash"] != cached_state.get("hash")):
                        changes_detected = True
                        break
                
                # Also check if any skills were removed (though folder_count handles this mostly)
                if not changes_detected and len(cached_states) == len(current_skills):
                    should_rebuild = False
        except Exception as e:
            print(f"Error checking cache metadata: {e}")

    if not should_rebuild:
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                return f.read().strip()
        except Exception as e:
            print(f"Error loading cached system instruction: {e}")

    # 3. Rebuild the system instruction
    skill_inventory = []
    for skill in current_skills:
        item_path = os.path.join(skills_dir, skill)
        readme_path = os.path.join(item_path, "readme.md")
        description = "Mô tả: Không có thông tin."
        
        if os.path.exists(readme_path):
            try:
                with open(readme_path, "r", encoding="utf-8") as f:
                    content = f.read().strip()
                    if content:
                        description = content
            except Exception as e:
                print(f"Error reading {readme_path}: {e}")
        
        skill_inventory.append(f"{len(skill_inventory) + 1}. [Folder: /skills/{skill}]\n   - Chức năng: {description}")

    inventory_text = "\n".join(skill_inventory)
    
    # Define Decision Logic
    decision_logic = """1. Phân tích [Summarized History] và [Recent Messages] để hiểu luồng trò chuyện.
2. Khi đã hiểu luồng trò chuyền kết hợp phân tích [Current Message] để xác định ý định (Intent).
3. Tìm folder skill phù hợp nhất dựa trên chức năng được liệt kê ở trên.
4. Mọi trường hợp khác hoặc hỏi đáp thông thường -> `skills/common_question_answer`.
5. Nếu có lệnh nào đó cần dùng bạn hãy cố gắng cài dùng apt install, nếu không cài được bạn trả thông báo lên chat cho người dùng biết cần phải cài lên máy tính.
"""

    system_instruction = f"""
# ROLE
Bạn là Hệ điều hành Kỹ năng (Skill OS). Nhiệm vụ **bắt buộc** của bạn là điều phối yêu cầu của người dùng vào đúng Sub-folder chức năng trong thư mục `/skills`.

# SKILL INVENTORY
{inventory_text}

# CONTEXT GUIDELINES
Bạn sẽ được cung cấp:
- [Summarized History]: Tóm tắt các cuộc trò chuyện cũ để hiểu ngữ cảnh dài hạn.
- [Recent Messages]: Các tin nhắn gần nhất trong phiên chat hiện tại.
- [Current Message]: Tin nhắn mới nhất của người dùng cần xử lý.

# DECISION LOGIC
{decision_logic}

# OUTPUT FORMAT (JSON ONLY)
Bạn PHẢI trả về JSON theo cấu trúc sau:
{{
  "target_folder": "skills/...",
  "reasoning": "Giải thích ngắn gọn tại sao chọn folder này",
  "intent": "Mô tả ý định cốt lõi của người dùng"
}}
"""
    system_instruction = system_instruction.strip()

    # 4. Save to cache and metadata
    try:
        with open(cache_path, "w", encoding="utf-8") as f:
            f.write(system_instruction)
        
        metadata = {
            "folder_count": len(current_skills),
            "skill_states": skill_states
        }
        with open(metadata_path, "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=2)
    except Exception as e:
        print(f"Error saving system instruction to cache: {e}")

    return system_instruction

if __name__ == "__main__":
    import sys
    # Rebuild regardless of cache if any argument is passed (like config_dunp)
    if len(sys.argv) > 1:
        # Force rebuild by deleting metadata if it exists
        kb_dir = os.path.dirname(os.path.abspath(__file__))
        metadata_path = os.path.join(kb_dir, ".system_instruction_metadata.json")
        if os.path.exists(metadata_path):
            os.remove(metadata_path)
            
    instruction = build_system_instruction()
    print("System Instruction rebuilt successfully.")
