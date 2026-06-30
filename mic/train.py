import os
# Force CPU execution for CUDA-enabled libraries
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["QT_QPA_PLATFORM"] = "offscreen"  # Fallback for Qt if loaded

import glob
import subprocess
import numpy as np
import tensorflow as tf
import matplotlib
matplotlib.use('Agg') # Use non-interactive backend to avoid Qt/xcb/wayland plugin errors
import matplotlib.pyplot as plt
from pydub import AudioSegment  # THƯ VIỆN CHUYỂN ĐỔI ĐỊNH DẠNG ÂM THANH
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers, models

# ==========================================
# THAM SỐ CẤU HÌNH
# ==========================================
DATA_RAW_DIR = "dataraw"
OUTPUT_SPEC_DIR = "spectrogram"  
TFLITE_MODEL_PATH = "model.tflite"
HEADER_MODEL_PATH = "model_data.h"

LABELS = [d for d in os.listdir(DATA_RAW_DIR) if os.path.isdir(os.path.join(DATA_RAW_DIR, d))]
NUM_CLASSES = len(LABELS)

SAMPLING_RATE = 16000
DURATION_SEC = 1
EXPECTED_SAMPLES = SAMPLING_RATE * DURATION_SEC 

FRAME_LENGTH = 480  
FRAME_STEP = 320    

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
    stft = tf.signal.stft(audio, frame_length=FRAME_LENGTH, frame_step=FRAME_STEP)
    spectrogram = tf.abs(stft)
    return spectrogram[..., tf.newaxis]

# ==========================================
# QUÉT RAW -> LƯU ẢNH PHỔ -> TẠO DATASET
# ==========================================
def create_dataset_and_save_images():
    X, y = [], []
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
                audio = load_and_pad_audio(file_path)
                spectrogram = convert_to_spectrogram(audio)
                spec_np = spectrogram.numpy()
                X.append(spec_np)
                y.append(label_idx)
                
                # Lưu ảnh phổ để check trực quan bằng mắt
                base_name = os.path.basename(file_path)
                # Đổi đuôi bất kỳ thành .png
                base_name = os.path.splitext(base_name)[0] + ".png"
                
                # Hàm save_spectrogram_image giữ nguyên như code trước của bạn...
                matrix_2d = np.squeeze(spec_np, axis=-1)
                log_spec = np.log(matrix_2d + 1e-6)
                plt.figure(figsize=(3, 3))
                plt.imshow(log_spec.T, origin='lower', aspect='auto', cmap='viridis')
                plt.axis('off')
                plt.savefig(os.path.join(spec_folder, base_name), bbox_inches='tight', pad_inches=0, dpi=100)
                plt.close()
                
            except Exception as e:
                print(f"⚠️ Lỗi khi xử lý file {file_path}: {e}")
                
    return np.array(X, dtype=np.float32), np.array(y)

# Thực thi trích xuất dữ liệu thô
X, y = create_dataset_and_save_images()

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

print("\n🚀 Bắt đầu huấn luyện mô hình...")
model.fit(X_train, y_train, epochs=30, batch_size=16, validation_data=(X_val, y_val))

# Lưu model gốc (.h5)
model.save("vietnam_wakeup_model.h5")
print("💾 Đã lưu model Keras: 'vietnam_wakeup_model.h5'")


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
        
    print(f"🎉 HOÀN THÀNH XUẤT THÀNH CÔNG! Bạn có thể lấy file '{HEADER_MODEL_PATH}' nạp thẳng vào ESP32.")

except FileNotFoundError:
    # Phóng đại phương án dự phòng cho môi trường Windows nếu không cài sẵn tiện ích xxd
    print("⚠️ Không tìm thấy công cụ 'xxd' trên hệ thống (Thường gặp trên Windows chưa cấu hình).")
    print("🔄 Đang chạy thuật toán Python thuần tự chế thay thế cho xxd để tạo file .h...")
    
    with open(TFLITE_MODEL_PATH, "rb") as f_tflite:
        tflite_content = f_tflite.read()
        
    with open(HEADER_MODEL_PATH, "w") as f_h:
        f_h.write("// Sinh ra tự động bằng mã Python thuần thay thế xxd\n")
        f_h.write(f"const unsigned char model_tflite[] = {{\n  ")
        
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