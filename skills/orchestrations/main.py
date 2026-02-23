import re
import json
import os

class LocalOrchestrator:
    def __init__(self, config_path=None):
        if config_path is None:
            config_path = os.path.join(os.path.dirname(__file__), "orchestration_config.json")
        
        self.config_path = config_path
        self.routes = self._load_config()

    def _load_config(self):
        if os.path.exists(self.config_path):
            with open(self.config_path, "r", encoding="utf-8") as f:
                return json.load(f)
        
        # Default fallback config if file doesn't exist
        return {
            "routes": [
                {
                    "intent": "browser_access",
                    "patterns": [r"https?://\S+"],
                    "target_folder": "fetch_url",
                    "tools": ["fetch_url_content_tool"],
                    "reasoning": "Contains a URL, requiring content fetching."
                }
            ],
            "default": {
                "target_folder": "general_search",
                "tools": ["google_search_tool"],
                "reasoning": "Standard user query without specific triggers."
            }
        }

    def route(self, user_input):
        for route in self.routes.get("routes", []):
            for pattern in route.get("patterns", []):
                if re.search(pattern, user_input, re.IGNORECASE):
                    return {
                        "target_folder": route["target_folder"],
                        "tools": route["tools"],
                        "reasoning": route["reasoning"]
                    }
        
        default = self.routes.get("default", {})
        return {
            "target_folder": default.get("target_folder", "general"),
            "tools": default.get("tools", []),
            "reasoning": default.get("reasoning", "Default route selected.")
        }

# Singleton instance for easy access
orchestrator = LocalOrchestrator()
