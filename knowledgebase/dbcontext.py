
from knowledgebase.dbconnect import SQLiteDB

import knowledgebase.dbconnect as dbconnect
sqllite_all_message=dbconnect.SQLiteDB("all_message")

sqllite_all_message_file=dbconnect.SQLiteDB("all_message_file")


db_summary_chat = SQLiteDB(table_name="summary_chat")

db_jira = SQLiteDB(table_name="jira")