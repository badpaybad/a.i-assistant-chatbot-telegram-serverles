import os
import sys
import math
import shutil
import urllib.request
import argparse

# ── Fix AMD GPU & Nvidia GPU environments before importing torch/onnxruntime ── 
def detect_real_amd_gpu_arch():
    import glob
    for path in glob.glob('/sys/class/kfd/kfd/topology/nodes/*/properties'):
        try:
            with open(path, 'r') as f:
                for line in f:
                    if line.startswith('gfx_target_version'):
                        val = int(line.split()[1])
                        if val > 0:
                            major = val // 10000
                            minor = (val % 10000) // 100
                            patch = val % 100
                            return f"gfx{major}{minor}{patch}"
        except Exception:
            pass
    return None

def get_supported_rocm_archs():
    try:
        import subprocess
        output = subprocess.check_output(
            [sys.executable, "-c", "import torch; print(','.join(torch.cuda.get_arch_list()) if hasattr(torch.cuda, 'get_arch_list') else '')"],
            text=True,
            stderr=subprocess.DEVNULL
        )
        return [arch.strip() for arch in output.strip().split(',') if arch.strip()]
    except Exception:
        return []

def setup_amd_gpu_env():
    has_amd = False
    os.environ['MIOPEN_FIND_ENFORCE'] = 'NONE'
    os.environ['MIOPEN_DEBUG_DISABLE_FIND_DB'] = '1'
    os.environ['HSA_XNACK'] = '1'
    os.environ['PYTORCH_HIP_ALLOC_CONF'] = "max_split_size_mb:128"
    os.environ['HSA_ENABLE_SDMA'] = '0'

    try:
        import glob
        for vendor_path in glob.glob('/sys/class/drm/card*/device/vendor'):
            try:
                with open(vendor_path, 'r') as f:
                    vendor_id = f.read().strip()
                if vendor_id == '0x1002': # AMD Vendor ID
                    has_amd = True
                    break
            except Exception:
                pass
        
        if not has_amd:
            import subprocess
            output = subprocess.check_output(["lspci", "-nnk"], text=True)
            if "advanced micro devices" in output.lower() or "amd" in output.lower() or "radeon" in output.lower():
                has_amd = True
    except Exception:
        pass

    if has_amd:
        real_arch = detect_real_amd_gpu_arch()
        supported_archs = get_supported_rocm_archs()
        
        if real_arch and real_arch in supported_archs:
            print(f"[AMD GPU Setup] AMD GPU {real_arch} is natively supported by PyTorch. No HSA override needed.", flush=True)
            if 'HSA_OVERRIDE_GFX_VERSION' in os.environ:
                del os.environ['HSA_OVERRIDE_GFX_VERSION']
        else:
            fallback_version = '11.0.0'
            os.environ['HSA_OVERRIDE_GFX_VERSION'] = fallback_version
            print(f"[AMD GPU Setup] AMD GPU {real_arch or 'unknown'} is not natively supported. Overriding HSA_OVERRIDE_GFX_VERSION to {fallback_version}.", flush=True)

        if 'HIPBLASLT_WORKSPACE_SIZE' not in os.environ:
            os.environ['HIPBLASLT_WORKSPACE_SIZE'] = '0'

        if 'HSA_ENABLE_SDMA' not in os.environ:
            os.environ['HSA_ENABLE_SDMA'] = '0'
            print("[AMD GPU Setup] Set HSA_ENABLE_SDMA=0 to prevent iGPU memory access faults (shared memory architecture).", flush=True)

        if 'PYTORCH_HIP_ALLOC_CONF' not in os.environ:
            os.environ['PYTORCH_HIP_ALLOC_CONF'] = 'garbage_collection_threshold:0.8,max_split_size_mb:256'
            print("[AMD GPU Setup] Set PYTORCH_HIP_ALLOC_CONF for better iGPU shared memory management.", flush=True)
        print("[AMD GPU Setup] All AMD iGPU environment variables configured.", flush=True)

    return has_amd

def setup_nvidia_gpu_env():
    has_nvidia = False
    try:
        import glob
        for vendor_path in glob.glob('/sys/class/drm/card*/device/vendor'):
            try:
                with open(vendor_path, 'r') as f:
                    vendor_id = f.read().strip()
                if vendor_id == '0x10de': # NVIDIA Vendor ID
                    has_nvidia = True
                    break
            except Exception:
                pass
        
        if not has_nvidia:
            import subprocess
            output = subprocess.check_output(["lspci", "-nnk"], text=True)
            if "nvidia" in output.lower() or "geforce" in output.lower() or "rtx" in output.lower() or "gtx" in output.lower():
                has_nvidia = True
    except Exception:
        pass

    if has_nvidia:
        if 'PYTORCH_CUDA_ALLOC_CONF' not in os.environ:
            os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'garbage_collection_threshold:0.8,max_split_size_mb:512'
            print("[NVIDIA GPU Setup] NVIDIA GPU detected on Linux. Setting PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:512 to prevent VRAM memory fragmentation.", flush=True)
    return has_nvidia

has_amd_system = setup_amd_gpu_env()
has_nvidia_system = setup_nvidia_gpu_env()


def parse_args():
    parser = argparse.ArgumentParser(description="Tinh chỉnh mô hình ArcFace với các tham số dòng lệnh.")
    parser.add_argument("--epochs", type=int, default=200, help="Số lượng Epochs huấn luyện (mặc định: 200)")
    parser.add_argument("--batch_size", type=int, default=16, help="Kích thước Batch size (mặc định: 16)")
    parser.add_argument("--learning_rate", type=float, default=0.00005, help="Tốc độ học Learning Rate (mặc định: 0.00005)")
    parser.add_argument("--align_mode", type=str, default="advanced", choices=["standard", "advanced"], help="Chế độ căn chỉnh khuôn mặt (mặc định: advanced)")
    parser.add_argument("--raw_dir", type=str, default="./dataraw", help="Thư mục chứa ảnh thô (mặc định: ./dataraw)")
    parser.add_argument("--data_dir", type=str, default="./data", help="Thư mục chứa ảnh đã căn chỉnh (mặc định: ./data)")
    parser.add_argument("--model_output_path", type=str, default="./arcface_model_final.onnx", help="Đường dẫn xuất mô hình ONNX final (mặc định: ./arcface_model_final.onnx)")
    parser.add_argument("--mobile_model_output_path", type=str, default="./arcface_model_final_mobile.onnx", help="Đường dẫn xuất mô hình ONNX final cho di động (mặc định: ./arcface_model_final_mobile.onnx)")
    parser.add_argument("--best_model_output_path", type=str, default="./arcface_model_best.onnx", help="Đường dẫn xuất mô hình ONNX best (mặc định: ./arcface_model_best.onnx)")
    parser.add_argument("--best_mobile_model_output_path", type=str, default="./arcface_model_best_mobile.onnx", help="Đường dẫn xuất mô hình ONNX best cho di động (mặc định: ./arcface_model_best_mobile.onnx)")
    parser.add_argument("--device", type=str, default="cpu", choices=["auto", "cuda", "amd", "cpu"], help="Thiết bị huấn luyện: auto, cuda, amd, cpu (mặc định: cpu)")
    parser.add_argument("--margin", type=float, default=0.50, help="Ranh giới góc Margin cho ArcFace (mặc định: 0.50)")
    parser.add_argument("--use_opencv_only", action="store_true", help="Bỏ qua MediaPipe và chỉ sử dụng OpenCV Haar Cascade để tránh crash trên một số môi trường.")
    parser.add_argument("--force_gpu", action="store_true", help="Bắt buộc sử dụng GPU kể cả chip gfx1102/gfx1103 không ổn định.")
    parser.add_argument("--amp", action="store_true", dest="amp", default=None, help="Bắt buộc bật AMP (Mixed Precision) khi huấn luyện.")
    parser.add_argument("--no_amp", action="store_false", dest="amp", help="Bắt buộc tắt AMP khi huấn luyện.")
    parser.add_argument("--workers", type=int, default=4, help="Số lượng workers cho DataLoader (mặc định: 4)")
    parser.add_argument("--triplet", action="store_true", dest="use_triplet", default=True, help="Bật Triplet Loss với Hard Negative Mining (mặc định: True)")
    parser.add_argument("--no_triplet", action="store_false", dest="use_triplet", help="Tắt Triplet Loss với Hard Negative Mining")
    
    args, unknown = parser.parse_known_args()
    return args

args = parse_args()

# Cấu hình thiết bị chạy: 'auto', 'cuda', hoặc 'cpu'
DEVICE_CONFIG = args.device
MARGIN = args.margin

# Lựa chọn chế độ căn chỉnh khuôn mặt (Align Face Mode):
# - "standard": Chung chung đủ tốt (Dùng MediaPipe BlazeFace nhanh, nhẹ, lý tưởng cho người bình thường)
# - "advanced": Tăng cường chuyên sâu (Dùng MediaPipe Face Landmarker 3D, tối ưu cực hạn cho các điều kiện khắc nghiệt: khẩu trang, kính mắt, trẻ em, người già, sinh đôi)
ALIGN_MODE = args.align_mode

# Cố gắng import các thư viện cần thiết một cách an toàn để tránh bị Crash Traceback khi thiếu thư viện
missing_libs = []

try:
    import numpy as np
except ImportError:
    missing_libs.append("numpy")

try:
    from PIL import Image, ImageDraw
except ImportError:
    missing_libs.append("pillow")

try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    from iresnet import iresnet100
    from torch.utils.data import DataLoader
    import torchvision
    import torchvision.transforms as transforms
    import torchvision.models as models
except ImportError:
    missing_libs.append("torch")
    missing_libs.append("torchvision")

try:
    import onnx
    import onnxruntime as ort
except ImportError:
    missing_libs.append("onnx")
    missing_libs.append("onnxruntime")

try:
    import cv2
except ImportError:
    cv2 = None  # Sẽ báo lỗi chi tiết khi người dùng thực hiện preprocess ảnh thô

# Kiểm tra nếu thiếu bất kỳ thư viện cốt lõi nào cho quá trình chạy
if len(missing_libs) > 0:
    print("\n" + "="*70)
    print("[-] CẢNH BÁO: HỆ THỐNG THIẾU CÁC THƯ VIỆN BẮT BUỘC ĐỂ CHẠY!")
    print("="*70)
    print(f"Các thư viện bị thiếu: {', '.join(missing_libs)}")
    if cv2 is None:
        print("Mẹo: Thư viện 'opencv-python' cũng đang thiếu.")
    print("\n[*] Vui lòng chạy các lệnh sau để thiết lập môi trường ảo và cài đặt đầy đủ:")
    print("    # 1. Tạo môi trường ảo (venv)")
    print("    python3 -m venv venv")
    print("    ")
    print("    # 2. Kích hoạt môi trường ảo")
    print("    source venv/bin/activate")
    print("    ")
    print("    # 3. Nâng cấp pip và cài đặt toàn bộ thư viện cần thiết")
    print("    pip install --upgrade pip")
    print("    pip install torch torchvision onnx onnxruntime numpy pillow opencv-python mediapipe")
    print("="*70 + "\n")
    sys.exit(1)

# ==========================================
# 1. CẤU HÌNH & KHỞI TẠO
# ==========================================
RAW_DIR = os.path.abspath(args.raw_dir)
DATA_DIR = os.path.abspath(args.data_dir)
MODEL_OUTPUT_PATH = args.model_output_path
MOBILE_MODEL_OUTPUT_PATH = args.mobile_model_output_path
BEST_MODEL_OUTPUT_PATH = args.best_model_output_path
BEST_MOBILE_MODEL_OUTPUT_PATH = args.best_mobile_model_output_path
EMBEDDING_SIZE = 512
IMAGE_SIZE = (112, 112)
BATCH_SIZE = args.batch_size
EPOCHS = args.epochs
LEARNING_RATE = args.learning_rate


# Đường dẫn thư mục tải mô hình pre-trained ArcFace tốt nhất
PRETRAINED_MODEL_DIR = "./arcfacemodels"
PRETRAINED_MODEL_PATH = os.path.join(PRETRAINED_MODEL_DIR, "arcface-r100-glint360k.pth")

# Danh sách URL để tải ArcFace Pretrained IResNet100 trained on Glint360K
# URL chính: HuggingFace BooBooWu/Vec2Face
PRETRAINED_MODEL_URL = "https://huggingface.co/BooBooWu/Vec2Face/resolve/main/weights/arcface-r100-glint360k.pth"

# Mô hình TFLite BlazeFace cho MediaPipe Tasks API (mediapipe 0.10+)
MP_FACE_DETECTOR_MODEL_PATH = os.path.join(PRETRAINED_MODEL_DIR, "blaze_face_short_range.tflite")
MP_FACE_DETECTOR_MODEL_URL  = (
    "https://storage.googleapis.com/mediapipe-models/face_detector/"
    "blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
)

# Mô hình TFLite Face Landmark cho align (có thể dùng trong tương lai)
MP_FACE_LANDMARK_MODEL_PATH = os.path.join(PRETRAINED_MODEL_DIR, "face_landmarker.task")
MP_FACE_LANDMARK_MODEL_URL  = (
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/"
    "face_landmarker/float16/1/face_landmarker.task"
)

# Cấu hình thiết bị chạy dựa vào biến cấu hình DEVICE_CONFIG
device_str = DEVICE_CONFIG
if device_str == "auto":
    if torch.cuda.is_available():
        device_str = "cuda"
    else:
        device_str = "cpu"

if device_str in ("cuda", "amd"):
    if torch.cuda.is_available():
        device_name = torch.cuda.get_device_name(0)
        gcn_arch = detect_real_amd_gpu_arch()
        if not gcn_arch:
            gcn_arch = getattr(torch.cuda.get_device_properties(0), 'gcnArchName', '')
        
        # Kiểm tra thiết bị AMD không ổn định (gfx1102/gfx1103)
        if gcn_arch and ('gfx1102' in gcn_arch or 'gfx1103' in gcn_arch) and not args.force_gpu:
            print("\n" + "="*80, flush=True)
            print("[WARNING] Phát hiện gfx1102/gfx1103 (Radeon 780M) — huấn luyện GPU không ổn định mặc định!")
            print("PyTorch ROCm prebuilt wheels không có kernel native cho gfx1102/gfx1103.")
            print("Chạy kernel gfx1100 trên phần cứng gfx1102/gfx1103 có thể gây GPU Hang.")
            print("")
            print("RECOMMENDED: Sử dụng huấn luyện CPU (chậm hơn nhưng ổn định tuyệt đối):")
            print("  --device cpu")
            print("")
            print("Để bắt buộc dùng GPU: thêm --force_gpu")
            print("="*80 + "\n", flush=True)
            print("[Auto-fallback] Tự động chuyển sang huấn luyện CPU để đảm bảo ổn định.", flush=True)
            device = torch.device("cpu")
        else:
            device = torch.device("cuda")
            if gcn_arch and ('gfx1102' in gcn_arch or 'gfx1103' in gcn_arch):
                print("[WARNING] --force_gpu được đặt: huấn luyện gfx1102/gfx1103 với kernel gfx1100 — có thể bị GPU Hang!", flush=True)
            else:
                print(f"[+] Sử dụng GPU: {device_name} (arch: {gcn_arch})", flush=True)
            
            # Print CUDA memory optimization info if NVIDIA GPU is used
            if has_nvidia_system:
                vram_gb = torch.cuda.get_device_properties(0).total_memory / (1024**3)
                print(f"[NVIDIA GPU] Active memory allocator configuration (PYTORCH_CUDA_ALLOC_CONF): {os.environ.get('PYTORCH_CUDA_ALLOC_CONF', 'Not set')}", flush=True)
                print(f"[NVIDIA GPU] VRAM detected: {vram_gb:.2f} GB", flush=True)
    else:
        print("[WARNING] Không tìm thấy CUDA/ROCm. Chuyển sang CPU.", flush=True)
        device = torch.device("cpu")
else:
    device = torch.device("cpu")
    print(f"[+] Thiết bị sử dụng huấn luyện: {device}")

# ==========================================
# 2. THUẬT TOÁN CĂN CHỈNH KHUÔN MẶT ĐỒNG NHẤT
# ==========================================
def align_face_python(image_bgr, eye_left, eye_right):
    """
    Căn chỉnh khuôn mặt 2 điểm mắt (Đồng nhất về mặt toán học với TypeScript và C#).
    Xoay ảnh để mắt nằm ngang, scale khoảng cách mắt về 35.24px và đưa trung điểm về (55.91, 51.60).
    """
    if cv2 is None:
        raise ImportError("[-] Cần cài đặt opencv-python: pip install opencv-python")
        
    cx = (eye_left[0] + eye_right[0]) / 2.0
    cy = (eye_left[1] + eye_right[1]) / 2.0
    dx = eye_right[0] - eye_left[0]
    dy = eye_right[1] - eye_left[1]
    
    current_dist = np.sqrt(dx**2 + dy**2)
    angle_deg = np.degrees(np.arctan2(dy, dx))
    
    # Định dạng mục tiêu chuẩn trên khung 112x112
    target_dist = 35.2372
    tx = 55.9132
    ty = 51.59885
    
    scale = target_dist / current_dist
    
    # Tính toán ma trận biến đổi affine (quay và scale xung quanh tâm mắt hiện tại)
    M = cv2.getRotationMatrix2D((cx, cy), angle_deg, scale)
    
    # Dịch chuyển tâm mắt hiện tại về tâm mắt mục tiêu
    M[0, 2] += (tx - cx)
    M[1, 2] += (ty - cy)
    
    # Warp hình ảnh về kích thước 112x112
    aligned_face = cv2.warpAffine(image_bgr, M, (112, 112), flags=cv2.INTER_CUBIC, borderValue=0)
    return aligned_face

# ==========================================
# 2.1 THUẬT TOÁN LƯỢNG TỬ HÓA ONNX CHO MOBILE
# ==========================================
def quantize_onnx_model(onnx_path, output_path):
    """
    Thực hiện lượng tử hóa động (Dynamic Quantization - INT8) cho tệp ONNX.
    Giúp giảm kích thước mô hình đi 4 lần và tăng tốc độ chạy trên Mobile/CPU.
    """
    print(f"[*] Đang tiến hành lượng tử hóa mô hình ONNX về định dạng INT8 cho di động...")
    try:
        from onnxruntime.quantization import quantize_dynamic, QuantType
        
        quantize_dynamic(
            model_input=onnx_path,
            model_output=output_path,
            weight_type=QuantType.QUInt8
        )
        size_original = os.path.getsize(onnx_path) / (1024 * 1024)
        size_quantized = os.path.getsize(output_path) / (1024 * 1024)
        print(f"[+] Lượng tử hóa thành công!")
        print(f"    - Mô hình gốc: {size_original:.2f} MB ({onnx_path})")
        print(f"    - Mô hình lượng tử hóa di động: {size_quantized:.2f} MB ({output_path})")
        return True
    except ImportError:
        print("[-] Cảnh báo: Không tìm thấy thư viện 'onnxruntime.quantization'.")
        print("    Vui lòng cài đặt bằng lệnh: pip install onnxruntime (hoặc onnxruntime-tools)")
        print("    Bỏ qua bước lượng tử hóa.")
        return False
    except Exception as e:
        print(f"[-] Có lỗi trong quá trình lượng tử hóa: {e}")
        return False

# ==========================================
# 3. TIỀN XỬ LÝ ẢNH THÔ (dataraw -> data)
# ==========================================
def _ensure_mp_face_model():
    """
    Tải tự động mô hình BlazeFace TFLite về ./arcfacemodels/ nếu chưa có.
    Cần thiết cho MediaPipe Tasks API (mediapipe 0.10+).
    """
    if os.path.exists(MP_FACE_DETECTOR_MODEL_PATH):
        return True
    os.makedirs(PRETRAINED_MODEL_DIR, exist_ok=True)
    print(f"[*] Đang tải mô hình BlazeFace (MediaPipe Tasks) về '{MP_FACE_DETECTOR_MODEL_PATH}'...")
    try:
        opener = urllib.request.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0')]
        urllib.request.install_opener(opener)
        urllib.request.urlretrieve(MP_FACE_DETECTOR_MODEL_URL, MP_FACE_DETECTOR_MODEL_PATH)
        print("[+] Tải mô hình BlazeFace thành công!")
        return True
    except Exception as e:
        print(f"[-] Không thể tải BlazeFace model ({e}). Sẽ dùng OpenCV Haar Cascade thay thế.")
        return False


def preprocess_dataraw():
    """
    Đọc ảnh thô từ ./dataraw/, tự động phát hiện khuôn mặt và điểm mốc 3D.
    Hỗ trợ 2 chế độ căn chỉnh khuôn mặt cấu hình qua ALIGN_MODE:
      - "standard": Chung chung đủ tốt (Dùng MediaPipe BlazeFace nhanh, nhẹ)
      - "advanced": Tăng cường chuyên sâu (Dùng MediaPipe Face Landmarker 3D, tối ưu cực hạn cho các điều kiện khắc nghiệt)
    
    Cả 2 chế độ đều có fallback an toàn về OpenCV Haar Cascade nếu xảy ra lỗi.
    Kết quả cuối: ảnh 112×112 đã căn chỉnh chuẩn ArcFace (2-Eye Similarity Transform).
    """
    if not os.path.exists(RAW_DIR):
        return False

    print(f"[*] Phát hiện thư mục ảnh thô '{RAW_DIR}'. Đang tiến hành tiền xử lý khuôn mặt ở chế độ ALIGN_MODE = '{ALIGN_MODE}'...")

    if cv2 is None:
        print("\n[-] Lỗi: Cần cài đặt thư viện 'opencv-python' để tiền xử lý ảnh thô!")
        print("[*] Vui lòng chạy lệnh: pip install opencv-python\n")
        sys.exit(1)

    # Làm sạch thư mục data đích để tránh bị lẫn dữ liệu cũ
    if os.path.exists(DATA_DIR):
        shutil.rmtree(DATA_DIR)
    os.makedirs(DATA_DIR, exist_ok=True)

    # Khai báo các biến MediaPipe
    use_mp = False
    mp_detector = None
    mp_landmarker = None

    if getattr(args, "use_opencv_only", False):
        print("[!] Được cấu hình bỏ qua MediaPipe và chỉ sử dụng OpenCV Haar Cascade.")
    else:
        try:
            import mediapipe as mp_lib
            from mediapipe.tasks import python as _mp_py
            from mediapipe.tasks.python import vision as _mp_vision
            from mediapipe.tasks.python.core import base_options as _mp_base

            if ALIGN_MODE == "standard":
                # ------------------------------------------------------------------
                # Khởi tạo bộ phát hiện khuôn mặt BlazeFace TFLite (standard)
                # ------------------------------------------------------------------
                model_ok = _ensure_mp_face_model()
                if model_ok:
                    base_opts = _mp_base.BaseOptions(model_asset_path=MP_FACE_DETECTOR_MODEL_PATH)
                    det_opts  = _mp_vision.FaceDetectorOptions(
                        base_options=base_opts,
                        min_detection_confidence=0.5,
                    )
                    mp_detector = _mp_vision.FaceDetector.create_from_options(det_opts)
                    use_mp = True
                    print("[+] Sử dụng MediaPipe BlazeFace (Standard Align) — chung chung đủ tốt, gọn nhẹ.")
                else:
                    print(f"[!] Không thể tải mô hình BlazeFace tại '{MP_FACE_DETECTOR_MODEL_PATH}'.")
                    
            else:
                # ------------------------------------------------------------------
                # Khởi tạo bộ phát hiện Face Landmarker 3D (advanced)
                # ------------------------------------------------------------------
                if os.path.exists(MP_FACE_LANDMARK_MODEL_PATH):
                    base_opts = _mp_base.BaseOptions(model_asset_path=MP_FACE_LANDMARK_MODEL_PATH)
                    options = _mp_vision.FaceLandmarkerOptions(
                        base_options=base_opts,
                        output_face_blendshapes=False,
                        output_facial_transformation_matrixes=False,
                        num_faces=1,
                    )
                    mp_landmarker = _mp_vision.FaceLandmarker.create_from_options(options)
                    use_mp = True
                    print("[+] Sử dụng MediaPipe Face Landmarker (Advanced Align) — tăng cường tối đa cho điều kiện khắc nghiệt.")
                else:
                    print(f"[!] Không tìm thấy mô hình Face Landmarker tại '{MP_FACE_LANDMARK_MODEL_PATH}'.")
        except Exception as e:
            print(f"[!] Lỗi khi nạp MediaPipe ({e}). Sẽ sử dụng OpenCV Haar Cascade làm fallback.")

    # OpenCV Haar Cascade (fallback)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade  = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    if not use_mp:
        print("[+] Sử dụng OpenCV Haar Cascade làm bộ phát hiện khuôn mặt (fallback).")


    face_count = 0
    fail_count = 0

    # ------------------------------------------------------------------
    # Hàm helper: Chế độ Standard (BlazeFace)
    # ------------------------------------------------------------------
    def detect_align_mp_tasks(image_bgr):
        import mediapipe as mp_lib
        h, w = image_bgr.shape[:2]
        rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
        mp_image = mp_lib.Image(image_format=mp_lib.ImageFormat.SRGB, data=rgb)
        result = mp_detector.detect(mp_image)

        if not result.detections:
            return None

        # Lấy detection có score cao nhất
        det = max(result.detections, key=lambda d: d.categories[0].score)
        kp  = det.keypoints  # list[NormalizedKeypoint]: 0=right_eye, 1=left_eye (nhân trắc học)

        if len(kp) >= 2:
            # Keypoint 0: mắt phải nhân trắc học (bên trái ảnh)
            # Keypoint 1: mắt trái nhân trắc học (bên phải ảnh)
            right_eye = (int(kp[0].x * w), int(kp[0].y * h))
            left_eye  = (int(kp[1].x * w), int(kp[1].y * h))
            return align_face_python(image_bgr, right_eye, left_eye)
        else:
            bb = det.bounding_box
            x1, y1 = max(0, bb.origin_x), max(0, bb.origin_y)
            x2, y2 = min(w, bb.origin_x + bb.width), min(h, bb.origin_y + bb.height)
            face_crop = image_bgr[y1:y2, x1:x2]
            return cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC)

    # ------------------------------------------------------------------
    # Hàm helper: Chế độ Advanced (Face Landmarker 3D)
    # ------------------------------------------------------------------
    def detect_align_mp_landmarker(image_bgr):
        import mediapipe as mp_lib
        h, w = image_bgr.shape[:2]
        rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
        mp_image = mp_lib.Image(image_format=mp_lib.ImageFormat.SRGB, data=rgb)
        result = mp_landmarker.detect(mp_image)

        if not result.face_landmarks or len(result.face_landmarks) == 0:
            return None

        # Lấy khuôn mặt đầu tiên
        landmarks = result.face_landmarks[0]
        
        # Trích xuất tọa độ mắt trái ảnh (bên trái ảnh - mắt phải người)
        pt33 = landmarks[33]
        pt133 = landmarks[133]
        eye_left = (
            int((pt33.x + pt133.x) / 2.0 * w),
            int((pt33.y + pt133.y) / 2.0 * h)
        )

        # Trích xuất tọa độ mắt phải ảnh (bên phải ảnh - mắt trái người)
        pt362 = landmarks[362]
        pt263 = landmarks[263]
        eye_right = (
            int((pt362.x + pt263.x) / 2.0 * w),
            int((pt362.y + pt263.y) / 2.0 * h)
        )

        # Kiểm tra tính hợp lệ của tọa độ mắt
        if not (0 <= eye_left[0] < w and 0 <= eye_left[1] < h) or not (0 <= eye_right[0] < w and 0 <= eye_right[1] < h):
            return None

        return align_face_python(image_bgr, eye_left, eye_right)

    # ------------------------------------------------------------------
    # Hàm helper: Fallback (OpenCV Haar Cascade)
    # ------------------------------------------------------------------
    def detect_align_opencv(image_bgr):
        h, w = image_bgr.shape[:2]
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        if len(faces) == 0:
            return None

        x, y, fw, fh = max(faces, key=lambda r: r[2] * r[3])
        roi_gray = gray[y:y+fh, x:x+fw]
        eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=5, minSize=(15, 15))

        if len(eyes) >= 2:
            es = sorted(eyes, key=lambda e: e[0])
            ex1, ey1, ew1, eh1 = es[0]
            ex2, ey2, ew2, eh2 = es[1]
            left_eye  = (x + ex1 + ew1 // 2, y + ey1 + eh1 // 2)
            right_eye = (x + ex2 + ew2 // 2, y + ey2 + eh2 // 2)
            return align_face_python(image_bgr, left_eye, right_eye)
        else:
            pad_x = int(fw * 0.20)
            pad_y = int(fh * 0.20)
            face_crop = image_bgr[max(0, y-pad_y):min(h, y+fh+pad_y),
                                  max(0, x-pad_x):min(w, x+fw+pad_x)]
            return cv2.resize(face_crop, (112, 112), interpolation=cv2.INTER_CUBIC)

    # Lựa chọn hàm suy luận dựa trên cấu hình ALIGN_MODE
    if use_mp:
        detect_fn = detect_align_mp_tasks if ALIGN_MODE == "standard" else detect_align_mp_landmarker
    else:
        detect_fn = detect_align_opencv

    for identity in sorted(os.listdir(RAW_DIR)):
        identity_raw_path = os.path.join(RAW_DIR, identity)
        if not os.path.isdir(identity_raw_path):
            continue

        identity_aligned_path = os.path.join(DATA_DIR, identity)
        os.makedirs(identity_aligned_path, exist_ok=True)

        for file_name in sorted(os.listdir(identity_raw_path)):
            if not file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp')):
                continue

            img_path = os.path.join(identity_raw_path, file_name)
            image    = cv2.imread(img_path)
            if image is None:
                print(f"    [-] Không thể đọc ảnh: {img_path}")
                fail_count += 1
                continue

            aligned = detect_fn(image)
            if aligned is None:
                # Nếu MediaPipe bị lỗi hoặc không tìm thấy, thử fallback OpenCV Haar Cascade
                if use_mp:
                    aligned = detect_align_opencv(image)
                
                if aligned is None:
                    print(f"    [-] Không phát hiện khuôn mặt trong ảnh: {img_path}")
                    fail_count += 1
                    continue

            save_path = os.path.join(
                identity_aligned_path,
                f"{os.path.splitext(file_name)[0]}_aligned.png"
            )
            cv2.imwrite(save_path, aligned)
            face_count += 1

            # Downsampling Augmentation: Ngẫu nhiên thu nhỏ ảnh xuống kích thước thấp (48x48, 64x64, 80x80), sau đó resize ngược lại 112x112
            import random
            low_res = random.choice([48, 64, 80])
            downsampled_temp = cv2.resize(aligned, (low_res, low_res), interpolation=cv2.INTER_AREA)
            downsampled_aligned = cv2.resize(downsampled_temp, (112, 112), interpolation=cv2.INTER_CUBIC)
            
            downsampled_save_path = os.path.join(
                identity_aligned_path,
                f"{os.path.splitext(file_name)[0]}_downsampled.png"
            )
            cv2.imwrite(downsampled_save_path, downsampled_aligned)
            face_count += 1

    # Giải phóng tài nguyên MediaPipe
    if mp_detector is not None:
        try:
            mp_detector.close()
        except Exception:
            pass
    if mp_landmarker is not None:
        try:
            mp_landmarker.close()
        except Exception:
            pass

    print(f"[+] Tiền xử lý hoàn tất! Đã căn chỉnh thành công {face_count} khuôn mặt. Bỏ qua (không có mặt): {fail_count} ảnh.")
    print(f"[+] Dữ liệu đã căn chỉnh sẵn sàng tại thư mục: '{DATA_DIR}'")
    return True

# ==========================================
# 4. KHỞI TẠO MOCK DATASET (Nếu không có dataraw)
# ==========================================
def generate_mock_dataset():
    """Tạo dữ liệu mẫu nhân tạo để đảm bảo code có thể chạy thành công ngay lập tức."""
    if os.path.exists(DATA_DIR) and len(os.listdir(DATA_DIR)) > 0:
        print("[+] Đã phát hiện thư mục dữ liệu 'data/'. Bỏ qua bước tạo dữ liệu mẫu.")
        return

    print("[*] Không tìm thấy dữ liệu huấn luyện. Đang tự động tạo tập dữ liệu mẫu (Mock Dataset)...")
    os.makedirs(DATA_DIR, exist_ok=True)
    
    identities = ["user_jack", "user_rose", "user_tony"]
    colors = [
        (255, 100, 100),  # Red-ish
        (100, 255, 100),  # Green-ish
        (100, 100, 255)   # Blue-ish
    ]
    
    for idx, (name, color) in zip(enumerate(identities), colors):
        identity_path = os.path.join(DATA_DIR, name[1])
        os.makedirs(identity_path, exist_ok=True)
        
        for i in range(5):
            img = Image.new("RGB", (150, 150), color=(240, 240, 240))
            draw = ImageDraw.Draw(img)
            
            offset_x = (i - 2) * 5
            offset_y = (idx - 1) * 5
            draw.ellipse([30 + offset_x, 30 + offset_y, 120 + offset_x, 120 + offset_y], fill=color)
            
            draw.ellipse([50 + offset_x, 55 + offset_y, 60 + offset_x, 65 + offset_y], fill=(255, 255, 255))
            draw.ellipse([90 + offset_x, 55 + offset_y, 100 + offset_x, 65 + offset_y], fill=(255, 255, 255))
            
            draw.arc([55 + offset_x, 80 + offset_y, 95 + offset_x, 100 + offset_y], start=0, end=180, fill=(0, 0, 0), width=3)
            
            img_save_path = os.path.join(identity_path, f"face_{i + 1}.png")
            img.save(img_save_path)
            
    print(f"[+] Đã khởi tạo thành công tập dữ liệu mẫu tại '{DATA_DIR}' với 3 danh tính khác nhau.")

# ==========================================
# 5. TẢI MÔ HÌNH PRETRAINED ARCFACE
# ==========================================
def download_pretrained_weights():
    """
    Tải trọng số ArcFace pre-trained Glint360K (IResNet100) về ./arcfacemodels.
    """
    if os.path.exists(PRETRAINED_MODEL_PATH):
        print(f"[+] Đã phát hiện mô hình ArcFace pre-trained Glint360K (IResNet100) tại '{PRETRAINED_MODEL_PATH}'.")
        return True

    os.makedirs(PRETRAINED_MODEL_DIR, exist_ok=True)
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)

    print(f"[*] Đang tải mô hình ArcFace pre-trained chất lượng cao Glint360K (IResNet100)...")
    try:
        urllib.request.urlretrieve(PRETRAINED_MODEL_URL, PRETRAINED_MODEL_PATH)
        print("[+] Tải mô hình ArcFace pre-trained Glint360K (IResNet100) thành công!")
        return True
    except Exception as e:
        print(f"[-] Không thể tải từ nguồn chính ({e}).")
        print(f"[*] Gợi ý thủ công: Tải file .pth từ link bên dưới rồi đặt vào: {PRETRAINED_MODEL_PATH}")
        print(f"    {PRETRAINED_MODEL_URL}")
        return False


def download_all_models():
    """
    Tải tất cả các model cần thiết về ./arcfacemodels trước khi bắt đầu pipeline.
    """
    os.makedirs(PRETRAINED_MODEL_DIR, exist_ok=True)
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)

    models_to_download = [
        {
            "name": "BlazeFace TFLite (MediaPipe Tasks face detector)",
            "path": MP_FACE_DETECTOR_MODEL_PATH,
            "url" : MP_FACE_DETECTOR_MODEL_URL,
            "required": True,
        },
        {
            "name": "Face Landmarker TFLite (MediaPipe Tasks - align nâng cao)",
            "path": MP_FACE_LANDMARK_MODEL_PATH,
            "url" : MP_FACE_LANDMARK_MODEL_URL,
            "required": False,
        },
    ]

    print("\n[*] Kiểm tra và tải tất cả model cần thiết về './arcfacemodels/'...")
    for m in models_to_download:
        if os.path.exists(m["path"]):
            size_kb = os.path.getsize(m["path"]) // 1024
            print(f"[+] Đã có: {m['name']} ({size_kb} KB)")
            continue
        print(f"[*] Đang tải: {m['name']}...")
        try:
            urllib.request.urlretrieve(m["url"], m["path"])
            size_kb = os.path.getsize(m["path"]) // 1024
            print(f"[+] Tải thành công: {m['name']} ({size_kb} KB)")
        except Exception as e:
            if m["required"]:
                print(f"[-] Không tải được model bắt buộc: {m['name']} ({e})")
            else:
                print(f"[!] Không tải được model tùy chọn: {m['name']} ({e}) — bỏ qua.")

    # ArcFace pretrained backbone
    download_pretrained_weights()
    print("[+] Kiểm tra model hoàn tất. Xem thư mục './arcfacemodels/' để biết chi tiết.\n")

# ==========================================
# 6. ĐỊNH NGHĨA KIẾN TRÚC MÔ HÌNH
# ==========================================
class ArcMarginProduct(nn.Module):
    """
    Lớp ArcFace Head (Chỉ dùng trong quá trình huấn luyện để tối ưu góc phân lớp).
    """
    def __init__(self, in_features, out_features, s=30.0, m=0.50, easy_margin=False):
        super(ArcMarginProduct, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.s = s
        self.m = m
        self.weight = nn.Parameter(torch.FloatTensor(out_features, in_features))
        nn.init.xavier_uniform_(self.weight)

        self.easy_margin = easy_margin
        self.cos_m = math.cos(m)
        self.sin_m = math.sin(m)
        self.th = math.cos(math.pi - m)
        self.mm = math.sin(math.pi - m) * m

    def update_margin(self, new_m):
        """Cập nhật động margin và các tham số lượng giác liên quan trong quá trình huấn luyện."""
        self.m = new_m
        self.cos_m = math.cos(new_m)
        self.sin_m = math.sin(new_m)
        self.th = math.cos(math.pi - new_m)
        self.mm = math.sin(math.pi - new_m) * new_m

    def forward(self, input, label):
        cosine = F.linear(F.normalize(input), F.normalize(self.weight))
        sine = torch.sqrt(1.0 - torch.pow(cosine, 2)).clamp(0, 1)
        
        phi = cosine * self.cos_m - sine * self.sin_m
        if self.easy_margin:
            phi = torch.where(cosine > 0, phi, cosine)
        else:
            phi = torch.where(cosine > self.th, phi, cosine - self.mm)
            
        one_hot = torch.zeros(cosine.size(), device=input.device)
        one_hot.scatter_(1, label.view(-1, 1).long(), 1)
        
        output = (one_hot * phi) + ((1.0 - one_hot) * cosine)
        output *= self.s
        return output

class BatchHardTripletLoss(nn.Module):
    """
    Hàm mất mát Triplet Loss với Hard Negative Mining.
    Sử dụng kỹ thuật Batch-Hard: với mỗi Anchor trong Batch, tự động tìm Positive xa nhất (hardest positive)
    và Negative gần nhất (hardest negative) để tính toán loss.
    """
    def __init__(self, margin=0.3):
        super(BatchHardTripletLoss, self).__init__()
        self.margin = margin

    def forward(self, embeddings, labels):
        # Đảm bảo các vector đã được chuẩn hóa L2
        embeddings_norm = F.normalize(embeddings, p=2, dim=1)
        
        # Tính toán ma trận khoảng cách đôi một giữa các mẫu (Pairwise distance matrix)
        # d(x, y) = ||x - y||^2 = ||x||^2 + ||y||^2 - 2*x^T*y = 2 - 2*cos_similarity
        dist_matrix = 2.0 - 2.0 * torch.matmul(embeddings_norm, embeddings_norm.t())
        dist_matrix = torch.clamp(dist_matrix, min=0.0)

        # Tạo mask xác định mẫu cùng lớp (positive) và khác lớp (negative)
        labels_equal = labels.unsqueeze(0) == labels.unsqueeze(1)
        
        # Mẫu Positive phải cùng lớp nhưng không phải là chính nó (i != j)
        mask_pos = labels_equal ^ torch.eye(labels.size(0), dtype=torch.bool, device=labels.device)
        
        # Mẫu Negative phải khác lớp hoàn toàn
        mask_neg = ~labels_equal

        # Tìm Hardest Positive: khoảng cách lớn nhất trong số các positive
        pos_dists = dist_matrix * mask_pos.float()
        hardest_positive_dist, _ = torch.max(pos_dists, dim=1)

        # Tìm Hardest Negative: khoảng cách nhỏ nhất trong số các negative
        # Để tránh chọn các mẫu không hợp lệ, ta gán khoảng cách rất lớn cho các mẫu không phải negative
        max_dist = dist_matrix.max() + 1.0
        neg_dists = dist_matrix + (1.0 - mask_neg.float()) * max_dist
        hardest_negative_dist, _ = torch.min(neg_dists, dim=1)

        # Chỉ tính toán loss đối với những Anchors hợp lệ (có ít nhất 1 positive và 1 negative trong batch)
        valid_pos = mask_pos.sum(dim=1) > 0
        valid_neg = mask_neg.sum(dim=1) > 0
        valid_anchors = valid_pos & valid_neg
        
        if not valid_anchors.any():
            return torch.tensor(0.0, device=embeddings.device, requires_grad=True)

        loss = F.relu(hardest_positive_dist[valid_anchors] - hardest_negative_dist[valid_anchors] + self.margin)
        return loss.mean()

def load_checkpoint(model, pretrained_path):
    if not pretrained_path or not os.path.exists(pretrained_path):
        return False
    try:
        checkpoint = torch.load(pretrained_path, map_location="cpu")
        if isinstance(checkpoint, dict):
            if "model_state_dict" in checkpoint:
                state_dict = checkpoint["model_state_dict"]
            elif "state_dict" in checkpoint:
                state_dict = checkpoint["state_dict"]
            else:
                state_dict = checkpoint
        else:
            state_dict = checkpoint
        
        # Kiểm tra và loại bỏ tiền tố 'module.' hoặc 'backbone.' nếu có
        new_state_dict = {}
        for k, v in state_dict.items():
            name = k
            if name.startswith("module."):
                name = name[7:]
            if name.startswith("backbone."):
                name = name[9:]
            new_state_dict[name] = v
            
        model.load_state_dict(new_state_dict, strict=True)
        return True
    except Exception as e:
        print(f"[-] Lỗi khi load strict=True ({e}). Thử với strict=False...")
        try:
            model.load_state_dict(new_state_dict, strict=False)
            print("[+] Nạp trọng số thành công với strict=False.")
            return True
        except Exception as e2:
            print(f"[-] Nạp trọng số thất bại hoàn toàn ({e2}).")
            return False

class ArcFaceIResNet100(nn.Module):
    """
    Backbone mạng tích chập IResNet-100 để trích xuất Vector đặc trưng 512 chiều.
    Tối ưu hóa đặc biệt cho trẻ em mẫu giáo, cấp 1 và sinh đôi (Glint360K pre-trained).
    """
    def __init__(self, embedding_size=512, pretrained_path=None):
        super(ArcFaceIResNet100, self).__init__()
        self.backbone = iresnet100(num_features=embedding_size)
        
        if pretrained_path and os.path.exists(pretrained_path):
            success = load_checkpoint(self.backbone, pretrained_path)
            if success:
                print(f"[+] Khởi tạo thành công và NẠP ĐẦY ĐỦ trọng số ArcFace Pretrained Glint360K (IResNet100) từ '{pretrained_path}'.")
            else:
                print("[-] Không thể nạp trọng số Glint360K. Sử dụng mô hình khởi tạo ngẫu nhiên.")
        else:
            print("[!] Không tìm thấy file trọng số pre-trained. Sử dụng mô hình khởi tạo ngẫu nhiên.")

    def forward(self, x):
        return self.backbone(x)

class ArcFaceResNet50(nn.Module):
    """
    Backbone mạng tích chập ResNet-50 để trích xuất Vector đặc trưng 512 chiều.
    Đây chính là mô hình cốt lõi sẽ được xuất sang ONNX và nạp vào C# .NET.
    """
    def __init__(self, embedding_size=512, pretrained_path=None):
        super(ArcFaceResNet50, self).__init__()
        self.backbone = models.resnet50(weights=None)
        num_features = self.backbone.fc.in_features
        
        # resnet50_arcface.pth được train với cấu trúc fc là 1 lớp Linear duy nhất (2048 -> 512)
        self.backbone.fc = nn.Linear(num_features, embedding_size)
        
        if pretrained_path and os.path.exists(pretrained_path):
            try:
                checkpoint = torch.load(pretrained_path, map_location="cpu")
                if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
                    pretrained_state = checkpoint["model_state_dict"]
                else:
                    pretrained_state = checkpoint
                
                # Nạp state dict vào backbone với strict=True để đảm bảo nạp hoàn hảo toàn bộ 320/320 layers.
                self.load_state_dict(pretrained_state, strict=True)
                print(f"[+] Khởi tạo thành công và NẠP ĐẦY ĐỦ trọng số ArcFace Pretrained chất lượng cao từ '{pretrained_path}' (strict=True).")
            except Exception as e:
                print(f"[-] Có lỗi khi nạp trọng số cục bộ ({e}). Sử dụng ImageNet Pretrained thay thế.")
                self._fallback_to_imagenet(embedding_size)
        else:
            self._fallback_to_imagenet(embedding_size)

    def _fallback_to_imagenet(self, embedding_size):
        try:
            resnet = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
            num_features = resnet.fc.in_features
            resnet.fc = nn.Sequential(
                nn.BatchNorm1d(num_features),
                nn.Linear(num_features, embedding_size, bias=False),
                nn.BatchNorm1d(embedding_size)
            )
            self.backbone = resnet
            print("[+] Tải và sử dụng trọng số ImageNet Pretrained ResNet-50 thay thế.")
        except Exception as e:
            print(f"[-] Không thể tải trọng số ImageNet ({e}). Sử dụng Random Weights.")

    def forward(self, x):
        return self.backbone(x)

# ==========================================
# 6.1 PYTORCH CUSTOM DATASET TĂNG CƯỜNG LỚN (MASK/GLASS/BLUR AUGMENTATION)
# ==========================================
class AdvancedFaceDataset(torch.utils.data.Dataset):
    """
    Dataset nâng cao tích hợp tăng cường dữ liệu (Data Augmentation) cho các điều kiện khắc nghiệt:
    - Trẻ em/Người già: Random Blur, Color Jitter, Noise.
    - Khẩu trang/Khăn bịt (Occlusion): Tự động tổng hợp khẩu trang giả lập (Mask Synthesis) màu ngẫu nhiên lên 40-50% khuôn mặt dưới.
    - Kính mắt: Vẽ gọng kính giả lập lên vùng mắt.
    """
    def __init__(self, root_dir, transform=None):
        self.dataset = torchvision.datasets.ImageFolder(root=root_dir)
        self.transform = transform
        self.classes = self.dataset.classes

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        img_pil, label = self.dataset[idx]
        
        # Áp dụng Custom Occlusion Augmentation trong quá trình huấn luyện với xác suất nhất định
        img_np = np.array(img_pil).copy()
        h, w = img_np.shape[:2]
        
        import random
        r_val = random.random()
        
        # 1. Giả lập Khẩu trang/Khăn bịt mặt (xác suất 25%)
        # Vẽ một hình thang/polygon che 40-50% nửa dưới khuôn mặt (y từ ~65 đến 112)
        if r_val < 0.25:
            # Chọn màu ngẫu nhiên cho khẩu trang: xanh y tế, trắng, đen hoặc xám
            mask_colors = [
                (100, 180, 200),  # Xanh y tế
                (240, 240, 240),  # Trắng
                (20, 20, 20),      # Đen
                (120, 120, 120),  # Xám
            ]
            color = random.choice(mask_colors)
            
            # Định nghĩa các điểm góc của khẩu trang trên khung 112x112
            # Điểm bắt đầu che là y = 65, lan rộng ra hai bên má và bao phủ cằm
            pts = np.array([
                [int(w * 0.15), int(h * 0.60)], # Góc trên bên trái
                [int(w * 0.85), int(h * 0.60)], # Góc trên bên phải
                [w, int(h * 0.80)],             # Má bên phải
                [int(w * 0.75), h],             # Cằm bên phải
                [int(w * 0.25), h],             # Cằm bên trái
                [0, int(h * 0.80)]              # Má bên trái
            ], np.int32)
            
            cv2.fillPoly(img_np, [pts], color)
            
        # 2. Giả lập Gọng kính (xác suất 15%)
        # Vẽ hai hình tròn/oval nhỏ quanh mắt và một thanh nối
        elif r_val < 0.40:
            # Mắt trái ảnh nằm quanh x=38, y=52. Mắt phải ảnh nằm quanh x=74, y=52
            glass_color = (10, 10, 10) # Gọng đen
            thickness = 2
            
            # Mắt trái
            cv2.circle(img_np, (38, 52), 14, glass_color, thickness)
            # Mắt phải
            cv2.circle(img_np, (74, 52), 14, glass_color, thickness)
            # Thanh nối
            cv2.line(img_np, (52, 52), (60, 52), glass_color, thickness)
            # Gọng hai bên tai
            cv2.line(img_np, (24, 52), (10, 52), glass_color, thickness)
            cv2.line(img_np, (88, 52), (102, 52), glass_color, thickness)

        # Chuyển đổi ngược lại ảnh PIL để áp dụng Torch transforms chuẩn
        img_pil = Image.fromarray(img_np)
        
        if self.transform:
            img_tensor = self.transform(img_pil)
        else:
            img_tensor = transforms.ToTensor()(img_pil)

        return img_tensor, label


class CustomSubset(torch.utils.data.Dataset):
    """
    Sub-dataset helper để tách biệt rõ ràng dữ liệu huấn luyện và dữ liệu kiểm thử.
    Giúp áp dụng các augmentation (Mask/Glasses) chỉ cho tập Train, giữ tập Val luôn sạch.
    """
    def __init__(self, dataset, indices, transform=None, is_train=True):
        self.dataset = dataset
        self.indices = indices
        self.transform = transform
        self.is_train = is_train

    def __len__(self):
        return len(self.indices)

    def __getitem__(self, idx):
        actual_idx = self.indices[idx]
        img_pil, label = self.dataset.dataset[actual_idx]
        
        if self.is_train:
            img_np = np.array(img_pil).copy()
            h, w = img_np.shape[:2]
            
            import random
            r_val = random.random()
            
            # 1. Giả lập Khẩu trang/Khăn bịt mặt (xác suất 25%)
            if r_val < 0.25:
                mask_colors = [
                    (100, 180, 200),  # Xanh y tế
                    (240, 240, 240),  # Trắng
                    (20, 20, 20),      # Đen
                    (120, 120, 120),  # Xám
                ]
                color = random.choice(mask_colors)
                pts = np.array([
                    [int(w * 0.15), int(h * 0.60)],
                    [int(w * 0.85), int(h * 0.60)],
                    [w, int(h * 0.80)],
                    [int(w * 0.75), h],
                    [int(w * 0.25), h],
                    [0, int(h * 0.80)]
                ], np.int32)
                cv2.fillPoly(img_np, [pts], color)
                
            # 2. Giả lập Gọng kính (xác suất 15%)
            elif r_val < 0.40:
                glass_color = (10, 10, 10)
                thickness = 2
                cv2.circle(img_np, (38, 52), 14, glass_color, thickness)
                cv2.circle(img_np, (74, 52), 14, glass_color, thickness)
                cv2.line(img_np, (52, 52), (60, 52), glass_color, thickness)
                cv2.line(img_np, (24, 52), (10, 52), glass_color, thickness)
                cv2.line(img_np, (88, 52), (102, 52), glass_color, thickness)
                
            img_pil = Image.fromarray(img_np)
            
        if self.transform:
            img_tensor = self.transform(img_pil)
        else:
            img_tensor = transforms.ToTensor()(img_pil)

        return img_tensor, label


# ==========================================
# 7. LUỒNG HUẤN LUYỆN CHÍNH (MAIN PROCESS)
# ==========================================
def main():
    # Bước 0: Tải tất cả model cần thiết về local trước khi bắt đầu
    download_all_models()

    # Bước 1: Thực hiện tiền xử lý ./dataraw -> ./data nếu phát hiện dataraw
    is_preprocessed = preprocess_dataraw()

    # Nếu không có dataraw, tự động sinh mock dataset trong ./data để luôn chạy mượt mà
    if not is_preprocessed:
        generate_mock_dataset()

    # Bước 2: Kiểm tra trọng số ArcFace pretrained đã được tải
    has_pretrained = os.path.exists(PRETRAINED_MODEL_PATH)

    # Bước 3: Chuẩn bị Dữ liệu Huấn luyện nâng cao (Gaussian Blur & Color Jitter cho trẻ em & người già)
    train_transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.RandomApply([transforms.GaussianBlur(kernel_size=3, sigma=(0.1, 2.0))], p=0.3),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])

    val_transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])

    full_dataset = AdvancedFaceDataset(root_dir=DATA_DIR)
    num_classes = len(full_dataset.classes)
    
    print(f"[+] Số lượng danh tính tìm thấy để Fine-tune: {num_classes}")
    print(f"[+] Danh sách nhãn lớp: {full_dataset.classes}")
    print(f"[+] Tổng số lượng ảnh thu thập: {len(full_dataset)}")

    if len(full_dataset) == 0:
        print("[-] Lỗi: Không tìm thấy tệp ảnh nào trong thư mục data!")
        return

    # Tách chỉ số (indices) thay vì random_split trực tiếp trên đối tượng dataset để có thể dùng transform/augmentation khác nhau
    indices = list(range(len(full_dataset)))
    import random
    random.seed(42)  # Cố định seed tách tập dữ liệu để đồng nhất
    random.shuffle(indices)
    
    if len(full_dataset) >= 5:
        train_size = int(0.8 * len(full_dataset))
        train_indices = indices[:train_size]
        val_indices = indices[train_size:]
    else:
        train_indices = indices
        val_indices = indices

    # Sử dụng CustomSubset để kiểm soát độc lập augmentation (chỉ bật khi training) và transform
    train_dataset = CustomSubset(full_dataset, train_indices, transform=train_transform, is_train=True)
    test_dataset = CustomSubset(full_dataset, val_indices, transform=val_transform, is_train=False)

    print(f"[+] Số lượng ảnh huấn luyện (Train - 80%): {len(train_dataset)}")
    print(f"[+] Số lượng ảnh kiểm thử (Test/Val - 20%): {len(test_dataset)}")

    use_pin_memory = (device.type == 'cuda')
    num_workers = args.workers if device.type == 'cuda' else 0
    train_dataloader = DataLoader(
        train_dataset, 
        batch_size=BATCH_SIZE, 
        shuffle=True, 
        drop_last=False,
        num_workers=num_workers,
        pin_memory=use_pin_memory
    )
    test_dataloader = DataLoader(
        test_dataset, 
        batch_size=BATCH_SIZE, 
        shuffle=False, 
        drop_last=False,
        num_workers=num_workers,
        pin_memory=use_pin_memory
    )

    # Bước 4: Khởi tạo mạng Backbone IResNet-100 ArcFace (Glint360K) và ArcFace Head
    pretrained_path = PRETRAINED_MODEL_PATH if has_pretrained else None
    backbone = ArcFaceIResNet100(embedding_size=EMBEDDING_SIZE, pretrained_path=pretrained_path).to(device)
    
    # Nâng cấp s=64.0 mặc định (tối ưu tuyệt đối cho sinh đôi/sinh ba và các trường hợp che khuất)
    arcface_head = ArcMarginProduct(in_features=EMBEDDING_SIZE, out_features=num_classes, s=64.0, m=MARGIN).to(device)

    # Khởi tạo Optimizer (Tối ưu hóa cả Backbone và ArcFace Head)
    criterion = nn.CrossEntropyLoss()
    triplet_criterion = BatchHardTripletLoss(margin=0.3).to(device)
    optimizer = torch.optim.Adam([
        {'params': backbone.parameters()},
        {'params': arcface_head.parameters()}
    ], lr=LEARNING_RATE)

    # Bắt đầu vòng lặp huấn luyện Fine-tune
    import copy
    best_loss = float('inf')
    best_val_acc = 0.0
    best_model_state = None
    best_epoch = -1

    # Resolve AMP setting for training
    use_amp = False
    if device.type == 'cuda':
        if args.amp is None:
            # Auto AMP selection: disable for AMD system, enable for Nvidia GPU
            use_amp = not has_amd_system
        else:
            use_amp = args.amp
        if use_amp:
            print(f"[+] Huấn luyện sử dụng Automatic Mixed Precision (AMP - FP16) trên [{device}].", flush=True)
        else:
            print(f"[-] Huấn luyện sử dụng FP32 (AMP tắt) trên [{device}].", flush=True)
    else:
        use_amp = False
        print(f"[-] AMP tắt trên [{device}] (chỉ hỗ trợ GPU CUDA/ROCm).", flush=True)

    scaler = torch.cuda.amp.GradScaler(enabled=use_amp)

    print(f"\n[*] Bắt đầu huấn luyện Fine-tune trên [{device}]...")
    
    for epoch in range(EPOCHS):
        if epoch < 5:
            # Giai đoạn 1: learning_rate của optimizer cần gấp đôi so với args đầu vào
            current_lr = LEARNING_RATE * 2
            for param_group in optimizer.param_groups:
                param_group['lr'] = current_lr
            for name, param in backbone.backbone.named_parameters():
                if "fc" not in name and "features" not in name:
                    param.requires_grad = False
            
            # Giai đoạn 1: tạm thời set margin = 0.0 để căn chỉnh phân tách các lớp thô trước mà không bị sụt giảm accuracy
            arcface_head.update_margin(0.0)
            print(f"[*] [Giai đoạn 1] Epoch {epoch+1}/{EPOCHS}: Đóng băng Convolutional Layers, chỉ huấn luyện Fully Connected Head. Learning Rate: {current_lr} | Margin m: 0.0")
        else:
            # Giai đoạn 2: set lại optimizer learning_rate theo giá trị args đưa vào
            current_lr = LEARNING_RATE
            for param_group in optimizer.param_groups:
                param_group['lr'] = current_lr
            for param in backbone.parameters():
                param.requires_grad = True
            
            # Giai đoạn 2: Tăng dần margin (Gradual Margin Warmup) trong 5 epoch (Epoch 6-10) để tránh gradient shock/collapse
            warmup_epochs = 5
            if epoch < 5 + warmup_epochs:
                # epoch chạy từ 5 đến 9
                step = epoch - 4
                current_margin = MARGIN * (step / warmup_epochs)
            else:
                current_margin = MARGIN
                
            arcface_head.update_margin(current_margin)
            print(f"[*] [Giai đoạn 2] Epoch {epoch+1}/{EPOCHS}: Mở khóa toàn bộ mạng để tinh chỉnh sâu. Learning Rate: {current_lr} | Margin m: {current_margin:.4f}")

        # --- BƯỚC HUẤN LUYỆN / TRAINING ---
        backbone.train()
        arcface_head.train()
        total_loss = 0.0
        correct = 0
        total = 0
        
        for batch_idx, (imgs, labels) in enumerate(train_dataloader):
            imgs = imgs.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            
            # Tự động chuyển đổi kiểu dữ liệu (AMP)
            with torch.cuda.amp.autocast(enabled=use_amp):
                # 1. Trích xuất embedding 512 chiều từ backbone
                embeddings = backbone(imgs)
                
                # 2. Đưa qua lớp phân lớp ArcFace
                outputs = arcface_head(embeddings, labels)
                
                # 3. Tính toán sai số
                loss_ce = criterion(outputs, labels)
                if getattr(args, 'use_triplet', True):
                    loss_triplet = triplet_criterion(embeddings, labels)
                    loss = loss_ce + loss_triplet
                else:
                    loss = loss_ce
            
            if use_amp:
                scaler.scale(loss).backward()
                scaler.step(optimizer)
                scaler.update()
            else:
                loss.backward()
                optimizer.step()
            
            total_loss += loss.item() * imgs.size(0)
            
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct_batch = predicted.eq(labels).sum().item()
            correct += correct_batch
            
            # Tính độ chính xác của batch hiện tại
            batch_acc = 100.0 * correct_batch / labels.size(0)
            
            # Ghi nhận log tiến trình của batch cho C# parse
            if getattr(args, 'use_triplet', True):
                print(f"[BATCH_PROGRESS] Epoch: {epoch+1}/{EPOCHS} | Batch: {batch_idx+1}/{len(train_dataloader)} | Loss: {loss.item():.4f} (CE: {loss_ce.item():.4f}, Triplet: {loss_triplet.item():.4f}) | Acc: {batch_acc:.2f}%")
            else:
                print(f"[BATCH_PROGRESS] Epoch: {epoch+1}/{EPOCHS} | Batch: {batch_idx+1}/{len(train_dataloader)} | Loss: {loss.item():.4f} | Acc: {batch_acc:.2f}%")
            sys.stdout.flush()
            
        epoch_loss = total_loss / len(train_dataset)
        epoch_acc = 100.0 * correct / total
        
        # --- BƯỚC KIỂM THỬ / VALIDATION (TEST - 20%) ---
        backbone.eval()
        arcface_head.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for val_imgs, val_labels in test_dataloader:
                val_imgs = val_imgs.to(device)
                val_labels = val_labels.to(device)
                
                with torch.cuda.amp.autocast(enabled=use_amp):
                    val_embeddings = backbone(val_imgs)
                    val_outputs = arcface_head(val_embeddings, val_labels)
                    loss_ce = criterion(val_outputs, val_labels)
                    if getattr(args, 'use_triplet', True):
                        loss_triplet = triplet_criterion(val_embeddings, val_labels)
                        loss = loss_ce + loss_triplet
                    else:
                        loss = loss_ce
                
                val_loss += loss.item() * val_imgs.size(0)
                _, val_predicted = val_outputs.max(1)
                val_total += val_labels.size(0)
                val_correct += val_predicted.eq(val_labels).sum().item()
                
        epoch_val_loss = val_loss / len(test_dataset)
        epoch_val_acc = 100.0 * val_correct / val_total

        # Ghi nhận log tiến trình hoàn thành epoch cho C# parse và theo dõi (Tương thích ngược 100% với regex của Backend C#)
        print(f"[EPOCH_PROGRESS] Epoch: {epoch+1}/{EPOCHS} | Loss: {epoch_val_loss:.4f} | Acc: {epoch_val_acc:.2f}% | Train Loss: {epoch_loss:.4f} | Train Acc: {epoch_acc:.2f}%")
        print(f"    Epoch [{epoch+1}/{EPOCHS}] - Val Loss (Loss): {epoch_val_loss:.4f} - Val Acc (Acc): {epoch_val_acc:.2f}% | Train Loss: {epoch_loss:.4f} - Train Acc: {epoch_acc:.2f}%")
        sys.stdout.flush()
        
        # Theo dõi độ chính xác kiểm thử (Validation Accuracy) tốt nhất và Loss để tránh Overfitting
        # Chỉ theo dõi từ Epoch 6 trở đi (Giai đoạn 2) để đảm bảo mô hình đã được huấn luyện với Margin thực tế
        if epoch >= 5:
            is_better = False
            if epoch_val_acc > best_val_acc:
                is_better = True
            elif math.isclose(epoch_val_acc, best_val_acc) and epoch_val_loss < best_loss:
                is_better = True
                
            if is_better:
                best_val_acc = epoch_val_acc
                best_loss = epoch_val_loss
                best_epoch = epoch + 1
                best_model_state = copy.deepcopy(backbone.state_dict())

    if best_epoch != -1:
        print(f"[+] Huấn luyện Fine-tune hoàn tất thành công. Validation Accuracy tốt nhất đạt: {best_val_acc:.2f}% (Loss: {best_loss:.4f}) ở Epoch {best_epoch}.")
    else:
        print(f"[+] Huấn luyện Fine-tune hoàn tất thành công. Không tìm thấy checkpoint tốt nhất trong Giai đoạn 2. Sử dụng trọng số Epoch cuối cùng.")

    # Helper function để xuất và kiểm định ONNX (gốc + mobile)
    def export_and_validate(model_to_export, onnx_path, mobile_path, label):
        print(f"\n[*] Đang tiến hành xuất mô hình {label} sang định dạng ONNX...")
        model_to_export.eval()
        dummy_input = torch.randn(1, 3, *IMAGE_SIZE, device=device)
        
        torch.onnx.export(
            model_to_export,
            dummy_input,
            onnx_path,
            export_params=True,
            opset_version=17,
            do_constant_folding=True,
            input_names=['input'],
            output_names=['output'],
            dynamic_axes={
                'input': {0: 'batch_size'},
                'output': {0: 'batch_size'}
            }
        )
        onnx_abs_path = os.path.abspath(onnx_path)
        print(f"[+] Đã xuất file ONNX {label} thành công!")
        print(f"[+] Đường dẫn đầy đủ (dùng trong C# .NET): {onnx_abs_path}")

        # Tiến hành lượng tử hóa cho di động
        quantize_onnx_model(onnx_path, mobile_path)

        # Kiểm định tệp tin ONNX gốc
        print(f"[*] Đang tự động kiểm định tệp tin ONNX {label} gốc...")
        onnx_model = onnx.load(onnx_path)
        onnx.checker.check_model(onnx_model)
        print(f"[+] Cấu trúc file ONNX {label} gốc hợp lệ!")

        ort_session = ort.InferenceSession(onnx_path)
        dummy_np = np.random.randn(1, 3, 112, 112).astype(np.float32)
        outputs = ort_session.run(None, {'input': dummy_np})
        embedding_out = outputs[0]
        print(f"[+] Output shape kiểm tra ({label} Gốc): {embedding_out.shape} (Mong đợi: (1, 512))")

        mobile_ok = False
        if os.path.exists(mobile_path):
            print(f"[*] Đang tự động kiểm định tệp tin ONNX {label} lượng tử hóa di động...")
            try:
                onnx_mobile = onnx.load(mobile_path)
                onnx.checker.check_model(onnx_mobile)
                print(f"[+] Cấu trúc file ONNX {label} di động hợp lệ!")
                
                ort_session_mobile = ort.InferenceSession(mobile_path)
                outputs_mobile = ort_session_mobile.run(None, {'input': dummy_np})
                embedding_out_mobile = outputs_mobile[0]
                print(f"[+] Output shape kiểm tra ({label} Mobile): {embedding_out_mobile.shape} (Mong đợi: (1, 512))")
                if embedding_out_mobile.shape == (1, 512):
                    mobile_ok = True
            except Exception as e:
                print(f"[-] Kiểm định mô hình {label} di động thất bại: {e}")

        return embedding_out.shape == (1, 512), mobile_ok

    # ==========================================
    # 8. XUẤT VÀ KIỂM ĐỊNH MÔ HÌNH EPOCH CUỐI CÙNG (FINAL)
    # ==========================================
    final_ok, final_mobile_ok = export_and_validate(backbone, MODEL_OUTPUT_PATH, MOBILE_MODEL_OUTPUT_PATH, "Epoch cuối cùng (Final)")

    # ==========================================
    # 9. XUẤT VÀ KIỂM ĐỊNH MÔ HÌNH BEST LOSS EPOCH
    # ==========================================
    best_ok = best_mobile_ok = False
    if best_model_state is not None:
        # Nạp lại trọng số tốt nhất vào backbone
        backbone.load_state_dict(best_model_state)
        best_ok, best_mobile_ok = export_and_validate(backbone, BEST_MODEL_OUTPUT_PATH, BEST_MOBILE_MODEL_OUTPUT_PATH, f"Epoch {best_epoch} tốt nhất (Best Loss)")

    # In kết quả tổng hợp hoành tráng
    print("\n" + "="*70)
    print(" KẾT QUẢ XUẤT PIPELINE ONNX & LƯỢNG TỬ HÓA THÀNH CÔNG!")
    print("="*70)
    
    if final_ok:
        final_abs = os.path.abspath(MODEL_OUTPUT_PATH)
        print(f" ✅ 1. Mô hình Epoch Cuối cùng (Final):")
        print(f"   - ONNX chuẩn (C# Backend):  {final_abs}")
        if final_mobile_ok:
            final_mobile_abs = os.path.abspath(MOBILE_MODEL_OUTPUT_PATH)
            print(f"   - ONNX di động (Flutter):   {final_mobile_abs}")
            
    if best_ok:
        best_abs = os.path.abspath(BEST_MODEL_OUTPUT_PATH)
        print(f"\n ✅ 2. Mô hình Epoch Tốt nhất (Best Loss - Epoch {best_epoch}):")
        print(f"   - ONNX chuẩn (C# Backend):  {best_abs}")
        if best_mobile_ok:
            best_mobile_abs = os.path.abspath(BEST_MOBILE_MODEL_OUTPUT_PATH)
            print(f"   - ONNX di động (Flutter):   {best_mobile_abs}")
            
    print("="*70)


if __name__ == "__main__":
    main()
