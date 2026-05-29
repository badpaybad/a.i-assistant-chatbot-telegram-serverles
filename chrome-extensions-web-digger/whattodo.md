Tôi muốn làm chrome extension và dùng API gemini
Là dạng right sidebar
Giao diện như chatbox bình thường
Trên top cần nhập API key và modelname rồi nhấn start
    Có thể ghi nhớ local để lần sau vào fill sẵn và dùng luôn

Chatbox cho phép người dùng có thể chat và conversation luôn giữ 100 message mới nhất gồm cả prompt của người dùng và câu trả lời từ api gemini
Khi có yêu cầu tương tác vào url của tab web đang mở thì cho phép api gemini tương tác vào, như nhập dữ liệu vào ô input của web, nhấn nút, hoặc đọc dữ liệu đang hiển thị ở web và làm theo prompt của người dùng. Dùng chrome debuger như f12 developer tools để tương tác vào web đang mở 

Có thể tham khảo api gemini tôi đang dùng ở gemini_truyenkieu.py

Viết hướng dẫn build, cài local và publish lên chrome extension web store

Không giới hạn hỏi đáp và tương tác, chỉ cần giữ 100 message mới nhất để làm việc và xem intent của người dùng hiện tại. Có thể để thành input trên cùng như nhập api gemini key và model làm settings để đổi được khi cần

Conversation có thể load lại khi tắt đi mở lại (tắt máy, tắt trình duyệt, đóng righ sidebar ...) và mở lại

Cấu hình cần cho người dùng config số message để save lại và load lại khi mở lại 

Dùng chrome debuger như f12 developer tools để tương tác vào web đang mở 
    Có thể tìm kiếm theo text, element ... nếu có nhiều lựa chọn hãy hỏi người dùng chọn kết quả nào để làm gì, ví dụ click vào input, nút, div ... hoặc điền dữ liệu vào các input ...

**đặc biệt** hãy dùng chrome debuger như 1 lập trình viên để có thể hiểu ý định người dùng cần thao tác làm giúp người dùng điều họ cần 

Cho phép người dùng cancel tiến trình đang suy nghĩ hoặc treo lâu, hoặc api gemini không có kết quả quá lâu ...
Nếu người dùng chuyển tab cần cảnh báo vì toàn bộ conversation đang có intent trên tab đó.

**yêu cầu** cần tìm hiểu đưa giải pháp cách làm vào chrome-extensions-web-digger/howtodo.md để tôi duyệt trước khi làm
