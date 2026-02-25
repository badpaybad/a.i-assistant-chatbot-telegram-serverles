import sqlite3
import uuid
import time
import json
import os

class SQLiteDB:
    def __init__(self, table_name, db_path="data/knowledgebase.db"):
        self.table_name = table_name
        self.db_path = db_path
        
        # Ensure the directory exists
        db_dir = os.path.dirname(self.db_path)
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir)
            
        self._create_table()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _create_table(self):
        query = f"""
        CREATE TABLE IF NOT EXISTS {self.table_name} (
            id TEXT PRIMARY KEY,
            json TEXT,
            at INTEGER
        )
        """
        with self._get_connection() as conn:
            conn.execute(query)
            conn.commit()

    def insert(self, data_json):
        """
        Insert a new record. data_json can be a dict or a JSON string.
        """
        record_id = str(uuid.uuid4())
        at_epoch = int(time.time())
        
        if isinstance(data_json, (dict, list)):
            data_json = json.dumps(data_json, ensure_ascii=False)
            
        query = f"INSERT INTO {self.table_name} (id, json, at) VALUES (?, ?, ?)"
        with self._get_connection() as conn:
            conn.execute(query, (record_id, data_json, at_epoch))
            conn.commit()
        return record_id

    def select(self, record_id=None, keyword=None):
        """
        Select records. 
        - If record_id is provided, returns that specific record.
        - If keyword is provided, returns records where json content matches the keyword.
        - Otherwise returns all records in the table.
        """
        if record_id:
            query = f"SELECT * FROM {self.table_name} WHERE id = ?"
            with self._get_connection() as conn:
                cursor = conn.execute(query, (record_id,))
                row = cursor.fetchone()
                if row:
                    return {"id": row[0], "json": json.loads(row[1]), "at": row[2]}
                return None
        elif keyword:
            query = f"SELECT * FROM {self.table_name} WHERE json LIKE ? ORDER BY at DESC"
            with self._get_connection() as conn:
                cursor = conn.execute(query, (f"%{keyword}%",))
                rows = cursor.fetchall()
                return [{"id": row[0], "json": json.loads(row[1]), "at": row[2]} for row in rows]
        else:
            query = f"SELECT * FROM {self.table_name} ORDER BY at DESC"
            with self._get_connection() as conn:
                cursor = conn.execute(query)
                rows = cursor.fetchall()
                return [{"id": row[0], "json": json.loads(row[1]), "at": row[2]} for row in rows]

    def update(self, record_id, data_json):
        """
        Update the json content of a record by its GUID.
        """
        if isinstance(data_json, (dict, list)):
            data_json = json.dumps(data_json, ensure_ascii=False)
            
        query = f"UPDATE {self.table_name} SET json = ? WHERE id = ?"
        with self._get_connection() as conn:
            cursor = conn.execute(query, (data_json, record_id))
            conn.commit()
            return cursor.rowcount > 0

    def delete(self, record_id):
        """
        Delete a record by its GUID.
        """
        query = f"DELETE FROM {self.table_name} WHERE id = ?"
        with self._get_connection() as conn:
            cursor = conn.execute(query, (record_id,))
            conn.commit()
            return cursor.rowcount > 0

    def search_json(self, field_name, value):
        """
        Search for records where a specific field in the json column matches a value.
        field_name: The name of the field (e.g., 'topic') or JSON path (e.g., '$.author.name').
        value: The value to search for.
        """
        # Ensure field_name starts with $. if it's a simple key
        path = field_name if field_name.startswith("$") else f"$.{field_name}"
        
        query = f"SELECT * FROM {self.table_name} WHERE json_extract(json, ?) = ? ORDER BY at DESC"
        with self._get_connection() as conn:
            cursor = conn.execute(query, (path, value))
            rows = cursor.fetchall()
            return [{"id": row[0], "json": json.loads(row[1]), "at": row[2]} for row in rows]
