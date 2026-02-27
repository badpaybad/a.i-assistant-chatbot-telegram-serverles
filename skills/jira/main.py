import skills.jira.tool_call_jira as tool_call_jira

async def exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls) :
    await tool_call_jira.exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls)