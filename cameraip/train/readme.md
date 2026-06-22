# Tạo dataset để train, train xuất onnx, sử dụng detect

# cvat để label các ảnh

folder: cameraip/train/dataraw_original

tạo task rồi exported ra file zip

giải nén vào cameraip/train/dataraw

# prepare dataset & yolo train finetune

```bash
# Chạy từ thư mục gốc của dự án:
venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 50 --batch 8 --device cpu


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/3.jpg" --output cameraip/train/3output_detect.jpg --conf 0.25

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/4.jpg" --output cameraip/train/4output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/5.jpg" --output cameraip/train/5output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/6.jpg" --output cameraip/train/6output_detect.jpg --conf 0.1



venv/bin/python3.12 cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8


venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 50 --batch 8 --device gpu

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 8 --device gpu --imgsz 960

venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 8 --device gpu --imgsz 960

venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 4 --device gpu --imgsz 960 --no-multi-scale


```
