#!/usr/bin/env python3
import os
import cv2
import glob

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dataraw_dir = os.path.join(script_dir, 'dataraw')
    output_dir = os.path.join(script_dir, 'debug_original_labels')
    
    if not os.path.exists(dataraw_dir):
        print(f"Error: dataraw directory not found at {dataraw_dir}")
        return
        
    os.makedirs(output_dir, exist_ok=True)
    print(f"Saving verified images to: {output_dir}")
    
    image_exts = ('*.jpg', '*.jpeg', '*.png', '*.bmp', '*.webp', '*.JPG', '*.PNG', '*.JPEG')
    image_paths = []
    for ext in image_exts:
        image_paths.extend(glob.glob(os.path.join(dataraw_dir, '**', ext), recursive=True))
        
    print(f"Found {len(image_paths)} images in dataraw.")
    
    count = 0
    for img_path in image_paths:
        base_name = os.path.splitext(os.path.basename(img_path))[0]
        lbl_path = os.path.join(os.path.dirname(img_path), f"{base_name}.txt")
        
        if not os.path.exists(lbl_path):
            continue
            
        img = cv2.imread(img_path)
        if img is None:
            print(f"Warning: Failed to load image {img_path}")
            continue
            
        H, W = img.shape[:2]
        
        # Read labels
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
                
                # Draw box
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                # Draw label text
                cv2.putText(img, f"class_{cid}", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                
        out_path = os.path.join(output_dir, f"{base_name}_verified.jpg")
        cv2.imwrite(out_path, img)
        count += 1
        
    print(f"Processed {count} images and saved to {output_dir}")

if __name__ == '__main__':
    main()
