#!/usr/bin/env python3
import os
import sys
import argparse
from ultralytics import YOLO

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
    
    # Resolve device to support both CPU and GPU (fallback gracefully)
    device = args.device
    if device:
        device_lower = device.lower().strip()
        if device_lower == 'gpu':
            import torch
            if torch.cuda.is_available():
                device = 'cuda'
                print("Using CUDA (GPU) as requested by '--device gpu'.", flush=True)
            else:
                print("Warning: GPU requested ('--device gpu') but CUDA is not available. Falling back to CPU.", flush=True)
                device = 'cpu'
        elif device_lower == 'cpu':
            device = 'cpu'
            print("Using CPU as requested by '--device cpu'.", flush=True)
        else:
            # Check if CUDA device requested (e.g. 'cuda', '0', '0,1') but not available
            import torch
            if ('cuda' in device_lower or device_lower.isdigit() or ',' in device_lower):
                if torch.cuda.is_available():
                    print(f"Using CUDA device '{device}' as requested.", flush=True)
                else:
                    print(f"Warning: CUDA device '{device}' requested but CUDA is not available. Falling back to CPU.", flush=True)
                    device = 'cpu'
            else:
                print(f"Using requested device: '{device}'", flush=True)
    else:
        # Auto-detect device
        import torch
        if torch.cuda.is_available():
            device = 'cuda'
            print("Auto-detected GPU (CUDA) for training. To use CPU instead, pass '--device cpu'.", flush=True)
        else:
            device = 'cpu'
            print("Auto-detected CPU for training (No GPU/CUDA available).", flush=True)

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
