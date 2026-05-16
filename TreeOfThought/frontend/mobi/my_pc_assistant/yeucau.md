# dựa vào các ảnh ở folder: design

tìm hiểu kỹ và đưa ra cách làm vào phattrien.md với các yêu cầu sau:

- Sử dụng ngôn ngữ tiếng việt để viết, giải thích, trình bày, tài liệu tất cả
- App phải chạy được như thiết kế với đầy đủ các chức năng được thể hiện trong ảnh
- Ưu tiên sử dụng các tính năng của flutter và android native, ios native có sẵng nếu không có thể tự tạo
- **bắt buộc** Cập nhật phattrien.md môĩ lần có yêu cầu mới từ yeucau.md
- xem thêm README.md để biết build, debug, chạy và một số suggest về package
- **chú ý** cập nhật code xong cần **tự động** mở emulator nếu chưa và **tự động** chạy command vd [flutter emulators --launch Medium_Phone_API_27] or [flutter run -d emulator-5554] để test và sửa lỗi nếu có
Cần phân tích và làm việc sau cho code flutter
FE UI của app:
- cần bố cục layout
- pages là các màn hình
- các widgets là các thành phần ui nhỏ
- việc navigation cần thống nhất với global scope
- các wdigets, pages có thể tái sử dụng được, cần có định nghĩa rõ ràng trong file riêng biệt. tạo folder dedicated cho các components, pages, services, utils
- việc gửi state qua lại giữa widgets, pages cần thống nhất theo global scope
- Những thao tác cần tương tác BE qua api cần viết mock api và data cho FE sử dụng, sau này tích hợp với BE thật thông qua hàm fetch api
- Bổ xung việc nhận notification từ google FCM cho cả android và ios, dùng thư viện của firebase realtime, firestore, thư việc về tương tác bluetooh, vân tay, khuôn mặt, nfc, wifi, 5g, 4g, microphone ...
- UI cần định nghĩa thêm việc theme change: màu sáng và màu tối cho app.

**cập nhật 2026-04-22 09:09:09**
cần lưu dữ liệu không quan trọng xuống ổ cứng, như cấu hình về hiển thị cá nhân, các dữ liệu tạm thời, cache, hoặc nhận diện khuôn mặt, chụp ảnh, files, microphone ... để khi khởi động lại app không bị mất dữ liệu và có thể sử dụng lại được. chọn package có hỗ trợ về vector database để dùng gemma4 hoặc fasttext, faiss ...

**cập nhật 2026-05-15 09:09:09**
Đăng nhập Bổ xung authapp SSO với OIDC url http://192.168.4.248:5000/
    - cần làm cho android , ios trước 
    - tôi sẽ test với máy ảo android 
    - kiểm tra http://192.168.4.248:5000/ đã đủ chuẩn oidc để sso chưa
    **bug 1 **cập nhật 2026-05-15 09:09:09** ** chưa thấy nút ở page login để SSO với OIDC  http://192.168.4.248:5000/
        click login sso phải sang trang login SSO vd http://192.168.4.248:5000/admin/auth/login
        
    - dùng code kiểm tra IP để lấy thông tin http://localhost:5000/.well-known/openid-configuration
 và hiện lên UI
    - nếu ở máy ảo không nhìn thấy 192.168.4.248 cần network của máy ảo là bridge mode
        - nếu không chuyển đươc chế độ máy ảo dùng bridge mode thì thêm droplist để chọn ip sso iodc gồm cả ip thần thánh của android hoặc ip 192.168.4.248 hoặc 118.70.117.208
    **bug 2 cập nhật 2026-05-15 09:09:09** [ĐÃ XỬ LÝ]

**cập nhật 2026-05-15 12:09:09**
bổ xung thêm nút sigout ở trong home , ngay cạnh avatar , khi click vào nút logout sẽ log out user và chuyển sang trang login, sigout cả oidc