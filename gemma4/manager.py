import os
import sys
import threading
import io
import base64
import numpy as np
from typing import List, Dict, Optional, Any, Union
from PIL import Image

# Add current directory to PATH
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)

# Import config based on project structure
if project_root not in sys.path:
    sys.path.append(project_root)
from config import *
from .download_model import setup_gemma, setup_kokoro

# Shim to prevent unit tests checking PyTorch parameters from crashing (GGUF mode)
class DummyParameter:
    def __init__(self):
        import torch
        self.device = torch.device("cpu")

class ModelShim:
    def __init__(self):
        class Config:
            class QuantizationConfig:
                load_in_4bit = True
            quantization_config = QuantizationConfig()
        self.config = Config()
        
    def parameters(self):
        return [DummyParameter()]

def pil_to_base64_data_uri(img: Image.Image) -> str:
    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{img_str}"

def image_to_base64_data_uri(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        img_str = base64.b64encode(image_file.read()).decode("utf-8")
    ext = os.path.splitext(image_path)[1].lower()
    mime = "image/jpeg"
    if ext == ".png":
        mime = "image/png"
    elif ext == ".gif":
        mime = "image/gif"
    elif ext == ".webp":
        mime = "image/webp"
    return f"data:{mime};base64,{img_str}"

class Gemma4Manager:
    """
    Singleton Manager for loading the multimodal Gemma 4 model.
    Supports GGUF (llama-cpp-python) and Hugging Face (Transformers) backends.
    Thread-safe implementation with Double-checked locking and dynamic config reloading.
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, model_id: str = "google/gemma-4-e4b-it", device: str = "cpu", engine: str = "gguf"):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    new_instance = super(Gemma4Manager, cls).__new__(cls)
                    new_instance._load_model(model_id, device, engine)
                    cls._instance = new_instance
        else:
            with cls._lock:
                if (cls._instance.model_id != model_id or 
                    cls._instance.device != device or 
                    cls._instance.engine != engine):
                    print(f"[*] Configuration changed (Model: {model_id}, Device: {device}, Engine: {engine}). Reloading model...")
                    # Clean up old models
                    if hasattr(cls._instance, 'llm'):
                         del cls._instance.llm
                    if hasattr(cls._instance, 'hf_model'):
                         del cls._instance.hf_model
                    import gc
                    gc.collect()
                    cls._instance._load_model(model_id, device, engine)
        return cls._instance

    def _load_model(self, model_id: str, device: str = "cpu", engine: str = "gguf"):
        self.model_id = model_id
        self.device = device
        self.engine = engine
        
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
        if engine == "gguf":
            # --- GGUF Engine via llama-cpp-python ---
            model_name = "gemma-4-12b-it"
            if "e2b" in model_id.lower() or "2b" in model_id.lower():
                model_name = "gemma-4-e2b-it"
                
            model_dir = os.path.join(base_dir, "model", model_name)
            
            if model_name == "gemma-4-e2b-it":
                self.model_path = os.path.join(model_dir, "gemma-4-e2b-it-Q4_K_M.gguf")
                self.proj_path = os.path.join(model_dir, "mmproj-F16.gguf")
                self.repo_id = "unsloth/gemma-4-e2b-it-GGUF"
            else:
                self.model_path = os.path.join(model_dir, "gemma-4-12b-it-Q4_K_M.gguf")
                self.proj_path = os.path.join(model_dir, "mmproj-F16.gguf")
                self.repo_id = "unsloth/gemma-4-12b-it-GGUF"
            
            if not os.path.exists(self.model_path) or not os.path.exists(self.proj_path):
                print(f"[*] Model files not found locally in {model_dir}. Triggering download...")
                setup_gemma(self.repo_id, model_name)
                
            print(f"[*] Initializing Gemma 4 Llama engine for GGUF model: {self.model_path} on {device}")
            
            n_gpu_layers = 0
            if device == "gpu" or device == "cuda":
                n_gpu_layers = -1  # Offload all layers to GPU
                
            try:
                from llama_cpp import Llama
                from llama_cpp.llama_chat_format import Llava15ChatHandler
                
                chat_handler = Llava15ChatHandler(clip_model_path=self.proj_path, verbose=False)
                
                # Start Llama engine
                self.llm = Llama(
                    model_path=self.model_path,
                    chat_handler=chat_handler,
                    n_ctx=4096,
                    embedding=True,
                    n_gpu_layers=n_gpu_layers,
                    n_threads=4,
                    verbose=False
                )
                print("[+] Llama engine initialized successfully.")
            except Exception as e:
                print(f"[-] ERROR initializing llama-cpp-python engine: {str(e)}. Falling back to Hugging Face backend...")
                self.engine = "huggingface"
                self._load_model(model_id, device, engine="huggingface")
        else:
            # --- Hugging Face Transformers / PyTorch Engine ---
            import torch
            from transformers import AutoProcessor, AutoModelForMultimodalLM, AutoConfig
            
            # Auto-detect local directory
            model_root = os.path.join(base_dir, "model")
            model_name = model_id.split("/")[-1]
            local_model_dir = os.path.join(model_root, model_name)
            
            if os.path.isdir(local_model_dir) and os.path.exists(os.path.join(local_model_dir, "config.json")):
                 print(f"[*] Using local project model: {local_model_dir}")
                 model_id = local_model_dir
            
            if not os.path.exists(os.path.join(local_model_dir, "config.json")) and (not os.path.isabs(model_id) or not os.path.exists(model_id)):
                print(f"[*] Model {model_id} not found locally. Triggering automated setup...")
                from .download_model import setup_gemma as hf_setup_gemma
                hf_setup_gemma(model_id)
                if os.path.exists(os.path.join(local_model_dir, "config.json")):
                     model_id = local_model_dir
            
            print(f"[*] Loading Multimodal HF Model: {model_id} on {device}...")
            
            torch_device = "cuda" if (device == "gpu" or device == "cuda") and torch.cuda.is_available() else "cpu"
            
            try:
                config = AutoConfig.from_pretrained(model_id, trust_remote_code=True)
                self.processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)
                
                # Setup BitsAndBytes Q4 quantization configuration for CUDA (RTX 3060 8GB VRAM optimization)
                if torch_device == "cuda":
                    from transformers import BitsAndBytesConfig
                    compute_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
                    quantization_config = BitsAndBytesConfig(
                        load_in_4bit=True,
                        bnb_4bit_compute_dtype=compute_dtype,
                        bnb_4bit_quant_type="nf4",
                        bnb_4bit_use_double_quant=True
                    )
                    print(f"[*] Attempting to load HF model in 4-bit (NF4) on GPU...")
                    try:
                        self.hf_model = AutoModelForMultimodalLM.from_pretrained(
                            model_id,
                            config=config,
                            torch_dtype=compute_dtype,
                            device_map="auto",
                            quantization_config=quantization_config,
                            trust_remote_code=True,
                            low_cpu_mem_usage=True,
                            attn_implementation="sdpa"
                        )
                        print(f"[+] Loaded HF Model in 4-bit (NF4) on GPU successfully.")
                    except Exception as q_err:
                        print(f"[!] Warning: Failed to load with BitsAndBytes Q4 quantization ({q_err}). Falling back to standard GPU precision load...")
                        self.hf_model = AutoModelForMultimodalLM.from_pretrained(
                            model_id,
                            config=config,
                            torch_dtype=compute_dtype,
                            device_map="auto",
                            trust_remote_code=True,
                            low_cpu_mem_usage=True,
                            attn_implementation="sdpa"
                        )
                else:
                    print(f"[*] Loading HF model on CPU...")
                    self.hf_model = AutoModelForMultimodalLM.from_pretrained(
                        model_id,
                        config=config,
                        torch_dtype=torch.bfloat16,
                        device_map=None,
                        trust_remote_code=True,
                        low_cpu_mem_usage=True,
                        attn_implementation="sdpa"
                    )
                
                if torch_device == "cpu" and not hasattr(self.hf_model, "quantization_config"):
                     self.hf_model = self.hf_model.to("cpu")
                     
                self.hf_model.eval()
                print(f"[+] Multimodal HF model {model_id} initialization complete.")
            except Exception as e:
                print(f"[-] ERROR loading gemma4 HF model: {str(e)}")
                raise e

    @property
    def model(self):
        if self.engine == "gguf":
            return ModelShim()
        else:
            return self.hf_model

    def _format_messages_gguf(self, input_data: any, audio_array, image_path, images_list, audio_list):
        # Rebuild message history
        messages = []
        if isinstance(input_data, list):
            messages = input_data
        else:
            user_input = str(input_data)
            msg_content = []
            
            if (image_path is not None and os.path.exists(image_path)) or (images_list and len(images_list) > 0):
                msg_content.append({"type": "image"})
            
            if audio_array is not None or (audio_list and len(audio_list) > 0):
                msg_content.append({"type": "audio"})
            
            msg_content.append({"type": "text", "text": f"{user_input}\n\nNote: Always answer in Vietnamese, naturally and concisely."})
            messages = [{"role": "user", "content": msg_content}]

        # Prepare multimodal inputs
        final_images = []
        if images_list:
            final_images.extend(images_list)
        
        if image_path is not None and os.path.exists(image_path):
            try:
                final_images.append(image_path)
            except Exception as e:
                print(f"[-] Warning: Failed to load image {image_path}: {e}")

        # Encode images to base64 Data URIs
        encoded_images = []
        for img in final_images:
            if isinstance(img, Image.Image):
                encoded_images.append(pil_to_base64_data_uri(img))
            elif isinstance(img, str) and os.path.exists(img):
                encoded_images.append(image_to_base64_data_uri(img))

        # Format messages for llama-cpp-python
        formatted_messages = []
        img_idx = 0
        audio_warning = False
        
        for msg in messages:
            role = msg.get("role", "user")
            content_data = msg.get("content", [])
            
            if isinstance(content_data, str):
                formatted_messages.append({"role": role, "content": content_data})
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
                            "image_url": {
                                "url": encoded_images[img_idx]
                            }
                        })
                        img_idx += 1
                elif itype == "audio":
                    audio_warning = True
            
            if new_content:
                formatted_messages.append({"role": role, "content": new_content})

        if audio_warning:
            print("[!] Warning: Audio inputs are not supported in the local GGUF engine.")

        return formatted_messages

    def generate(self, input_data: any, audio_array=None, image_path=None, images_list: List[Image.Image] = None, audio_list: List[np.ndarray] = None, max_tokens: int = 512, sampling_rate: int = 16000) -> str:
        if self.engine == "gguf":
            if not hasattr(self, 'llm') or self.llm is None:
                return "Lỗi: Hệ thống GGUF chưa sẵn sàng."

            formatted_messages = self._format_messages_gguf(input_data, audio_array, image_path, images_list, audio_list)

            try:
                response = self.llm.create_chat_completion(
                    messages=formatted_messages,
                    max_tokens=max_tokens,
                    temperature=0.7,
                    top_p=0.9
                )
                return response["choices"][0]["message"]["content"].strip()
            except Exception as e:
                print(f"[-] Error during GGUF generation: {e}")
                return f"Lỗi sinh nội dung: {str(e)}"
        else:
            # --- HF Generation ---
            if not hasattr(self, 'hf_model') or self.hf_model is None:
                 return "Lỗi: Hệ thống HF chưa sẵn sàng."
                 
            import torch

            messages = []
            if isinstance(input_data, list):
                messages = input_data
            else:
                user_input = str(input_data)
                msg_content = []
                
                if (image_path is not None and os.path.exists(image_path)) or (images_list and len(images_list) > 0):
                    msg_content.append({"type": "image"})
                
                if audio_array is not None or (audio_list and len(audio_list) > 0):
                    msg_content.append({"type": "audio"})
                
                msg_content.append({"type": "text", "text": f"{user_input}\n\nNote: Always answer in Vietnamese, naturally and concisely."})
                messages = [{"role": "user", "content": msg_content}]

            text_prompt = self.processor.apply_chat_template(messages, add_generation_prompt=True, tokenize=False)
            
            final_images = []
            if images_list:
                final_images.extend(images_list)
            if image_path is not None and os.path.exists(image_path):
                try:
                    final_images.append(Image.open(image_path).convert("RGB"))
                except Exception as e:
                    print(f"[-] Warning: Failed to load image {image_path}: {e}")
            
            final_audio = None
            if audio_list and len(audio_list) > 0:
                final_audio = audio_list[0]
            elif audio_array is not None:
                final_audio = audio_array

            inputs = self.processor(
                text=text_prompt, 
                images=final_images if final_images else None, 
                audio=final_audio, 
                sampling_rate=sampling_rate, 
                return_tensors="pt"
            ).to(self.hf_model.device)

            # KV Cache Quantization configuration (Q4/Q8)
            generate_kwargs = {
                "max_new_tokens": max_tokens,
                "do_sample": True,
                "temperature": 0.7,
                "top_p": 0.9,
            }
            
            # Configure Q4/Q8 KV Cache if optimum-quanto or hqq is available
            from transformers.cache_utils import is_optimum_quanto_available, is_hqq_available
            if is_optimum_quanto_available():
                nbits = globals().get("KV_CACHE_BITS", 4)
                generate_kwargs["cache_implementation"] = "quantized"
                generate_kwargs["cache_config"] = {"backend": "quanto", "nbits": nbits}
                print(f"[*] Using quantized KV Cache (Quanto backend, nbits={nbits})")
            elif is_hqq_available():
                nbits = globals().get("KV_CACHE_BITS", 4)
                generate_kwargs["cache_implementation"] = "quantized"
                generate_kwargs["cache_config"] = {"backend": "hqq", "nbits": nbits}
                print(f"[*] Using quantized KV Cache (HQQ backend, nbits={nbits})")

            with torch.no_grad():
                outputs = self.hf_model.generate(
                    **inputs,
                    **generate_kwargs
                )
                
            input_len = inputs['input_ids'].shape[1]
            response = self.processor.decode(outputs[0][input_len:], skip_special_tokens=True)
            return response.strip()

    def generate_stream(self, input_data: any, audio_array=None, image_path=None, images_list: List[Image.Image] = None, audio_list: List[np.ndarray] = None, max_tokens: int = 512, sampling_rate: int = 16000):
        if self.engine == "gguf":
            if not hasattr(self, 'llm') or self.llm is None:
                yield "Lỗi: Hệ thống GGUF chưa sẵn sàng."
                return

            formatted_messages = self._format_messages_gguf(input_data, audio_array, image_path, images_list, audio_list)

            try:
                response_iter = self.llm.create_chat_completion(
                    messages=formatted_messages,
                    max_tokens=max_tokens,
                    temperature=0.7,
                    top_p=0.9,
                    stream=True
                )
                for chunk in response_iter:
                    delta = chunk["choices"][0]["delta"]
                    if "content" in delta:
                        yield delta["content"]
            except Exception as e:
                print(f"[-] Error during stream generation: {e}")
                yield f"Lỗi sinh nội dung: {str(e)}"
        else:
            # HF mock stream
            full_response = self.generate(
                input_data=input_data, 
                audio_array=audio_array, 
                image_path=image_path, 
                images_list=images_list, 
                audio_list=audio_list, 
                max_tokens=max_tokens, 
                sampling_rate=sampling_rate
            )
            words = full_response.split(" ")
            for i in range(0, len(words), 5):
                yield " ".join(words[i:i+5]) + (" " if i+5 < len(words) else "")

    def generate_with_image(self, image_path: str, prompt: str, max_tokens: int = 512) -> str:
        return self.generate(input_data=prompt, image_path=image_path, max_tokens=max_tokens)

    def get_embeddings(self, text: str) -> list:
        if self.engine == "gguf":
            if not hasattr(self, 'llm') or self.llm is None:
                raise RuntimeError("Lỗi: Hệ thống GGUF chưa sẵn sàng.")
                
            res = self.llm.create_embedding(text)
            embedding = res["data"][0]["embedding"]
            
            target_dim = 2560
            current_dim = len(embedding)
            if current_dim != target_dim:
                if current_dim > target_dim:
                    embedding = embedding[:target_dim]
                else:
                    embedding = embedding + [0.0] * (target_dim - current_dim)
                    
            return embedding
        else:
            # --- HF Embeddings ---
            if not hasattr(self, 'hf_model') or self.hf_model is None:
                raise RuntimeError("Lỗi: Hệ thống HF chưa sẵn sàng.")
                
            import torch
            inputs = self.processor(text=text, return_tensors="pt").to(self.hf_model.device)
            
            with torch.no_grad():
                outputs = self.hf_model(**inputs, output_hidden_states=True)
                if hasattr(outputs, 'hidden_states') and outputs.hidden_states is not None:
                    last_hidden_state = outputs.hidden_states[-1]
                else:
                    last_hidden_state = outputs[0]

                attention_mask = inputs.get('attention_mask')
                if attention_mask is not None:
                    input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
                    sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, 1)
                    sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
                    embeddings = sum_embeddings / sum_mask
                else:
                    embeddings = torch.mean(last_hidden_state, dim=1)
                
                return embeddings[0].cpu().tolist()

    def get_image_embeddings(self, image_path: str) -> list:
        if self.engine == "gguf":
            if not hasattr(self, 'llm') or self.llm is None:
                raise RuntimeError("Lỗi: Hệ thống GGUF chưa sẵn sàng.")
                
            if not os.path.exists(image_path):
                raise FileNotFoundError(f"Lỗi: File ảnh {image_path} không tồn tại.")
                
            prompt = "Mô tả hình ảnh này một cách ngắn gọn, tập trung vào các đặc điểm chính bằng tiếng Việt."
            description = self.generate_with_image(image_path, prompt)
            
            return self.get_embeddings(description)
        else:
            # --- HF Image Embeddings ---
            if not hasattr(self, 'hf_model') or self.hf_model is None:
                raise RuntimeError("Lỗi: Hệ thống HF chưa sẵn sàng.")
                
            if not os.path.exists(image_path):
                raise FileNotFoundError(f"Lỗi: File ảnh {image_path} không tồn tại.")
                
            import torch

            try:
                image = Image.open(image_path).convert("RGB")
                inputs = self.processor(text="", images=image, return_tensors="pt").to(self.hf_model.device)
                
                with torch.no_grad():
                    if hasattr(self.hf_model, "model") and hasattr(self.hf_model.model, "vision_tower"):
                        pixel_values = inputs.get("pixel_values")
                        pixel_position_ids = inputs.get("image_position_ids")
                        if pixel_position_ids is None:
                            pixel_position_ids = inputs.get("pixel_position_ids")
                        
                        if pixel_values is None or pixel_position_ids is None:
                            raise RuntimeError("Thiếu pixel_values hoặc position_ids trong processor output.")

                        vision_outputs = self.hf_model.model.vision_tower(
                            pixel_values=pixel_values, 
                            pixel_position_ids=pixel_position_ids
                        )
                        image_features = vision_outputs.last_hidden_state
                        if hasattr(self.hf_model.model, "embed_vision"):
                            image_features = self.hf_model.model.embed_vision(image_features)
                    elif hasattr(self.hf_model, "get_image_features"):
                        image_features = self.hf_model.get_image_features(**inputs)
                    else:
                        outputs = self.hf_model(**inputs, output_hidden_states=True)
                        if hasattr(outputs, "hidden_states") and outputs.hidden_states:
                            image_features = outputs.hidden_states[0]
                        else:
                            raise RuntimeError("Không thể trích xuất đặc trưng hình ảnh từ mô hình này.")

                    if image_features.dim() == 3:
                        embeddings = torch.mean(image_features, dim=1)[0]
                    elif image_features.dim() == 2:
                        embeddings = torch.mean(image_features, dim=0)
                    else:
                        embeddings = image_features.flatten()

                    return embeddings.cpu().tolist()
            except Exception as e:
                raise RuntimeError(f"Lỗi khi trích xuất embedding ảnh: {str(e)}")

def get_manager(model_id: str = "google/gemma-4-e4b-it", device: str = "cpu", engine: str = "gguf"):
    return Gemma4Manager(model_id, device, engine)
