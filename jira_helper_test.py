import jira_helper
import json

print("-----------------------------")
webhooks = jira_helper.get_all_webhook()   
print("Existing webhooks structure:")
print(json.dumps(webhooks, indent=2))

print("-----------------------------")

# # jira_helper.create_or_update_webhook("chatbot-jira", "https://webhook.site/webhook-jira")
# jira_helper.delete_webhook("chatbot-jira")
# jira_helper.delete_webhook("New WebHook Listener")
