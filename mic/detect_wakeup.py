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
import sys
import asyncio

# Setup sys.path to import config from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from config import GEMINI_APIKEY
except ImportError:
    GEMINI_APIKEY = os.environ.get("GEMINI_API_KEY", "")


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

def play_beep(frequency=440, duration=0.2, volume=0.3):
    """Phát tiếng bíp bằng sounddevice."""
    try:
        sample_rate = 16000
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        wave = np.sin(2 * np.pi * frequency * t) * volume
        sd.play(wave, sample_rate)
        sd.wait()
    except Exception as e:
        print(f"⚠️ Không thể phát tiếng bíp: {e}")

async def run_gemini_live_session(api_key):
    """Kết nối tới Gemini 2.0 Live API qua websocket để stream mic và loa máy tính."""
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("❌ Chưa cài đặt thư viện 'google-genai'. Vui lòng chạy: pip install google-genai")
        return

    if not api_key:
        print("❌ Không tìm thấy GEMINI_APIKEY trong config.py hoặc môi trường.")
        return

    client = genai.Client(api_key=api_key)
    model = "gemini-2.0-flash-exp"
    
    config = types.LiveConnectConfig(
        response_modalities=[types.Modality.AUDIO],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aoede")
            )
        ),
        system_instruction=types.Content(
            parts=[types.Part.from_text(
                "Bạn là trợ lý ảo tiếng Việt thông minh có tên là 'Du'. Hãy trả lời cực kỳ ngắn gọn, tự nhiên và trôi chảy như đang hội thoại thực tế."
            )]
        )
    )

    loop = asyncio.get_running_loop()
    input_queue = asyncio.Queue()
    playback_queue = asyncio.Queue()
    interrupt_event = asyncio.Event()
    state = {"last_activity_time": time.time()}

    # Callback cho sounddevice RawInputStream
    def input_callback(indata, frames, time_info, status):
        if status:
            print(f"🎙️ Trạng thái Mic: {status}", flush=True)
        loop.call_soon_threadsafe(input_queue.put_nowait, bytes(indata))

    # Cấu hình RawInputStream (thu âm 16kHz mono int16)
    mic_stream = sd.RawInputStream(
        samplerate=16000,
        channels=1,
        dtype='int16',
        blocksize=1024,
        callback=input_callback
    )

    # Cấu hình RawOutputStream (phát loa 24kHz mono int16)
    play_stream = sd.RawOutputStream(
        samplerate=24000,
        channels=1,
        dtype='int16',
        blocksize=1024
    )

    async def send_mic_task(session):
        try:
            while True:
                chunk = await input_queue.get()
                state["last_activity_time"] = time.time()
                await session.send_realtime_input(
                    audio=types.Blob(data=chunk, mime_type="audio/pcm;rate=16000")
                )
                input_queue.task_done()
        except asyncio.CancelledError:
            pass

    async def play_audio_task():
        try:
            while True:
                chunk = await playback_queue.get()
                if interrupt_event.is_set():
                    playback_queue.task_done()
                    continue
                # Ghi ra loa qua thread phụ
                await asyncio.to_thread(play_stream.write, chunk)
                playback_queue.task_done()
        except asyncio.CancelledError:
            pass

    async def receive_task(session):
        try:
            async for message in session.receive():
                server_content = message.server_content
                if server_content is not None:
                    if server_content.model_turn is not None:
                        for part in server_content.model_turn.parts:
                            if part.inline_data is not None:
                                state["last_activity_time"] = time.time()
                                await playback_queue.put(part.inline_data.data)
                            elif part.text is not None:
                                print(part.text, end="", flush=True)

                    if server_content.interrupted:
                        print("\n🛑 Người dùng nói xen vào, dừng phát âm thanh hiện tại...")
                        interrupt_event.set()
                        while not playback_queue.empty():
                            try:
                                playback_queue.get_nowait()
                                playback_queue.task_done()
                            except asyncio.QueueEmpty:
                                break

                    if server_content.turn_complete:
                        print("")
                        interrupt_event.clear()
        except asyncio.CancelledError:
            pass
        except Exception as e:
            print(f"\n⚠️ Lỗi luồng nhận dữ liệu: {e}")

    try:
        mic_stream.start()
        play_stream.start()
        print("🔗 Đang kết nối cuộc gọi Live với Gemini...")
        async with client.aio.live.connect(model=model, config=config) as session:
            print("🟢 Trợ lý ảo đã sẵn sàng! Hãy nói chuyện.")
            play_beep(600, 0.1)
            play_beep(800, 0.15)
            
            send_task = asyncio.create_task(send_mic_task(session))
            play_task = asyncio.create_task(play_audio_task())
            recv_task = asyncio.create_task(receive_task(session))
            
            INACTIVITY_TIMEOUT = 30.0
            while not send_task.done() and not play_task.done() and not recv_task.done():
                await asyncio.sleep(0.5)
                if time.time() - state["last_activity_time"] > INACTIVITY_TIMEOUT:
                    print("\n⏳ Không có hoạt động trong 30 giây. Tự động kết thúc cuộc gọi...")
                    break
                    
            for t in [send_task, play_task, recv_task]:
                if not t.done():
                    t.cancel()
            await asyncio.gather(send_task, play_task, recv_task, return_exceptions=True)
            
    except KeyboardInterrupt:
        print("\n👋 Kết thúc phiên trò chuyện.")
    except Exception as e:
        print(f"\n❌ Lỗi phiên làm việc Gemini Live: {e}")
    finally:
        try:
            mic_stream.stop()
            mic_stream.close()
        except Exception:
            pass
        try:
            play_stream.stop()
            play_stream.close()
        except Exception:
            pass
        play_beep(400, 0.15)

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
                
                # Tạm dừng stream nhận diện để nhường thiết bị mic cho Gemini Live
                try:
                    stream.stop()
                except Exception as e:
                    print(f"⚠️ Không thể dừng stream nhận diện: {e}")
                
                # Gọi hàm đàm thoại bất đồng bộ với Gemini
                print("🎙️ Đang khởi chạy trợ lý ảo thời gian thực...")
                try:
                    asyncio.run(run_gemini_live_session(GEMINI_APIKEY))
                except Exception as e:
                    print(f"⚠️ Lỗi đàm thoại Gemini Live: {e}")
                
                # Dọn dẹp queue âm thanh nhận diện cũ để tránh kích hoạt lại ngay lập tức
                while not audio_queue.empty():
                    try:
                        audio_queue.get_nowait()
                    except Exception:
                        break
                
                print("🎙️ Đang kích hoạt lại bộ nhận diện Wake-word...")
                # Cập nhật lại thời gian tránh cooldown ngay lập tức
                last_detection_time = time.time()
                # Khởi động lại stream nhận diện
                try:
                    stream.start()
                except Exception as e:
                    print(f"⚠️ Không thể khởi động lại stream nhận diện: {e}")
                    
        except KeyboardInterrupt:
            print("\n👋 Đã tắt bộ nhận diện.")
            break
        except Exception as e:
            print(f"\n⚠️ Lỗi trong vòng lặp xử lý: {e}")
            break
