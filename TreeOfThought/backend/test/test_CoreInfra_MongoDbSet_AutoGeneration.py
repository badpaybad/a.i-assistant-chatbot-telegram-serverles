import sys
import subprocess
import os

def run_dotnet_test():
    print("Running .NET tests for MongoDbSet...")
    try:
        # Navigate to the test project directory or run from backend root
        # We'll run from the backend root and filter by the new test class
        cmd = ["dotnet", "test", "test/Core.Infra.DataTest/Core.Infra.DataTest.csproj", "--filter", "FullyQualifiedName~MongoDbSetTests"]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        print(result.stdout)
        if result.stderr:
            print("Errors:")
            print(result.stderr)
            
        if result.returncode == 0:
            print("[OK] MongoDbSet tests passed")
            return True
        else:
            print("[FAIL] MongoDbSet tests failed")
            return False
    except Exception as e:
        print(f"[ERROR] Test execution failed: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_CoreInfra_MongoDbSet_AutoGeneration.py config_dunp")
        sys.exit(1)
    
    # Ensure we are in the backend directory
    # The script is usually run from TreeOfThought/backend
    
    print("Verifying MongoDbSet Infrastructure...\n")
    if run_dotnet_test():
        print("\n[SUCCESS] MongoDB enhancement verified.")
        sys.exit(0)
    else:
        print("\n[FAILURE] MongoDB enhancement verification failed.")
        sys.exit(1)
