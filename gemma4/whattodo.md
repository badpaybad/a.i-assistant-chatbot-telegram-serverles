tìm hiểu folder gemma4 và các file trong đó, sau đó viết program.py dùng fastapi để expose api tương tự như api google gemini về LLM có tool call ...

sau khi tìm hiểu, suy nghĩ và viết cách làm ra tiemhieu.md tại folder gemma4 để tôi review

cần xử lý files đính kèm việc generate text LLM bằng cách upload tự động lên khi người dùng gửi files kèm xử lý LLM ... files đính kèm có thể là hình ảnh, video, audio, pdf, docx, xlsx, pptx, csv, txt ... nếu có yêu cầu trả file thì cần tạo file và trả về cho người dùng url để download

**chú ý** tạo program.py trong folder gemma4 để không ảnh hưởng các code khác.

**cập nhật** tìm hiểu api restful gemini ở docs để sửa lại program.py cho đúng với cách thức giao tiếp api restful gemini
<https://ai.google.dev/gemini-api/docs/text-generation#rest>
<https://ai.google.dev/gemini-api/docs/image-generation#rest>
<https://ai.google.dev/gemini-api/docs/image-understanding#rest>
<https://ai.google.dev/gemini-api/docs/document-processing#rest>
<https://ai.google.dev/gemini-api/docs/speech-generation#rest>
<https://ai.google.dev/gemini-api/docs/audio#rest>
<https://ai.google.dev/gemini-api/docs/structured-output?example=recipe#rest_2>
<https://ai.google.dev/gemini-api/docs/function-calling?example=meeting#rest_2>
<https://ai.google.dev/gemini-api/docs/files#rest>
<https://ai.google.dev/gemini-api/docs/file-input-methods#rest>

**guide làm prompt**
<https://ai.google.dev/gemini-api/docs/prompting-strategies>

**cập nhật 1** xem gemma4/gemma4lib.md và bổ xung thêm Dùng thư viện llama-cpp-python và dùng GGUF gemma-4-12b-it trên hugging face, cho phép manager.py chọn theo model name, chọn device là cpu hoặc gpu , mặc định cpu , chọn mặc định gguf, nếu người dùng không chọn gguf thì vẫn dùng các model và code huggingface 

**cập nhật 2** Tối ưu chuẩn (Q4 Model + Q4/Q8 KV Cache) có thể chạy dùng python code hugging face 

**cập nhật 4** bổ xung thêm xử lý ASR cho gemma4 , bổ xung luôn api cho gemma4/program.py , bổ xung tts 

**cập nhật 5**
Gemma 4 E4B ở dạng 4-bit, bật KV Cache Quantization 4-bit (hoặc 8-bit) để tối ưu dung lượng VRAM cho RTX 3060 8GB

Cần chắc chắn mọi model a.i gemma cần dùng gpu cude RTX 3060 8GB để có tốc độ response tốt nhất 