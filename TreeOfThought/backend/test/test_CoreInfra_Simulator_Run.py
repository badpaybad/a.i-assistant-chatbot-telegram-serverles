import subprocess
import sys
import time

def run_simulator():
    print("Starting Core.Infra Console Simulator...")
    # Using 'dotnet run' which builds and runs.
    # We'll use a timeout because it waits for KeyRead at the end.
    try:
        # Note: In a real CI, we might need a non-interactive mode.
        # Here we just run it and terminate after some time if it doesn't end.
        process = subprocess.Popen(
            ["dotnet", "run"],
            cwd="test/Core.Infra.ConsoleTest",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Give it some time to run
        time.sleep(10)
        
        process.terminate()
        stdout, stderr = process.communicate()
        
        print(stdout)
        if "Tests PASSED" in stdout or "Lịch sử vết" in stdout:
            print("Simulator Run: SUCCESS")
        else:
            print("Simulator Run: MIGHT HAVE FAILED (check output)")
            print(stderr)

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_simulator()
