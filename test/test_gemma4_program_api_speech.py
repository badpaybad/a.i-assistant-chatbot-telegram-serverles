import requests
import json
import base64
import sys
import os
import time

def test_speech_api():
    base_url = "http://localhost:8000/v1beta"
    
    print("\n--- 1. Testing Dedicated TTS API ---")
    tts_url = f"{base_url}/tts"
    payload_tts = {
        "text": "Xin chào thế giới! Đây là cuộc thử nghiệm tạo âm thanh tiếng Việt từ văn bản.",
        "voice": "af_sarah",
        "speed": 1.0
    }
    try:
        resp = requests.post(tts_url, json=payload_tts)
        if resp.status_code == 200:
            result = resp.json()
            print("[SUCCESS] TTS generated successfully.")
            print(f"Mime Type: {result.get('mime_type')}")
            print(f"Download URL: {result.get('download_url')}")
            print(f"Audio Content (truncated): {result.get('audio_content')[:100]}...")
            
            # Save downloaded file to verify
            audio_data = base64.b64decode(result.get('audio_content'))
            os.makedirs("test/output", exist_ok=True)
            with open("test/output/test_tts_output.wav", "wb") as f:
                f.write(audio_data)
            print("[SUCCESS] Audio file saved to test/output/test_tts_output.wav")
        else:
            print(f"[FAILURE] TTS status code: {resp.status_code}, detail: {resp.text}")
    except Exception as e:
        print(f"[FAILURE] TTS Error: {e}")

    print("\n--- 2. Testing Dedicated ASR/STT API ---")
    stt_url = f"{base_url}/stt"
    test_audio_path = "test/output/test_tts_output.wav"
    if os.path.exists(test_audio_path):
        try:
            with open(test_audio_path, "rb") as f:
                files = {"file": ("test_tts_output.wav", f, "audio/wav")}
                resp = requests.post(stt_url, files=files)
                if resp.status_code == 200:
                    result = resp.json()
                    print("[SUCCESS] ASR transcription completed.")
                    print(f"Transcription Text: {result.get('text')}")
                else:
                    print(f"[FAILURE] ASR status code: {resp.status_code}, detail: {resp.text}")
        except Exception as e:
            print(f"[FAILURE] ASR Error: {e}")
    else:
        print(f"[!] Skipping ASR test since test audio is missing.")

    print("\n--- 3. Testing generateContent with responseModalities=['AUDIO'] ---")
    gen_url = f"{base_url}/models/gemma-4:generateContent"
    payload_gen = {
        "contents": [{
            "parts": [{"text": "Chào mừng đến với cuộc phỏng vấn. Bạn hãy tự giới thiệu ngắn gọn về mình bằng tiếng Việt."}]
        }],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": "af_sarah"
                    }
                }
            }
        }
    }
    try:
        resp = requests.post(gen_url, json=payload_gen)
        if resp.status_code == 200:
            result = resp.json()
            print("[SUCCESS] Speech generateContent completed.")
            candidates = result.get("candidates", [])
            if candidates:
                parts = candidates[0]["content"]["parts"]
                print(f"Number of parts returned: {len(parts)}")
                for idx, part in enumerate(parts):
                    if "text" in part:
                        print(f"Part {idx} (Text): {part['text']}")
                    elif "inlineData" in part:
                        inline_data = part["inlineData"]
                        print(f"Part {idx} (Audio): mime_type={inline_data.get('mimeType')}, data_len={len(inline_data.get('data', ''))}")
            else:
                print("[FAILURE] No candidates returned.")
        else:
            print(f"[FAILURE] Speech generateContent status code: {resp.status_code}, detail: {resp.text}")
    except Exception as e:
        print(f"[FAILURE] Speech generateContent Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_gemma4_program_api_speech.py config_dunp")
        sys.exit(1)
    test_speech_api()
