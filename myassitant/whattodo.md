folder làm việc: myassitant dùng chung môi trường env ở folder: venv 
dựa vào code program.py về việc cloudflare tunnel lấy https subdomain free để có thể dăng ký webhook với telegram nhận message mới cho chatbot. api local gemma4 chạy ở gemma4/program.py 

Cần thực hiện code theo Thiết kế cấu trúc hệ thống chatbot để hỗ trợ chat nhóm, nhóm có thể là chat private 1-1 với chatbot, nhóm có nhiều người tham gia 

Dùng sqllite để lưu các thông tin
    nhóm chát (group_chat)
        khi chat bot được thêm vào nhóm, sẽ lưu thông tin nhóm vào sqllite nếu chưa có
        khi chat private 1-1 cũng là nhóm chỉ có chatbot với người chát 
    message của nhóm chát (message_of_group) 
        khi nhận webhook từ telegram về cần lưu và phân biệt được các message đó đến từ nhóm nào và từ người nào 
            nếu message có file cần download lưu vào folder myassitant/files , chỉ ra file thuộc message nào 
            cần dùng sqllite lưu thông tin file (file_of_message) và dùng local gemma4 để lấy được mô tả hoặc tóm tắt nội dung file nếu có thể, ví dụ file pdf , image, audio, word , text , json ... hoặc có đường link cần crawl nội dung và dùng local gemma4 để tóm tắt 
            message có is_chatbot_reply: 0 (không cần trả lời):  do message không xuất hiện việc đề cập tên chatbot hoặc tag chatbot coi như chatbot không cần trả lời; 1 (chưa trả lời): có để cập tên hoặc tag chatbot thì là đang đợi chatbot trả lời; 2 (đã trả lời ): khi A.I agent chatbot trả lời sẽ cập nhật is_chatbot_reply thành 2 
            từng message có thêm trạng thái is_processed : 0: chưa xử lý, 1: đã xử lý (do liên quan tới việc download và dùng local gemma4) cần đợi các tiến trình đề cập phía trên xong thì mới chuyển sang trạng thái 1 (đã xử lý)

cần build A.I agent chatbot dùng local gemma4, khi khởi tạo lên cần biết A.I agent chatbot làm việc cho group nào , và làm các việc sau kết hợp để có context tốt và trả lời người dùng khi cần:
    đọc 10 message gần nhất của nhóm chat mà chatbot thuộc về , lấy các message có trạng thái is_processed= 1 (đã xử lý)
        nếu message có các files, links ... cũng cần lấy các tóm tắt ra 
    mặc định dùng 10 message gần nhất và cà tóm tắt files nếu có đọc hiểu context của nhóm chat và đưa ra câu trả lời cho người tag chatbot, khi trả lời cần tag người cần trả lời ( chỉ reply khi chatbot được tag hoặc được người dùng gọi tên trong message mới nhất )
        nếu trước đó đã trả lời rồi thì không trả lời lại
        nếu người dùng có quote lại thì cần xem context nếu cần reply thì tag người hỏi để trả lời  
    cần lấy các message có is_chatbot_reply= 1 (chưa trả lời) để trả lời lại , sau khi trả lời cho message đó sẽ cập nhật is_chatbot_reply thành 2 (đã trả lời). cần xử lý lần lượt theo thời gian 
        10 message và các dữ liệu gần nhất để làm bổ xung context cho việc xử lý message và trả lời
    cần có các tools call , function calls để dùng cho local gemma4:
        có thể gọi gemini api kèm google search để làm công cụ tìm kiếm những gì cần thời gian thực do hiểu context mà cần ( ví dụ tin tức , thời tiết , tỷ giá ngoại tệ ...) hoặc do người dùng đích danh yêu cầu tìm kiếm google để lấy được thông tin cần dùng cho việc trả lời 
        tool crawl nội dung, đọc nội dùng files (pdf, image, audio, word, text, json...) ngay tại message người dùng yêu cầu xử lý để làm theo yêu cầu của người dùng và trả lời kết quả lại cho người dùng, có thể dùng chung với các hàm đã dùng cho local gemma4  gemma4/program.py 
        cần tool db sqllite cho việc ghi chú hoặc lưu các thông tin người dùng yêu cầu cần ghi nhớ, cho phép người dùng tìm kiếm lại các thông tin hoặc dựa vào context có thể cần tìm lại. 
        nếu có dạng cần nhắc nhở remind thì cần lưu thông tin để tự động nhắc nhở khi tới thời điểm cần nhắc, có thể dùng sqllite để lưu các remind , cho phép người dùng xóa remid, dừng remind , tìm lại remind 
        sqllite để tìm kiếm các thông tin ở các message trong nhóm, vd nếu cần tìm theo thời gian hoặc regex nội dung mà dựa vào context có thể cần tìm lại  hoặc do người dùng yêu cầu 
    A.I agent loop tối đa 3 lần để thu thập thông tin dựa vào context khi cần rồi dựa trên nguyên tắc không bịa đặt, cần trung thực về nội dung rồi trả lời với nội dung phù hợp và logic. cần suy nghĩ và rà soát kỹ lưỡng trước khi đưa ra câu trả lời. Cần tạo system prompt để chatbot hoạt động giống như 1 trợ lý chuyên nghiệp xử lý thông tin cho các cuộc chat group trên nền tảng telegram

chương trình khi chạy lên thì cần tách thành các luồng độc lập 
    cho việc lưu message và tóm tắt files ... để lưu vào sqllite
    dựa vào bảng group_chat để khời tạo các A.I agent chatbot tương ứng, mỗi A.I agent chatbot là luồng riêng 
    trong quá trình chạy cần quan sát xem có group_chat mới không để khời tạo A.I agent chatbot tương ứng
