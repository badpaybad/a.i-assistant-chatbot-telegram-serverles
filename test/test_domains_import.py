import sys
import os

# Add parent directory to sys.path to import domains
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_import():
    try:
        import domains
        print(f"domains module imported: {domains}")
        if hasattr(domains, 'ngoc_ddd'):
            print("domains.ngoc_ddd is accessible!")
            return True
        else:
            print("domains.ngoc_ddd is STILL NOT accessible.")
            return False
    except Exception as e:
        print(f"Error during import test: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_domains_import.py config_dunp")
        sys.exit(1)
        
    if test_import():
        print("SUCCESS: Fix verified.")
        sys.exit(0)
    else:
        print("FAILURE: Fix NOT verified.")
        sys.exit(1)
