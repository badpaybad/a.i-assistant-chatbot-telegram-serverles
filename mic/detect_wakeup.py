import os
# Force CPU execution for TensorFlow/PyTorch
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["QT_QPA_PLATFORM"] = "offscreen"

import time
from datetime import datetime
import numpy as np
import tensorflow as tf
import sounddevice as sd
import soundfile as sf
import queue

# Configs
MODEL_PATH = "model.tflite"
DETECTIONS_DIR = "detections"
SAMPLING_RATE = 16000
BLOCK_SIZE = 1600  # 100ms blocks
COOLDOWN_SEC = 1.5
THRESHOLD = 0.8

# Ensure output directory exists
os.makedirs(DETECTIONS_DIR, exist_ok=True)

# Load TFLite model
print("⚙️ Đang tải mô hình TFLite...")
interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Quét danh sách nhãn lớp từ dataraw để xác định thứ tự các class
DATA_RAW_DIR = "dataraw"
if os.path.exists(DATA_RAW_DIR):
    LABELS = sorted([d for d in os.listdir(DATA_RAW_DIR) if os.path.isdir(os.path.join(DATA_RAW_DIR, d))])
else:
    # Thứ tự mặc định fallback nếu không thấy thư mục dataraw
    LABELS = ["background", "du_oi", "unknown"]

print("\n🏷️ THỨ TỰ PHÂN LOẠI LỚP (CLASS MAPPING):")
for idx, label in enumerate(LABELS):
    print(f"   Class [{idx}]: {label}")
print("-" * 40 + "\n")

# Buffer variables
buffer_len = SAMPLING_RATE * 2  # Keep 2 seconds of audio history
audio_buffer = np.zeros(buffer_len, dtype=np.float32)
audio_queue = queue.Queue()
last_detection_time = 0.0

def callback(indata, frames, time_info, status):
    if status:
        print(f"⚠️ Status: {status}", flush=True)
    audio_queue.put(indata.copy())

def convert_to_spectrogram(audio_np):
    # Convert numpy array to tensorflow tensor
    audio = tf.convert_to_tensor(audio_np, dtype=tf.float32)
    # Peak normalization (matching train.py line 63-66)
    max_val = tf.reduce_max(tf.abs(audio))
    if max_val > 0:
        audio = audio / max_val
    stft = tf.signal.stft(audio, frame_length=480, frame_step=320)
    spectrogram = tf.abs(stft)
    return spectrogram[..., tf.newaxis].numpy()

# Test spectrogram conversion
print("🔍 Đang chạy kiểm thử tiền xử lý...")
test_audio = np.zeros(16000, dtype=np.float32)
test_spec = convert_to_spectrogram(test_audio)
print(f"✅ Kích thước spectrogram thử nghiệm: {test_spec.shape} (Kỳ vọng: (49, 257, 1))")

# Start audio stream
print(f"🎙️ Đang mở micro (Tần số mẫu: {SAMPLING_RATE}Hz, Kích thước block: {BLOCK_SIZE} mẫu)...")
stream = sd.InputStream(samplerate=SAMPLING_RATE, blocksize=BLOCK_SIZE, channels=1, callback=callback)

with stream:
    print("🚀 Đang lắng nghe từ micro... Nhấn Ctrl+C để dừng.")
    while True:
        try:
            data = audio_queue.get()
            
            # Slide buffer and append new block
            audio_buffer = np.roll(audio_buffer, -len(data))
            audio_buffer[-len(data):] = data[:, 0]
            
            # Take the last 1.0 second (16000 samples) for inference
            input_audio = audio_buffer[-16000:]
            
            # Run inference if cooldown has expired
            current_time = time.time()
            if current_time - last_detection_time < COOLDOWN_SEC:
                continue
                
            # Convert to spectrogram and add batch dimension
            spec = convert_to_spectrogram(input_audio)
            spec_batch = np.expand_dims(spec, axis=0)
            
            # Quantize input
            input_scale, input_zero_point = input_details[0]['quantization']
            if input_scale != 0.0:
                input_data = (spec_batch / input_scale) + input_zero_point
                input_data = np.clip(np.round(input_data), -128, 127).astype(np.int8)
            else:
                input_data = spec_batch.astype(np.int8)
                
            # Set input tensor and invoke
            interpreter.set_tensor(input_details[0]['index'], input_data)
            interpreter.invoke()
            
            # Get output and dequantize
            output_data = interpreter.get_tensor(output_details[0]['index'])
            output_scale, output_zero_point = output_details[0]['quantization']
            if output_scale != 0.0:
                probabilities = (output_data.astype(np.float32) - output_zero_point) * output_scale
            else:
                probabilities = output_data.astype(np.float32)
                
            # Tạo dictionary map giữa tên nhãn và xác suất để gán động theo đúng thứ tự nhãn
            prob_dict = {}
            for idx, label in enumerate(LABELS):
                if idx < len(probabilities[0]):
                    prob_dict[label] = probabilities[0][idx]
                else:
                    prob_dict[label] = 0.0
                    
            prob_du_oi = prob_dict.get("du_oi", 0.0)
            prob_unknown = prob_dict.get("unknown", 0.0)
            prob_bg = prob_dict.get("background", 0.0)
            
            # Display real-time output (low probability threshold logging)
            if prob_du_oi > 0.2:
                print(f"🔊 Trạng thái: du_oi={prob_du_oi:.2f} | unknown={prob_unknown:.2f} | background={prob_bg:.2f}", end="\r")
                
            # Trigger detection
            if prob_du_oi >= THRESHOLD:
                print("\n🎉 PHÁT HIỆN: 'du ơi'!")
                last_detection_time = current_time
                
                # Save the last 2 seconds of audio buffer to a WAV file
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"detected_duoi_{timestamp}.wav"
                filepath = os.path.join(DETECTIONS_DIR, filename)
                
                sf.write(filepath, audio_buffer, SAMPLING_RATE)
                print(f"💾 Đã lưu file ghi âm: '{filepath}'\n")
                
                # Reset the queue to prevent immediate re-triggering from remaining buffer
                while not audio_queue.empty():
                    audio_queue.get_nowait()
                    
        except KeyboardInterrupt:
            print("\n👋 Đã tắt bộ nhận diện.")
            break
        except Exception as e:
            print(f"\n⚠️ Lỗi trong vòng lặp xử lý: {e}")
            break
