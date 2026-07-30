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
            cần dùng sqllite lưu thông tin file (file_of_message) và dùng local gemma4 để lấy được mô tả hoặc tóm tắt nội dung file nếu có thể, ví dụ file pdf , image, audio, word , text , json ... hoặc có đường link cần crawl nội dung và dùng local gemma4 để tóm tắt , việc xử lý audio, video có thể dùng ffmpeg để convert về chuẩn audio mà local gemma4 có thể đọc được rồi lấy nội dung text summary từ audio 
                riêng video nếu dài quá cần cắt thành 15 giây lần 
                    ngoài lấy audio nhờ ffmpeg có thể dùng ffmpeg lấy mỗi giây trong video là 1 frame ảnh rồi dùng local gemma4 để lấy mô tả ảnh , ghép các mô tả ảnh và audio summary lại với nhau để làm nội dung bổ xung cho việc lấy context 
                    lấy ffmpeg convert video thành audio để dùng local gemma4 lấy mô tả 
                nếu audio dài quá cũng cần cắt thành 15 giây 1 lần rồi dùng local gemma4 để tóm tắt từng đoạn  rồi ghép các mô tả lại với nhau để làm nội dung bổ xung cho việc lấy context 
                các mô tả cần ghép với nhau để dùng trong context 
            message có is_chatbot_reply: 0 (không cần trả lời):  do message không xuất hiện việc đề cập tên chatbot hoặc tag chatbot coi như chatbot không cần trả lời; 1 (chưa trả lời): có để cập tên hoặc tag chatbot thì là đang đợi chatbot trả lời; 2 (đã trả lời ): khi A.I agent chatbot trả lời sẽ cập nhật is_chatbot_reply thành 2 
            từng message có thêm trạng thái is_processed : 0: chưa xử lý, 1: đã xử lý (do liên quan tới việc download và dùng local gemma4) cần đợi các tiến trình đề cập phía trên xong thì mới chuyển sang trạng thái 1 (đã xử lý)

cần build A.I agent chatbot dùng local gemma4, khi khởi tạo lên cần biết A.I agent chatbot làm việc cho group nào , và làm các việc sau kết hợp để có context tốt và trả lời người dùng khi cần:
    đọc 10 message gần nhất của nhóm chat mà chatbot thuộc về , lấy các message có trạng thái is_processed= 1 (đã xử lý)
        nếu message có các files, links ... cũng cần lấy các tóm tắt ra 
    mặc định dùng 10 message gần nhất và cà tóm tắt files nếu có đọc hiểu context của nhóm chat và đưa ra câu trả lời cho người tag chatbot, khi trả lời cần tag người cần trả lời ( chỉ reply khi chatbot được tag hoặc được người dùng gọi tên trong message mới nhất )
        nếu trước đó đã trả lời rồi thì không trả lời lại
        nếu người dùng có quote lại thì cần xem context nếu cần reply thì tag người hỏi để trả lời  
    cần lấy các message có is_chatbot_reply= 1 (chưa trả lời) để trả lời lại , sau khi trả lời cho message đó sẽ cập nhật is_chatbot_reply thành 2 (đã trả lời). cần xử lý lần lượt theo thời gian 
    khi chát private 1-1 với chatbot message về cái là is_chatbot_reply= 1
    message đến từ group chát nếu xuất hiện tên chatbot hoặc được chatbot được tag thì message về cái là is_chatbot_reply= 1
        10 message và các dữ liệu gần nhất để làm bổ xung context cho việc xử lý message và trả lời
    cần có các tools call , function calls để dùng cho local gemma4:
        có thể gọi gemini api kèm google search để làm công cụ tìm kiếm những gì cần thời gian thực do hiểu context mà cần ( ví dụ tin tức , thời tiết , tỷ giá ngoại tệ ...) hoặc do người dùng đích danh yêu cầu tìm kiếm google để lấy được thông tin cần dùng cho việc trả lời 
        tool crawl nội dung, đọc nội dùng files (pdf, image, audio, word, text, json...) ngay tại message người dùng yêu cầu xử lý để làm theo yêu cầu của người dùng và trả lời kết quả lại cho người dùng, có thể dùng chung với các hàm đã dùng cho local gemma4  gemma4/program.py 
        cần tool db sqllite cho việc ghi chú hoặc lưu các thông tin người dùng yêu cầu cần ghi nhớ, cho phép người dùng tìm kiếm lại các thông tin hoặc dựa vào context có thể cần tìm lại. 
        nếu có dạng cần nhắc nhở remind thì cần lưu thông tin để tự động nhắc nhở khi tới thời điểm cần nhắc, có thể dùng sqllite để lưu các remind , cho phép người dùng xóa remid, dừng remind , tìm lại remind 
        sqllite để tìm kiếm các thông tin ở các message trong nhóm, vd nếu cần tìm theo thời gian hoặc regex nội dung mà dựa vào context có thể cần tìm lại  hoặc do người dùng yêu cầu 
    A.I agent loop tối đa 3 lần để thu thập thông tin dựa vào context khi cần rồi dựa trên nguyên tắc không bịa đặt, cần trung thực về nội dung rồi trả lời với nội dung phù hợp và logic. cần suy nghĩ và rà soát kỹ lưỡng trước khi đưa ra câu trả lời. Cần tạo system prompt để chatbot hoạt động giống như 1 trợ lý chuyên nghiệp xử lý thông tin cho các cuộc chat group trên nền tảng telegram

chương trình khi chạy lên thì cần tách thành các luồng hoặc process độc lập 
    cần start local gemma4 cùng gemma4/program.py start dạng process 
    cho việc lưu message và tóm tắt files ... để lưu vào sqllite dạng process 
    dựa vào bảng group_chat để khời tạo các A.I agent chatbot tương ứng, mỗi A.I agent chatbot là luồng riêng 
    trong quá trình chạy cần quan sát xem có group_chat mới không để khời tạo A.I agent chatbot tương ứng
    khi chương trình đóng cần giải phóng thực sự các port đang chiếm dụng vd của local gemma4, của chính myassistant 

audio đã được stt dùng Whisper Large-v3 Turbo chạy cpu 
khi nhận webhook telegram message là reply hoặc quote lại 1 message trước đó tức là người dùng muốn dùng cả nội dùng message được chọn reply or quote. cần dùng cả 2 message ( current messagge và quote hoặc reply message) để xử lý và trả lời cho người dùng 

khi message telegram nhận được từ webhook 
có video xử lý video thì cứ 5 giây lấy 1 frame và gọi local gemma4 để lấy mô tả ảnh
khi Video thành audio hoặc audio thì tức là cũng xử lý audio cần trả thêm nguyên text lấy từ audio ra 
các text lấy được đều đưa vào context để trả lời người dùng , audio cần trả thêm nguyên text lấy từ audio ra nằm sau content reply cho người dùng 

CHUNK_SEC = 150 cho video vì đang dùng whisper tubor nếu dùng gemma4 thì 15s để cắt thành các đoạn video phục vụ việc convert sang audio để xử lý lấy text 
    ffmpeg sẽ convert video thành audio chuẩn gemma4 rồi gọi lên whipser hoặc gemma4, hiện tại default là whiper tubor

**cập nhật 1** bổ xung cho myassitant/webhook_handler.py làm proxy pass GEMMA4_GENERATE_URL , tạo route url path request response giống với GEMMA4_GENERATE_URL 

**cập nhật 2** ở myassitant/agent_tools.py bổ xung tool call dùng local gemma4 cho việc sinh ra các code như python hoặc bashshell để tạo các tool call cho python và bashshell, dựa vào ngữ cảnh cần sinh code gì và cần thực thi không khi thực thi sẽ cần đọc standar output để xem thành công hay lỗi, xem kết quả , cần đưa ra câu trả lời hợp lý cho người dùng. Nếu người dùng yêu cầu thực thi và đảm bảo thành công thì cần dùng local gemma4 dạng agent loop 5 lần để xử lý theo các bước : 
    1. suy nghĩ để sinh code python hoặc bashshel người dùng cần, hoặc sửa lỗi nếu có 
    2. thực thi code ( python có thể dùng /work/a.i-assistant-chatbot-telegram-serverles/venv và cài thêm nếu cần ) (bashshell chỉ chạy trong folder /work/a.i-assistant-chatbot-telegram-serverles/temp không thực thi những quyền cần sudo)
    3.đọc kết quả từ standar output hoặc console log 
        nếu kết quả thành công thì sẽ đưa ra kết quả cho người dùng
        nếu có lỗi hoặc không thành công sẽ cần quay lại bước 1 

**cập nhật 3**
user_prompt ở myassitant/agent.py để  tiết kiệm và không bị loãng message chát hiện tại có thể gồm cả message quote or reply và các file đi theo message . việc xử lý history (  f"### LỊCH SỬ {HISTORY_CONTEXT_LIMIT} TIN NHẮN GẦN NHẤT (đã xử lý):\n") cần build thành dạng phân tích ngữ cảnh nếu cần truy cập các tool call gọi vào db sqllite để lấy thêm thông tin khi cần vd cần lấy các note gần nhất hay remind hay các message chát gần nhất ... lấy ra để xử lý bổ xung cho việc trả lời chát hiện tại 