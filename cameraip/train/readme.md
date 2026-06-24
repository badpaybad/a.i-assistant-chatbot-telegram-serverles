# Tạo dataset để train, train xuất onnx, sử dụng detect

# cvat để label các ảnh

folder: cameraip/train/dataraw_original

tạo task rồi exported ra file zip

giải nén vào cameraip/train/dataraw

# prepare dataset & yolo train finetune

```bash
# Chạy từ thư mục gốc của dự án:
unset HSA_OVERRIDE_GFX_VERSION
unset PYTORCH_ROCM_ARCH
venv/bin/python cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 8 --device cuda

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 100 --batch 8 --device cuda

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 50 --batch 8 --device cpu

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 50 --batch 4 --device amd
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 8 --device cpu

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/3.jpg" --output cameraip/train/3output_detect.jpg --conf 0.25

venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/4.jpg" --output cameraip/train/4output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/5.jpg" --output cameraip/train/5output_detect.jpg --conf 0.25


venv/bin/python cameraip/train/detect_onnx.py --model cameraip/train/runs/detect/train/weights/best.onnx --image "/work/a.i-assistant-chatbot-telegram-serverles/cameraip/train/6.jpg" --output cameraip/train/6output_detect.jpg --conf 0.1



venv/bin/python3.12 cameraip/train/prepare_data.py --src cameraip/train/dataraw --dest cameraip/train/data --split 0.8


venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 50 --batch 8 --device gpu

venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 8 --device gpu --imgsz 960

# Train trên NVIDIA GPU (ví dụ: RTX 3060 / 3060 Ti) với tối ưu hóa bộ nhớ
export PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolov8m.pt --epochs 80 --batch 8 --device cuda --imgsz 640

venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 8 --device gpu --imgsz 960

venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 4 --device gpu --imgsz 960 --no-multi-scale

venv/bin/python3.12 cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 80 --batch 8 --device gpu --imgsz 640

# export HSA_OVERRIDE_GFX_VERSION=11.0.2 && export PYTORCH_ROCM_ARCH=gfx1102 && venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26m.pt --epochs 100 --batch 4 --device amd --imgsz 640

# export HSA_OVERRIDE_GFX_VERSION=11.0.0 && export PYTORCH_ROCM_ARCH=gfx1100 && venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 4 --device amd --imgsz 640

unset HSA_OVERRIDE_GFX_VERSION
unset PYTORCH_ROCM_ARCH

export MIOPEN_FIND_ENFORCE=NONE && export HSA_XNACK=1 && export MIOPEN_DEBUG_DISABLE_FIND_DB=1 && export HSA_ENABLE_SDMA=0 && export PYTORCH_HIP_ALLOC_CONF=max_split_size_mb:128 && venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 2 --device amd --imgsz 640

# 1. Sửa lại giá trị đúng chuẩn cho MIOpen (Dùng chuỗi chữ thay vì số)
export MIOPEN_FIND_ENFORCE=NONE

# 2. Giữ nguyên 2 biến môi trường giúp ổn định iGPU ổn định đã thiết lập
export HSA_XNACK=1
export MIOPEN_DEBUG_DISABLE_FIND_DB=1

# 3. Chạy lại lệnh Train
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 2 --device amd

# 1. Xóa toàn bộ các biến môi trường cấu hình GPU để giải phóng Driver
unset HSA_OVERRIDE_GFX_VERSION
unset HSA_XNACK
unset MIOPEN_FIND_ENFORCE
unset MIOPEN_DEBUG_DISABLE_FIND_DB

# 2. Thực hiện lệnh train bằng CPU
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26s.pt --epochs 100 --batch 4 --device cpu


# 1. Ép cài đặt phiên bản OpenCV cũ hơn (tương thích hoàn hảo với NumPy 1.x)
pip install "opencv-python<4.10" "opencv-contrib-python<4.10" "opencv-python-headless<4.10"

# 2. Hạ cấp nhẹ thư viện Kokoro-ONNX xuống phiên bản hỗ trợ NumPy 1.x
pip install "kokoro-onnx<0.4.0"

# 3. Kiểm tra và cố định lại bản NumPy ổn định mà OpenVINO cần
pip install "numpy==1.26.4"