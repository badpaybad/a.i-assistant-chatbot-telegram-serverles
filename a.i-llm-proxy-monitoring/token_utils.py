import codecs
import json
import re
import subprocess
from typing import Dict, Any, Tuple

# Model marker cho các request "control-plane" (loadCodeAssist, listExperiments, metrics...)
# không sinh nội dung -> không tiêu thụ token, không áp dụng kiểm tra model/quota.
NON_INFERENCE_MODEL = "-"


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


# ==================== ƯỚC TÍNH INPUT TOKENS (TRƯỚC KHI GỬI) ====================

# Bỏ qua dữ liệu nhị phân / chữ ký không phải văn bản prompt
_SKIP_KEYS = {"data", "signature", "thoughtSignature", "thought_signature"}


def _count_chars(obj: Any) -> int:
    """Đếm tổng số ký tự của mọi chuỗi văn bản trong cấu trúc JSON (bỏ base64/chữ ký)."""
    if obj is None:
        return 0
    if isinstance(obj, str):
        return 0 if obj.startswith("data:") else len(obj)
    if isinstance(obj, list):
        return sum(_count_chars(x) for x in obj)
    if isinstance(obj, dict):
        return sum(_count_chars(v) for k, v in obj.items() if k not in _SKIP_KEYS)
    return 0


def _json_len(obj: Any) -> int:
    """Định nghĩa tools/schema được tính theo độ dài JSON (key cũng tốn token)."""
    if not obj:
        return 0
    try:
        return len(json.dumps(obj, ensure_ascii=False))
    except Exception:
        return 0


def _chars_to_tokens(chars: int) -> int:
    # Trung bình ~4 ký tự / token (chỉ là ước tính, giá trị thật lấy từ response)
    return (chars + 3) // 4 if chars > 0 else 0


def estimate_input_tokens(body: Dict[str, Any], provider: str, path: str = "") -> Tuple[str, int]:
    """
    Trích xuất model và ước tính input tokens từ request body.
    Trả về (model_name, estimated_input_tokens).
    Request không sinh nội dung (không có model / contents / messages) -> (NON_INFERENCE_MODEL, 0).
    """
    if not isinstance(body, dict):
        body = {}
    path_model = ""
    m = re.search(r"models/([^/:?]+)", path or "")
    if m:
        path_model = m.group(1)
    if "count_tokens" in (path or "") or "countTokens" in (path or ""):
        return NON_INFERENCE_MODEL, 0

    chars = 0
    model = ""

    if provider == "google":
        # Gemini API: {contents, systemInstruction, tools}
        # CloudCode PA (Antigravity): {model, project, request: {contents, systemInstruction, tools}}
        req = body.get("request") if isinstance(body.get("request"), dict) else body
        contents = req.get("contents")
        model = body.get("model") or req.get("model") or body.get("modelName") or path_model
        if not contents and not model and "prompt" not in body:
            return NON_INFERENCE_MODEL, 0
        model = model or "gemini-default"
        chars += _count_chars(contents)
        chars += _count_chars(req.get("systemInstruction") or req.get("system_instruction"))
        chars += _json_len(req.get("tools"))
        chars += _count_chars(body.get("prompt"))

    elif provider == "anthropic":
        messages = body.get("messages")
        model = body.get("model") or ""
        if not messages and not model:
            return NON_INFERENCE_MODEL, 0
        model = model or "claude-default"
        chars += _count_chars(body.get("system"))
        chars += _count_chars(messages)
        chars += _json_len(body.get("tools"))

    else:  # openai / copilot (Chat Completions, Responses API, Completions, Embeddings)
        model = body.get("model") or ""
        payload_keys = ("messages", "input", "prompt", "instructions")
        if not model and not any(body.get(k) for k in payload_keys):
            return NON_INFERENCE_MODEL, 0
        model = model or "gpt-default"
        for k in payload_keys:
            chars += _count_chars(body.get(k))
        chars += _json_len(body.get("tools") or body.get("functions"))

    return model, _chars_to_tokens(chars)


# ==================== ĐẾM TOKEN THẬT TỪ RESPONSE ====================

# Khóa usage do chính provider trả về (số chính xác để tính tiền)
_USAGE_KEYS = {
    "google": ["promptTokenCount", "candidatesTokenCount", "thoughtsTokenCount",
               "toolUsePromptTokenCount", "cachedContentTokenCount"],
    "anthropic": ["input_tokens", "output_tokens",
                  "cache_creation_input_tokens", "cache_read_input_tokens"],
    "openai": ["prompt_tokens", "completion_tokens", "input_tokens", "output_tokens"],
}
_USAGE_RE = {
    p: re.compile(r'"(%s)"\s*:\s*(\d+)' % "|".join(keys)) for p, keys in _USAGE_KEYS.items()
}
# Văn bản model sinh ra (fallback khi provider không trả usage)
_TEXT_RE = re.compile(r'"(?:text|content)"\s*:\s*"((?:[^"\\]|\\.)*)"')


class StreamingTokenTracker:
    """
    Đọc usage thật từ response của LLM Cloud, chịu được mọi định dạng:
    SSE (`data: {...}`), JSON array stream (Gemini/CloudCode), JSON đơn (non-stream),
    và wrapper `{"response": {...}}` của CloudCode PA.
    Xử lý theo từng dòng (chuỗi JSON không chứa newline thô) nên không lỗi khi chunk bị cắt.
    """
    def __init__(self, provider: str, est_input_tokens: int = 0):
        self.provider = "openai" if provider in ("openai", "copilot") else provider
        self.est_input_tokens = est_input_tokens
        self.input_tokens = est_input_tokens
        self.output_tokens = 0
        self.cached_tokens = 0
        self.usage: Dict[str, int] = {}
        self.text_chars = 0
        self.buffer = ""
        self._decoder = codecs.getincrementaldecoder("utf-8")(errors="ignore")

    def _process_line(self, line: str):
        if not line:
            return
        usage_re = _USAGE_RE.get(self.provider)
        if usage_re:
            for m in usage_re.finditer(line):
                # Giá trị usage là cộng dồn -> lấy giá trị xuất hiện sau cùng
                self.usage[m.group(1)] = int(m.group(2))
        for m in _TEXT_RE.finditer(line):
            self.text_chars += len(m.group(1))

    def process_chunk(self, chunk: bytes):
        try:
            text = self._decoder.decode(chunk)
        except Exception:
            return
        self.buffer += text
        lines = self.buffer.split("\n")
        self.buffer = lines[-1]  # Giữ lại phần dòng chưa hoàn thành
        for line in lines[:-1]:
            self._process_line(line)

    def get_current_counts(self) -> Tuple[int, int]:
        """Lấy số lượng tokens hiện tại đang tích lũy."""
        u = self.usage
        if self.provider == "google":
            out_tok = u.get("candidatesTokenCount", 0) + u.get("thoughtsTokenCount", 0)
        elif self.provider == "anthropic":
            out_tok = u.get("output_tokens", 0)
        elif self.provider == "openai":
            out_tok = u.get("completion_tokens", u.get("output_tokens", 0))
        else:
            out_tok = _chars_to_tokens(self.text_chars)
        return self.input_tokens, out_tok

    def finalize(self) -> Tuple[int, int]:
        """Trả về (input_tokens, output_tokens). Ưu tiên usage thật, fallback ước tính."""
        # Xử lý nốt phần còn lại (response non-stream 1 dòng không có newline)
        self.buffer += self._decoder.decode(b"", final=True)
        if self.buffer:
            self._process_line(self.buffer)
            self.buffer = ""

        u = self.usage
        if self.provider == "google" and ("promptTokenCount" in u or "candidatesTokenCount" in u):
            # cachedContentTokenCount đã nằm trong promptTokenCount
            self.input_tokens = u.get("promptTokenCount", 0) + u.get("toolUsePromptTokenCount", 0)
            self.output_tokens = u.get("candidatesTokenCount", 0) + u.get("thoughtsTokenCount", 0)
            self.cached_tokens = u.get("cachedContentTokenCount", 0)
        elif self.provider == "anthropic" and ("input_tokens" in u or "output_tokens" in u):
            # input_tokens của Anthropic KHÔNG gồm phần cache -> cộng thêm
            self.cached_tokens = u.get("cache_read_input_tokens", 0)
            self.input_tokens = (u.get("input_tokens", 0)
                                 + u.get("cache_creation_input_tokens", 0)
                                 + u.get("cache_read_input_tokens", 0))
            self.output_tokens = u.get("output_tokens", 0)
        elif self.provider == "openai" and any(k in u for k in _USAGE_KEYS["openai"]):
            self.input_tokens = u.get("prompt_tokens", u.get("input_tokens", self.est_input_tokens))
            self.output_tokens = u.get("completion_tokens", u.get("output_tokens", 0))
        else:
            # Provider không trả usage -> ước tính từ văn bản sinh ra
            self.input_tokens = self.est_input_tokens
            self.output_tokens = _chars_to_tokens(self.text_chars)
        return self.input_tokens, self.output_tokens
