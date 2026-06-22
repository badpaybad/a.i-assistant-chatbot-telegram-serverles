#!/usr/bin/env python3
import os
import sys

# Detect and configure AMD GPU environments before importing torch/ultralytics
def setup_amd_gpu_env():
    has_amd = False
    try:
        # Check /sys/class/drm/card*/device/vendor
        import glob
        for vendor_path in glob.glob('/sys/class/drm/card*/device/vendor'):
            try:
                with open(vendor_path, 'r') as f:
                    vendor_id = f.read().strip()
                if vendor_id == '0x1002': # AMD Vendor ID
                    has_amd = True
                    break
            except Exception:
                pass
        
        if not has_amd:
            # Fallback to lspci
            import subprocess
            output = subprocess.check_output(["lspci", "-nnk"], text=True)
            if "advanced micro devices" in output.lower() or "amd" in output.lower() or "radeon" in output.lower():
                has_amd = True
    except Exception:
        pass

    if has_amd:
        # For AMD RDNA3 architectures like Radeon 780M (gfx1103),
        # HSA_OVERRIDE_GFX_VERSION needs to be set to 11.0.2 or 11.0.0.
        if 'HSA_OVERRIDE_GFX_VERSION' not in os.environ:
            print("[AMD GPU Setup] AMD GPU detected on Linux. Setting HSA_OVERRIDE_GFX_VERSION=11.0.2 to enable support for consumer GPUs like Radeon 780M.", flush=True)
            os.environ['HSA_OVERRIDE_GFX_VERSION'] = '11.0.2'
    return has_amd

has_amd_system = setup_amd_gpu_env()

import argparse
import numpy as np
from ultralytics import YOLO
from ultralytics.models.yolo.detect.train import DetectionTrainer, torch_distributed_zero_first, LOGGER
from ultralytics.data import build_dataloader

# Monkey-patch DetectionTrainer.get_dataloader to force drop_last=True for training
# when batch_size > 1. This prevents ValueError: Expected more than 1 value per channel
# which occurs when the last batch has size 1 during BatchNorm.
def patched_get_dataloader(self, dataset_path, batch_size=16, rank=0, mode="train"):
    if mode == "train" and batch_size < 2:
        raise RuntimeError(
            "\n[ERROR] GPU/System ran out of memory (OOM) during training, and batch size was automatically reduced to 1.\n"
            "Training with batch size 1 is not supported because PyTorch BatchNorm layers require batch size >= 2.\n"
            "To resolve this VRAM memory issue, please try the following:\n"
            "  1. Disable multi-scale training by passing '--no-multi-scale'\n"
            "  2. Reduce your image size (e.g., use '--imgsz 640' or '--imgsz 768' instead of 960)\n"
            "  3. Reduce your batch size (e.g., use '--batch 4' or '--batch 2' with the smaller image size)\n"
            "  4. Use a smaller model (e.g., yolo11s.pt or yolov8s.pt instead of yolo26m.pt)\n"
        )
    
    print(f"\n[PATCH] get_dataloader called: mode={mode}, batch_size={batch_size}", flush=True)
    assert mode in {"train", "val"}, f"Mode must be 'train' or 'val', not {mode}."
    with torch_distributed_zero_first(rank):
        dataset = self.build_dataset(dataset_path, mode, batch_size)
    shuffle = mode == "train"
    if getattr(dataset, "rect", False) and shuffle and not np.all(dataset.batch_shapes == dataset.batch_shapes[0]):
        LOGGER.warning("'rect=True' is incompatible with DataLoader shuffle, setting shuffle=False")
        shuffle = False
    
    # Force drop_last=True during training to avoid batch-size-1 BatchNorm crashes
    # unless batch_size is 1 (which we override to 2 in main anyway)
    drop_last = mode == "train" and batch_size > 1
    print(f"[PATCH] setting drop_last={drop_last} for dataset: {dataset_path}\n", flush=True)
    
    return build_dataloader(
        dataset,
        batch=batch_size,
        workers=self.args.workers if mode == "train" else self.args.workers * 2,
        shuffle=shuffle,
        rank=rank,
        drop_last=drop_last,
    )

# Apply the patch
DetectionTrainer.get_dataloader = patched_get_dataloader

def parse_args():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_data = os.path.join(script_dir, 'data', 'dataset.yaml')
    
    parser = argparse.ArgumentParser(description="Train YOLO model and export to ONNX")
    parser.add_argument('--data', type=str, default=default_data, help='Path to dataset.yaml')
    parser.add_argument('--model', type=str, default='yolov8m.pt', help='Pre-trained YOLO model (e.g., yolov8n.pt, yolov8s.pt, yolov8m.pt, yolo11s.pt, yolo26m.pt, yolo26l.pt, yolo26x.pt)')
    parser.add_argument('--epochs', type=int, default=10, help='Number of epochs to train')
    parser.add_argument('--batch', type=int, default=8, help='Batch size (default: 8, set -1 for auto)')
    parser.add_argument('--imgsz', type=int, default=640, help='Image size (default: 640)')
    parser.add_argument('--device', type=str, default='', help='Device to train on, e.g., cpu, cuda, 0, mps (empty for auto)')
    parser.add_argument('--project', type=str, default=os.path.join(script_dir, 'runs', 'detect'), help='Directory to save results')
    parser.add_argument('--name', type=str, default='train', help='Run name')
    parser.add_argument('--mosaic', type=float, default=1.0, help='Mosaic augmentation ratio (default: 1.0)')
    parser.add_argument('--scale', type=float, default=0.6, help='Scale augmentation ratio (default: 0.6)')
    parser.add_argument('--multi-scale', action='store_true', dest='multi_scale', default=True, help='Enable multi-scale training (default: True)')
    parser.add_argument('--no-multi-scale', action='store_false', dest='multi_scale', help='Disable multi-scale training')
    return parser.parse_args()

def main():
    args = parse_args()
    
    # Enforce minimum batch size of 2 to avoid BatchNorm issues during training
    if args.batch == 1:
        print("Warning: Batch size of 1 is not recommended and can cause BatchNorm errors during training.", flush=True)
        print("Automatically increasing batch size to 2.", flush=True)
        args.batch = 2
        
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Check if dataset.yaml exists
    if not os.path.exists(args.data):
        print(f"Error: Dataset config '{args.data}' does not exist.", flush=True)
        print("Please run prepare_data.py first.", flush=True)
        sys.exit(1)
        
    model_path = args.model
    # Resolve relative path or filename to the script directory
    if not os.path.isabs(model_path):
        base_name = os.path.basename(model_path)
        target_path = os.path.join(script_dir, base_name)
        
        if os.path.exists(target_path):
            model_path = target_path
        elif os.path.exists(model_path):
            # If it exists in CWD, copy it to the script directory
            import shutil
            print(f"Copying existing pre-trained weights from {model_path} to {target_path}...", flush=True)
            try:
                shutil.copy(model_path, target_path)
                model_path = target_path
            except Exception as e:
                print(f"Failed to copy weights: {e}", flush=True)
        else:
            # File does not exist anywhere locally, download it directly to the script directory
            print(f"Pre-trained weights file '{base_name}' not found locally.", flush=True)
            # Match release tag for download URL
            if base_name.startswith('yolov8'):
                tag = 'v8.2.0'
            elif base_name.startswith('yolo11'):
                tag = 'v8.3.0'
            else:
                tag = 'v8.4.0' # fallback default
            
            download_url = f"https://github.com/ultralytics/assets/releases/download/{tag}/{base_name}"
            print(f"Downloading pre-trained weights from: {download_url}", flush=True)
            
            import urllib.request
            try:
                os.makedirs(script_dir, exist_ok=True)
                
                # Simple progress reporter hook
                def progress_hook(block_num, block_size, total_size):
                    if total_size > 0:
                        percent = min(100, int(block_num * block_size * 100 / total_size))
                        print(f"\rDownloading model weights: {percent}%", end="", flush=True)
                        if percent >= 100:
                            print("", flush=True)
                
                urllib.request.urlretrieve(download_url, target_path, reporthook=progress_hook)
                print(f"Download completed successfully. Saved to {target_path}", flush=True)
                model_path = target_path
            except Exception as e:
                print(f"\nWarning: Failed to download weights from GitHub: {e}", flush=True)
                print(f"Falling back to original parameter '{args.model}'...", flush=True)
                model_path = args.model

    print(f"Loading pre-trained YOLO model from: {model_path}...", flush=True)
    # Load model
    model = YOLO(model_path)
    
    # Resolve device to support CPU, NVIDIA GPU, and AMD GPU (fallback gracefully)
    device = args.device
    if device:
        device_lower = device.lower().strip()
        if device_lower in ('gpu', 'amd', 'rocm'):
            import torch
            if torch.cuda.is_available():
                device = 'cuda'
                device_name = torch.cuda.get_device_name(0)
                print(f"Using GPU device '{device_name}' as requested by '--device {device_lower}'.", flush=True)
            else:
                print(f"Warning: GPU requested ('--device {device_lower}') but CUDA/ROCm is not available. Falling back to CPU.", flush=True)
                if has_amd_system:
                    print("\n" + "="*80)
                    print("[WARNING] AMD GPU detected but PyTorch ROCm support is not available.")
                    print("To train on your AMD GPU (e.g., Radeon 780M):")
                    print("  1. Uninstall your current PyTorch version:")
                    print("     venv/bin/pip uninstall -y torch torchvision torchaudio")
                    print("  2. Install PyTorch with ROCm support (e.g., ROCm 6.0):")
                    print("     venv/bin/pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0")
                    print("  3. Ensure your user has access to GPU devices:")
                    print("     sudo usermod -a -G video,render $USER")
                    print("  4. Make sure HSA_OVERRIDE_GFX_VERSION is set:")
                    print("     export HSA_OVERRIDE_GFX_VERSION=11.0.2")
                    print("="*80 + "\n", flush=True)
                device = 'cpu'
        elif device_lower == 'cpu':
            device = 'cpu'
            print("Using CPU as requested by '--device cpu'.", flush=True)
        else:
            # Check if CUDA device requested (e.g. 'cuda', '0', '0,1') but not available
            import torch
            if ('cuda' in device_lower or device_lower.isdigit() or ',' in device_lower):
                if torch.cuda.is_available():
                    device_name = torch.cuda.get_device_name(0)
                    print(f"Using GPU device '{device_name}' via target '{device}'.", flush=True)
                else:
                    print(f"Warning: CUDA device '{device}' requested but CUDA/ROCm is not available. Falling back to CPU.", flush=True)
                    device = 'cpu'
            else:
                print(f"Using requested device: '{device}'", flush=True)
    else:
        # Auto-detect device
        import torch
        if torch.cuda.is_available():
            device = 'cuda'
            device_name = torch.cuda.get_device_name(0)
            print(f"Auto-detected GPU ('{device_name}') for training. To use CPU instead, pass '--device cpu'.", flush=True)
        else:
            device = 'cpu'
            print("Auto-detected CPU for training (No GPU/CUDA/ROCm available).", flush=True)
            if has_amd_system:
                print("\n" + "="*80)
                print("[INFO] AMD GPU detected on system, but PyTorch ROCm is not configured.")
                print("If you want to train using your AMD GPU, please check 'howtodo.md' for setup instructions.")
                print("="*80 + "\n", flush=True)

    # Train the model (Transfer learning)
    print(f"\n--- Starting YOLO Training ({args.epochs} epochs) ---", flush=True)
    training_results = model.train(
        data=args.data,
        epochs=args.epochs,
        batch=args.batch,
        imgsz=args.imgsz,
        device=device,
        project=args.project,
        name=args.name,
        exist_ok=True,
        mosaic=args.mosaic,
        scale=args.scale,
        multi_scale=args.multi_scale
    )
    
    print("\n--- Starting Model Validation ---", flush=True)
    metrics = model.val()
    print("Validation mAP50-95:", metrics.box.map, flush=True)
    
    # Export to ONNX
    print(f"\n--- Exporting model to ONNX ---", flush=True)
    # Export options: opset=12 is widely supported by ONNX Runtime on both PC and mobile (Android/iOS)
    onnx_path = model.export(
        format='onnx',
        opset=12,
        project=args.project,
        name=args.name
    )
    
    print("\n--- Training and Export Completed Successfully! ---", flush=True)
    print(f"PyTorch Best Weights: {os.path.join(args.project, args.name, 'weights', 'best.pt')}", flush=True)
    print(f"Exported ONNX Model: {onnx_path}", flush=True)

if __name__ == "__main__":
    main()
