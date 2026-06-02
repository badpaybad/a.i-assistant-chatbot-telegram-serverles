nếu làm nhận diện khuôn mặt từ đầu thì sao, phục vụ cho mẫu giáo, sinh đôi, ... đến tận 100 tuổi của người châu Á ?
đặc điểm về khung mặt, mắt, tai , vùng mũi`, cằm, gò má, vùng trán, đặc biệt là mắt liệu có làm được ?
Nếu trích xuất từng phần rồi ghép lại thì liệu có nhận diện được không?
Ở góc nghiêng mặt 3/4 hoặc bị che 1 phần thì sao?
Sự tương quan giữa các bộ phận tới vành khuôn mặt từ tai tới cằm cả 2 bên, sự đối xứng và tương quan các bộ phận trên khuôn mặt: mắt mũi miệng tai cằm
Mô hình cần tự nhận biết để không phụ thuộc vào từng vùng riêng lẻ, có thể đáp ứng các góc mặt khác nhau: thẳng mặt, nghiêng , nhìn chéo mặt trái, nhìn chéo mặt phải, nhìn chéo phía trên xuống, chéo phía dưới lên ...

Cần tổng hợp thành mô hình để trả ra 1 embeding vector duy nhất cho khuôn mặt, có thể chịu được các tác động góc nghiêng, che khuất 1 phần, lão hóa, sinh đôi ...

Tập dữ liệu có thể dùng? hoặc có thể tận dụng dataraw ở TreeOfThought/docs/nhan-dien-khuon-mat/ArcFaceFinetune/howtodo.md?

Khi trainining xong cần là .onnx để dùng đa dụng trên PC với C#, flutter, python ...
    cũng xuất file để cho phép finetune, lấy embedding vector dùng faiss , cosine ...

**chú ý** cần cập nhật câu hỏi câu trả lời vào TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn/howtodo.md để tôi có thể review trước
    folder làm việc chính TreeOfThought/docs/nhan-dien-khuon-mat/custom-face-cnn có thể dùng /work/a.i-assistant-chatbot-telegram-serverles/venv
    code sẵn hàm training validate với dataraw
    code sẵn hàm inference sử dụng .onnx train ra để lấy embeding và so sánh vector  

training để test pass cần để device mặc định là cpu, khi chạy thật sẽ config gpu theo args đưa vào, nếu có agrs nào phục vụ việc train có thể thêm

viết hướng dẫn train

viết thêm test face real từ camera sau khi train xong có file .onnx có thể load lên và mở camera để test
    camera test cần dùng embeding tổng hợp duy nhất để so sánh và nhận dạng


