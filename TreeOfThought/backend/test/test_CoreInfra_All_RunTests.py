import subprocess
import sys

def run_dotnet_tests():
    print("Running Core.Infra .NET Tests...")
    try:
        # Command must include config_dunp as per rule, but for dotnet it's just a dummy arg here 
        # unless the dotnet test project itself reads it.
        projects = [
            "test/Core.Infra.Tests/Core.Infra.Tests.csproj",
            "test/Core.Infra.DataTest/Core.Infra.DataTest.csproj",
            "test/Core.Infra.FirebaseTest/Core.Infra.FirebaseTest.csproj"
        ]
        
        all_passed = True
        for project in projects:
            print(f"\nRunning tests for {project}...")
            result = subprocess.run(["dotnet", "test", project], capture_output=True, text=True)
            print(result.stdout)
            if result.returncode != 0:
                print(f"Tests FAILED for {project}")
                print(result.stderr)
                all_passed = False
        
        if all_passed:
            print("\nAll Core.Infra Test Projects PASSED")
        else:
            print("\nSome Test Projects FAILED")
            sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_CoreInfra_All_RunTests.py config_dunp")
        sys.exit(1)
    run_dotnet_tests()
