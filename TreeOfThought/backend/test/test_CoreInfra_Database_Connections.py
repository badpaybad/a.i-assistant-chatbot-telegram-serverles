import sys
import subprocess
import json
import os

def check_redis():
    print("Checking Redis connection...")
    try:
        # Using redis-cli if available, or just a simple ping
        result = subprocess.run(["docker", "exec", "tot-redis", "redis-cli", "-a", "Test123456", "ping"], capture_output=True, text=True)
        if "PONG" in result.stdout:
            print("[OK] Redis is up")
            return True
        else:
            print("[FAIL] Redis is down")
            return False
    except Exception as e:
        print(f"[ERROR] Redis check failed: {e}")
        return False

def check_postgres():
    print("Checking PostgreSQL connection...")
    try:
        result = subprocess.run(["docker", "exec", "tot-postgres", "pg_isready", "-U", "root"], capture_output=True, text=True)
        if "accepting connections" in result.stdout:
            print("[OK] PostgreSQL is up")
            return True
        else:
            print("[FAIL] PostgreSQL is down")
            return False
    except Exception as e:
        print(f"[ERROR] PostgreSQL check failed: {e}")
        return False

def check_mysql():
    print("Checking MySQL connection...")
    try:
        result = subprocess.run(["docker", "exec", "tot-mysql", "mysqladmin", "-u", "root", "-pTest123456", "ping"], capture_output=True, text=True)
        if "mysqld is alive" in result.stdout:
            print("[OK] MySQL is up")
            return True
        else:
            print("[FAIL] MySQL is down")
            return False
    except Exception as e:
        print(f"[ERROR] MySQL check failed: {e}")
        return False

def check_mongodb():
    print("Checking MongoDB connection...")
    try:
        result = subprocess.run(["docker", "exec", "tot-mongodb", "mongosh", "--eval", "db.adminCommand('ping')", "-u", "root", "-p", "Test123456"], capture_output=True, text=True)
        if '"ok": 1' in result.stdout or "ok: 1" in result.stdout:
            print("[OK] MongoDB is up")
            return True
        else:
            print("[FAIL] MongoDB is down")
            return False
    except Exception as e:
        print(f"[ERROR] MongoDB check failed: {e}")
        return False

def check_mssql():
    print("Checking SQL Server connection...")
    try:
        # Use sqlcmd to check connection
        result = subprocess.run(["docker", "exec", "tot-mssql", "/opt/mssql-tools18/bin/sqlcmd", "-S", "localhost", "-U", "sa", "-P", "Test123456", "-Q", "SELECT 1", "-C"], capture_output=True, text=True)
        if "1" in result.stdout:
            print("[OK] SQL Server is up")
            return True
        else:
            print(f"[FAIL] SQL Server is down. Output: {result.stdout} {result.stderr}")
            return False
    except Exception as e:
        print(f"[ERROR] SQL Server check failed: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_CoreInfra_Database_Connections.py config_dunp")
        sys.exit(1)
    
    print("Verifying Infrastructure Connections...\n")
    results = [
        check_redis(),
        check_postgres(),
        check_mysql(),
        check_mongodb(),
        check_mssql()
    ]
    
    if all(results):
        print("\n[SUCCESS] All databases are reachable.")
        sys.exit(0)
    else:
        print("\n[FAILURE] Some databases are not reachable.")
        sys.exit(1)
