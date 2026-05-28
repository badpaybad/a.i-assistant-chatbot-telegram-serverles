# Folder làm việc : TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune

## stack dùng python

Cần finetune arcface pretrain để tạo ra onnx model cho phép c# dotnet 8.0 load được mô hình và dùng

Khi chạy chỉ cần vào folder làm việc: python main.py và đợi kết quả là file onnx dùng được cho dotnet c#

Có thể dùng faiss hoặc Qdrant để quản lý vector embedding của khuôn mặt sau khi được trích xuất từ file onnx

Nếu dùng postgress thì sao, có thuật toán nào so sánh vector tốt nhanh và chính xác như faiss không?

Có thể finetune liên tục được không? Tôi có phần quản lý ảnh khuôn mặt theo user, đã dùng mediapipe trên trình duyệt crop ảnh face cho từng user.

Việc căn chỉnh khuôn mặt sau khi crop cần thực hiện đồng nhất khi tạo ảnh để đưa vào finetune, để đưa vào khi trích xuất embedding, để  khi có ảnh cần recoginze khuôn mặt sau này. Cần hỗ trợ python, typescript, c#

Tôi có thể tạo folder ./dataraw bên trong là các subfolder theo id của user, mỗi subfolder id theo user là các ảnh của user. Cần bước tạo ./data từ ./dataraw bằng python để có thể dùng finetune

Finetune có thể hỗ trợ cả CPU GPU dựa vào việc cấu hình chọn chạy bằng CPU hoặc GPU

Tôi luôn cần finetune để tạo ra onnx, và dùng nó để trích xuất embedding từ khuôn mặt của user (sử dụng c# dotnet 8.0 với onnxruntime), sau đó so sánh vector embedding với vector embedding đã lưu trong postgress để tìm kiếm khuôn mặt.


# Các câu hỏi cần trả lời

Tôi cần tổ chức folder data, ảnh đẻ finetune như thế nào?
Mỗi ảnh để đưa vào tổ chức folder có cần tiêu chuẩn gì không? từ ảnh gốc cần crop theo tiêu chuẩn nào không?

**chú ý** tìm hiểu theo yêu cầu ở TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/whattodo.md và đưa giải pháp cách làm vào TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/howtodo.md . Khi có cập nhật ở TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/whattodo.md cần cập nhật TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/howtodo.md

# chọn giải pháp

dùng postgress và thuật toán HNSW

cần download tất cả các model về local folder vd ./arcfacemodels với pretrain arcface tốt nhất có thể để dùng

MediaPipe Tasks API để detect face , align face để hỗ trợ cả typescript, python

Finetune với CPU trước để test thành công finetune ra file onnx, finetune xong cần xuất file .onnx và in ra đường dẫn để có thể dùng bên c# dotnet 

Viết hướng dẫn để khởi tạo môi trường chạy được finetune, các khuyến nghị suggest khi finetune để đạt kết quả tốt nhất về việc nhận dạng khuôn mặt (face embedding)