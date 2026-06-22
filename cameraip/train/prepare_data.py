#!/usr/bin/env python3
import os
import sys
import shutil
import random
import argparse
import yaml
import cv2

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
    
    # Shuffle pairs to start with a randomized order
    random.shuffle(pairs)
    
    # Track which classes are present in which pairs
    pair_to_classes = {}
    all_classes = set()
    for img_path, lbl_path in pairs:
        classes = set()
        try:
            with open(lbl_path, 'r') as f:
                for line in f:
                    parts = line.strip().split()
                    if parts:
                        classes.add(int(parts[0]))
        except Exception as e:
            print(f"Warning: Failed to parse label file {lbl_path}: {e}")
        pair_to_classes[(img_path, lbl_path)] = classes
        all_classes.update(classes)
        
    # Group pairs by class (preserving the shuffled order of pairs)
    class_to_pairs = {c: [] for c in all_classes}
    for pair in pairs:
        for c in pair_to_classes[pair]:
            class_to_pairs[c].append(pair)
            
    train_set = set()
    val_set = set()
    
    # Pass 1: Handle classes with only 1 image. They must go to both train and val.
    for c in sorted(all_classes):
        class_pairs = class_to_pairs[c]
        if len(class_pairs) == 1:
            pair = class_pairs[0]
            train_set.add(pair)
            val_set.add(pair)
            
    # Pass 2: Handle classes with >= 2 images. Ensure at least one in train and one in val.
    for c in sorted(all_classes):
        class_pairs = class_to_pairs[c]
        if len(class_pairs) >= 2:
            in_train = [p for p in class_pairs if p in train_set]
            in_val = [p for p in class_pairs if p in val_set]
            
            if not in_train and not in_val:
                # No pairs from this class assigned yet.
                # Put the first in train, the second in val.
                train_set.add(class_pairs[0])
                val_set.add(class_pairs[1])
            elif in_train and not in_val:
                # Some are in train, none in val.
                # Find the first pair of this class not in train, and put it in val.
                not_in_train = [p for p in class_pairs if p not in train_set]
                if not_in_train:
                    val_set.add(not_in_train[0])
                else:
                    # Fallback if somehow all are in train (e.g. forced via other classes)
                    val_set.add(class_pairs[0])
            elif not in_train and in_val:
                # Some are in val, none in train.
                # Find the first pair of this class not in val, and put it in train.
                not_in_val = [p for p in class_pairs if p not in val_set]
                if not_in_val:
                    train_set.add(not_in_val[0])
                else:
                    # Fallback if somehow all are in val (e.g. forced via other classes)
                    train_set.add(class_pairs[0])
                    
    # Pass 3: Distribute the remaining completely unassigned pairs
    unassigned_pairs = [p for p in pairs if p not in train_set and p not in val_set]
    
    # Calculate target number of training pairs based on split ratio and total unique pairs
    target_train_total = int(total_found * args.split)
    if target_train_total == 0 and total_found > 0:
        target_train_total = 1
        
    needed_train = max(0, target_train_total - len(train_set))
    
    for i, pair in enumerate(unassigned_pairs):
        if i < needed_train:
            train_set.add(pair)
        else:
            val_set.add(pair)
            
    # Convert sets to sorted lists to maintain consistent/predictable order
    train_pairs = sorted(list(train_set), key=lambda x: x[0])
    val_pairs = sorted(list(val_set), key=lambda x: x[0])
    
    # If validation set is empty, reuse training set for validation to prevent crashes
    if len(val_pairs) == 0 and len(train_pairs) > 0:
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
            # Process image to grayscale
            img_dest = os.path.join(args.dest, 'images', subset, os.path.basename(img_path))
            try:
                img = cv2.imread(img_path)
                if img is not None:
                    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                    # Convert back to 3 channels to keep compatibility with standard YOLO models
                    gray_3ch = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
                    cv2.imwrite(img_dest, gray_3ch)
                else:
                    shutil.copy2(img_path, img_dest)
            except Exception as e:
                print(f"Warning: Failed to convert {img_path} to grayscale, copying original instead. Error: {e}")
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
