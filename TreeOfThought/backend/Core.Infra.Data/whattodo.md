bổ xung triển khai Audit Log (Trước - Sau) vào base với DbContext cho cả mongodb lẫn relation dbcontext 
Ý tưởng chính: Override hàm SaveChangesAsync SaveChange của DbContext để can thiệp vào trước khi dữ liệu thật sự được ghi xuống Database.  của TreeOfThought/backend/Core.Infra.Data các dbcontext sẽ luôn có bảng audit log để tracking  

**cập nhật 1** các bảng trong cơ sở dữ liệu cần tuân thủ, để tránh tìm kiếm khó khăn trong quá trình code, ta sử dụng chung 1 tiêu chuẩn đặt tên cột và tên class property tương đồng với bảng trong DB. các class ORM cho relation db và nosql như mongodb cần tuân thủ việc thiết kế DB theo chuẩn: Từ điển dữ liệu (Data Dictionary) chi tiết 100% bảng và cột (định nghĩa rõ tên, kiểu dữ liệu, độ dài, các ràng buộc, giá trị mặc định, chỉ mục và mức độ nhạy cảm dữ liệu theo Nghị định 13/2023/NĐ-CP) ví dụ:

                CREATE TABLE users (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    full_name VARCHAR(255) NOT NULL,
                    national_id VARCHAR(12) NOT NULL UNIQUE,
                    phone_number VARCHAR(15) NOT NULL UNIQUE,
                    email VARCHAR(255) DEFAULT NULL,
                    bank_account_number VARCHAR(30) DEFAULT NULL,
                    biometric_data_hash TEXT DEFAULT NULL,
                    current_location_lat DECIMAL(9, 6) DEFAULT NULL,
                    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'LOCKED')),
                    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                );

                -- Tạo chỉ mục (Indexes)
                CREATE INDEX IX_users_phone ON users(phone_number);
                CREATE INDEX IX_users_email ON users(email);
                CREATE INDEX IX_users_status ON users(status);

