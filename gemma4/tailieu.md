# Tài liệu và Tổng hợp Code Gemma 4 (Cập nhật 6)

File này tổng hợp toàn bộ mã nguồn của module `gemma4`, bao gồm STT, LLM, Tool Call, Embedding, Vision, File Processing và TTS.

## 1. Cấu trúc thư mục
```
gemma4/
├── __init__.py      # Khởi tạo package và export API
├── manager.py       # Quản lý Singleton Model & Processor (Tự động tải model, CUDA GPU RTX 3060 8GB)
├── llm.py           # Text Generation
├── stt.py           # Speech to Text
├── tools.py         # Tool Call Scoring
├── embeddings.py    # Text/Image Embedding
├── vision.py        # Phân tích hình ảnh
├── files.py         # Xử lý file đa định dạng
├── tts.py           # Chuyển văn bản thành giọng nói (Kokoro-ONNX)
├── download_model.py # Script hỗ trợ tải model thủ công
└── requirements.md  # Yêu cầu hệ thống
```

---

## 2. Các chức năng và tối ưu mới (Cập nhật 5 & 6)

### 2.1. Model Gemma 4 E4B 4-bit & CUDA GPU Acceleration (RTX 3060 8GB)
- **Mô hình**: Sử dụng mô hình `google/gemma-4-e4b-it` (Hugging Face / GGUF `gemma-4-e4b-it-Q4_K_M.gguf`).
- **Thiết bị**: Bắt buộc ưu tiên sử dụng CUDA GPU (NVIDIA RTX 3060 8GB VRAM) cho tất cả tác vụ Gemma AI (LLM, STT, Vision, Embeddings) để đạt tốc độ response tốt nhất.
- **Offloading 100% GPU**: Với GGUF engine, `n_gpu_layers = -1` để chuyển toàn bộ layers lên VRAM RTX 3060.
- **BitsAndBytes 4-bit (NF4)**: Với Hugging Face engine, nạp mô hình dạng 4-bit NF4 (`load_in_4bit=True`, `bnb_4bit_quant_type="nf4"`, double quant).

### 2.2. KV Cache Quantization 4-bit / 8-bit
- Tự động bật KV Cache Quantization (`cache_implementation="quantized"`, backend `quanto` hoặc `hqq` với `nbits=4` hoặc `nbits=8`) khi sinh văn bản qua Transformers engine.
- Giúp giảm tối đa mức tiêu thụ VRAM khi hội thoại dài hoặc xử lý prompt lớn, tối ưu hóa triệt để cho card RTX 3060 8GB VRAM.

### 2.3. Tải sẵn Model & Pre-load vào VRAM trước khi Start Web (Cập nhật 6)
- **Tải sẵn lưu local**: Trước khi server lắng nghe HTTP requests, hệ thống kiểm tra và tự động tải sẵn toàn bộ model (Gemma 4 E4B 4-bit và Kokoro ONNX TTS) vào các thư mục local `gemma4/model/`. Các lần khởi chạy tiếp theo sẽ dùng trực tiếp file ở local mà không cần tải lại.
- **Pre-load vào GPU Memory**: Ngay trong sự kiện `lifespan` startup của FastAPI, `Gemma4Manager` và `Gemma4TTS` được nạp sẵn 100% vào bộ nhớ RAM / VRAM của card RTX 3060.
- **Warming up CUDA**: Thực hiện warm-up sinh thử văn bản ngay khi khởi động để nạp toàn bộ CUDA kernels.
- **Phản hồi tức thì**: Khi request từ người dùng (Web/Telegram) tới, server phản hồi ngay lập tức mà không phải chờ đợi thời gian nạp model.

### 2.1. Tự động kiểm tra và tải Model
Module `gemma4` hiện đã hỗ trợ tự động kiểm tra sự tồn tại của các model cần thiết khi khởi tạo `Gemma4Manager`.

- **Gemma 4**: Kiểm tra tại HF Cache hoặc thư mục `gemma4/model/`. Nếu thiếu, sẽ tự động tải từ `google/gemma-4-e4b-it`.
- **Kokoro ONNX**: Kiểm tra tại `gemma4/model/kokoro/`. Nếu thiếu, sẽ tự động tải model và voices.

### 2.2. Text-to-Speech tiếng Việt (`gemma4/tts.py`)
Sử dụng Kokoro-ONNX để chuyển đổi văn bản tiếng Việt thành file âm thanh.

```python
from gemma4.tts import save_tts

# Hệ thống sẽ tự động tải model nếu bạn chưa chạy script download!
output_file = save_tts("Chào bạn, tôi là trợ lý AI.", "hello.wav")
```

---

## 3. Cài đặt thủ công (Tùy chọn)

Nếu bạn muốn chuẩn bị assets trước khi chạy ứng dụng chính:
```bash
python gemma4/download_model.py
```

---

## 4. Danh sách API toàn diện
- **`transcribe_audio(audio_path)`**: STT.
- **`generate_text(prompt)`**: LLM Chat.
- **`get_text_embedding(text)`**: Text vector.
- **`get_image_embedding(image_path)`**: Image vector.
- **`describe_image(image_path)`**: Mô tả ảnh.
- **`query_image(image_path, prompt)`**: Hỏi đáp ảnh.
- **`process_file_with_prompt(file_path, prompt)`**: Phân tích tài liệu PDF/Excel.
- **`save_tts(text, filename)`**: TTS tiếng Việt.
