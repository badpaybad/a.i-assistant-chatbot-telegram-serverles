import skills.cli.tool_call_cli as tool_call_cli

async def exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls) :
    await tool_call_cli.exec(skill, curret_message, list_current_msg, list_summary_chat, unique_urls)

    # if TELEGRAM_BOT_CHATID is not None and TELEGRAM_BOT_CHATID != "" and TELEGRAM_BOT_CHATID != 0:
    #     await bot_telegram.send_telegram_message(TELEGRAM_BOT_CHATID, webhook_base_url)