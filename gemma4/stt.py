import os
import sys
import librosa
import numpy as np

# Import config based on project structure
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.append(project_root)
from config import *

# Import shared manager
from gemma4.manager import get_manager

_faster_whisper_model = None

def _get_faster_whisper_model():
    """Khởi tạo faster-whisper INT8 trên CPU với Whisper Large-v3 Turbo (chạy cực nhanh, độ chính xác cao, 100% local miễn phí)."""
    global _faster_whisper_model
    if _faster_whisper_model is None:
        try:
            from faster_whisper import WhisperModel
            model_name = os.getenv("WHISPER_MODEL", "turbo")
            print(f"[STT] Khởi tạo faster-whisper (model='{model_name}', device='cpu', compute_type='int8')...")
            try:
                _faster_whisper_model = WhisperModel(model_name, device="cpu", compute_type="int8")
            except Exception as e_model:
                print(f"[STT] Lỗi nạp '{model_name}' ({e_model}), fallback sang 'large-v3-turbo'...")
                _faster_whisper_model = WhisperModel("large-v3-turbo", device="cpu", compute_type="int8")
            print("[+] faster-whisper Whisper Large-v3 Turbo INT8 CPU model loaded successfully.")
        except Exception as e:
            print(f"[!] Warning loading faster-whisper: {e}")
            _faster_whisper_model = False
    return _faster_whisper_model if _faster_whisper_model else None


def transcribe_audio(audio_file_path: str, model_id: str = "unsloth/gemma-4-e4b-it-unsloth-bnb-4bit", device: str = "cuda") -> str:
    """
    Chuyển đổi file âm thanh thành văn bản 100% LOCAL MIỄN PHÍ bằng faster-whisper (int8 CPU).
    """
    if not os.path.exists(audio_file_path):
        return f"Lỗi: File {audio_file_path} không tồn tại."

    # 1. Ưu tiên dùng faster-whisper INT8 trên CPU (Cực nhanh ~60ms, 100% local miễn phí, 0MB VRAM)
    fw_model = _get_faster_whisper_model()
    if fw_model:
        try:
            segments, info = fw_model.transcribe(audio_file_path, language="vi")
            full_text = " ".join([seg.text.strip() for seg in segments if seg.text.strip()]).strip()
            if full_text:
                print(f"[STT] faster-whisper INT8 STT success: {full_text[:80]}...")
                return full_text
        except Exception as e:
            print(f"[STT] faster-whisper error: {e}")

    # # 2. Fallback Gemini API nếu có cấu hình
    # if GEMINI_APIKEY:
    #     try:
    #         import google.generativeai as genai
    #         genai.configure(api_key=GEMINI_APIKEY)
    #         audio_file = genai.upload_file(audio_file_path)
    #         model = genai.GenerativeModel(GEMINI_MODEL)
    #         response = model.generate_content([
    #             audio_file,
    #             "Hãy nghe tệp âm thanh này và gõ lại chính xác tất cả những lời nói trong tệp bằng tiếng Việt (hoặc tiếng Anh nếu người nói tiếng Anh). Không giải thích gì thêm, chỉ trả về nội dung lời nói."
    #         ])
    #         text_result = response.text.strip() if response and response.text else ""
    #         try:
    #             genai.delete_file(audio_file.name)
    #         except Exception:
    #             pass
    #         if text_result and "không thể nghe" not in text_result.lower():
    #             return text_result
    #     except Exception as e:
    #         pass

    # 2. Fallback sang Gemma4 Manager
    try:
        audio_array, sampling_rate = librosa.load(audio_file_path, sr=16000, mono=True)
        audio_array = audio_array.astype(np.float32)

        manager = get_manager(model_id=model_id, device=device)
        prompt = "Hãy lắng nghe âm thanh đính kèm và chuyển đổi nó thành văn bản tiếng Việt chính xác nhất. Không giải thích gì thêm, chỉ trả về nội dung audio."
        
        transcription = manager.generate(prompt, audio_array=audio_array, sampling_rate=sampling_rate)
        return transcription.strip()
        
    except Exception as e:
        return f"[Lỗi STT: {e}]"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_file = sys.argv[1]
        print(transcribe_audio(test_file))
    else:
        print("Sử dụng: python gemma4/stt.py <path_to_audio_file>")
