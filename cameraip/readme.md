unzip -o /work/4567.zip -d /work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/dataraw
unzip -o /work/1234.zip -d /work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/dataraw

7z x /work/4567.zip -o/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/dataraw -aoa

venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8

# Huấn luyện mô hình YOLO11 Medium với đầu P2 Stride-4 chuyên dụng trên GPU NVIDIA

venv/bin/python cameraip/train/train_yolo_tiny.py --data cameraip/train/data/dataset.yaml --model yolo11s.pt --epochs 80 --batch 4 --device cuda --p2



unzip -o dataraw.zip -d dataraw