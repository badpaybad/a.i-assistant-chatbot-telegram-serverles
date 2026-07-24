"""
GGUF Model Wrapper — Loads Gemma 4 GGUF (Q4_K_M) via llama-cpp-python.

Provides the same generate() interface as Gemma4Manager so it can be used
as a drop-in replacement. All layers are placed on GPU (n_gpu_layers=-1)
for maximum inference speed (~4.2-4.8 GiB VRAM on RTX 3060).
"""
import os
from pathlib import Path
from typing import Any, List, Optional

import numpy as np
from PIL import Image


class GGUFModelWrapper:
    """
    Wrapper around llama_cpp.Llama that exposes the same API surface
    as Gemma4Manager: generate(), generate_stream(), generate_with_image(),
    get_embeddings(), get_image_embeddings().
    """

    def __init__(
        self,
        model_path: Path,
        mmproj_path: Optional[Path] = None,
        n_ctx: int = 4096,
        n_gpu_layers: int = -1,
        verbose: bool = True,
    ):
        from llama_cpp import Llama

        model_path_str = str(model_path)
        if not os.path.isfile(model_path_str):
            raise FileNotFoundError(
                f"GGUF model not found at {model_path_str}. "
                "Please download the Q4_K_M file or set GEMMA_USE_GGUF=False to use HF fallback.\n"
                "Download command: python -m gemma4.download_model"
            )

        # Check for multimodal projector (Vision / Image understanding)
        chat_handler = None
        mmproj_str = str(mmproj_path) if mmproj_path else None
        if mmproj_str and os.path.isfile(mmproj_str):
            try:
                from llama_cpp.llama_chat_format import Gemma4ChatHandler
                chat_handler = Gemma4ChatHandler(clip_model_path=mmproj_str, verbose=verbose)
                print(f"[+] GGUF Gemma4 Vision multimodal projector loaded: {mmproj_str}")
            except Exception as e:
                print(f"[!] Warning: Could not load mmproj ({e}). Vision features disabled.")

        print(f"[*] Loading GGUF model: {model_path_str}")
        print(f"    n_gpu_layers={n_gpu_layers}, n_ctx={n_ctx}")

        self._llm = Llama(
            model_path=model_path_str,
            n_gpu_layers=n_gpu_layers,
            n_ctx=n_ctx,
            verbose=verbose,
            chat_handler=chat_handler,
        )

        self.engine = "gguf"
        self.model_id = str(model_path.stem)
        self.device = "cuda"

        print(f"[+] GGUF model loaded successfully.")

    # ------------------------------------------------------------------
    # Text generation
    # ------------------------------------------------------------------

    def generate(
        self,
        input_data: Any,
        audio_array=None,
        image_path: Optional[str] = None,
        images_list: Optional[List[Image.Image]] = None,
        audio_list: Optional[List[np.ndarray]] = None,
        max_tokens: int = 1024,
        temperature: float = 0.7,
        top_p: float = 0.9,
        top_k: int = 40,
        sampling_rate: int = 16000,
        **_: Any,
    ) -> str:
        """Generate a response. Accepts the same signature as Gemma4Manager.generate()."""
        messages = self._build_messages(input_data, image_path, images_list)

        try:
            response = self._llm.create_chat_completion(
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                top_k=top_k,
            )
            return response["choices"][0]["message"]["content"].strip()
        except Exception as e:
            err_str = str(e)
            print(f"[-] Error during GGUF generation: {err_str}")
            if "exceeds n_ctx" in err_str.lower() or "context" in err_str.lower():
                print("[!] Prompt exceeds n_ctx. Auto-truncating context and retrying...")
                try:
                    pruned_messages = []
                    for m in messages:
                        m_copy = dict(m)
                        if isinstance(m_copy.get("content"), str):
                            c_str = m_copy["content"]
                            if len(c_str) > 2500:
                                m_copy["content"] = c_str[:1800] + "\n...[Cắt bớt để vừa cửa sổ n_ctx]...\n" + c_str[-600:]
                        pruned_messages.append(m_copy)

                    response = self._llm.create_chat_completion(
                        messages=pruned_messages,
                        max_tokens=max_tokens,
                        temperature=temperature,
                        top_p=top_p,
                        top_k=top_k,
                    )
                    return response["choices"][0]["message"]["content"].strip()
                except Exception as ex_retry:
                    print(f"[-] Retry after truncation failed: {ex_retry}. Trying aggressive Stage 2 fallback...")
                    try:
                        minimal_messages = []
                        if messages and messages[0].get("role") == "system":
                            sys_m = dict(messages[0])
                            if isinstance(sys_m.get("content"), str) and len(sys_m["content"]) > 3000:
                                sys_m["content"] = sys_m["content"][:3000] + "\n...[Rút gọn system context]..."
                            minimal_messages.append(sys_m)
                        
                        last_msg = dict(messages[-1])
                        if isinstance(last_msg.get("content"), str) and len(last_msg["content"]) > 4000:
                            last_msg["content"] = last_msg["content"][:4000] + "\n...[Rút gọn current message]..."
                        minimal_messages.append(last_msg)

                        response = self._llm.create_chat_completion(
                            messages=minimal_messages,
                            max_tokens=max_tokens,
                            temperature=temperature,
                            top_p=top_p,
                            top_k=top_k,
                        )
                        return response["choices"][0]["message"]["content"].strip()
                    except Exception as ex_stage2:
                        print(f"[-] Stage 2 fallback failed: {ex_stage2}")
                        return f"Lỗi sinh nội dung do prompt quá dài: {str(ex_stage2)}"

            return f"Lỗi sinh nội dung: {str(err_str)}"

    # ------------------------------------------------------------------
    # Streaming generation
    # ------------------------------------------------------------------

    def generate_stream(
        self,
        input_data: Any,
        audio_array=None,
        image_path: Optional[str] = None,
        images_list: Optional[List[Image.Image]] = None,
        audio_list: Optional[List[np.ndarray]] = None,
        max_tokens: int = 1024,
        temperature: float = 0.7,
        top_p: float = 0.9,
        top_k: int = 40,
        sampling_rate: int = 16000,
        **_: Any,
    ):
        """Stream tokens one-by-one. Same interface as Gemma4Manager.generate_stream()."""
        messages = self._build_messages(input_data, image_path, images_list)

        try:
            response_iter = self._llm.create_chat_completion(
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                top_k=top_k,
                stream=True,
            )
            for chunk in response_iter:
                delta = chunk["choices"][0].get("delta", {})
                if "content" in delta:
                    yield delta["content"]
        except Exception as e:
            print(f"[-] Error during stream generation: {e}")
            yield f"Lỗi sinh nội dung: {str(e)}"

    # ------------------------------------------------------------------
    # Image generation
    # ------------------------------------------------------------------

    def generate_with_image(self, image_path: str, prompt: str, max_tokens: int = 512) -> str:
        """Generate response with an image input."""
        return self.generate(input_data=prompt, image_path=image_path, max_tokens=max_tokens)

    # ------------------------------------------------------------------
    # Embeddings
    # ------------------------------------------------------------------

    def get_embeddings(self, text: str) -> list:
        """Get text embeddings via llama.cpp's embedding endpoint."""
        try:
            res = self._llm.create_embedding(text)
            embedding = res["data"][0]["embedding"]

            # Normalize dimension to 2560 (Gemma 4 E4B hidden size)
            target_dim = 2560
            current_dim = len(embedding)
            if current_dim > target_dim:
                embedding = embedding[:target_dim]
            elif current_dim < target_dim:
                embedding = embedding + [0.0] * (target_dim - current_dim)

            return embedding
        except Exception as e:
            print(f"[-] Error getting GGUF embeddings: {e}")
            return [0.0] * 2560

    def get_image_embeddings(self, image_path: str) -> list:
        """Get image embeddings by describing the image first, then embedding."""
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Lỗi: File ảnh {image_path} không tồn tại.")

        prompt = "Mô tả hình ảnh này một cách ngắn gọn, tập trung vào các đặc điểm chính bằng tiếng Việt."
        description = self.generate_with_image(image_path, prompt)
        return self.get_embeddings(description)

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _build_messages(
        self,
        input_data: Any,
        image_path: Optional[str] = None,
        images_list: Optional[List[Image.Image]] = None,
    ) -> list:
        """Convert input_data into the llama-cpp chat message format."""
        import io as _io
        import base64 as _b64

        # If already a list of message dicts, use directly
        if isinstance(input_data, list):
            return self._format_messages_for_llama(input_data, image_path, images_list)

        # Simple string prompt
        user_text = str(input_data)

        # Build content parts
        content_parts = []

        # Add images
        all_image_uris = []
        if images_list:
            for img in images_list:
                if isinstance(img, Image.Image):
                    buf = _io.BytesIO()
                    img.save(buf, format="JPEG")
                    b64 = _b64.b64encode(buf.getvalue()).decode("utf-8")
                    all_image_uris.append(f"data:image/jpeg;base64,{b64}")
                elif isinstance(img, str) and os.path.exists(img):
                    with open(img, "rb") as f:
                        b64 = _b64.b64encode(f.read()).decode("utf-8")
                    all_image_uris.append(f"data:image/jpeg;base64,{b64}")

        if image_path and os.path.exists(image_path):
            with open(image_path, "rb") as f:
                b64 = _b64.b64encode(f.read()).decode("utf-8")
            all_image_uris.append(f"data:image/jpeg;base64,{b64}")

        for uri in all_image_uris:
            content_parts.append({"type": "image_url", "image_url": {"url": uri}})

        content_parts.append({
            "type": "text",
            "text": f"{user_text}\n\nNote: Always answer in Vietnamese, naturally and concisely."
        })

        return [{"role": "user", "content": content_parts}]

    def _format_messages_for_llama(
        self,
        messages: list,
        image_path: Optional[str] = None,
        images_list: Optional[List[Image.Image]] = None,
    ) -> list:
        """Format a list of message dicts (Gemma-style) into llama-cpp format."""
        import io as _io
        import base64 as _b64

        # Collect image URIs
        encoded_images = []
        if images_list:
            for img in images_list:
                if isinstance(img, Image.Image):
                    buf = _io.BytesIO()
                    img.save(buf, format="JPEG")
                    b64 = _b64.b64encode(buf.getvalue()).decode("utf-8")
                    encoded_images.append(f"data:image/jpeg;base64,{b64}")
                elif isinstance(img, str) and os.path.exists(img):
                    with open(img, "rb") as f:
                        b64 = _b64.b64encode(f.read()).decode("utf-8")
                    encoded_images.append(f"data:image/jpeg;base64,{b64}")

        if image_path and os.path.exists(image_path):
            with open(image_path, "rb") as f:
                b64 = _b64.b64encode(f.read()).decode("utf-8")
            encoded_images.append(f"data:image/jpeg;base64,{b64}")

        formatted = []
        img_idx = 0

        for msg in messages:
            role = msg.get("role", "user")
            content_data = msg.get("content", [])

            if isinstance(content_data, str):
                formatted.append({"role": role, "content": content_data})
                continue

            new_content = []
            for item in content_data:
                itype = item.get("type")
                if itype == "text":
                    new_content.append({"type": "text", "text": item.get("text", "")})
                elif itype == "image":
                    if img_idx < len(encoded_images):
                        new_content.append({
                            "type": "image_url",
                            "image_url": {"url": encoded_images[img_idx]}
                        })
                        img_idx += 1
                elif itype == "audio":
                    print("[!] Warning: Audio inputs are not supported in GGUF engine.")

            if new_content:
                formatted.append({"role": role, "content": new_content})

        return formatted
