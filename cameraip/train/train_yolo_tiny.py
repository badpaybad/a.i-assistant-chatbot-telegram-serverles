#!/usr/bin/env python3
import os
import sys

# Detect and configure AMD GPU environments before importing torch/ultralytics
def detect_real_amd_gpu_arch():
    import glob
    for path in glob.glob('/sys/class/kfd/kfd/topology/nodes/*/properties'):
        try:
            with open(path, 'r') as f:
                for line in f:
                    if line.startswith('gfx_target_version'):
                        val = int(line.split()[1])
                        if val > 0:
                            major = val // 10000
                            minor = (val % 10000) // 100
                            patch = val % 100
                            return f"gfx{major}{minor}{patch}"
        except Exception:
            pass
    return None

def get_supported_rocm_archs():
    try:
        import subprocess
        # Run python in a subprocess to query arch list without initializing CUDA in parent process
        output = subprocess.check_output(
            [sys.executable, "-c", "import torch; print(','.join(torch.cuda.get_arch_list()) if hasattr(torch.cuda, 'get_arch_list') else '')"],
            text=True,
            stderr=subprocess.DEVNULL
        )
        return [arch.strip() for arch in output.strip().split(',') if arch.strip()]
    except Exception:
        return []

def setup_amd_gpu_env():
    has_amd = False
    os.environ['MIOPEN_FIND_ENFORCE'] = 'NONE'
    os.environ['MIOPEN_DEBUG_DISABLE_FIND_DB'] = '1'
    os.environ['HSA_XNACK'] = '1'
    os.environ['PYTORCH_HIP_ALLOC_CONF'] = "max_split_size_mb:128"
    os.environ['HSA_ENABLE_SDMA'] = '0'

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
        # Check native compatibility
        real_arch = detect_real_amd_gpu_arch()
        supported_archs = get_supported_rocm_archs()
        
        if real_arch and real_arch in supported_archs:
            print(f"[AMD GPU Setup] AMD GPU {real_arch} is natively supported by PyTorch. No HSA override needed.", flush=True)
            if 'HSA_OVERRIDE_GFX_VERSION' in os.environ:
                del os.environ['HSA_OVERRIDE_GFX_VERSION']
        else:
            fallback_version = '11.0.0'
            os.environ['HSA_OVERRIDE_GFX_VERSION'] = fallback_version
            print(f"[AMD GPU Setup] AMD GPU {real_arch or 'unknown'} is not natively supported. Overriding HSA_OVERRIDE_GFX_VERSION to {fallback_version}.", flush=True)

        if 'HIPBLASLT_WORKSPACE_SIZE' not in os.environ:
            os.environ['HIPBLASLT_WORKSPACE_SIZE'] = '0'

        if 'HSA_ENABLE_SDMA' not in os.environ:
            os.environ['HSA_ENABLE_SDMA'] = '0'
            print("[AMD GPU Setup] Set HSA_ENABLE_SDMA=0 to prevent iGPU memory access faults (shared memory architecture).", flush=True)
        
        if 'PYTORCH_HIP_ALLOC_CONF' not in os.environ:
            os.environ['PYTORCH_HIP_ALLOC_CONF'] = 'garbage_collection_threshold:0.8,max_split_size_mb:256'
            print("[AMD GPU Setup] Set PYTORCH_HIP_ALLOC_CONF for better iGPU shared memory management.", flush=True)
        print("[AMD GPU Setup] All AMD iGPU environment variables configured.", flush=True)

    return has_amd

has_amd_system = setup_amd_gpu_env()

# Detect and configure NVIDIA GPU environments before importing torch/ultralytics
def setup_nvidia_gpu_env():
    has_nvidia = False
    try:
        import glob
        for vendor_path in glob.glob('/sys/class/drm/card*/device/vendor'):
            try:
                with open(vendor_path, 'r') as f:
                    vendor_id = f.read().strip()
                if vendor_id == '0x10de': # NVIDIA Vendor ID
                    has_nvidia = True
                    break
            except Exception:
                pass
        
        if not has_nvidia:
            import subprocess
            output = subprocess.check_output(["lspci", "-nnk"], text=True)
            if "nvidia" in output.lower() or "geforce" in output.lower() or "rtx" in output.lower() or "gtx" in output.lower():
                has_nvidia = True
    except Exception:
        pass

    if has_nvidia:
        if 'PYTORCH_CUDA_ALLOC_CONF' not in os.environ:
            os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'garbage_collection_threshold:0.8,max_split_size_mb:512'
            print("[NVIDIA GPU Setup] NVIDIA GPU detected. Setting PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512 to prevent VRAM fragmentation.", flush=True)
    return has_nvidia

has_nvidia_system = setup_nvidia_gpu_env()

import argparse
import numpy as np
from ultralytics import YOLO
from ultralytics.models.yolo.detect.train import DetectionTrainer, torch_distributed_zero_first, LOGGER
from ultralytics.data import build_dataloader

# Monkey-patch DetectionTrainer.get_dataloader to force drop_last=True for training
# when batch_size > 1.
def patched_get_dataloader(self, dataset_path, batch_size=16, rank=0, mode="train"):
    if mode == "train" and batch_size < 2:
        raise RuntimeError(
            "\n[ERROR] GPU/System ran out of memory (OOM) during training, and batch size was automatically reduced to 1.\n"
            "Training with batch size 1 is not supported because PyTorch BatchNorm layers require batch size >= 2.\n"
            "To resolve this VRAM memory issue, please try reducing image size or using smaller model scale.\n"
        )
    
    print(f"\n[PATCH] get_dataloader called: mode={mode}, batch_size={batch_size}", flush=True)
    assert mode in {"train", "val"}, f"Mode must be 'train' or 'val', not {mode}."
    with torch_distributed_zero_first(rank):
        dataset = self.build_dataset(dataset_path, mode, batch_size)
    shuffle = mode == "train"
    if getattr(dataset, "rect", False) and shuffle and not np.all(dataset.batch_shapes == dataset.batch_shapes[0]):
        LOGGER.warning("'rect=True' is incompatible with DataLoader shuffle, setting shuffle=False")
        shuffle = False
    
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
    
    parser = argparse.ArgumentParser(description="Train YOLO model specialized for SMALL objects and export to ONNX")
    parser.add_argument('--data', type=str, default=default_data, help='Path to dataset.yaml')
    parser.add_argument('--model', type=str, default='yolov8m.pt', help='Pre-trained YOLO model (e.g., yolov8n.pt, yolov8s.pt, yolov8m.pt)')
    parser.add_argument('--epochs', type=int, default=10, help='Number of epochs to train')
    parser.add_argument('--batch', type=int, default=8, help='Batch size (default: 8, set -1 for auto)')
    parser.add_argument('--imgsz', type=int, default=640, help='Image size (default: 640 for hardware efficiency)')
    parser.add_argument('--device', type=str, default='', help='Device to train on, e.g., cpu, cuda, 0, mps (empty for auto)')
    parser.add_argument('--project', type=str, default=os.path.join(script_dir, 'runs', 'detect'), help='Directory to save results')
    parser.add_argument('--name', type=str, default='train_tiny', help='Run name')
    parser.add_argument('--workers', type=int, default=8, help='Number of dataloader workers (default: 8)')
    parser.add_argument('--amp', action='store_true', dest='amp', default=None, help='Force enable AMP (mixed precision) training')
    parser.add_argument('--no-amp', action='store_false', dest='amp', help='Force disable AMP')
    parser.add_argument('--force-gpu', action='store_true', dest='force_gpu', default=False, help='Force GPU on unsupported gfx1102 (Radeon 780M).')
    
    # Tiny object specialized parameters
    parser.add_argument('--p2', action='store_true', help='Use Stride-4 (P2) Detection Head for tiny object sensitivity (YOLOv8 only)')
    parser.add_argument('--fl-gamma', type=float, default=1.5, help='Focal loss gamma (default: 1.5, focuses on hard/small objects)')
    parser.add_argument('--freeze', type=int, default=10, help='Number of backbone layers to freeze (default: 10, keeps feature extractor stable)')
    parser.add_argument('--optimizer', type=str, default='AdamW', choices=['SGD', 'Adam', 'AdamW', 'RMSProp', 'auto'], help='Optimizer (default: AdamW)')
    parser.add_argument('--lr0', type=float, default=0.001, help='Initial learning rate (default: 0.001 for AdamW fine-tuning)')
    parser.add_argument('--box', type=float, default=7.5, help='Box loss weight (default: 7.5)')
    parser.add_argument('--cls', type=float, default=1.0, help='Classification loss weight (default: 1.0, boosted for small object classes)')
    parser.add_argument('--dfl', type=float, default=1.5, help='Distribution focal loss weight (default: 1.5)')
    parser.add_argument('--mosaic', type=float, default=0.5, help='Mosaic augmentation ratio (default: 0.5 - lower helps small objects from shrinking too much)')
    parser.add_argument('--scale', type=float, default=0.5, help='Scale augmentation ratio (default: 0.5)')
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
            import shutil
            print(f"Copying existing pre-trained weights from {model_path} to {target_path}...", flush=True)
            try:
                shutil.copy(model_path, target_path)
                model_path = target_path
            except Exception as e:
                print(f"Failed to copy weights: {e}", flush=True)
        else:
            print(f"Pre-trained weights file '{base_name}' not found locally.", flush=True)
            if base_name.startswith('yolov8'):
                tag = 'v8.2.0'
            elif base_name.startswith('yolo11'):
                tag = 'v8.3.0'
            else:
                tag = 'v8.4.0'
            
            download_url = f"https://github.com/ultralytics/assets/releases/download/{tag}/{base_name}"
            print(f"Downloading pre-trained weights from: {download_url}", flush=True)
            
            import urllib.request
            try:
                os.makedirs(script_dir, exist_ok=True)
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
                print(f"\nWarning: Failed to download weights: {e}", flush=True)
                model_path = args.model

    # Resolve device
    device = args.device
    if not device:
        import torch
        if torch.cuda.is_available():
            device = 'cuda'
            device_name = torch.cuda.get_device_name(0)
            print(f"Auto-detected GPU ('{device_name}') for training.", flush=True)
        else:
            device = 'cpu'
            print("Auto-detected CPU for training (No GPU available).", flush=True)
    else:
        device_lower = device.lower().strip()
        if device_lower in ('gpu', 'amd', 'rocm'):
            import torch
            device = 'cuda' if torch.cuda.is_available() else 'cpu'
        elif device_lower == 'cpu':
            device = 'cpu'
        elif 'cuda' in device_lower or device_lower.isdigit() or ',' in device_lower:
            import torch
            device = 'cuda' if torch.cuda.is_available() else 'cpu'

    # Apply safety overrides for AMD iGPU (Radeon 780M / gfx1103)
    if device == 'cuda':
        import torch
        gcn_arch = detect_real_amd_gpu_arch()
        if not gcn_arch:
            gcn_arch = getattr(torch.cuda.get_device_properties(0), 'gcnArchName', '')

        if gcn_arch and ('gfx1102' in gcn_arch or 'gfx1103' in gcn_arch) and not args.force_gpu:
            print("\n" + "="*80, flush=True)
            print("[WARNING] gfx1102/gfx1103 (Radeon 780M) detected — GPU training is NOT stable by default!")
            print("Switching to CPU training for stability.", flush=True)
            device = 'cpu'

    # Resolve AMP setting
    if args.amp is None:
        use_amp = not (has_amd_system and device != 'cpu')
    else:
        use_amp = args.amp

    # Build / load model architecture (P2 head support)
    if args.p2:
        base_name = os.path.basename(model_path)
        if base_name.startswith('yolov8'):
            # extract scale character, e.g. 'yolov8m.pt' -> 'm'
            scale = base_name[6] # 'n', 's', 'm', 'l', 'x'
            if scale in ['n', 's', 'm', 'l', 'x']:
                p2_yaml = f"yolov8{scale}-p2.yaml"
                print(f"Building P2 (stride-4) model architecture from {p2_yaml}...", flush=True)
                model = YOLO(p2_yaml)
                print(f"Loading pretrained backbone weights from {model_path} for transfer learning...", flush=True)
                model.load(model_path)
            else:
                print(f"Warning: Could not determine YOLOv8 scale from '{base_name}'. Loading standard model.", flush=True)
                model = YOLO(model_path)
        else:
            print(f"Warning: Stride-4 (P2) architecture is natively supported for YOLOv8 models.", flush=True)
            print(f"Model '{base_name}' is not YOLOv8. Loading standard model instead.", flush=True)
            model = YOLO(model_path)
    else:
        print(f"Loading standard YOLO model from: {model_path}...", flush=True)
        model = YOLO(model_path)

    # Train the model (Transfer learning with small-object tuning)
    print(f"\n--- Starting YOLO Tiny-Object Training ({args.epochs} epochs, amp={use_amp}) ---", flush=True)
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
        multi_scale=args.multi_scale,
        amp=use_amp,
        workers=args.workers,
        fl_gamma=args.fl_gamma,
        freeze=args.freeze,
        optimizer=args.optimizer,
        lr0=args.lr0,
        box=args.box,
        cls=args.cls,
        dfl=args.dfl,
    )

    print("\n--- Starting Model Validation ---", flush=True)
    metrics = model.val(device=device)
    print("Validation mAP50-95:", metrics.box.map, flush=True)
    
    # Export to ONNX
    print(f"\n--- Exporting model to ONNX ---", flush=True)
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
