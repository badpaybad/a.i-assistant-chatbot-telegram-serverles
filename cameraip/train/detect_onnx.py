#!/usr/bin/env python3
import os
import sys
import argparse
import cv2
import numpy as np
import onnxruntime as ort

def parse_args():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    default_model = os.path.join(script_dir, 'runs', 'detect', 'train', 'weights', 'best.onnx')
    
    parser = argparse.ArgumentParser(description="Inference using exported YOLO ONNX model")
    parser.add_argument('--model', type=str, default=default_model, help='Path to ONNX model')
    parser.add_argument('--image', type=str, required=True, help='Path to input image')
    parser.add_argument('--output', type=str, default='output_detect.jpg', help='Path to save output image')
    parser.add_argument('--conf', type=float, default=0.25, help='Confidence threshold')
    parser.add_argument('--iou', type=float, default=0.45, help='IoU threshold for NMS')
    return parser.parse_args()

def letterbox(img, new_shape=(640, 640), color=(114, 114, 114)):
    """Resizes and pads image while keeping aspect ratio."""
    shape = img.shape[:2]  # current shape [height, width]
    if isinstance(new_shape, int):
        new_shape = (new_shape, new_shape)

    # Scale ratio (new / old)
    r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])

    # Compute padding
    new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
    dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding

    dw /= 2  # divide padding into 2 sides
    dh /= 2

    if shape[::-1] != new_unpad:  # resize
        img = cv2.resize(img, new_unpad, interpolation=cv2.INTER_LINEAR)
    top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
    left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
    img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
    return img, r, (dw, dh)

def main():
    args = parse_args()

    # Verify model path
    if not os.path.exists(args.model):
        print(f"Error: ONNX model '{args.model}' not found.")
        sys.exit(1)

    # Verify image path
    if not os.path.exists(args.image):
        print(f"Error: Input image '{args.image}' not found.")
        sys.exit(1)

    print(f"Loading ONNX session: {args.model}...")
    # Load ONNX session (CPU execution provider is standard and compatible)
    session = ort.InferenceSession(args.model, providers=['CPUExecutionProvider'])
    
    # Get model input names and shapes
    inputs = session.get_inputs()
    input_name = inputs[0].name
    input_shape = inputs[0].shape
    print(f"Model Input name: {input_name}, shape: {input_shape}")
    
    # Target height and width from model metadata
    img_h, img_w = input_shape[2], input_shape[3]

    # Load original image
    original_img = cv2.imread(args.image)
    if original_img is None:
        print(f"Error: Could not read image '{args.image}'.")
        sys.exit(1)

    # Convert original image to 3-channel grayscale for inference (prevent color bias)
    gray_img = cv2.cvtColor(original_img, cv2.COLOR_BGR2GRAY)
    gray_3ch = cv2.cvtColor(gray_img, cv2.COLOR_GRAY2BGR)

    # Preprocess image with letterbox using the grayscale image
    pad_img, r, (dw, dh) = letterbox(gray_3ch, (img_h, img_w))
    
    # Convert BGR to RGB
    rgb_img = cv2.cvtColor(pad_img, cv2.COLOR_BGR2RGB)
    
    # Normalize to [0.0, 1.0] and transpose to [C, H, W]
    blob = rgb_img.astype(np.float32) / 255.0
    blob = np.transpose(blob, (2, 0, 1))
    
    # Add batch dimension: [1, C, H, W]
    blob = np.expand_dims(blob, axis=0)

    # Run inference
    print("Running model inference...")
    outputs = session.run(None, {input_name: blob})
    
    # Check output structure dynamically
    raw_output = outputs[0][0]  # Get output for batch 0
    print(f"Model Output shape: {raw_output.shape}")
    
    boxes = []
    confidences = []
    class_ids = []

    # Format 1: YOLO26 / End-to-End models with shape [max_detections, 6]
    # Each row is: [x1, y1, x2, y2, confidence, class_id]
    if len(raw_output.shape) == 2 and raw_output.shape[1] == 6:
        print("Parsing using YOLO26 (End-to-End) output format...")
        for row in raw_output:
            confidence = float(row[4])
            if confidence > args.conf:
                x1, y1, x2, y2 = row[:4]
                w = x2 - x1
                h = y2 - y1
                boxes.append([float(x1), float(y1), float(w), float(h)])
                confidences.append(confidence)
                class_ids.append(int(row[5]))
                
    # Format 2: YOLOv8 / YOLO11 models with shape [4 + num_classes, num_anchors]
    else:
        print("Parsing using standard YOLOv8/YOLO11 output format...")
        # Transpose to [num_anchors, 4 + num_classes]
        output = np.transpose(raw_output)
        for row in output:
            scores = row[4:]
            class_id = np.argmax(scores)
            confidence = float(scores[class_id])
            
            if confidence > args.conf:
                # Box is center_x, center_y, width, height (relative to model input size)
                xc, yc, w, h = row[:4]
                # Convert to top-left x, top-left y, width, height
                x1 = xc - w / 2
                y1 = yc - h / 2
                
                boxes.append([float(x1), float(y1), float(w), float(h)])
                confidences.append(confidence)
                class_ids.append(int(class_id))

    # Apply Non-Maximum Suppression (NMS)
    print(f"Applying Non-Maximum Suppression (NMS) with conf={args.conf}, iou={args.iou}...")
    indices = cv2.dnn.NMSBoxes(boxes, confidences, args.conf, args.iou)
    
    # Draw detections
    detected_count = 0
    if len(indices) > 0:
        # Flatten index list depending on return shape
        indices = indices.flatten() if hasattr(indices, 'flatten') else [i[0] if isinstance(i, (list, tuple, np.ndarray)) else i for i in indices]
        
        # Draw bounding boxes
        for i in indices:
            box = boxes[i]
            conf = confidences[i]
            cid = class_ids[i]
            
            # Remove padding and rescale to original coordinates
            x1 = (box[0] - dw) / r
            y1 = (box[1] - dh) / r
            w_box = box[2] / r
            h_box = box[3] / r
            
            # Map box to pixel coordinates
            ix1 = max(0, int(round(x1)))
            iy1 = max(0, int(round(y1)))
            ix2 = min(original_img.shape[1], int(round(x1 + w_box)))
            iy2 = min(original_img.shape[0], int(round(y1 + h_box)))
            
            # Choose border color based on class
            # Red, Green, Blue, Yellow colors in BGR
            colors = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (0, 255, 255)]
            color = colors[cid % len(colors)]
            
            label = f"Class {cid}: {conf:.2f}"
            
            # Draw rectangle
            cv2.rectangle(original_img, (ix1, iy1), (ix2, iy2), color, 2)
            
            # Draw text label
            label_sz, base_line = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            iy1_text = max(iy1, label_sz[1] + 5)
            cv2.rectangle(original_img, (ix1, iy1_text - label_sz[1] - 5), (ix1 + label_sz[0], iy1_text + base_line - 5), color, -1)
            cv2.putText(original_img, label, (ix1, iy1_text - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            
            detected_count += 1
            print(f"Detected: {label} at bbox: [{ix1}, {iy1}, {ix2}, {iy2}]")
            
    print(f"Total detections: {detected_count}")
    
    # Save the output image
    cv2.imwrite(args.output, original_img)
    print(f"Output image saved successfully to: {args.output}")

if __name__ == "__main__":
    main()
