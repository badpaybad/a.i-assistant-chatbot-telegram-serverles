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

Bổ xung thêm việc tạo ra file onnx cho app mobi chạy dùng dart flutter

Bổ xung việc align face từ ./dataraw sang ./data  có thể có cả 2 loại align face để chọn
    - loại align face chung chung đủ tổt
    - loại tăng cường cần dựa thêm vào các khuyến nghị để làm finetune tố nhất có thể . finetune để nhận dạng khuôn mặt của user là trê em bé 2 tuổi đến người già 70 tuổi, có đeo kính, không đeo kính, bịt khẩu trang (chỉ lộ nửa mặt), bịt khăn choàng, bịt khăn bịt mũi, sinh đôi, sinh 3 ...

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

Cần lưu 2 loại .onnx, xong rồi cũng tạo 2 file onnx cho app mobi 
    1 là epoch cuối cùng xong
    2 là epoch có loss nhỏ nhất 

Learning Rate quá cao (0.001): Fine-tune một mạng lớn như ResNet-50 trên tập dữ liệu nhỏ (116 ảnh) với Learning Rate 0.001 là quá lớn. Giảm Learning Rate xuống 0.0001 hoặc 0.00005

**cập nhật 2026-05-28 16:16:16**

cần đưa một số cấu hình dạng tham số để tinh chỉnh cho từng trường hợp khi finetune, vd python main.py 
    --epochs 200
    --batch_size 16
    --learning_rate 0.0001
    --align_mode advanced 
    --raw_dir ./dataraw
    --data_dir ./data
    --model_output_path ./arcface_model_final.onnx
    --mobile_model_output_path ./arcface_model_final_mobile.onnx
    --best_model_output_path ./arcface_model_best.onnx
    --best_mobile_model_output_path ./arcface_model_best_mobile.onnx
    --device auto
ở c# sau này sẽ connect tới db tạo dữ liệu ra folder và chỉ định --raw_dir --data_dir ... để  gọi process chạy nhiều luồng thành nhiều collection khác nhau cùng 1 lúc, c# cũng có thể đọc stdout để biết được tiến trình các epoch, batch đang chạy và hoàn thành 

