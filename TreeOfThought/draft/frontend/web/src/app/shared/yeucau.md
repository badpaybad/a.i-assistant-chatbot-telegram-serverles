TreeOfThought/frontend/web/src/app/shared
tham khảo TreeOfThought/frontend/web/yeucau.md để dùng các core base FE. cách làm BE TreeOfThought/backend/yeucau.md
cần làm component share dùng ckeditor
    - có thể thêm plugin được, vd khai báo nút và nút đó sẽ mở modal 1 component được chỉ định, cho phép khai báo method để build content insert vào vị trí chuột ở trên content ckeditor
        - ở module files folder TreeOfThought/docs/files-folders/yeucau.md có thể search theo tên file và chọn để insert vào content ckeditor nếu là ảnh thì cần hiển thị dạng ảnh , còn lại là link file text là tên file, có thể insert nhiều files
        - plugin đưa link youtube vào thì sẽ nhúng video vào content ckeditor 
        - plugin insert ảnh dạng base64 vào content ckeditor, có thể insert nhiều ảnh
        - chống cross site scripting , remove thẻ script nếu có         
    - có thể upload file dùng google cloud storage 
        - cần tạo 1 bảng riêng cho việc upload ở ckeditor trong để lưu các url và info file upload theo user đang đăng nhập dùng module files folder TreeOfThought/docs/files-folders/yeucau.md
        - file này là public ai cũng xem được 
    - ckeditor cần full toolbar các chức năng của ckeditor, có cả view source html để có thể sửa code được
    
sau khi làm xong component cần tao test vào module test: TreeOfThought/docs/test/yeucau.md cần để là sub menu của Module thử nghiệm

**cập nhật 1**
component ckeditor cần thêm plugin: plugin ckeditor5-math cho latext MathJax
    - công thức toán học
    - công thức hóa học 