import os
import sys
import glob
import subprocess
import argparse

# Keep baseline compatibility settings
os.environ["QT_QPA_PLATFORM"] = "offscreen"  # Fallback for Qt if loaded
os.environ["TF_USE_LEGACY_KERAS"] = "1"

# Detect and configure AMD GPU environments before importing tensorflow
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
        import sys
        import subprocess
        # Run python in a subprocess to query arch list without initializing CUDA/ROCm in parent process
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
            print(f"[AMD GPU Setup] AMD GPU {real_arch} is natively supported. No HSA override needed.", flush=True)
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
            print("[NVIDIA GPU Setup] NVIDIA GPU detected.", flush=True)
    return has_nvidia

# Configure environment based on system GPUs
has_amd_system = setup_amd_gpu_env()
has_nvidia_system = setup_nvidia_gpu_env()

# Parse arguments first
def parse_args():
    parser = argparse.ArgumentParser(description="Train audio model for microphone wake word")
    parser.add_argument('--data', type=str, default="dataraw", help='Path to raw data directory')
    parser.add_argument('--epochs', type=int, default=30, help='Number of epochs to train')
    parser.add_argument('--batch', type=int, default=16, help='Batch size')
    parser.add_argument('--device', type=str, default='', help='Device to train on, e.g., cpu, cuda, gpu, 0, 1 (empty for auto)')
    parser.add_argument('--no-augment', action='store_true', help='Disable data augmentation')
    parser.add_argument('--force-gpu', action='store_true', help='Force GPU on unsupported hardware')
    return parser.parse_args()

args = parse_args()

# Resolve device
device = args.device
gpu_available = False
device_name = ""
try:
    import torch
    gpu_available = torch.cuda.is_available()
    if gpu_available:
        device_name = torch.cuda.get_device_name(0)
except Exception:
    try:
        import subprocess as sp
        sp.check_output(["nvidia-smi"], stderr=sp.DEVNULL)
        gpu_available = True
        device_name = "NVIDIA GPU"
    except Exception:
        pass

if not device:
    if gpu_available:
        device = 'cuda'
        print(f"Auto-detected GPU ('{device_name}') for training.", flush=True)
    else:
        device = 'cpu'
        print("Auto-detected CPU for training (No GPU available).", flush=True)
else:
    device_lower = device.lower().strip()
    if device_lower in ('gpu', 'amd', 'rocm', 'cuda') or device_lower.isdigit() or ',' in device_lower:
        if gpu_available:
            device = 'cuda'
            if device_lower.isdigit():
                os.environ["CUDA_VISIBLE_DEVICES"] = device_lower
                print(f"Using GPU device: {device_lower}", flush=True)
            elif ',' in device_lower:
                os.environ["CUDA_VISIBLE_DEVICES"] = device_lower
                print(f"Using GPU devices: {device_lower}", flush=True)
        else:
            print("Warning: GPU was requested but no GPU is available. Falling back to CPU.", flush=True)
            device = 'cpu'
    elif device_lower == 'cpu':
        device = 'cpu'
    else:
        print(f"Warning: Unknown device '{device}'. Falling back to CPU.", flush=True)
        device = 'cpu'

# Apply safety overrides for AMD iGPU (Radeon 780M / gfx1103) if using GPU
if device == 'cuda':
    gcn_arch = detect_real_amd_gpu_arch()
    if not gcn_arch:
        try:
            import torch
            gcn_arch = getattr(torch.cuda.get_device_properties(0), 'gcnArchName', '')
        except Exception:
            pass

    if gcn_arch and ('gfx1102' in gcn_arch or 'gfx1103' in gcn_arch) and not args.force_gpu:
        print("\n" + "="*80, flush=True)
        print("[WARNING] gfx1102/gfx1103 (Radeon 780M) detected — GPU training is NOT stable by default!")
        print("Switching to CPU training for stability.", flush=True)
        device = 'cpu'

if device == 'cpu':
    os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
    print("Forcing CPU execution for TensorFlow (CUDA_VISIBLE_DEVICES=-1).", flush=True)

# Now import the rest of the libraries
import numpy as np
import tensorflow as tf
import matplotlib
matplotlib.use('Agg') # Use non-interactive backend to avoid Qt/xcb/wayland plugin errors
import matplotlib.pyplot as plt
from pydub import AudioSegment  # THƯ VIỆN CHUYỂN ĐỔI ĐỊNH DẠNG ÂM THANH
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers, models

# Configure memory growth for TF GPUs if running on GPU
if device != 'cpu':
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
            print("[TF GPU Setup] Enabled dynamic memory allocation (memory growth) for GPUs.", flush=True)
        except RuntimeError as e:
            print(f"[TF GPU Setup] Error setting memory growth: {e}", flush=True)

# ==========================================
# THAM SỐ CẤU HÌNH
# ==========================================
DATA_RAW_DIR = args.data
OUTPUT_SPEC_DIR = "spectrogram"  
TFLITE_MODEL_PATH = "model.tflite"
HEADER_MODEL_PATH = "model_data.h"

LABELS = sorted([d for d in os.listdir(DATA_RAW_DIR) if os.path.isdir(os.path.join(DATA_RAW_DIR, d))])
NUM_CLASSES = len(LABELS)

SAMPLING_RATE = 16000
DURATION_SEC = 1
EXPECTED_SAMPLES = SAMPLING_RATE * DURATION_SEC 

FRAME_LENGTH = 240  
FRAME_STEP = 160    

# ==========================================
# HÀM ĐỌC VÀ CHUẨN HÓA MỌI ĐỊNH DẠNG ÂM THANH
# ==========================================
def load_and_pad_audio(file_path):
    """
    Đọc MỌI định dạng âm thanh (.mp3, .m4a, .wav không chuẩn...), 
    convert về chuẩn 16kHz, Mono, chuẩn hóa biên độ và fix cứng 1 giây.
    """
    try:
        # 1. Dùng pydub tự động nhận diện và nạp file (mp3, m4a, wav, ogg...)
        audio_segment = AudioSegment.from_file(file_path)
        
        # 2. Ép trực tiếp về Mono và Tần số 16000Hz ngay trong bộ nhớ
        audio_segment = audio_segment.set_channels(1).set_frame_rate(SAMPLING_RATE)
        
        # 3. Lấy mảng dữ liệu số thô (Raw data) ra dưới dạng mảng float32 trong khoảng [-1.0, 1.0]
        samples = np.array(audio_segment.get_array_of_samples(), dtype=np.float32)
        
        # Phụ thuộc vào bit-depth gốc để chia tỷ lệ chuẩn hóa về khoảng [-1.0, 1.0]
        # Thường file âm thanh là 16-bit nên chia cho 2^15
        if audio_segment.sample_width == 2:
            samples /= 32768.0
        elif audio_segment.sample_width == 4:
            samples /= 2147483648.0
            
        # Chuyển mảng numpy thành TensorFlow Tensor
        audio = tf.convert_to_tensor(samples, dtype=tf.float32)
        
    except Exception as e:
        raise RuntimeError(f"Không thể giải mã file {file_path} qua pydub. Lỗi: {e}")

    # 4. CHUẨN HÓA BIÊN ĐỘ ĐỈNH (Volume Normalization)
    max_val = tf.reduce_max(tf.abs(audio))
    if max_val > 0:
        audio = audio / max_val

    # 5. KHÓA CỨNG ĐỘ DÀI ĐÚNG 1 GIÂY (16000 samples)
    audio_length = tf.shape(audio)[0]
    if audio_length < EXPECTED_SAMPLES:
        padding = EXPECTED_SAMPLES - audio_length
        audio = tf.pad(audio, [[0, padding]])
    else:
        audio = audio[:EXPECTED_SAMPLES]
        
    # Lưu vào folder data theo các label tương ứng để kiểm tra audio đã cắt về 1 giây
    label_name = os.path.basename(os.path.dirname(file_path))
    base_name = os.path.basename(file_path)
    # Đảm bảo lưu dưới dạng wav
    base_name = os.path.splitext(base_name)[0] + ".wav"
    output_dir = os.path.join("data", label_name)
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, base_name)
    
    import soundfile as sf
    sf.write(output_path, audio.numpy(), SAMPLING_RATE)
        
    return audio

def convert_to_spectrogram(audio):
    stft = tf.signal.stft(audio, frame_length=FRAME_LENGTH, frame_step=FRAME_STEP, fft_length=512)
    spectrogram = tf.abs(stft)
    return spectrogram[..., tf.newaxis]

# ==========================================
# CÁC HÀM TĂNG CƯỜNG DỮ LIỆU (DATA AUGMENTATION)
# ==========================================
def add_white_noise(audio, noise_factor=0.005):
    """
    Thêm tiếng ồn trắng (white noise) vào tín hiệu âm thanh với tỷ lệ nhỏ.
    """
    noise = tf.random.normal(shape=tf.shape(audio), mean=0.0, stddev=1.0, dtype=tf.float32)
    augmented_audio = audio + noise_factor * noise
    return tf.clip_by_value(augmented_audio, -1.0, 1.0)

def time_shift(audio, shift_limit_ms=50):
    """
    Dịch chuyển trục thời gian của âm thanh sang trái hoặc phải ngẫu nhiên vài mười mili-giây.
    """
    # 1 ms tương đương 16 samples ở rate 16000Hz
    shift_samples = int(shift_limit_ms * (SAMPLING_RATE / 1000.0))
    shift = np.random.randint(-shift_samples, shift_samples)
    
    if shift > 0:
        # Dịch chuyển sang phải (chèn zeros vào đầu, cắt bớt ở cuối)
        shifted = tf.concat([tf.zeros(shift, dtype=tf.float32), audio[:-shift]], axis=0)
    elif shift < 0:
        # Dịch chuyển sang trái (cắt bớt ở đầu, chèn zeros vào cuối)
        shift = -shift
        shifted = tf.concat([audio[shift:], tf.zeros(shift, dtype=tf.float32)], axis=0)
    else:
        shifted = audio
    return shifted

def process_and_save_variant(audio, label_name, label_idx, base_name, variant_suffix, spec_folder, X, y):
    """
    Lưu spectrogram, file ảnh phổ và file .wav cho mỗi biến thể tăng cường (hoặc gốc).
    """
    spectrogram = convert_to_spectrogram(audio)
    spec_np = spectrogram.numpy()
    X.append(spec_np)
    y.append(label_idx)
    
    # 1. Lưu ảnh phổ (.png)
    img_name = f"{base_name}_{variant_suffix}.png" if variant_suffix else f"{base_name}.png"
    matrix_2d = np.squeeze(spec_np, axis=-1)
    log_spec = np.log(matrix_2d + 1e-6)
    plt.figure(figsize=(3, 3))
    plt.imshow(log_spec.T, origin='lower', aspect='auto', cmap='viridis')
    plt.axis('off')
    plt.savefig(os.path.join(spec_folder, img_name), bbox_inches='tight', pad_inches=0, dpi=100)
    plt.close()
    
    # 2. Lưu file .wav tăng cường nếu không phải bản gốc (bản gốc đã được load_and_pad_audio lưu rồi)
    if variant_suffix:
        output_dir = os.path.join("data", label_name)
        os.makedirs(output_dir, exist_ok=True)
        wav_name = f"{base_name}_{variant_suffix}.wav"
        output_path = os.path.join(output_dir, wav_name)
        import soundfile as sf
        sf.write(output_path, audio.numpy(), SAMPLING_RATE)

# ==========================================
# QUÉT RAW -> TĂNG CƯỜNG -> LƯU ẢNH PHỔ -> TẠO DATASET
# ==========================================
def create_dataset_and_save_images(augment=True):
    X, y = [], []
    print("LABELS: ",LABELS)
    for label_idx, label_name in enumerate(LABELS):
        raw_folder = os.path.join(DATA_RAW_DIR, label_name)
        spec_folder = os.path.join(OUTPUT_SPEC_DIR, label_name)
        os.makedirs(spec_folder, exist_ok=True)
        
        # Quét TẤT CẢ các file có trong thư mục chứ không chỉ bó buộc mỗi .wav nữa
        file_list = []
        for ext in ('*.wav', '*.mp3', '*.m4a', '*.ogg', '*.WAV', '*.MP3'):
            file_list.extend(glob.glob(os.path.join(raw_folder, ext)))
            
        print(f"📂 Đang trích xuất '{label_name}'... Tìm thấy {len(file_list)} file âm thanh.")
        
        for file_path in file_list:
            try:
                # 1. Đọc và chuẩn hóa bản gốc (wav gốc được lưu trong load_and_pad_audio)
                audio = load_and_pad_audio(file_path)
                
                # Trích xuất tên file gốc không kèm phần mở rộng
                base_name = os.path.splitext(os.path.basename(file_path))[0]
                
                # Lưu bản gốc vào dataset
                process_and_save_variant(audio, label_name, label_idx, base_name, "", spec_folder, X, y)
                
                if augment:
                    # 2. Tạo bản sao thêm tiếng ồn trắng (White noise)
                    audio_noise = add_white_noise(audio, noise_factor=0.005)
                    process_and_save_variant(audio_noise, label_name, label_idx, base_name, "noise", spec_folder, X, y)
                    
                    # 3. Tạo bản sao dịch chuyển thời gian (Time shifting)
                    audio_shift = time_shift(audio, shift_limit_ms=50)
                    process_and_save_variant(audio_shift, label_name, label_idx, base_name, "shift", spec_folder, X, y)
                    
                    # 4. Kết hợp cả dịch chuyển thời gian và tiếng ồn trắng
                    audio_shift_noise = add_white_noise(audio_shift, noise_factor=0.005)
                    process_and_save_variant(audio_shift_noise, label_name, label_idx, base_name, "shift_noise", spec_folder, X, y)
                
            except Exception as e:
                print(f"⚠️ Lỗi khi xử lý file {file_path}: {e}")
                
    return np.array(X, dtype=np.float32), np.array(y)

# Thực thi trích xuất dữ liệu thô
X, y = create_dataset_and_save_images(augment=not args.no_augment)

# Chia bộ dữ liệu
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# ==========================================
# XÂY DỰNG VÀ HUẤN LUYỆN MODEL CNN KEROS
# ==========================================
input_shape = X_train.shape[1:]

model = models.Sequential([
    layers.Input(shape=input_shape),
    layers.Conv2D(8, 3, activation='relu', padding='same'),
    layers.MaxPooling2D(),
    layers.Dropout(0.2),
    layers.Conv2D(16, 3, activation='relu', padding='same'),
    layers.MaxPooling2D(),
    layers.Dropout(0.2),
    layers.Flatten(),
    layers.Dense(32, activation='relu'),
    layers.Dense(NUM_CLASSES, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Cấu hình log quá trình train ra file CSV để xem trên dashboard
dashboard_dir = "train_dashboard"
os.makedirs(dashboard_dir, exist_ok=True)
csv_log_path = os.path.join(dashboard_dir, "training_log.csv")
csv_logger = tf.keras.callbacks.CSVLogger(csv_log_path, append=False)

print("\n🚀 Bắt đầu huấn luyện mô hình...")
model.fit(
    X_train, 
    y_train, 
    epochs=args.epochs, 
    batch_size=args.batch, 
    validation_data=(X_val, y_val),
    callbacks=[csv_logger]
)

# Lưu model gốc (.h5)
model.save("vietnam_wakeup_model.h5")
print("💾 Đã lưu model Keras: 'vietnam_wakeup_model.h5'")

print("LABELS: ",LABELS)


# ==========================================
# CHUYỂN ĐỔI SANG TFLITE INT8 QUANTIZATION
# ==========================================
print("\n🛠️ Đang bắt đầu ép xung lượng tử hóa sang INT8 (Quantization)...")

converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Thiết lập ép cứng các toán tử và kiểu dữ liệu I/O về INT8
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8

# Định nghĩa hàm cung cấp dữ liệu mẫu đại diện (bốc từ X_train) để AI tính toán biên độ nhiễu
def representative_data_gen():
    # Lấy khoảng 100 mẫu ngẫu nhiên từ tập train để hiệu chuẩn
    for input_value in tf.data.Dataset.from_tensor_slices(X_train).batch(1).take(100):
        yield [input_value]

converter.representative_dataset = representative_data_gen

# Thực hiện chuyển đổi
tflite_model = converter.convert()

# Ghi dữ liệu xuống file .tflite nhị phân
with open(TFLITE_MODEL_PATH, "wb") as f:
    f.write(tflite_model)
print(f"✔️ Đã xuất mô hình nén thành công: '{TFLITE_MODEL_PATH}'")


# ==========================================
# SỬ DỤNG SUBPROCESS XUẤT C/C++ HEADER (.h)
# ==========================================
print(f"\n⚡ Đang tự động biên dịch sang mã nhị phân C++ Array vào file '{HEADER_MODEL_PATH}'...")

try:
    # Lệnh hệ thống kiểm tra xem máy có công cụ xxd hay không (Thường có sẵn trên Linux/Ubuntu/macOS)
    # Câu lệnh: xxd -i model.tflite > model_data.h
    with open(HEADER_MODEL_PATH, "w") as output_h_file:
        subprocess.run(["xxd", "-i", TFLITE_MODEL_PATH], stdout=output_h_file, check=True)
    
    # Đọc lại và chuyển đổi thành const + aligned(16)
    with open(HEADER_MODEL_PATH, "r") as f:
        h_content = f.read()
    
    h_content = h_content.replace(
        "unsigned char model_tflite[]",
        "const unsigned char model_tflite[] __attribute__((aligned(16)))"
    )
    h_content = h_content.replace(
        "unsigned int model_tflite_len",
        "const unsigned int model_tflite_len"
    )
    
    with open(HEADER_MODEL_PATH, "w") as f:
        f.write(h_content)
        
    print(f"🎉 HOÀN THÀNH XUẤT THÀNH CÔNG! Bạn có thể lấy file '{HEADER_MODEL_PATH}' nạp thẳng vào ESP32.")

except FileNotFoundError:
    # Phóng đại phương án dự phòng cho môi trường Windows nếu không cài sẵn tiện ích xxd
    print("⚠️ Không tìm thấy công cụ 'xxd' trên hệ thống (Thường gặp trên Windows chưa cấu hình).")
    print("🔄 Đang chạy thuật toán Python thuần tự chế thay thế cho xxd để tạo file .h...")
    
    with open(TFLITE_MODEL_PATH, "rb") as f_tflite:
        tflite_content = f_tflite.read()
        
    with open(HEADER_MODEL_PATH, "w") as f_h:
        f_h.write("// Sinh ra tự động bằng mã Python thuần thay thế xxd\n")
        f_h.write(f"const unsigned char model_tflite[] __attribute__((aligned(16))) = {{\n  ")
        
        # Biến đổi từng byte nhị phân sang mã Hex (0x00)
        hex_bytes = [f"0x{b:02x}" for b in tflite_content]
        
        # Cắt mảng và xuống hàng sau mỗi 12 phần tử cho đẹp cấu trúc file
        for i in range(0, len(hex_bytes), 12):
            f_h.write(", ".join(hex_bytes[i:i+12]))
            if i + 12 < len(hex_bytes):
                f_h.write(",\n  ")
        f_h.write("\n};\n")
        f_h.write(f"const unsigned int model_tflite_len = {len(tflite_content)};\n")
        
    print(f"🎉 HOÀN THÀNH PHƯƠNG ÁN DỰ PHÒNG! File '{HEADER_MODEL_PATH}' đã sẵn sàng.")

# Tự động copy sang esp32/esp32os/wakeupword_model_data.h nếu thư mục đích tồn tại
import shutil
import os
esp32_dest_dir = os.path.join("..", "esp32", "esp32os")
esp32_dest_file = os.path.join(esp32_dest_dir, "wakeupword_model_data.h")
if os.path.exists(esp32_dest_dir):
    try:
        shutil.copy(HEADER_MODEL_PATH, esp32_dest_file)
        print(f"✨ Đã tự động copy và cập nhật '{esp32_dest_file}'")
    except Exception as e:
        print(f"⚠️ Không thể tự động copy sang ESP32 folder: {e}")

print("LABELS: ",LABELS)