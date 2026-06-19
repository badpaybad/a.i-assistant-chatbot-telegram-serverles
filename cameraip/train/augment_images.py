#!/usr/bin/env python3
import os
import sys
import argparse
import cv2
import numpy as np

# Supported image extensions
IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.webp', '.JPG', '.PNG', '.JPEG')

def parse_args():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_src = os.path.join(script_dir, 'dataraw_original')
    default_dest = os.path.join(script_dir, 'augmented_image')
    
    parser = argparse.ArgumentParser(description="Augment raw images for CVAT labeling (flips & rotations)")
    parser.add_argument('--src', type=str, default=default_src, help='Source folder containing original raw images')
    parser.add_argument('--dest', type=str, default=default_dest, help='Destination folder to save augmented images')
    parser.add_argument('--copy-original', action='store_true', default=True, help='Copy original images to destination (default: True)')
    parser.add_argument('--no-copy-original', action='store_false', dest='copy_original', help='Do not copy original images to destination')
    return parser.parse_args()

def rotate_image(image, angle):
    """
    Rotates an image by a given angle (in degrees) without cropping the corners.
    Pads the corners with black color.
    """
    (h, w) = image.shape[:2]
    (cX, cY) = (w // 2, h // 2)

    # Get the rotation matrix
    M = cv2.getRotationMatrix2D((cX, cY), angle, 1.0)
    
    # Grab the sine and cosine of the rotation matrix (rotation components)
    cos = np.abs(M[0, 0])
    sin = np.abs(M[0, 1])

    # Compute new bounding dimensions of the image to prevent cropping
    nW = int((h * sin) + (w * cos))
    nH = int((h * cos) + (w * sin))

    # Adjust the rotation matrix to take translation into account
    M[0, 2] += (nW / 2) - cX
    M[1, 2] += (nH / 2) - cY

    # Perform the actual rotation and return the image
    return cv2.warpAffine(image, M, (nW, nH), borderValue=(0, 0, 0))

def main():
    args = parse_args()
    
    if not os.path.exists(args.src):
        print(f"Error: Source directory '{args.src}' does not exist.")
        print("Please create the folder and put your raw images there first.")
        sys.exit(1)
        
    os.makedirs(args.dest, exist_ok=True)
    
    # Scan for images
    img_files = []
    for filename in os.listdir(args.src):
        if filename.lower().endswith(IMAGE_EXTENSIONS):
            img_files.append(filename)
            
    total_images = len(img_files)
    if total_images == 0:
        print(f"Warning: No images found in '{args.src}' with extensions {IMAGE_EXTENSIONS}.")
        sys.exit(1)
        
    print(f"Found {total_images} original images in '{args.src}'. Starting augmentation...")
    print(f"Augmented images will be saved to '{args.dest}'.\n")
    
    augmented_count = 0
    copied_count = 0
    
    for filename in img_files:
        src_path = os.path.join(args.src, filename)
        base_name, ext = os.path.splitext(filename)
        
        # Load image
        img = cv2.imread(src_path)
        if img is None:
            print(f"Warning: Could not read image '{src_path}'. Skipping.")
            continue
            
        # 1. Copy Original (if requested)
        if args.copy_original:
            dest_path = os.path.join(args.dest, f"{base_name}_original{ext}")
            cv2.imwrite(dest_path, img)
            copied_count += 1
            
        # 2. Horizontal Flip
        flip_h = cv2.flip(img, 1)
        dest_path = os.path.join(args.dest, f"{base_name}_flip_h{ext}")
        cv2.imwrite(dest_path, flip_h)
        augmented_count += 1
        
        # 3. Vertical Flip
        flip_v = cv2.flip(img, 0)
        dest_path = os.path.join(args.dest, f"{base_name}_flip_v{ext}")
        cv2.imwrite(dest_path, flip_v)
        augmented_count += 1
        
        # 4. Rotations: ±15, ±30, ±45 degrees
        rotations = [
            (15, "rot_15_l"),    # 15 degrees left (counter-clockwise)
            (-15, "rot_15_r"),   # 15 degrees right (clockwise)
            (30, "rot_30_l"),    # 30 degrees left
            (-30, "rot_30_r"),   # 30 degrees right
            (45, "rot_45_l"),    # 45 degrees left
            (-45, "rot_45_r"),   # 45 degrees right
        ]
        
        for angle, suffix in rotations:
            rotated = rotate_image(img, angle)
            dest_path = os.path.join(args.dest, f"{base_name}_{suffix}{ext}")
            cv2.imwrite(dest_path, rotated)
            augmented_count += 1
            
        print(f"Processed: {filename} -> Generated {len(rotations) + 2} variations.")
        
    print(f"\nAugmentation completed successfully!")
    print(f"Original copied: {copied_count}")
    print(f"Augmented images generated: {augmented_count}")
    print(f"Total files in destination: {copied_count + augmented_count}")

if __name__ == "__main__":
    main()
