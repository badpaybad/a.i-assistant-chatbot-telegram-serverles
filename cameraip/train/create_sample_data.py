#!/usr/bin/env python3
import os
import sys
from PIL import Image, ImageDraw

def main():
    # Paths are relative to the folder of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dataraw_dir = os.path.join(script_dir, 'dataraw')
    images_dir = os.path.join(dataraw_dir, 'images')
    labels_dir = os.path.join(dataraw_dir, 'labels')

    # Create directories
    os.makedirs(images_dir, exist_ok=True)
    os.makedirs(labels_dir, exist_ok=True)

    print(f"Creating sample dataraw dataset at: {dataraw_dir}")

    # Define some samples: (color, class_id, class_name, x_center, y_center, width, height)
    samples = [
        ("red", 0, "red_rectangle", 0.5, 0.5, 0.4, 0.4),
        ("green", 1, "green_rectangle", 0.5, 0.5, 0.4, 0.4),
        ("blue", 2, "blue_rectangle", 0.3, 0.3, 0.3, 0.3),
        ("yellow", 3, "yellow_rectangle", 0.7, 0.7, 0.3, 0.3),
        ("red", 0, "red_rectangle", 0.25, 0.25, 0.2, 0.2),
        ("green", 1, "green_rectangle", 0.75, 0.75, 0.2, 0.2),
        ("blue", 2, "blue_rectangle", 0.5, 0.25, 0.3, 0.2),
        ("yellow", 3, "yellow_rectangle", 0.5, 0.75, 0.3, 0.2),
        ("red", 0, "red_rectangle", 0.4, 0.6, 0.25, 0.3),
        ("green", 1, "green_rectangle", 0.6, 0.4, 0.3, 0.25)
    ]

    for i, (color, class_id, class_name, x_c, y_c, w, h) in enumerate(samples, 1):
        img_filename = f"sample_{i}.jpg"
        lbl_filename = f"sample_{i}.txt"

        img_path = os.path.join(images_dir, img_filename)
        lbl_path = os.path.join(labels_dir, lbl_filename)

        # Image details
        img_w, img_h = 640, 640
        # Background: dark gray
        image = Image.new("RGB", (img_w, img_h), color=(30, 30, 30))
        draw = ImageDraw.Draw(image)

        # Bounding box coordinates in pixels
        x1 = int((x_c - w / 2) * img_w)
        y1 = int((y_c - h / 2) * img_h)
        x2 = int((x_c + w / 2) * img_w)
        y2 = int((y_c + h / 2) * img_h)

        # Draw the solid rectangle
        draw.rectangle([x1, y1, x2, y2], fill=color, outline="white", width=3)

        # Save image
        image.save(img_path, "JPEG")

        # Save YOLO format label: class_id x_center y_center width height
        with open(lbl_path, 'w') as f:
            f.write(f"{class_id} {x_c:.6f} {y_c:.6f} {w:.6f} {h:.6f}\n")

    print(f"Successfully generated 10 sample image-annotation pairs in {dataraw_dir}.")

if __name__ == "__main__":
    main()
