"""
myassitant/file_worker.py
Worker thread xử lý bất đồng bộ:
  1. Download file từ Telegram → lưu vào myassitant/files/<group_id>/
  2. Dùng gemma4/files.py đọc nội dung file (PDF, DOCX, txt, ảnh, audio...)
  3. Audio/Video: dùng ffmpeg convert về 16kHz WAV mono → Gemma4 STT → text summary
       - Media dài: cắt thành chunk 15s, STT từng đoạn, ghép lại
       - Video: mỗi chunk cũng extract 1 frame/giây → Gemma4 vision mô tả ảnh
  4. Gọi local Gemma4 API để tóm tắt nội dung
  5. Crawl URL nếu message có link
  6. Cập nhật file_of_message.description
  7. Update message_of_group.is_processed = 1 khi xong tất cả file của message đó
"""
import os
import sys
import re
import json
import time
import shutil
import subprocess
import mimetypes
import threading
import httpx
from typing import Optional

_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_DIR)
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from myassitant import db
from myassitant.config import (
    TELEGRAM_BOT_TOKEN,
    GEMMA4_LOCAL_URL,
    GEMMA4_GENERATE_URL,
    DIR_FILES,
)

# Max ký tự đưa vào Gemma4 để tóm tắt
MAX_CONTENT_CHARS = 8000


# ─── Download file từ Telegram ────────────────────────────────────────────────

def _download_telegram_file(file_id: str, group_id: str, file_name: str = None) -> Optional[str]:  # type: ignore[return]
    """
    Download file từ Telegram API. Trả về local path hoặc None.
    """
    import requests  # dùng requests sync để đơn giản trong thread

    try:
        # Bước 1: Lấy file_path
        r = requests.get(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile",
            params={"file_id": file_id}, timeout=10
        )
        data = r.json()
        if not data.get("ok"):
            print(f"[FileWorker] getFile failed for {file_id}: {data}")
            return None
        file_path = data["result"].get("file_path")
        if not file_path:
            return None

        # Bước 2: Download
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        r2 = requests.get(download_url, timeout=60)
        r2.raise_for_status()

        # Xác định tên file
        if not file_name:
            file_name = os.path.basename(file_path)

        # Thư mục lưu: files/<group_id>/
        save_dir = os.path.join(DIR_FILES, str(group_id))
        os.makedirs(save_dir, exist_ok=True)
        local_path = os.path.join(save_dir, file_name)

        with open(local_path, "wb") as f:
            f.write(r2.content)

        print(f"[FileWorker] Downloaded {file_id} → {local_path}")
        return local_path

    except Exception as e:
        print(f"[FileWorker] Download error for {file_id}: {e}")
        return None


# ─── Crawl URL ────────────────────────────────────────────────────────────────

def _crawl_url(url: str) -> str:
    """Crawl nội dung URL, trả về text. Dùng httpx sync."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; myassitant-bot/1.0)"}
        with httpx.Client(timeout=15, headers=headers, follow_redirects=True) as client:
            resp = client.get(url)
            content_type = resp.headers.get("content-type", "")
            if "html" in content_type:
                # Basic HTML → text (xóa tags)
                text = re.sub(r"<[^>]+>", " ", resp.text)
                text = re.sub(r"\s+", " ", text).strip()
                return text[:MAX_CONTENT_CHARS]
            elif "json" in content_type:
                return resp.text[:MAX_CONTENT_CHARS]
            else:
                return resp.text[:MAX_CONTENT_CHARS]
    except Exception as e:
        return f"[Lỗi crawl URL {url}: {e}]"


# ─── Gọi Gemma4 để tóm tắt ────────────────────────────────────────────────────

def _summarize_with_gemma4(content: str, context: str = "file") -> str:
    """
    Gọi local Gemma4 API để tóm tắt nội dung.
    Trả về chuỗi tóm tắt hoặc chuỗi lỗi.
    """
    if not content or not content.strip():
        return ""

    prompt = (
        f"Hãy tóm tắt ngắn gọn nội dung sau đây (trong ngữ cảnh là {context} trong tin nhắn Telegram). "
        f"Chỉ trả về phần tóm tắt, không giải thích thêm:\n\n{content[:MAX_CONTENT_CHARS]}"
    )

    request_body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 512},
    }

    try:
        with httpx.Client(timeout=60) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                text = " ".join(p.get("text", "") for p in parts if p.get("text"))
                return text.strip()
    except Exception as e:
        print(f"[FileWorker] Gemma4 summarize error: {e}")

    return ""


def _read_file_content_local(file_path: str) -> str:
    """Đọc nội dung file dùng gemma4/files.py."""
    try:
        from gemma4.files import read_file_content
        return read_file_content(file_path)
    except Exception as e:
        return f"[Lỗi đọc file: {e}]"


# ─── ffmpeg helpers ───────────────────────────────────────────────────────────

# Audio formats Gemma4 STT có thể xử lý (qua librosa)
_AUDIO_NATIVE_EXTS = {'.wav', '.mp3', '.flac', '.ogg', '.opus', '.m4a', '.aac'}
# Video formats cần extract audio trước
_VIDEO_EXTS = {'.mp4', '.mkv', '.avi', '.mov', '.webm', '.flv', '.3gp', '.ts'}

# Ngưỡng độ dài (giây) để cắt chunk — tương đương 15s theo yêu cầu
CHUNK_SEC = 15
# Số chunk tối đa xử lý (tránh video quá dài xử lý mãi)
MAX_CHUNKS = 20


def _ffmpeg_available() -> bool:
    """Kiểm tra ffmpeg có trên PATH không."""
    return shutil.which("ffmpeg") is not None


def _get_media_duration(file_path: str) -> float:
    """
    Lấy thời lượng (giây) của file audio/video bằng ffprobe.
    Trả về 0.0 nếu không xác định được.
    """
    try:
        cmd = [
            "ffprobe", "-v", "quiet",
            "-print_format", "json",
            "-show_format",
            file_path
        ]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, timeout=15)
        if result.returncode == 0:
            data = json.loads(result.stdout.decode())
            duration = float(data.get("format", {}).get("duration", 0))
            return duration
    except Exception as e:
        print(f"[FileWorker] ffprobe duration error: {e}")
    return 0.0


def _convert_to_wav_16k(input_path: str, start_sec: float = 0, duration_sec: float = None) -> Optional[str]:
    """
    Convert (hoặc cắt đoạn) file audio/video sang WAV 16kHz mono bằng ffmpeg.
    - start_sec: vị trí bắt đầu (giây)
    - duration_sec: độ dài đoạn cần lấy (None = lấy hết)
    Trả về đường dẫn file WAV tạm hoặc None nếu lỗi.
    """
    if not _ffmpeg_available():
        print("[FileWorker] ffmpeg không tìm thấy.")
        return None

    suffix = f"_s{int(start_sec)}_16k.wav" if start_sec > 0 else "_16k.wav"
    out_path = input_path + suffix
    try:
        cmd = ["ffmpeg", "-y"]
        if start_sec > 0:
            cmd += ["-ss", str(start_sec)]   # seek đến vị trí bắt đầu
        cmd += ["-i", input_path]
        if duration_sec is not None:
            cmd += ["-t", str(duration_sec)]  # độ dài đoạn
        cmd += [
            "-vn",                     # bỏ track video
            "-acodec", "pcm_s16le",   # PCM 16-bit LE
            "-ar", "16000",            # 16kHz — yêu cầu của Gemma4 STT
            "-ac", "1",                # mono
            out_path
        ]
        result = subprocess.run(
            cmd,
            stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, timeout=120,
        )
        if result.returncode == 0 and os.path.exists(out_path):
            return out_path
        else:
            err = result.stderr.decode(errors='replace')[-200:]
            print(f"[FileWorker] ffmpeg WAV error (rc={result.returncode}): {err}")
            return None
    except Exception as e:
        print(f"[FileWorker] ffmpeg WAV exception: {e}")
        return None


def _extract_frame_at_second(video_path: str, second: float, out_dir: str) -> Optional[str]:
    """
    Dùng ffmpeg lấy 1 frame ảnh tại thời điểm `second` (giây) trong video.
    Trả về đường dẫn file JPG hoặc None.
    """
    out_path = os.path.join(out_dir, f"frame_{int(second):05d}.jpg")
    try:
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(second),
            "-i", video_path,
            "-frames:v", "1",          # chỉ lấy 1 frame
            "-q:v", "5",               # chất lượng JPG (2=tốt nhất, 31=xấu)
            "-vf", "scale=640:-1",     # scale xuống 640px rộng, giữ tỷ lệ
            out_path
        ]
        result = subprocess.run(
            cmd,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15,
        )
        if result.returncode == 0 and os.path.exists(out_path):
            return out_path
    except Exception:
        pass
    return None


def _transcribe_wav_chunk(wav_path: str) -> str:
    """Transcribe một file WAV (16kHz mono) đã chuẩn bị sẵn."""
    try:
        from gemma4.stt import transcribe_audio
        return transcribe_audio(wav_path)
    except Exception as e:
        return f"[Lỗi STT: {e}]"


def _describe_frame_via_api(image_path: str, chunk_start_sec: float) -> str:
    """
    Dùng Gemma4 API để mô tả nội dung một frame ảnh từ video.
    Trả về chuỗi mô tả ngắn.
    """
    try:
        import base64
        with open(image_path, "rb") as f:
            img_data = base64.b64encode(f.read()).decode()
        request_body = {
            "contents": [{
                "role": "user",
                "parts": [
                    {"inline_data": {"mime_type": "image/jpeg", "data": img_data}},
                    {"text": f"Mô tả ngắn gọng đây là frame tại giây {int(chunk_start_sec)} của video. Chỉ mô tả nhóm cảnh chính (đối tượng, hành động, nội dung hiển thị), bằng tiếng Việt."}
                ]
            }],
            "generationConfig": {"temperature": 0.2, "maxOutputTokens": 128},
        }
        with httpx.Client(timeout=30) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            return " ".join(p.get("text", "") for p in parts if p.get("text")).strip()
    except Exception as e:
        return f"[Lỗi mô tả frame: {e}]"


# ─── Transcribe audio theo chunk 15s ─────────────────────────────────────────

def _transcribe_audio_chunked(audio_path: str) -> str:
    """
    Transcribe file audio bằng cách:
    1. Lấy độ dài tổng (ffprobe)
    2. Nếu ngắn (≤ CHUNK_SEC) → transcribe trực tiếp
    3. Nếu dài → cắt thành chunk CHUNK_SEC giây → STT từng đoạn → ghép lại
    Trả về chuỗi text đầy đủ.
    """
    duration = _get_media_duration(audio_path)
    print(f"[FileWorker] Audio duration: {duration:.1f}s | file: {os.path.basename(audio_path)}")

    tmp_wavs = []   # danh sách file tạm cần xóa
    transcripts = []

    try:
        if duration <= CHUNK_SEC or duration == 0:
            # Ngắn hoặc không biết độ dài → convert rồi transcribe luôn
            wav = _convert_to_wav_16k(audio_path)
            if wav:
                tmp_wavs.append(wav)
                transcripts.append(_transcribe_wav_chunk(wav))
            else:
                return "[Không convert được audio]"
        else:
            # Cắt chunk
            n_chunks = min(int(duration / CHUNK_SEC) + 1, MAX_CHUNKS)
            print(f"[FileWorker] Chunking audio into {n_chunks} x {CHUNK_SEC}s chunks...")
            for i in range(n_chunks):
                start = i * CHUNK_SEC
                if start >= duration:
                    break
                chunk_dur = min(CHUNK_SEC, duration - start)
                wav = _convert_to_wav_16k(audio_path, start_sec=start, duration_sec=chunk_dur)
                if wav:
                    tmp_wavs.append(wav)
                    text = _transcribe_wav_chunk(wav)
                    if text and not text.startswith("[Lỗi"):
                        transcripts.append(f"[{int(start)}s-{int(start+chunk_dur)}s] {text}")
                    print(f"[FileWorker] Audio chunk {i+1}/{n_chunks}: {text[:60]}...")
    finally:
        # Dọn file WAV tạm
        for f in tmp_wavs:
            try:
                if os.path.exists(f):
                    os.remove(f)
            except Exception:
                pass

    return "\n".join(transcripts) if transcripts else "[Không transcript được audio]"


# ─── Transcribe + Frame extraction cho video ────────────────────────────────

def _process_video_full(video_path: str) -> str:
    """
    Xử lý toàn diện một file video:
    1. Lấy độ dài (ffprobe)
    2. Cắt thành chunk CHUNK_SEC giây (tối đa MAX_CHUNKS)
    3. Mỗi chunk:
       a. Extract audio → WAV 16kHz → STT
       b. Lấy 1 frame ảnh (giữa chunk) → Gemma4 vision mô tả
    4. Ghép audio transcript + frame description thành context
    Trả về chuỗi mô tả đầy đủ.
    """
    duration = _get_media_duration(video_path)
    print(f"[FileWorker] Video duration: {duration:.1f}s | file: {os.path.basename(video_path)}")

    # Thư mục tạm cho frames
    frame_dir = video_path + "_frames"
    os.makedirs(frame_dir, exist_ok=True)

    tmp_wavs = []
    tmp_frames = []
    chunk_descriptions = []

    try:
        if duration <= CHUNK_SEC or duration == 0:
            # Video ngắn → một chunk duy nhất
            chunks = [(0, min(duration, CHUNK_SEC) if duration > 0 else CHUNK_SEC)]
        else:
            n_chunks = min(int(duration / CHUNK_SEC) + 1, MAX_CHUNKS)
            chunks = []
            for i in range(n_chunks):
                start = i * CHUNK_SEC
                if start >= duration:
                    break
                chunk_dur = min(CHUNK_SEC, duration - start)
                chunks.append((start, chunk_dur))

        print(f"[FileWorker] Processing video in {len(chunks)} chunk(s)...")

        for idx, (start, chunk_dur) in enumerate(chunks):
            end = start + chunk_dur
            chunk_parts = []

            # a. Audio STT cho chunk này
            wav = _convert_to_wav_16k(video_path, start_sec=start, duration_sec=chunk_dur)
            if wav:
                tmp_wavs.append(wav)
                audio_text = _transcribe_wav_chunk(wav)
                if audio_text and not audio_text.startswith("[Lỗi"):
                    chunk_parts.append(f"[Âm thanh] {audio_text.strip()}")

            # b. Lấy frame ảnh ở giữa chunk (hoặc các mốc 0s, CHUNK_SEC/2)
            mid_sec = start + chunk_dur / 2
            frame_path = _extract_frame_at_second(video_path, mid_sec, frame_dir)
            if frame_path:
                tmp_frames.append(frame_path)
                frame_desc = _describe_frame_via_api(frame_path, mid_sec)
                if frame_desc and not frame_desc.startswith("[Lỗi"):
                    chunk_parts.append(f"[Ảnh tại {int(mid_sec)}s] {frame_desc}")

            if chunk_parts:
                chunk_descriptions.append(
                    f"=== [{int(start)}s – {int(end)}s] ===\n" + "\n".join(chunk_parts)
                )
            print(f"[FileWorker] Video chunk {idx+1}/{len(chunks)} [{int(start)}s-{int(end)}s] done.")

    finally:
        # Dọn file tạm
        for f in tmp_wavs:
            try:
                if os.path.exists(f): os.remove(f)
            except Exception: pass
        for f in tmp_frames:
            try:
                if os.path.exists(f): os.remove(f)
            except Exception: pass
        # Xóa thư mục frame tạm
        try:
            if os.path.isdir(frame_dir): shutil.rmtree(frame_dir, ignore_errors=True)
        except Exception: pass

    return "\n\n".join(chunk_descriptions) if chunk_descriptions else "[Không xử lý được video]"


def _transcribe_audio_local(file_path: str) -> str:
    """
    Transcribe audio/video sang text:
    - Video → _process_video_full() (extract audio STT + frame vision mỗi chunk)
    - Audio → _transcribe_audio_chunked() (cắt 15s nếu dài)
    """
    ext = os.path.splitext(file_path)[1].lower()

    if ext in _VIDEO_EXTS:
        return _process_video_full(file_path)
    else:
        return _transcribe_audio_chunked(file_path)




# ─── Xử lý một file record ────────────────────────────────────────────────────

def _process_file_record(file_record: dict):
    """
    Xử lý một bản ghi file_of_message:
    - Download (nếu có file_id)
    - Đọc nội dung / crawl URL
    - Tóm tắt bằng Gemma4
    - Cập nhật DB
    """
    file_db_id = file_record["id"]
    group_id = file_record["group_id"]
    file_id = file_record.get("file_id")
    file_type = file_record.get("file_type", "document")
    url = file_record.get("url")

    local_path = file_record.get("local_path")
    description = ""

    if file_type == "url" and url:
        # Crawl URL
        print(f"[FileWorker] Crawling URL: {url}")
        content = _crawl_url(url)
        description = _summarize_with_gemma4(content, context=f"đường link {url}")
        db.update_file_description(file_db_id, None, description or content[:500])

    elif file_id:
        # Download file nếu chưa có local_path
        if not local_path or not os.path.exists(local_path):
            ext_map = {
                "photo": ".jpg",
                "audio": ".mp3",
                "voice": ".ogg",
                "video": ".mp4",
                "document": "",
            }
            ext = ext_map.get(file_type, "")
            file_name = f"{file_id}{ext}"
            local_path = _download_telegram_file(file_id, group_id, file_name)

        if not local_path:
            print(f"[FileWorker] Failed to download file_id={file_id}")
            db.update_file_description(file_db_id, None, "[Download thất bại]")
            return

        # Đọc nội dung dựa theo loại file
        ext = os.path.splitext(local_path)[1].lower()
        content = ""

        # Audio (voice note, audio file) và Video → ffmpeg convert → STT
        _is_audio = file_type in ("voice", "audio") or ext in _AUDIO_NATIVE_EXTS
        _is_video = file_type == "video" or ext in _VIDEO_EXTS

        if _is_audio or _is_video:
            media_kind = "video" if _is_video else "audio"
            print(f"[FileWorker] Transcribing {media_kind}: {local_path}")
            content = _transcribe_audio_local(local_path)
            if content and not content.startswith("[Lỗi"):
                # Tóm tắt transcript nếu dài
                if len(content) > 500:
                    description = _summarize_with_gemma4(
                        content, context=f"{media_kind} {os.path.basename(local_path)}"
                    ) or content[:500]
                else:
                    description = content
            else:
                description = content or f"[Không transcribe được {media_kind}]"
        elif file_type == "photo" or ext in (".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"):
            # Với ảnh: dùng Gemma4 vision (gọi qua API multimodal)
            description = _describe_image_via_api(local_path) or "[Ảnh không mô tả được]"
        elif ext in (".txt", ".pdf", ".docx", ".doc", ".pptx", ".ppt", ".xlsx", ".xls", ".csv", ".json"):
            content = _read_file_content_local(local_path)
            description = _summarize_with_gemma4(content, context=f"file {os.path.basename(local_path)}")
            if not description:
                description = content[:500]
        else:
            # Fallback: thử đọc như text
            try:
                with open(local_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read(MAX_CONTENT_CHARS)
                description = _summarize_with_gemma4(content, context="file text")
            except Exception:
                description = "[Không đọc được nội dung file]"

        db.update_file_description(file_db_id, local_path, description)
        print(f"[FileWorker] Processed file {local_path}: {description[:80]}...")


def _describe_image_via_api(image_path: str) -> str:
    """Gửi ảnh lên Gemma4 API để mô tả."""
    try:
        import base64
        with open(image_path, "rb") as f:
            img_data = base64.b64encode(f.read()).decode()
        mime_type, _ = mimetypes.guess_type(image_path)
        mime_type = mime_type or "image/jpeg"

        request_body = {
            "contents": [{
                "role": "user",
                "parts": [
                    {"inline_data": {"mime_type": mime_type, "data": img_data}},
                    {"text": "Mô tả ngắn gọn nội dung của ảnh này bằng tiếng Việt."}
                ]
            }],
            "generationConfig": {"temperature": 0.3, "maxOutputTokens": 256},
        }
        with httpx.Client(timeout=60) as client:
            resp = client.post(GEMMA4_GENERATE_URL, json=request_body)
            resp.raise_for_status()
            data = resp.json()
            parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            return " ".join(p.get("text", "") for p in parts if p.get("text")).strip()
    except Exception as e:
        return f"[Lỗi mô tả ảnh: {e}]"


# ─── Main worker loop ─────────────────────────────────────────────────────────


def run_file_worker(stop_event: threading.Event = None, sleep_sec: float = 3.0):
    """
    Worker chạy liên tục trong thread riêng.
    Poll DB lấy message chưa processed, xử lý file/url rồi đánh dấu processed.
    """
    print("[FileWorker] Started.")
    while True:
        if stop_event and stop_event.is_set():
            print("[FileWorker] Stopping.")
            break

        try:
            # Lấy các message chưa xử lý
            unprocessed = db.get_unprocessed_messages()

            for msg in unprocessed:
                msg_db_id = msg["id"]
                files = db.get_files_of_message(msg_db_id)

                all_done = True
                for file_rec in files:
                    # Chỉ xử lý nếu chưa có description
                    if file_rec.get("description") is None:
                        try:
                            _process_file_record(file_rec)
                        except Exception as e:
                            print(f"[FileWorker] Error processing file {file_rec['id']}: {e}")
                            all_done = False

                # Nếu không có file nào pending → đánh dấu processed
                if all_done:
                    db.update_message_processed(msg_db_id)

        except Exception as e:
            print(f"[FileWorker] Loop error: {e}")

        time.sleep(sleep_sec)
