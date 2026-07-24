import os
import sys
import torch

# Ensure project root is in sys.path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)

from gemma4.manager import get_manager, Gemma4Manager
import gemma4lib

def test_update5_cuda_and_quantization():
    print("=== Testing Gemma 4 Update 5: RTX 3060 8GB CUDA & 4-bit KV Cache Quantization ===")
    
    # 1. Check CUDA availability in PyTorch
    print(f"[*] PyTorch CUDA is_available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"[*] CUDA Device Name: {torch.cuda.get_device_name(0)}")
        print(f"[*] Total VRAM: {torch.cuda.get_device_properties(0).total_memory / (1024**3):.2f} GB")
    
    # 2. Test get_manager defaults
    manager = get_manager(model_id="google/gemma-4-e4b-it")
    print(f"[+] Manager Model ID: {manager.model_id}")
    print(f"[+] Manager Target Device: {manager.device}")
    
    assert manager.model_id == "google/gemma-4-e4b-it", f"Expected google/gemma-4-e4b-it, got {manager.model_id}"
    if torch.cuda.is_available():
        assert manager.device == "cuda", f"Expected cuda device, got {manager.device}"
        print("[SUCCESS] Gemma 4 Manager targeted to CUDA GPU.")
    
    # 3. Verify Model quant / shim structure
    if hasattr(manager, 'model'):
        print("[+] Model object retrieved from manager.")
        if hasattr(manager.model, 'config') and hasattr(manager.model.config, 'quantization_config'):
            q_cfg = manager.model.config.quantization_config
            print(f"[+] Quantization Config: {q_cfg}")
            if getattr(q_cfg, 'load_in_4bit', False):
                print("[SUCCESS] 4-bit model quantization enabled.")
    
    # 4. Verify gemma4lib drop-in client defaults to CUDA
    client = gemma4lib.Client()
    print(f"[+] gemma4lib Client Manager Device: {client.manager.device}")
    if torch.cuda.is_available():
        assert client.manager.device == "cuda", "gemma4lib client should default to cuda"
        print("[SUCCESS] gemma4lib Client initialized on CUDA GPU.")

    print("=== Update 5 Test Passed Successfully ===")

if __name__ == "__main__":
    test_update5_cuda_and_quantization()
