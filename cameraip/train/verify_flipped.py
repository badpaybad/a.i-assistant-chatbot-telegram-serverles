#!/usr/bin/env python3
import os
import cv2
import glob

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(script_dir, 'data')
    output_dir = os.path.join(script_dir, 'debug_original_labels')
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Find all flip images in data/images/train
    flip_images = glob.glob(os.path.join(data_dir, 'images', 'train', '*_flip.jpg'))
    if not flip_images:
        print("No flipped images found in data/images/train/.")
        return
        
    print(f"Found {len(flip_images)} flipped images. Verifying first 5...")
    
    for img_path in flip_images[:5]:
        base_name = os.path.splitext(os.path.basename(img_path))[0]
        lbl_path = os.path.join(data_dir, 'labels', 'train', f"{base_name}.txt")
        
        if not os.path.exists(lbl_path):
            print(f"Warning: Label not found for flipped image: {lbl_path}")
            continue
            
        img = cv2.imread(img_path)
        if img is None:
            continue
            
        H, W = img.shape[:2]
        
        with open(lbl_path, 'r') as f:
            for line in f:
                parts = line.strip().split()
                if len(parts) < 5:
                    continue
                cid = int(parts[0])
                cx = float(parts[1])
                cy = float(parts[2])
                w = float(parts[3])
                h = float(parts[4])
                
                # Convert to pixel coordinates
                x1 = int((cx - w/2) * W)
                y1 = int((cy - h/2) * H)
                x2 = int((cx + w/2) * W)
                y2 = int((cy + h/2) * H)
                
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)  # Draw flipped in Red
                cv2.putText(img, f"flip_{cid}", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                
        out_path = os.path.join(output_dir, f"{base_name}_verified.jpg")
        cv2.imwrite(out_path, img)
        print(f"Saved verified flipped image to: {out_path}")

if __name__ == '__main__':
    main()
