import sys
import os

# Add root directory to sys.path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_import():
    print("Testing import of domain_handlers.ngoc_ddd in program context...")
    try:
        import program
        # Check if domain_handlers.ngoc_ddd is accessible via program.domain_handlers.ngoc_ddd
        # or directly if it's imported in program.py
        if hasattr(program.domain_handlers, 'ngoc_ddd'):
            print("SUCCESS: domain_handlers.ngoc_ddd is found in program.py")
            # Verify the handle function exists
            if hasattr(program.domain_handlers.ngoc_ddd, 'handle'):
                print("SUCCESS: domain_handlers.ngoc_ddd.handle is accessible")
            else:
                print("FAILURE: domain_handlers.ngoc_ddd.handle is NOT accessible")
        else:
            print("FAILURE: domain_handlers.ngoc_ddd is NOT found in program.py")
    except Exception as e:
        print(f"ERROR: An error occurred during testing: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "config_dunp":
        test_import()
    else:
        print("Usage: python test/test_program_import_ngoc_ddd.py config_dunp")
