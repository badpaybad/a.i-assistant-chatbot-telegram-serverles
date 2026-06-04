import os
import sys
import requests
from huggingface_hub import snapshot_download

# Define model and local paths
MODEL_ID = "unsloth/gemma-4-12b-it-GGUF"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KOKORO_DIR = os.path.join(BASE_DIR, "model", "kokoro")

def download_file(url, dest_path):
    if os.path.exists(dest_path):
        print(f"[*] {os.path.basename(dest_path)} already exists. Skipping.")
        return True
    
    print(f"[*] Downloading {url} to {dest_path}...")
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"[+] Download complete: {dest_path}")
        return True
    except Exception as e:
        print(f"[-] Error downloading {url}: {e}")
        return False

def setup_kokoro():
    print("\n[*] Checking/Setting up Kokoro ONNX assets...")
    os.makedirs(KOKORO_DIR, exist_ok=True)
    
    # Official ONNX model and voices (Stable GitHub Releases)
    model_url = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx"
    voices_url = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin"
    
    model_path = os.path.join(KOKORO_DIR, "kokoro-v1.0.onnx")
    voices_path = os.path.join(KOKORO_DIR, "voices.bin")
    
    success = download_file(model_url, model_path)
    success = success and download_file(voices_url, voices_path)
    
    if success:
        print("[+] Kokoro ONNX assets are ready.")
    else:
        print("[-] Some Kokoro assets failed to download.")
    return success

def setup_gemma(repo_id=None, model_name="gemma-4-12b-it"):
    target_id = repo_id or MODEL_ID
    gemma_dir = os.path.join(BASE_DIR, "model", model_name)
    os.makedirs(gemma_dir, exist_ok=True)
    
    # Determine the GGUF file name based on model_name
    if "e2b" in model_name:
        gguf_filename = "gemma-4-e2b-it-Q4_K_M.gguf"
    else:
        gguf_filename = "gemma-4-12b-it-Q4_K_M.gguf"
        
    # Download main model gguf
    model_path = os.path.join(gemma_dir, gguf_filename)
    proj_path = os.path.join(gemma_dir, "mmproj-F16.gguf")
    
    try:
        import subprocess
        
        if not os.path.exists(model_path):
            print(f"[*] Downloading {model_path} via wget...")
            url = f"https://huggingface.co/{target_id}/resolve/main/{gguf_filename}"
            subprocess.run(["wget", "-c", url, "-O", model_path], check=True)
            print("[+] Download model complete.")
        else:
            print("[*] GGUF model already exists.")
            
        if not os.path.exists(proj_path):
            print(f"[*] Downloading {proj_path} via wget...")
            url = f"https://huggingface.co/{target_id}/resolve/main/mmproj-F16.gguf"
            subprocess.run(["wget", "-c", url, "-O", proj_path], check=True)
            print("[+] Download projector complete.")
        else:
            print("[*] MMproj already exists.")
            
        return True
    except Exception as e:
        print(f"[-] Error downloading Gemma 4 GGUF: {str(e)}")
        return False

if __name__ == "__main__":
    print("=== Gemma 4 & Kokoro Setup System ===")
    
    # Setup Gemma 4
    gemma_ok = setup_gemma()
    
    # Setup Kokoro
    kokoro_ok = setup_kokoro()
    
    if not gemma_ok or not kokoro_ok:
        print("\n[!] Setup completed with one or more errors.")
        sys.exit(1)
    else:
        print("\n[+] Setup completed successfully! All models are ready.")
