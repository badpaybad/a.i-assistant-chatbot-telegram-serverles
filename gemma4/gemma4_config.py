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

# Context window — larger = more VRAM for KV cache
GGUF_N_CTX: int = int(os.getenv("GEMMA_GGUF_N_CTX", "4096"))

# Number of GPU layers: -1 = all layers on GPU (100% GPU)
GGUF_N_GPU_LAYERS: int = int(os.getenv("GEMMA_GGUF_N_GPU_LAYERS", "-1"))

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
