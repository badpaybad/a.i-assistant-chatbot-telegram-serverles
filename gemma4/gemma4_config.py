"""
Gemma4 Configuration — Central config for GGUF vs HF engine selection.

Environment variable overrides:
    GEMMA_USE_GGUF=True|False   — Toggle GGUF engine (default: True)
    GEMMA_GGUF_MODEL_PATH       — Override path to the GGUF file
    GEMMA_GGUF_N_CTX            — Override context window size (default: 4096)
    GEMMA_HF_MODEL_ID           — Override HF model ID for fallback
"""
import os
from pathlib import Path

# -------------------------------------------------
# Base directories
# -------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

# -------------------------------------------------
# Engine selection: GGUF (default) vs HuggingFace
# -------------------------------------------------
# Default: True (use GGUF for fast, memory-efficient inference)
# Override via: export GEMMA_USE_GGUF=False
USE_GGUF: bool = os.getenv("GEMMA_USE_GGUF", "True").lower() in ("true", "1", "yes")

# -------------------------------------------------
# GGUF Configuration (llama-cpp-python)
# -------------------------------------------------
# Default GGUF model: Q4_K_M (4-bit Medium quantization)
# VRAM usage: ~4.2-4.8 GiB including KV cache on RTX 3060
GGUF_MODEL_DIR = MODEL_DIR / "gemma-4-E4B-it-GGUF"
GGUF_MODEL_FILENAME = "gemma-4-E4B-it-Q4_K_M.gguf"
GGUF_MMPROJ_FILENAME = "mmproj-F16.gguf"

GGUF_MODEL_PATH: Path = Path(
    os.getenv("GEMMA_GGUF_MODEL_PATH", str(GGUF_MODEL_DIR / GGUF_MODEL_FILENAME))
)
GGUF_MMPROJ_PATH: Path = GGUF_MODEL_DIR / GGUF_MMPROJ_FILENAME

# Context window — set to 8192 as requested
GGUF_N_CTX: int = int(os.getenv("GEMMA_GGUF_N_CTX", "8192"))

# Number of GPU layers: -1 = all layers on GPU (100% GPU)
GGUF_N_GPU_LAYERS: int = int(os.getenv("GEMMA_GGUF_N_GPU_LAYERS", "-1"))

# Batch size — 512 reduces scratch buffer size to fit within 8GB VRAM
GGUF_N_BATCH: int = int(os.getenv("GEMMA_GGUF_N_BATCH", "512"))

# Main GPU index — 0 for GPU 0
GGUF_MAIN_GPU: int = int(os.getenv("GEMMA_GGUF_MAIN_GPU", "0"))

# Memory mapping — set to False to avoid VRAM/RAM allocation bottlenecks during load
GGUF_USE_MMAP: bool = os.getenv("GEMMA_GGUF_USE_MMAP", "False").lower() in ("true", "1", "yes")

# HuggingFace repo for downloading GGUF files
GGUF_HF_REPO: str = "unsloth/gemma-4-E4B-it-GGUF"

# -------------------------------------------------
# HuggingFace Fallback Configuration
# -------------------------------------------------
HF_MODEL_ID: str = os.getenv("GEMMA_HF_MODEL_ID", "unsloth/gemma-4-e4b-it-unsloth-bnb-4bit")

# -------------------------------------------------
# Default generation parameters
# -------------------------------------------------
DEFAULT_TEMPERATURE: float = 0.7
DEFAULT_TOP_P: float = 0.9
DEFAULT_TOP_K: int = 40
DEFAULT_MAX_TOKENS: int = 1024

# -------------------------------------------------
# Thinking / Chain-of-Thought (CoT) Configuration
# -------------------------------------------------
# Gemma 4 supports a "thinking" mode where the model reasons step-by-step
# internally before producing the final answer.
#
# Activation mechanism (GGUF / llama-cpp-python):
#   Since llama-cpp-python does NOT expose chat_template_kwargs in the Python
#   API, thinking is triggered via the "assistant prefill" technique:
#   a partial assistant message starting with the Gemma 4 thinking channel
#   token (<|channel>thought\n) is appended to the messages list, which
#   forces the model to enter its chain-of-thought reasoning loop.
#
# Activation mechanism (HuggingFace backend):
#   processor.apply_chat_template(..., enable_thinking=True) injects the
#   correct thinking tokens automatically via the model's Jinja2 template.
#
# Recommended settings for RTX 3060 8GB:
#   - Increase max_tokens when thinking is enabled (e.g., 2048) to give the
#     model room for both its reasoning trace and the final answer.
#   - Temperature: 1.0, Top_K: 64, Top_P: 0.95 (Google-recommended for CoT)
#
# Override via: export GEMMA_ENABLE_THINKING=True
ENABLE_THINKING: bool = os.getenv("GEMMA_ENABLE_THINKING", "False").lower() in ("true", "1", "yes")

# If True (default), the <|channel>thought...<channel|> block is stripped
# from the returned string; only the final answer is returned.
# Set to False to get the full reasoning trace (useful for debugging).
# Override via: export GEMMA_STRIP_THINKING_OUTPUT=False
STRIP_THINKING_OUTPUT: bool = os.getenv("GEMMA_STRIP_THINKING_OUTPUT", "True").lower() in ("true", "1", "yes")

# Recommended temperature/top_k when thinking is enabled
THINKING_TEMPERATURE: float = float(os.getenv("GEMMA_THINKING_TEMPERATURE", "1.0"))
THINKING_TOP_K: int = int(os.getenv("GEMMA_THINKING_TOP_K", "64"))
THINKING_TOP_P: float = float(os.getenv("GEMMA_THINKING_TOP_P", "0.95"))
