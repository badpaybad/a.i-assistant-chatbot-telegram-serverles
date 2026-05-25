# Nhật ký nghiên cứu & phát triển (Thinking Log) - Omni-channel Hub

đọc và cập nhật thêm các câu trả lời khi tôi hỏi vào file này: `TreeOfThought/docs/omini-channel-hub/thinking.md`

---

## Câu hỏi 1: Tôi có mở 1 shop trên sàn Shopee, Shopee có cấp kết nối API hay Webhook để tôi nhận các thông tin sự kiện không?

### Trả lời:

**CÓ**. Shopee cung cấp cả **Shopee Open API (V2)** và cơ chế **Webhook (được gọi là Push Mechanism)** để bạn kết nối, đồng bộ dữ liệu và nhận các thông tin sự kiện theo thời gian thực (real-time).

#### 1. Cơ chế hoạt động của Webhook (Push Mechanism) và API
* **Webhook (Push Mechanism):** Hoạt động theo mô hình *Event-driven*. Khi có bất kỳ sự kiện nào xảy ra trên gian hàng của bạn (ví dụ: khách đặt đơn mới, trạng thái đơn đổi sang "đang giao", có tin nhắn chat mới...), Shopee sẽ chủ động gửi một **HTTP POST Request** chứa dữ liệu sự kiện (JSON) đến **Callback URL** của bạn.
* **REST API (V2):** Hoạt động theo mô hình *Pull*. Sau khi nhận được thông báo từ Webhook, server của bạn sẽ gọi ngược lại API của Shopee để lấy thêm thông tin chi tiết hoặc thực hiện hành động phản hồi (như xác nhận đơn, gửi tin nhắn trả lời...).

#### 2. Các nhóm sự kiện tiêu biểu hỗ trợ qua Webhook
* **Đơn hàng (Order):** Đơn hàng mới (`place_order`), Thay đổi trạng thái đơn (`update_order`), Hủy đơn, Cập nhật thông tin vận chuyển (`package_info_push`).
* **Chat (Webchat):** Khách hàng gửi tin nhắn mới (Cực kỳ quan trọng để tích hợp Chatbot AI tự động phản hồi).
* **Sản phẩm & Kho (Product & Inventory):** Thay đổi tồn kho, thay đổi thông tin sản phẩm, sản phẩm bị Shopee khóa/vi phạm quy chế.
* **Cấp quyền (Shop Authorization):** Người dùng ủy quyền hoặc hủy liên kết gian hàng với ứng dụng của bạn.
* **Khuyến mãi (Marketing):** Thay đổi chương trình khuyến mãi.

#### 3. Cấu trúc Payload Webhook tiêu biểu
Khi có sự kiện xảy ra, Shopee sẽ gửi một gói tin JSON đến server của bạn có cấu trúc chung như sau:
```json
{
  "code": 8, 
  "shop_id": 1274495,
  "timestamp": 1716654246,
  "data": {
    "ordersn": "260525QXVJM3EX",
    "action": "place_order",
    "item_id": 1861418518,
    "changed_values": [
      {
        "name": "reserved_stock",
        "old": 10,
        "new": 9
      }
    ]
  }
}
```
* **`code`**: Mã định danh loại sự kiện (Ví dụ: `code: 8` đại diện cho sự kiện thay đổi trạng thái đơn hàng).
* **`shop_id`**: ID shop của bạn phát sinh sự kiện.
* **`data`**: Chứa thông tin chi tiết về sự kiện.

#### 4. Quy trình thiết lập kết nối dành cho Chủ Shop (Seller In-house System)
Do bạn phát triển hệ thống để quản lý **chính shop của mình**, quy trình sẽ như sau:
1. **Đăng ký tài khoản Developer:** Truy cập [Shopee Open Platform](https://open.shopee.com/) đăng ký tài khoản (Cá nhân hoặc Doanh nghiệp).
2. **Tạo ứng dụng quản lý nội bộ:** Tạo ứng dụng mới với App Type là **"Seller In-house System"** (Hệ thống tự phát triển của nhà bán hàng). Loại này hoàn toàn miễn phí và thiết kế riêng để bạn tự kết nối đến các shop do chính bạn sở hữu.
3. **Nhận Credentials:** Hệ thống sẽ cấp cho bạn **Partner ID** và **Partner Key (Secret)**.
4. **Cấu hình Callback URL:** Điền địa chỉ URL máy chủ của bạn trong phần **Push Mechanism** của console và chọn các sự kiện muốn đăng ký nhận.
5. **Go Live:** Chuyển ứng dụng sang trạng thái Live (Shopee duyệt trong 24h) và liên kết ủy quyền với gian hàng thật.

#### 5. Lưu ý kỹ thuật quan trọng khi tích hợp
* **Xác thực Chữ ký (Signature Verification):**
  * Bắt buộc kiểm tra chữ ký ở header `Authorization`.
  * **Công thức:** `sign = HMAC-SHA256(Partner_Key, URL_Path + "|" + Raw_Request_Body)`
  * *Mẹo:* Phải sử dụng **Raw Request Body** (dạng chuỗi JSON gốc chưa qua bộ phân tích cú pháp/parser) để tránh lệch ký tự trắng/thứ tự thuộc tính dẫn đến sai signature.
* **Thời gian phản hồi (Timeout):**
  * Shopee yêu cầu phản hồi mã trạng thái HTTP `2xx` trong vòng **3 giây**.
  * *Giải pháp:* Thiết kế bất đồng bộ. Nhận webhook -> Kiểm tra signature -> Đẩy vào hàng đợi (Queue) -> Phản hồi `200 OK` ngay lập tức. Sau đó, Background Worker sẽ lấy dữ liệu từ hàng đợi ra xử lý sau.
