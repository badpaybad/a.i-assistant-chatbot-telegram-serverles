import json
import re
import subprocess
from typing import Dict, Any, Tuple, Optional

def resolve_mac_address(client_ip: str) -> str:
    """Tra cứu MAC address từ IP trong mạng LAN thông qua ARP table"""
    if client_ip in ("127.0.0.1", "::1", "localhost", "0.0.0.0", "testclient"):
        return "LOCAL_HOST"
    
    # 1. Đọc trực tiếp từ /proc/net/arp (nhanh nhất trên Linux)
    try:
        with open("/proc/net/arp", "r") as f:
            lines = f.readlines()
            for line in lines[1:]:
                parts = line.split()
                if len(parts) >= 4 and parts[0] == client_ip:
                    mac = parts[3].lower()
                    if mac != "00:00:00:00:00:00":
                        return mac
    except Exception:
        pass

    # 2. Fallback: lệnh `ip neigh show <ip>`
    try:
        output = subprocess.check_output(
            ["ip", "neigh", "show", client_ip],
            text=True, timeout=1
        )
        # Output dạng: 192.168.1.37 dev wlp2s0 lladdr 02:00:00:aa:bb:01 REACHABLE
        match = re.search(r"lladdr\s+([0-9a-fA-F:]{17})", output)
        if match:
            return match.group(1).lower()
    except Exception:
        pass

    return "UNKNOWN_MAC"

def estimate_input_tokens(body: Dict[str, Any], provider: str) -> Tuple[str, int]:
    """
    Trích xuất model và ước tính số lượng input tokens từ request body.
    Trả về: (model_name, estimated_input_tokens)
    """
    model = "unknown-model"
    text_content = ""

    if provider == "google":
        # Google Gemini / CloudCode PA
        model = body.get("model", "") or body.get("modelName", "") or "gemini-default"
        # contents: [{"parts": [{"text": "..."}]}]
        contents = body.get("contents", [])
        if isinstance(contents, list):
            for c in contents:
                parts = c.get("parts", []) if isinstance(c, dict) else []
                for p in parts:
                    if isinstance(p, dict) and "text" in p:
                        text_content += p["text"] + " "
        elif "prompt" in body:
            text_content += str(body.get("prompt", ""))
        elif "requests" in body:
            text_content += str(body.get("requests", ""))

    elif provider == "anthropic":
        # Anthropic Claude
        model = body.get("model", "claude-default")
        system_prompt = body.get("system", "")
        if isinstance(system_prompt, str):
            text_content += system_prompt + " "
        elif isinstance(system_prompt, list):
            for item in system_prompt:
                if isinstance(item, dict) and "text" in item:
                    text_content += item["text"] + " "
        
        messages = body.get("messages", [])
        for msg in messages:
            content = msg.get("content", "")
            if isinstance(content, str):
                text_content += content + " "
            elif isinstance(content, list):
                for part in content:
                    if isinstance(part, dict) and "text" in part:
                        text_content += part["text"] + " "

    elif provider in ("openai", "copilot"):
        # OpenAI / GitHub Copilot
        model = body.get("model", "gpt-default")
        messages = body.get("messages", [])
        for msg in messages:
            content = msg.get("content", "")
            if isinstance(content, str):
                text_content += content + " "
            elif isinstance(content, list):
                for part in content:
                    if isinstance(part, dict) and "text" in part:
                        text_content += part["text"] + " "
        if "prompt" in body:
            text_content += str(body.get("prompt", ""))

    # Ước tính số token: trung bình 1 token ~ 4 ký tự
    est_tokens = max(1, len(text_content) // 4)
    return model, est_tokens

class StreamingTokenTracker:
    """
    Theo dõi và trích xuất số tokens input & output từ các chunk SSE trả về từ LLM Cloud
    """
    def __init__(self, provider: str, est_input_tokens: int = 0):
        self.provider = provider
        self.input_tokens = est_input_tokens
        self.output_tokens = 0
        self.accumulated_text = ""
        self.buffer = ""

    def process_chunk(self, chunk: bytes):
        try:
            text = chunk.decode("utf-8", errors="ignore")
        except Exception:
            return
        
        self.buffer += text
        lines = self.buffer.split("\n")
        self.buffer = lines[-1]  # Giữ lại phần chưa hoàn thành
        
        for line in lines[:-1]:
            line = line.strip()
            if not line:
                continue

            if self.provider == "anthropic":
                # Anthropic SSE Format:
                # event: message_start / data: {"type": "message_start", "message": {"usage": {"input_tokens": 123}}}
                # event: message_delta / data: {"type": "message_delta", "usage": {"output_tokens": 456}}
                if line.startswith("data: "):
                    data_str = line[6:]
                    try:
                        data = json.loads(data_str)
                        d_type = data.get("type", "")
                        if d_type == "message_start":
                            msg = data.get("message", {})
                            usage = msg.get("usage", {})
                            if "input_tokens" in usage:
                                self.input_tokens = usage["input_tokens"]
                        elif d_type == "message_delta":
                            usage = data.get("usage", {})
                            if "output_tokens" in usage:
                                self.output_tokens = usage["output_tokens"]
                        elif d_type == "content_block_delta":
                            delta = data.get("delta", {})
                            if "text" in delta:
                                self.accumulated_text += delta["text"]
                    except Exception:
                        pass

            elif self.provider == "google":
                # Google Gemini / CCPA format
                # data: {"candidates": [...], "usageMetadata": {"promptTokenCount": 10, "candidatesTokenCount": 20}}
                if line.startswith("data: "):
                    line = line[6:]
                if "usageMetadata" in line:
                    try:
                        data = json.loads(line)
                        usage = data.get("usageMetadata", {})
                        if "promptTokenCount" in usage:
                            self.input_tokens = usage["promptTokenCount"]
                        if "candidatesTokenCount" in usage:
                            self.output_tokens = usage["candidatesTokenCount"]
                    except Exception:
                        pass

            elif self.provider in ("openai", "copilot"):
                # OpenAI SSE format
                if line.startswith("data: "):
                    data_str = line[6:]
                    if data_str == "[DONE]":
                        continue
                    try:
                        data = json.loads(data_str)
                        if "usage" in data and data["usage"]:
                            usage = data["usage"]
                            self.input_tokens = usage.get("prompt_tokens", self.input_tokens)
                            self.output_tokens = usage.get("completion_tokens", self.output_tokens)
                        choices = data.get("choices", [])
                        for ch in choices:
                            delta = ch.get("delta", {})
                            if "content" in delta and delta["content"]:
                                self.accumulated_text += delta["content"]
                    except Exception:
                        pass

    def finalize(self) -> Tuple[int, int]:
        """Tính toán giá trị cuối cùng nếu cloud không trả về trường usage"""
        if self.output_tokens == 0 and len(self.accumulated_text) > 0:
            self.output_tokens = max(1, len(self.accumulated_text) // 4)
        return self.input_tokens, self.output_tokens
