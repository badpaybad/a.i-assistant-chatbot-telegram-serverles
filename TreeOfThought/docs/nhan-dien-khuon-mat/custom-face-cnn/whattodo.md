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

Có thể lấy các tập data set trên mạng và tạo vào dataraw không?
            | Tên Dataset | Số lượng ảnh / Đối tượng | Đặc trưng nổi bật | Mục đích áp dụng |
            | :--- | :--- | :--- | :--- |
            | **MS1M-Asian-V2** | ~5.0 triệu ảnh / 100,000 người | Hoàn toàn là người châu Á (Đông Á, Đông Nam Á). | Huấn luyện Backbone phân biệt đặc trưng chủng tộc người châu Á tốt nhất. |
            | **CASIA-WebFace** | ~500,000 ảnh / 10,000 người | Đa dạng góc nghiêng, ánh sáng, chất lượng ảnh thực tế dồi dào. | Huấn luyện từ đầu hoặc tinh chỉnh diện rộng. |
            | **FG-NET / CACD** | ~100,000 ảnh từ 2 đến 100 tuổi | Chứa ảnh của cùng một người ở nhiều độ tuổi khác nhau từ lúc nhỏ đến già. | Huấn luyện nhánh **Age-Invariant (AIFR)** để triệt tiêu biến động tuổi tác. |
            | **ND-Twins Dataset** | Hàng chục nghìn ảnh của các cặp sinh đôi cùng trứng | Chụp trong điều kiện ánh sáng và biểu cảm rất đa dạng. | Huấn luyện phân biệt **Sinh đôi** cực kỳ khó. |

camera test có thể lấy ảnh tìm được khi so sanh hiển thị góc phải trên cùng video để đối chiếu với khuôn mặt ở camera

**cập nhật 1** bổ xung tính toán đặc trưng tương quan từ điểm giữa vùng mắt tới các điểm đặc trưng khác của các vùng trên khuôn mặt
Giả sử ảnh dùng để training từ dataraw -> thành processed -> là các ảnh đã được align, đã có các vùng
    Vùng mắt có các đồng tử và mí mắt , viền mắt, đuôi mắt , khóe mắt, lông mày , đầu và đuôi lông mày ...
    Vùng mũi có cánh mũi, sống mũi, lỗ mũi ...
    Vành khuôn mặt
    Vùng miệng 
Có thể trích xuất sâu tương quan các vị trí tính từ điểm vùng mắt để tính toán các đặc trưng hình học về khoảng cách đặc trưng, có thể dùng cách đánh giá như thuật toán faiss để tạo các self attetion từ điểm giữa vùng mắt tới các điểm đặc trưng khác cho các vùng phía trên. có thể tạo nhiều vector tương quan để tìm ra các đặc trưng khi đưa các ảnh thẳng mặt để train thì khi ngoài đời thực qua camera, ảnh cứ có vùng mắt sẽ có điểm giữa vùng để so khớp đặc trưng nếu bị nghiêng, hay che 1 phần thì vẫn so khớp được, còn nếu thẳng mặt thì độ chính xác sẽ có kết quả tốt. 

    **chú ý** khi lấy điểm trung tâm vùng mắt để làm điểm gốc dùng để tính toán đặc trưng tới các điểm đặc trưng của các điểm như đuôi mắt, khóe mắt, mý mắt, đồng tử, đầu lông mày, đuôi lông mày, mũi, cánh mũi, nhân trung, mép miệng, khóe miệng ...
    lấy điểm giữa vùng mắt tìm đặc trưng các vector từ điểm giữa vùng mắt tới từngđiểm landmark khác của khuôn mặt
