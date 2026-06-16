#!/usr/bin/env python3
import os
import sys
import shutil
import random
import argparse
import yaml

# Supported image extensions
IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.webp', '.JPG', '.PNG', '.JPEG')

def parse_args():
    parser = argparse.ArgumentParser(description="Prepare YOLO dataset from raw images and annotations")
    parser.add_argument('--src', type=str, default='dataraw', help='Source raw directory containing images and .txt annotations')
    parser.add_argument('--dest', type=str, default='data', help='Destination directory for YOLO formatted dataset')
    parser.add_argument('--split', type=float, default=0.8, help='Train/validation split ratio (default: 0.8)')
    parser.add_argument('--seed', type=int, default=42, help='Random seed for shuffling (default: 42)')
    return parser.parse_args()

def main():
    args = parse_args()
    
    # Set random seed
    random.seed(args.seed)
    
    # Ensure source directory exists
    if not os.path.exists(args.src):
        print(f"Error: Source directory '{args.src}' does not exist.")
        sys.exit(1)
        
    print(f"Scanning source directory: {args.src}...")
    
    # Check if we have standard layout (images/ and labels/) or a flat layout
    images_dir = os.path.join(args.src, 'images')
    labels_dir = os.path.join(args.src, 'labels')
    
    pairs = []
    
    if os.path.isdir(images_dir) and os.path.isdir(labels_dir):
        # Nested directory layout
        for filename in os.listdir(images_dir):
            if filename.lower().endswith(IMAGE_EXTENSIONS):
                img_path = os.path.join(images_dir, filename)
                # Corresponding label path
                base_name = os.path.splitext(filename)[0]
                lbl_path = os.path.join(labels_dir, f"{base_name}.txt")
                if os.path.exists(lbl_path):
                    pairs.append((img_path, lbl_path))
    else:
        # Recursive directory search - check all subfolders in args.src (like obj_train_data/ or flat layout)
        for root, dirs, files in os.walk(args.src):
            for filename in files:
                if filename.lower().endswith(IMAGE_EXTENSIONS):
                    img_path = os.path.join(root, filename)
                    base_name = os.path.splitext(filename)[0]
                    lbl_path = os.path.join(root, f"{base_name}.txt")
                    if os.path.exists(lbl_path):
                        pairs.append((img_path, lbl_path))
                    
    total_found = len(pairs)
    if total_found == 0:
        print(f"Warning: No valid image-annotation pairs found in '{args.src}'.")
        print("Please ensure you have image files and corresponding YOLO .txt label files with the same name.")
        sys.exit(1)
        
    print(f"Found {total_found} valid image-annotation pairs.")
    
    # Shuffle and split
    random.shuffle(pairs)
    split_idx = int(total_found * args.split)
    
    # Ensure at least 1 image is in the training set if total_found >= 1
    if split_idx == 0 and total_found > 0:
        split_idx = 1
        
    train_pairs = pairs[:split_idx]
    val_pairs = pairs[split_idx:]
    
    # If validation set is empty, reuse training set for validation to prevent crashes
    if len(val_pairs) == 0 and total_found > 0:
        val_pairs = train_pairs.copy()
        
    print(f"Split ratio: {args.split:.2f} | Train: {len(train_pairs)} pairs | Val: {len(val_pairs)} pairs")
    
    # Create output directories (clean them first if they exist to avoid mixing old data)
    subdirs = [
        'images/train', 'images/val',
        'labels/train', 'labels/val'
    ]
    for subdir in subdirs:
        target_path = os.path.join(args.dest, subdir)
        if os.path.exists(target_path):
            shutil.rmtree(target_path)
        os.makedirs(target_path, exist_ok=True)
        
    # Function to copy pairs
    def copy_pairs(pairs_list, subset):
        max_class_id = -1
        for img_path, lbl_path in pairs_list:
            # Copy image
            img_dest = os.path.join(args.dest, 'images', subset, os.path.basename(img_path))
            shutil.copy2(img_path, img_dest)
            
            # Copy label
            lbl_dest = os.path.join(args.dest, 'labels', subset, os.path.basename(lbl_path))
            shutil.copy2(lbl_path, lbl_dest)
            
            # Parse label to detect max class ID for dataset.yaml helper
            try:
                with open(lbl_path, 'r') as f:
                    for line in f:
                        parts = line.strip().split()
                        if parts:
                            class_id = int(parts[0])
                            if class_id > max_class_id:
                                max_class_id = class_id
            except Exception as e:
                print(f"Warning: Failed to parse label file {lbl_path}: {e}")
                
        return max_class_id

    # Copy train and val
    print("Copying training set...")
    train_max_class = copy_pairs(train_pairs, 'train')
    print("Copying validation set...")
    val_max_class = copy_pairs(val_pairs, 'val')
    
    # Determine classes to write to dataset.yaml
    max_class_id = max(train_max_class, val_max_class)
    num_classes = max_class_id + 1 if max_class_id >= 0 else 1
    
    # Read class names from obj.names if available, otherwise use defaults
    class_names = {}
    names_path = os.path.join(args.src, 'obj.names')
    if os.path.exists(names_path):
        try:
            with open(names_path, 'r') as f:
                lines = [line.strip() for line in f if line.strip()]
                for i, name in enumerate(lines):
                    class_names[i] = name
            print(f"Loaded class names from {names_path}: {list(class_names.values())}")
        except Exception as e:
            print(f"Warning: Failed to read class names from {names_path}: {e}")
            
    # Fallback to placeholders for any missing class indices
    for i in range(num_classes):
        if i not in class_names:
            class_names[i] = f"class_{i}"
    
    # Create dataset.yaml
    dest_abs = os.path.abspath(args.dest)
    dataset_config = {
        'path': dest_abs,
        'train': 'images/train',
        'val': 'images/val',
        'names': class_names
    }
    
    yaml_path = os.path.join(args.dest, 'dataset.yaml')
    with open(yaml_path, 'w') as f:
        yaml.safe_dump(dataset_config, f, default_flow_style=False, sort_keys=False)
        
    print("\nDataset preparation completed successfully!")
    print(f"Prepared dataset directory: {dest_abs}")
    print(f"Created config file: {yaml_path}")
    print(f"Detected classes (auto-assigned placeholders): {list(class_names.values())}")
    print("Please check/edit the 'names' mapping in 'dataset.yaml' to reflect your actual object class names.")

if __name__ == "__main__":
    main()
