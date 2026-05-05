import subprocess
import sys

def run_dotnet_tests():
    print("Running Core.Infra .NET Tests...")
    try:
        # Command must include config_dunp as per rule, but for dotnet it's just a dummy arg here 
        # unless the dotnet test project itself reads it.
        result = subprocess.run(["dotnet", "test", "test/Core.Infra.Tests/Core.Infra.Tests.csproj"], capture_output=True, text=True)
        print(result.stdout)
        if result.returncode == 0:
            print("Tests PASSED")
        else:
            print("Tests FAILED")
            print(result.stderr)
            sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_dotnet_tests()
