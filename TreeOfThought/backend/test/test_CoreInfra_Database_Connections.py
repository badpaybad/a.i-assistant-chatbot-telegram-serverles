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

def check_mariadb():
    print("Checking MariaDB connection...")
    try:
        result = subprocess.run(["docker", "exec", "tot-mariadb", "mysqladmin", "-u", "root", "-pTest123456", "ping"], capture_output=True, text=True)
        if "is alive" in result.stdout:
            print("[OK] MariaDB is up")
            return True
        else:
            print("[FAIL] MariaDB is down")
            return False
    except Exception as e:
        print(f"[ERROR] MariaDB check failed: {e}")
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

def check_oracle():
    print("Checking Oracle Database connection...")
    try:
        # We can run sqlplus to check connection
        result = subprocess.run(["docker", "exec", "tot-oracle", "sh", "-c", 'echo "SELECT 1 FROM DUAL;" | sqlplus -L -S system/Test123456@localhost:1521/FREEPDB1'], capture_output=True, text=True)
        if "1" in result.stdout:
            print("[OK] Oracle Database is up")
            return True
        else:
            print(f"[FAIL] Oracle Database is down. Output: {result.stdout} {result.stderr}")
            return False
    except Exception as e:
        print(f"[ERROR] Oracle Database check failed: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_CoreInfra_Database_Connections.py config_dunp")
        sys.exit(1)
    
    print("Verifying Infrastructure Connections...\n")
    results = [
        check_redis(),
        check_postgres(),
        check_mariadb(),
        check_mongodb(),
        check_mssql(),
        check_oracle()
    ]
    
    if all(results):
        print("\n[SUCCESS] All databases are reachable.")
        sys.exit(0)
    else:
        print("\n[FAILURE] Some databases are not reachable.")
        sys.exit(1)
