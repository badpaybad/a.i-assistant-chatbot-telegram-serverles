Tạo dataset để train, train xuất onnx, sử dụng detect 

```bash
# Chạy từ thư mục gốc của dự án:
venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 50 --batch 8 --device cpu


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/3.jpg" --output cameraip/train/3output_detect.jpg --conf 0.25

```
