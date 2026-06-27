export PYTORCH_ROCM_ARCH=gfx1102

git clone --recursive <https://github.com/pytorch/pytorch>
cd pytorch

# Chuyển đổi mã nguồn từ CUDA sang ROCm (HIPify)

python3 tools/amd_build/build_amd.py

# Tiến hành compile (Quá trình này có thể mất từ 30-60 phút tùy CPU)

python3 setup.py install

# 1. Khai báo kiến trúc đồ họa cho AMD 780M của 8845H

export PYTORCH_ROCM_ARCH=gfx1102

# 2. Kích hoạt môi trường ảo (Virtual Environment) của bạn

source /work/a.i-assistant-chatbot-telegram-serverles/venv/bin/activate

# 3. Đảm bảo pip, setuptools và wheel trong venv ở bản mới nhất

pip install --upgrade pip setuptools wheel

# 4. Di chuyển vào thư mục nguồn PyTorch đã clone

cd /path/to/pytorch # Thay bằng đường dẫn thực tế đến thư mục pytorch bạn vừa clone

# 5. Chạy script HIPify để chuyển đổi CUDA sang ROCm

python3 tools/amd_build/build_amd.py

# 6. Tiến hành cài đặt trực tiếp vào venv đang active

# Sử dụng 'develop' hoặc 'install'. Lệnh này sẽ tự compile và đưa vào site-packages của venv

python3 setup.py install

# Cài đặt trước các gói phụ thuộc (Dependencies)

source /work/a.i-assistant-chatbot-telegram-serverles/venv/bin/activate
pip install numpy pyyaml mkl mkl-include LOGURU typing_extensions juicebox-asm

cd /vm/pytorch && export PYTORCH_ROCM_ARCH=gfx1102 && export MAX_JOBS=4 && source /work/a.i-assistant-chatbot-telegram-serverles/venv/bin/activate && python3 tools/amd_build/build_amd.py && python3 setup.py install

cd /vm/pytorch && export PYTORCH_ROCM_ARCH=gfx1102 && export MAX_JOBS=4 && env -C /vm/pytorch /work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python3 setup.py install

/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python3 -c "import torchvision._C"

/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/pip install --force-reinstall torch torchvision torchaudio --index-url <https://download.pytorch.org/whl/rocm6.2>

# Kiểm tra sau khi cài đặt thành công

/work/a.i-assistant-chatbot-telegram-serverles/venv/bin/python3 -c "import torch; print('ROCm available:', torch.cuda.is_available()); print('Device Name:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"

# # 1. Cập nhật pip trong venv lên bản mới nhất

pip install --upgrade pip

# 2. Cài đặt gói mở rộng ROCm cho dòng chip gfx110X (Bao gồm gfx1102)

pip install --index-url <https://repo.amd.com/rocm/whl/gfx110X-all/> "rocm[libraries,devel]"

# 3. Cài đặt PyTorch Nightly có tích hợp sẵn cấu trúc đồ họa này

# 1. Gỡ bỏ bản PyTorch cũ để dọn dẹp bộ nhớ cache

pip uninstall -y torch torchvision torchaudio

# 2. Cài đặt lại bản sạch (Clean Install) từ kho Nightly của AMD cho gfx110X

python -m pip install --index-url <https://rocm.nightlies.amd.com/v2/gfx110X-all/> --pre torch torchaudio torchvision

unset HSA_OVERRIDE_GFX_VERSION
unset PYTORCH_ROCM_ARCH

# 1. Ép cài đặt phiên bản OpenCV cũ hơn (tương thích hoàn hảo với NumPy 1.x)

pip install "opencv-python<4.10" "opencv-contrib-python<4.10" "opencv-python-headless<4.10"

# 2. Hạ cấp nhẹ thư viện Kokoro-ONNX xuống phiên bản hỗ trợ NumPy 1.x

pip install "kokoro-onnx<0.4.0"

# 3. Kiểm tra và cố định lại bản NumPy ổn định mà OpenVINO cần

pip install "numpy==1.26.4"

---

## 4. Xử Lý Lỗi Treo Máy (System Freeze/GPU Hang) Khi Train Trên GPU Radeon 780M (gfx1103)

Khi chạy huấn luyện với tham số `--force-gpu`, hệ thống có thể bị treo cứng (freeze hoàn toàn, chuột bàn phím không hoạt động). Đây là lỗi Driver/Kernel ở mức phần cứng liên quan đến cơ chế lập lịch **MES (Microcode Engine Scheduler)** và **CWSR (Compute Wave Store & Resume)** của AMD trên dòng APU RDNA3.

Để khắc phục triệt để, bạn cần thực hiện 2 bước sau:

### Bước A: Vô hiệu hóa CWSR (Bắt buộc để tránh treo máy)

Thêm tham số kernel `amdgpu.cwsr_enable=0` để vô hiệu hóa tính năng lưu/phục hồi wave compute vốn đang bị lỗi trên firmware RDNA3 iGPU.

1. **Cấu hình qua GRUB (Linux chính thức):**
   * Mở file cấu hình GRUB:

     ```bash
     sudo nano /etc/default/grub
     ```

   * Tìm dòng `GRUB_CMDLINE_LINUX_DEFAULT` và thêm `amdgpu.cwsr_enable=0` vào cuối chuỗi. Ví dụ:

     ```text
     GRUB_CMDLINE_LINUX_DEFAULT="quiet splash amdgpu.cwsr_enable=0"
     ```

   * Lưu lại và cập nhật GRUB:

     ```bash
     sudo update-grub
     ```

   * Khởi động lại máy.

2. **Cách khác qua Modprobe:**
   * Tạo file cấu hình driver:

     ```bash
     echo "options amdgpu cwsr_enable=0" | sudo tee /etc/modprobe.d/amdgpu.conf
     ```

   * Khởi động lại máy để áp dụng.

### Bước B: Tăng dung lượng bộ nhớ chia sẻ VRAM (UMA Frame Buffer Size) trong BIOS

Radeon 780M là iGPU sử dụng RAM hệ thống làm VRAM. Mặc định BIOS thường để tự động (Auto) hoặc 2GB, dễ gây lỗi phân bổ bộ nhớ dẫn đến sập Driver GPU.

* Khởi động máy vào **BIOS Setup** (nhấn F2, F12 hoặc Del tùy dòng mainboard).
* Tìm mục **UMA Frame Buffer Size** (hoặc **Dedicated VRAM Size**, **Integrated Graphics Share Memory**).
* Đổi giá trị từ `Auto` / `2G` sang **`4G`**, **`8G`** hoặc **`16G`** (khuyên dùng ít nhất **8G** nếu RAM hệ thống của bạn từ 32GB trở lên).
* Lưu cấu hình (F10) và khởi động lại.

```bash
venv/bin/python cameraip/train/train_yolo.py --data cameraip/train/data/dataset.yaml --model yolo26n.pt --epochs 80 --batch 2 --device amd --force-gpu
```
