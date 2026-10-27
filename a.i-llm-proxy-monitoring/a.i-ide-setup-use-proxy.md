# Sổ Tay Hướng Dẫn Cấu Hình Các AI IDE Sử Dụng LLM Proxy Mạng LAN (a.i-ide-setup-use-proxy.md)

Tài liệu này hướng dẫn chi tiết cho các kỹ sư lập trình, thành viên trong mạng LAN cấu hình các công cụ IDE và CLI AI (**Antigravity, Antigravity IDE, Claude, Codex / Copilot / Cursor**) để toàn bộ lưu lượng API gọi lên các mô hình LLM Cloud đều được định tuyến thông qua máy chủ **LLM Proxy & Monitoring Gateway** nội bộ trước khi ra ngoài Internet.

---

## 📌 0. Thông Số Kết Nối Mạng Nội Bộ (LAN Connection Info)

Trước khi thực hiện cấu hình trên máy trạm (PC Client), hãy xác định địa chỉ IP máy chủ Proxy do Quản trị viên cung cấp:
- **Địa chỉ máy chủ Proxy LAN**: `http://192.168.1.183:8000` *(thay `192.168.1.183` bằng IP thực tế của máy chủ Proxy)*
- **Giao diện Dashboard Giám sát & Quota**: `http://192.168.1.183:8000/dashboard`

### Bảng Định Tuyến Endpoint Reverse Proxy:
| Dịch vụ / Công cụ AI | Endpoint Proxy Tương Ứng | Domain Gốc Trên Cloud | Giao Thức / Port |
| :--- | :--- | :--- | :--- |
| 🪐 **Google / Antigravity** | `http://192.168.1.183:8000/google` | `daily-cloudcode-pa.googleapis.com`<br>`cloudcode-pa.googleapis.com` | HTTP / 8000 |
| 🧠 **Anthropic / Claude** | `http://192.168.1.183:8000/anthropic` | `api.anthropic.com` | HTTP / 8000 |
| ⚡ **OpenAI / Codex / Cursor** | `http://192.168.1.183:8000/openai/v1` | `api.openai.com/v1` | HTTP / 8000 |
| 🐙 **GitHub Copilot** | `http://192.168.1.183:8000/copilot` | `api.githubcopilot.com` | HTTP / 8000 |

---

## 🪐 1. Cấu Hình Antigravity & Antigravity IDE

### 1.1. Antigravity IDE (Desktop Application)

#### ⚠️ CẢNH BÁO QUAN TRỌNG: User Settings vs Workspace Settings
Antigravity IDE hoạt động dựa trên kiến trúc Electron:
1. Tiến trình **Electron Main Process** (`main.js`) khởi tạo và sinh ra một tiến trình Go chạy ngầm: `language_server_linux_x64` (hoặc `language_server_windows_x64.exe` trên Windows, `language_server_darwin_arm64` trên macOS).
2. Khi khởi tạo daemon này, Electron Main Process đọc cấu hình `jetski.cloudCodeUrl` **TRỰC TIẾP TỪ FILE USER SETTINGS TOÀN CỤC CỦA NGƯỜI DÙNG** để truyền cờ `--cloud_code_endpoint <URL>`.
3. ❌ **LƯU Ý**: Nếu bạn chỉ đặt `"jetski.cloudCodeUrl"` trong file `.vscode/settings.json` (Workspace Settings của từng thư mục dự án), tiến trình Main Process sẽ **KHÔNG NHẬN** và language server daemon vẫn gọi thẳng ra Google Cloud!
4. ✅ **BẮT BUỘC**: Phải cấu hình vào file **User Settings (`settings.json`)** của hệ điều hành.

---

#### 📂 Bảng Đường Dẫn File Cấu Hình User Settings của Antigravity IDE:
| Hệ Điều Hành | Đường Dẫn Tuyệt Đối File Cấu Hình User `settings.json` |
| :--- | :--- |
| 🐧 **Linux** | `~/.config/Antigravity IDE/User/settings.json`<br>*(Đường dẫn đầy đủ: `/home/<username>/.config/Antigravity IDE/User/settings.json`)* |
| 🪟 **Windows** | `%APPDATA%\Antigravity IDE\User\settings.json`<br>*(Đường dẫn đầy đủ: `C:\Users\<username>\AppData\Roaming\Antigravity IDE\User\settings.json`)* |
| 🍏 **macOS** | `~/Library/Application Support/Antigravity IDE/User/settings.json`<br>*(Đường dẫn đầy đủ: `/Users/<username>/Library/Application Support/Antigravity IDE/User/settings.json`)* |

---

#### 🛠️ Các Bước Cấu Hình Chi Tiết:

**Cách 1: Thao tác trên giao diện IDE (Khuyến nghị)**
1. Mở **Antigravity IDE**.
2. Nhấn tổ hợp phím mở Command Palette:
   - **Linux / Windows**: `Ctrl + Shift + P`
   - **macOS**: `Cmd + Shift + P`
3. Nhập tìm kiếm: `Preferences: Open User Settings (JSON)` và nhấn `Enter`.
4. Thêm key `"jetski.cloudCodeUrl"` vào file `settings.json`:
   ```json
   {
     "jetski.cloudCodeUrl": "http://192.168.1.183:8000/google"
   }
   ```
   > ⚠️ **KHÔNG đặt `http.proxy` trỏ vào Gateway**: Gateway là *reverse proxy* (định tuyến theo path `/google`, `/anthropic`...), không hỗ trợ phương thức `CONNECT` của forward proxy. Nếu đặt `http.proxy`, toàn bộ traffic HTTPS khác của IDE (đăng nhập OAuth, marketplace, cập nhật) sẽ bị lỗi.
5. Nhấn `Ctrl + S` (hoặc `Cmd + S`) để lưu file.
6. **Khởi động lại Antigravity IDE hoàn toàn** (Đóng cửa sổ và mở lại) để tiến trình Go daemon nhận tham số endpoint mới.

**Cách 2: Chỉnh sửa trực tiếp file bằng Terminal / Shell**

- **Trên Linux**:
  ```bash
  mkdir -p "$HOME/.config/Antigravity IDE/User"
  # Dùng jq để cập nhật JSON an toàn nếu file đã tồn tại
  python3 -c "
  import json, os
  p = os.path.expanduser('~/.config/Antigravity IDE/User/settings.json')
  data = json.load(open(p)) if os.path.exists(p) else {}
  data['jetski.cloudCodeUrl'] = 'http://192.168.1.183:8000/google'
  with open(p, 'w') as f: json.dump(data, f, indent=2)
  print('Updated Antigravity IDE User settings successfully.')
  "
  ```

- **Trên Windows (PowerShell)**:
  ```powershell
  $settingsPath = "$env:APPDATA\Antigravity IDE\User\settings.json"
  if (-not (Test-Path (Split-Path $settingsPath))) {
      New-Item -ItemType Directory -Path (Split-Path $settingsPath) -Force
  }
  # Bổ sung key jetski.cloudCodeUrl
  $content = if (Test-Path $settingsPath) { Get-Content $settingsPath -Raw | ConvertFrom-Json } else { [PSCustomObject]@{} }
  $content | Add-Member -NotePropertyName "jetski.cloudCodeUrl" -NotePropertyValue "http://192.168.1.183:8000/google" -Force
  $content | ConvertTo-Json -Depth 10 | Set-Content $settingsPath -Encoding UTF8
  Write-Host "Updated Antigravity IDE User settings on Windows."
  ```

- **Trên macOS**:
  ```bash
  mkdir -p "$HOME/Library/Application Support/Antigravity IDE/User"
  python3 -c "
  import json, os
  p = os.path.expanduser('~/Library/Application Support/Antigravity IDE/User/settings.json')
  data = json.load(open(p)) if os.path.exists(p) else {}
  data['jetski.cloudCodeUrl'] = 'http://192.168.1.183:8000/google'
  with open(p, 'w') as f: json.dump(data, f, indent=2)
  print('Updated Antigravity IDE User settings on macOS.')
  "
  ```

---

### 1.2. Antigravity CLI / Agent (Dòng Lệnh Terminal)

Khi sử dụng công cụ dòng lệnh `antigravity`:

#### 📂 Bảng Biến Môi Trường & Cờ Lệnh:
| Tên Biến / Cờ Lệnh | Giá Trị Cần Cấu Hình | Ý Nghĩa |
| :--- | :--- | :--- |
| `--cloud_code_endpoint` | `"http://192.168.1.183:8000/google"` | Trỏ trực tiếp endpoint gọi Google CloudCode PA về Proxy |
| `LLM_PROXY_URL` *(biến tự đặt, tùy chọn)* | `"http://192.168.1.183:8000"` | Gom địa chỉ Gateway vào 1 biến để alias dùng lại |

> ⚠️ **KHÔNG export `HTTP_PROXY` / `HTTPS_PROXY` trỏ vào Gateway.** Gateway là *reverse proxy* định tuyến theo path (`/google`, `/anthropic`, `/openai`, `/copilot`), không hỗ trợ `CONNECT` của forward proxy → mọi lệnh HTTPS khác (git, pip, npm, OAuth) sẽ lỗi. Chỉ cần trỏ endpoint/base URL như bảng trên.

#### Cấu hình cố định vào Shell Profile:

- **Linux / macOS (`~/.bashrc` hoặc `~/.zshrc`)**:
  ```bash
  # Thêm vào cuối file ~/.bashrc hoặc ~/.zshrc
  export LLM_PROXY_URL="http://192.168.1.183:8000"   # laptop chạy proxy local: http://127.0.0.1:8000
  
  # Tạo alias tự động đính kèm endpoint cho antigravity CLI
  alias antigravity='command antigravity --cloud_code_endpoint "$LLM_PROXY_URL/google"'
  ```
  Sau đó thực thi: `source ~/.bashrc` (hoặc `source ~/.zshrc`).

- **Windows (PowerShell `$PROFILE`)**:
  Mở PowerShell và gõ:
  ```powershell
  notepad $PROFILE
  ```
  Dán nội dung sau vào:
  ```powershell
  $env:LLM_PROXY_URL = "http://192.168.1.183:8000"
  function antigravity { & "antigravity.exe" --cloud_code_endpoint "$env:LLM_PROXY_URL/google" $args }
  ```

---

### 1.3. Laptop Di Động — IP LAN Thay Đổi Theo DHCP (Roaming)

Khi laptop di chuyển giữa các mạng (văn phòng, nhà, quán cafe), IP do DHCP cấp sẽ thay đổi. **Không bao giờ hard-code IP LAN** (`192.168.1.x`) vào cấu hình IDE. Chọn một trong các phương án sau:

| Kịch bản | Endpoint nên dùng | Phụ thuộc IP DHCP? |
| :--- | :--- | :--- |
| **A. Proxy chạy ngay trên laptop** (Docker local) | `http://127.0.0.1:8000/google` | ❌ Không — loopback luôn cố định |
| **B. Proxy trên server, laptop roaming** | `http://<hostname>.local:8000/google` (mDNS/Avahi) hoặc DNS nội bộ `llm-proxy.lan` | ❌ Không — phân giải theo tên |
| **C. Ra khỏi mạng LAN văn phòng** | IP Tailscale/WireGuard cố định, VD `http://100.x.y.z:8000/google` hoặc MagicDNS `http://<máy>.<tailnet>.ts.net:8000/google` | ❌ Không — IP VPN overlay cố định |

#### Phương án A (đang áp dụng trên laptop Proxy Host)
1. Container chạy với `restart: unless-stopped` → tự khởi động cùng Docker sau mỗi lần reboot.
2. User Settings của IDE (`~/.config/Antigravity IDE/User/settings.json`):
   ```json
   { "jetski.cloudCodeUrl": "http://127.0.0.1:8000/google" }
   ```
3. Khởi động lại IDE hoàn toàn. Kiểm tra: `ps aux | grep cloud_code_endpoint` phải hiện `--cloud_code_endpoint http://127.0.0.1:8000/google`.
4. Trong Docker Desktop, request từ host đi vào container hiển thị IP gateway bridge (`172.x.0.1`). Rule `Proxy Host Laptop` trong [policy_matrix.yaml](file:///work/a.i-assistant-chatbot-telegram-serverles/a.i-llm-proxy-monitoring/policy_matrix.yaml) khớp theo CIDR `172.16.0.0/12` nên log luôn gắn đúng tên máy dù IP LAN thay đổi.

#### Phương án B/C cho máy khác truy cập vào laptop Proxy
- **mDNS**: `sudo apt install avahi-daemon` → máy khác gọi `http://$(hostname).local:8000`.
- **Tailscale**: `tailscale ip -4` lấy IP `100.x.y.z` cố định; dùng được cả khi ở ngoài văn phòng.
- Lưu ý: khi định danh theo IP/MAC không ổn định, nên tạo rule theo dải `ip_range` (CIDR) của VPN thay vì từng IP lẻ.

---

## 🧠 2. Cấu Hình Claude (Claude Code CLI, Claude Desktop, VS Code Extension)

### 2.1. Claude Code CLI

Claude Code CLI hỗ trợ sẵn biến môi trường tiêu chuẩn `ANTHROPIC_BASE_URL` để chuyển hướng toàn bộ cuộc gọi API sang reverse proxy:

#### 📂 Bảng Biến Môi Trường Của Claude:
| Tên Biến Môi Trường | Giá Trị Mẫu | Mô Tả |
| :--- | :--- | :--- |
| `ANTHROPIC_BASE_URL` | `http://192.168.1.183:8000/anthropic` | Trỏ Base URL của SDK Anthropic về proxy LAN |
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | API Key của bạn (Proxy giữ nguyên header để xác thực) |

#### Hướng dẫn cài đặt theo Hệ Điều Hành:

- **Linux / macOS**:
  Thêm vào file `~/.bashrc` hoặc `~/.zshrc`:
  ```bash
  # Định tuyến Claude API qua Proxy LAN
  export ANTHROPIC_BASE_URL="http://192.168.1.183:8000/anthropic"
  export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key"
  ```
  Sau đó chạy:
  ```bash
  source ~/.bashrc  # hoặc source ~/.zshrc
  claude
  ```

- **Windows (Cấu hình Vĩnh viễn qua PowerShell / System Environment)**:
  ```powershell
  [System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'http://192.168.1.183:8000/anthropic', 'User')
  [System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-api03-your-actual-key', 'User')
  ```
  *(Hoặc mở hộp thoại Windows: `sysdm.cpl` $\rightarrow$ Advanced $\rightarrow$ Environment Variables $\rightarrow$ Add New User Variable)*.

- **Dự Án Riêng Biệt (Project-level `.env`)**:
  Tạo file `.env` ngay trong thư mục làm việc của dự án:
  ```ini
  ANTHROPIC_BASE_URL=http://192.168.1.183:8000/anthropic
  ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key
  ```

---

### 2.2. Claude Desktop (Ứng Dụng Desktop Chính Thức Của Anthropic)

Claude Desktop hỗ trợ định cấu hình thông qua file `claude_desktop_config.json`:

#### 📂 Bảng Đường Dẫn File Cấu Hình Claude Desktop:
| Hệ Điều Hành | Đường Dẫn File Cấu Hình |
| :--- | :--- |
| 🍏 **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| 🪟 **Windows** | `%APPDATA%\Claude\claude_desktop_config.json`<br>*(Ví dụ: `C:\Users\<username>\AppData\Roaming\Claude\claude_desktop_config.json`)* |
| 🐧 **Linux** | `~/.config/Claude/claude_desktop_config.json` |

#### Nội dung JSON cấu hình (`claude_desktop_config.json`):
```json
{
  "apiBaseUrl": "http://192.168.1.183:8000/anthropic"
}
```

---

### 2.3. Extension Claude Trên VS Code / IDE (Cline, Roo Code, Continue)

Khi sử dụng các extension lập trình AI trong VS Code hoặc Antigravity IDE:

#### 1. Extension **Cline** & **Roo Code**:
1. Nhấp vào icon bánh răng **Settings** của Extension trên thanh Sidebar.
2. Tại mục **API Provider**: Chọn `Anthropic`.
3. Điền các trường thông số:
   - **Base URL**: `http://192.168.1.183:8000/anthropic`
   - **API Key**: Điền Anthropic API Key của bạn.
   - **Model**: Chọn các model nằm trong quyền được cấp phép của bạn (ví dụ: `claude-3-5-haiku-20241022` hoặc `claude-3-5-sonnet-20241022`).
4. Nhấn **Save**.

#### 2. Extension **Continue** (`config.json`):
- **Đường dẫn file**:
  - Linux / macOS: `~/.continue/config.json`
  - Windows: `%USERPROFILE%\.continue\config.json`
- **Nội dung cấu hình**:
  ```json
  {
    "models": [
      {
        "title": "Claude 3.5 Sonnet (LAN Proxy)",
        "provider": "anthropic",
        "model": "claude-3-5-sonnet-20241022",
        "apiBase": "http://192.168.1.183:8000/anthropic",
        "apiKey": "sk-ant-your-key"
      }
    ]
  }
  ```

---

## ⚡ 3. Cấu Hình Codex (GitHub Copilot, OpenAI API, Cursor IDE)

### 3.1. GitHub Copilot (Trong VS Code / VSCodium)

GitHub Copilot trong VS Code hỗ trợ cấu hình chuyển hướng URL API nội bộ thông qua key cấu hình ẩn `github.copilot.advanced.debug.overrideProxyUrl`.

#### 📂 Bảng Đường Dẫn File Cấu Hình User `settings.json` Của VS Code:
| Hệ Điều Hành | Đường Dẫn File Cấu Hình User `settings.json` |
| :--- | :--- |
| 🐧 **Linux** | `~/.config/Code/User/settings.json` |
| 🪟 **Windows** | `%APPDATA%\Code\User\settings.json`<br>*(Ví dụ: `C:\Users\<username>\AppData\Roaming\Code\User\settings.json`)* |
| 🍏 **macOS** | `~/Library/Application Support/Code/User/settings.json` |

#### Nội dung cấu hình JSON:
Thêm các khóa sau vào file `settings.json`:
```json
{
  "github.copilot.advanced": {
    "debug.overrideProxyUrl": "http://192.168.1.183:8000/copilot"
  }
}
```
> ⚠️ **Không thêm `http.proxy` / `http.proxySupport`** trỏ vào Gateway: Gateway không phải forward proxy, đặt vào sẽ làm hỏng đăng nhập GitHub, marketplace và cập nhật VS Code. Nếu đã lỡ thêm, hãy xóa các key này.
*Lưu ý*: Sau khi lưu file, bấm tổ hợp `Ctrl + Shift + P` $\rightarrow$ chọn `Developer: Reload Window` để GitHub Copilot kết nối qua Proxy LAN.

---

### 3.2. GitHub Copilot Trong JetBrains (IntelliJ IDEA, PyCharm, WebStorm, Android Studio)

> ⚠️ **Hạn chế**: Copilot trên JetBrains chỉ hỗ trợ *forward proxy* (HTTP Proxy của nền tảng), không có key override base URL như VS Code. Gateway hiện là *reverse proxy* nên cấu hình dưới đây **sẽ không hoạt động** với Gateway (chỉ áp dụng nếu công ty bổ sung một forward proxy như Squid phía trước). Khuyến nghị: dùng Copilot trong VS Code (mục 3.1) hoặc plugin dùng được base URL (Continue, mục 2.3) để đi qua Gateway.

Tham khảo cấu hình HTTP Proxy của nền tảng JetBrains (cho trường hợp có forward proxy):

#### 📂 Bảng Đường Dẫn File Cấu Hình Proxy JetBrains:
| Hệ Điều Hành | Đường Dẫn File Cấu Hình |
| :--- | :--- |
| 🐧 **Linux** | `~/.config/JetBrains/<IDE_Name><Version>/options/proxy.settings.xml` |
| 🪟 **Windows** | `%APPDATA%\JetBrains\<IDE_Name><Version>\options\proxy.settings.xml` |
| 🍏 **macOS** | `~/Library/Application Support/JetBrains/<IDE_Name><Version>/options/proxy.settings.xml` |

#### Hướng dẫn cấu hình qua giao diện:
1. Mở JetBrains IDE $\rightarrow$ Vào **Settings** (`Ctrl + Alt + S` trên Windows/Linux, `Cmd + ,` trên macOS).
2. Tìm kiếm mục: **Appearance & Behavior** $\rightarrow$ **System Settings** $\rightarrow$ **HTTP Proxy**.
3. Chọn tùy chọn: **Manual proxy configuration** $\rightarrow$ **HTTP**:
   - **Host name**: `192.168.1.183`
   - **Port number**: `8000`
   - **No proxy for**: `localhost, 127.0.0.1`
4. Bấm nút **Check connection** và điền thử `http://192.168.1.183:8000/dashboard` để xác minh thành công.
5. Nhấn **Apply** $\rightarrow$ **OK**.

---

### 3.3. Cursor IDE

Cursor IDE là phiên bản tùy biến chuyên sâu của VS Code dành cho lập trình viên AI:

#### 📂 Bảng Đường Dẫn File Cấu Hình User `settings.json` Của Cursor:
| Hệ Điều Hành | Đường Dẫn File Cấu Hình |
| :--- | :--- |
| 🐧 **Linux** | `~/.config/Cursor/User/settings.json` |
| 🪟 **Windows** | `%APPDATA%\Cursor\User\settings.json` |
| 🍏 **macOS** | `~/Library/Application Support/Cursor/User/settings.json` |

#### Hướng dẫn cấu hình trên giao diện Cursor:
1. Mở Cursor IDE $\rightarrow$ Bấm tổ hợp phím `Ctrl + Shift + J` (hoặc click icon **Settings** hình bánh răng ở góc trên bên phải).
2. Chuyển sang tab **Models**:
   - Bật thanh trượt **OpenAI API Key**: Bật `ON`.
   - Tại ô **Override OpenAI Base URL**, điền chính xác endpoint:
     ```
     http://192.168.1.183:8000/openai/v1
     ```
   - Điền API Key của bạn vào ô **OpenAI API Key**.
3. Tại danh sách model phía dưới, bật các model được cấp phép trong công ty của bạn (ví dụ: `gpt-4o-mini`, `gpt-4o`).

---

### 3.4. Ứng Dụng Code & Script Sử Dụng OpenAI SDK (Python / Node.js)

Đối với các ứng dụng, backend service hoặc script phân tích dữ liệu:

#### 📂 Bảng Biến Môi Trường Tiêu Chuẩn:
| Tên Biến Môi Trường | Giá Trị Cấu Hình | Mô Tả |
| :--- | :--- | :--- |
| `OPENAI_BASE_URL` | `http://192.168.1.183:8000/openai/v1` | Trỏ toàn bộ SDK OpenAI sang Proxy LAN |
| `OPENAI_API_KEY` | `sk-your-openai-api-key` | API Key của tài khoản bạn |

#### Ví dụ Cấu Hình File `.env`:
```ini
OPENAI_BASE_URL=http://192.168.1.183:8000/openai/v1
OPENAI_API_KEY=sk-your-openai-api-key
```

#### Ví dụ Code Python Chuẩn:
```python
from openai import OpenAI

# SDK tự động nhận biến môi trường OPENAI_BASE_URL nếu được export,
# hoặc có thể truyền tường minh như sau:
client = OpenAI(
    base_url="http://192.168.1.183:8000/openai/v1",
    api_key="sk-your-openai-api-key"
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Bạn là trợ lý code."},
        {"role": "user", "content": "Xin chào, test kết nối qua proxy LAN."}
    ],
    stream=True
)

for chunk in response:
    content = chunk.choices[0].delta.content or ""
    print(content, end="", flush=True)
print()
```

---

## 📋 4. Bảng Tổng Hợp Nhanh Toàn Bộ Đường Dẫn File & Biến Môi Trường (Cheatsheet)

Bảng tra cứu nhanh dành cho kỹ sư IT / Dev khi triển khai hàng loạt máy trong công ty:

| Công Cụ / IDE | Hệ Điều Hành | Đường Dẫn File Cấu Hình Cần Sửa | Key JSON Cần Thêm / Sửa | Biến Môi Trường Cần Export |
| :--- | :--- | :--- | :--- | :--- |
| **Antigravity IDE** | 🐧 Linux | `~/.config/Antigravity IDE/User/settings.json` | `"jetski.cloudCodeUrl": "http://192.168.1.183:8000/google"` | Không dùng |
| **Antigravity IDE** | 🪟 Windows | `%APPDATA%\Antigravity IDE\User\settings.json` | `"jetski.cloudCodeUrl": "http://192.168.1.183:8000/google"` | Không dùng |
| **Antigravity IDE** | 🍏 macOS | `~/Library/Application Support/Antigravity IDE/User/settings.json` | `"jetski.cloudCodeUrl": "http://192.168.1.183:8000/google"` | Không dùng |
| **Antigravity CLI** | Mọi OS | File profile shell (`~/.bashrc`, `$PROFILE`) | Không dùng | `antigravity --cloud_code_endpoint "..."` |
| **Claude Code CLI** | 🐧 / 🍏 | `~/.bashrc` hoặc `~/.zshrc` | Không dùng | `ANTHROPIC_BASE_URL="http://192.168.1.183:8000/anthropic"` |
| **Claude Code CLI** | 🪟 Windows | System Environment / PowerShell `$PROFILE` | Không dùng | `ANTHROPIC_BASE_URL="http://192.168.1.183:8000/anthropic"` |
| **Claude Desktop** | 🍏 macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` | `"apiBaseUrl": "http://192.168.1.183:8000/anthropic"` | Không dùng |
| **Claude Desktop** | 🪟 Windows | `%APPDATA%\Claude\claude_desktop_config.json` | `"apiBaseUrl": "http://192.168.1.183:8000/anthropic"` | Không dùng |
| **GitHub Copilot** | 🐧 Linux | `~/.config/Code/User/settings.json` | `"github.copilot.advanced": {"debug.overrideProxyUrl": "http://192.168.1.183:8000/copilot"}` | Không dùng (❌ không đặt `http.proxy`) |
| **GitHub Copilot** | 🪟 Windows | `%APPDATA%\Code\User\settings.json` | `"github.copilot.advanced": {"debug.overrideProxyUrl": "http://192.168.1.183:8000/copilot"}` | Không dùng (❌ không đặt `http.proxy`) |
| **GitHub Copilot** | 🍏 macOS | `~/Library/Application Support/Code/User/settings.json` | `"github.copilot.advanced": {"debug.overrideProxyUrl": "http://192.168.1.183:8000/copilot"}` | Không dùng (❌ không đặt `http.proxy`) |
| **JetBrains Copilot** | Mọi OS | Settings $\rightarrow$ HTTP Proxy | ⚠️ Chưa hỗ trợ qua Gateway (cần forward proxy) | — |
| **Cursor IDE** | Mọi OS | UI Settings $\rightarrow$ Models | `"Override OpenAI Base URL": "http://.../openai/v1"` | `OPENAI_BASE_URL` |
| **OpenAI Scripts** | Mọi OS | Thư mục code `.env` | `OPENAI_BASE_URL=http://192.168.1.183:8000/openai/v1` | `OPENAI_BASE_URL="http://192.168.1.183:8000/openai/v1"` |

---

## 🔌 5. Hướng Dẫn Cấu Hình MCP (Model Context Protocol) Qua Gateway LAN (SSE, WebSocket/WSS, gRPC-Web)

**Model Context Protocol (MCP)** cho phép các AI IDE (Antigravity IDE, Claude Desktop, Claude Code, Cursor, Cline, Roo Code) kết nối tới các hệ thống công cụ và dữ liệu nội bộ. Thông qua **LLM & MCP Gateway**, mọi kết nối MCP đều được giám sát, nhận diện IP/MAC và kiểm soát danh sách tool được phép gọi.

### 5.0. Thông Tin Endpoint MCP Trên Gateway Mạng LAN:
- **Địa chỉ SSE Endpoint (Khuyên dùng)**: `http://192.168.1.183:8000/mcp/{server_name}/sse`
- **Địa chỉ WebSocket Endpoint**: `ws://192.168.1.183:8000/mcp/{server_name}/ws`
- **WebSocket bảo mật (WSS)**: `wss://192.168.1.183:8000/mcp/{server_name}/ws` — chỉ khi Gateway chạy với `SSL_CERTFILE` / `SSL_KEYFILE`
- **gRPC-Web / Connect / Protobuf**: `POST http://192.168.1.183:8000/mcp/{server_name}/grpc/{Service}/{Method}` — kiểm soát theo tên method qua `allowed_mcp_tools` (bị chặn trả `grpc-status: 7`). gRPC native (HTTP/2) cần đặt Envoy/nginx phía trước.
- **Server tích hợp sẵn mặc định**: `lan-tools` (cung cấp công cụ `lan_status`, `lan_ping`, `lan_arp_lookup`)

---

### 5.1. Cấu Hình MCP Cho Antigravity IDE
Thêm cấu hình vào file User Settings (`~/.config/Antigravity/User/settings.json` trên Linux hoặc `%APPDATA%\Antigravity\User\settings.json` trên Windows):

```json
{
  "mcpServers": {
    "lan-tools-sse": {
      "url": "http://192.168.1.183:8000/mcp/lan-tools/sse",
      "transport": "sse"
    },
    "lan-tools-ws": {
      "url": "ws://192.168.1.183:8000/mcp/lan-tools/ws",
      "transport": "websocket"
    }
  }
}
```

---

### 5.2. Cấu Hình MCP Cho Claude Desktop
Mở file `claude_desktop_config.json`:
- **Linux**: `~/.config/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Thêm cấu hình kết nối tới Gateway qua SSE:
```json
{
  "mcpServers": {
    "lan-tools": {
      "url": "http://192.168.1.183:8000/mcp/lan-tools/sse"
    }
  }
}
```
*(Nếu phiên bản Claude Desktop của bạn yêu cầu command wrapper cho SSE, dùng lệnh bridge `npx -y mcp-remote http://192.168.1.183:8000/mcp/lan-tools/sse`)*.

---

### 5.3. Cấu Hình MCP Cho Claude Code CLI
Chạy lệnh trực tiếp trong Terminal của máy trạm:
```bash
claude mcp add --transport sse lan-gateway http://192.168.1.183:8000/mcp/lan-tools/sse
```
Kiểm tra danh sách MCP server đã kết nối:
```bash
claude mcp list
```

---

### 5.4. Cấu Hình MCP Cho Cursor IDE
1. Mở **Cursor** $\rightarrow$ Nhấn tổ hợp `Ctrl + Shift + J` (hoặc vào **Settings** $\rightarrow$ **Features** $\rightarrow$ **MCP**).
2. Nhấn nút **Add New MCP Server**.
3. Điền thông số:
   - **Name**: `lan-gateway`
   - **Type**: `SSE`
   - **URL**: `http://192.168.1.183:8000/mcp/lan-tools/sse`
4. Hoặc thêm trực tiếp vào file cấu hình dự án `.cursor/mcp.json`:
   ```json
   {
     "mcpServers": {
       "lan-gateway": {
         "url": "http://192.168.1.183:8000/mcp/lan-tools/sse"
       }
     }
   }
   ```

---

### 5.5. Cấu Hình Cho VSCode Extensions (Cline / Roo Code / Continue)
Mở file cấu hình `cline_mcp_settings.json` hoặc tab MCP trong giao diện Extension:
```json
{
  "mcpServers": {
    "lan-gateway": {
      "url": "http://192.168.1.183:8000/mcp/lan-tools/sse",
      "transportType": "sse"
    }
  }
}
```

---

## 🔍 6. Kiểm Tra & Xác Minh Kết Nối (Verification)

Sau khi cấu hình trên máy trạm, hãy mở Terminal chạy thử nghiệm các lệnh `curl` dưới đây để xác nhận lưu lượng đi qua Proxy chính xác:

### 6.1. Kiểm tra Endpoint Google / Antigravity:
```bash
curl -i -X POST http://192.168.1.183:8000/google/v1internal:streamGenerateCode \
  -H "Content-Type: application/json" \
  -d '{"model": "gemini-default", "prompt": "Xin chào"}'
```
*Kết quả kỳ vọng*: Nhận mã HTTP `200 OK` hoặc phản hồi từ Google Cloud, không xuất hiện lỗi kết nối mạng.

### 6.2. Kiểm tra Endpoint Anthropic / Claude:
```bash
curl -i -X POST http://192.168.1.183:8000/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-key" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model": "claude-3-5-haiku-20241022", "messages": [{"role": "user", "content": "Ping"}], "max_tokens": 10}'
```

### 6.3. Kiểm tra Endpoint OpenAI / Codex:
```bash
curl -i -X POST http://192.168.1.183:8000/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-key" \
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Ping"}]}'
```

### 6.4. Kiểm tra Endpoint MCP qua SSE:
```bash
curl -i -N http://192.168.1.183:8000/mcp/lan-tools/sse
```
*Kết quả kỳ vọng*: Nhận event `endpoint` chứa URL gửi nhận messages:
```
event: endpoint
data: /mcp/lan-tools/messages?sessionId=...
```

### 6.5. Xác minh trên Dashboard Web:
1. Mở trình duyệt truy cập:
   ```
   http://192.168.1.183:8000/dashboard
   ```
2. Tại tab **Giám Sát & Logs Realtime**:
   - Bạn sẽ nhìn thấy ngay địa chỉ **IP máy bạn** và **MAC Address vật lý** của máy trạm.
   - Bảng **Nhật Ký Audit Chi Tiết** sẽ hiển thị request LLM hoặc lệnh gọi tool MCP với số lượng **Token In / Token Out** được bóc tách tức thời.

---

## ⚠️ 7. Bảng Mã Lỗi Phản Hồi Từ Proxy & Hướng Xử Lý

Khi máy tính vi phạm chính sách trong [`policy_matrix.yaml`](file:///work/a.i-assistant-chatbot-telegram-serverles/a.i-llm-proxy-monitoring/policy_matrix.yaml), Proxy sẽ chủ động phản hồi các mã lỗi HTTP hoặc JSON-RPC chuẩn:

| Mã Lỗi HTTP / RPC | Thông Báo Lỗi | Nguyên Nhân & Cách Khắc Phục |
| :--- | :--- | :--- |
| **`403 Forbidden`** | `Provider '...' is not permitted for your workstation` | Máy tính của bạn không được phép sử dụng hãng AI này (ví dụ chính sách chỉ cho dùng Google nhưng gọi OpenAI). Liên hệ Admin để được cấp quyền mở provider. |
| **`403 Forbidden`** | `Model '...' is forbidden for this PC. Allowed: [...]` | Model đang gọi (ví dụ `claude-3-5-sonnet`) không thuộc danh sách model được duyệt cho máy trạm của bạn. Chuyển sang model tiết kiệm chi phí như `gemini-1.5-flash`, `gpt-4o-mini`. |
| **`403 Forbidden`** | `Máy trạm '...' đã BỊ CHẶN quyền sử dụng LLM Proxy Gateway` | Địa chỉ IP hoặc MAC của máy trạm bạn đã bị khóa quyền truy cập bởi Quản trị viên (`BLOCKED_PC_ACCESS`). Liên hệ Admin để mở khóa trên Dashboard. |
| **`RPC -32003`** | `MCP Tool '...' is forbidden for this workstation` | Công cụ MCP bạn vừa gọi bị chặn bởi ma trận phân quyền (ví dụ chỉ cho phép gọi `lan_ping`, cấm các lệnh xóa DB hoặc chạy bash). Liên hệ Admin nếu cần mở quyền tool. |
| **`400 Bad Request`** | `Input tokens (...) exceed maximum allowed limit (...)` | Đoạn code hoặc context đưa vào prompt quá dài vượt quá giới hạn cấu hình một request. Hãy chia nhỏ prompt hoặc xóa bớt lịch sử chat. |
| **`429 Too Many Requests`** | `Daily token quota exceeded (... tokens used today)` | Máy trạm của bạn đã tiêu thụ hết hạn mức Token trong ngày được giao. Hạn mức sẽ tự động reset lúc `00:00` hàng ngày, hoặc đề xuất Admin nâng hạn mức trên Dashboard. |
| **`502 Bad Gateway`** | `Upstream connection error: ...` | Proxy không kết nối được tới server Cloud của hãng AI hoặc upstream MCP server nội bộ. |

---

## 🧦 8. Hướng Dẫn Cấu Hình Proxy SOCKS5 (Cổng 1080)

Ngoài phương thức Reverse Proxy qua Base URL (HTTP cổng `8000`), hệ thống Gateway tích hợp sẵn **SOCKS5 Proxy Server (RFC 1928)** chạy trên cổng `1080` phục vụ các IDE, CLI hoặc ứng dụng mạng LAN chỉ hỗ trợ giao thức SOCKS5.

### 8.1. Thông số kết nối SOCKS5:
- **Host**: `192.168.1.183` *(thay bằng IP thực tế của máy chủ Proxy LAN)*
- **Port**: `1080`
- **Xác thực**: Không yêu cầu mật khẩu (hệ thống tự động nhận diện và phân quyền theo IP LAN & MAC Address vật lý).

### 8.2. Cấu hình bằng Biến Môi Trường (Terminal / Shell):
- **Linux / macOS**:
  ```bash
  export ALL_PROXY="socks5h://192.168.1.183:1080"
  export HTTPS_PROXY="socks5h://192.168.1.183:1080"
  ```
  > 💡 **Khuyến nghị**: Dùng tiền tố `socks5h://` để DNS được phân giải tại máy chủ Proxy, giúp hệ thống ghi nhận chính xác domain đích và kiểm tra Domain Policy.

- **Windows (PowerShell)**:
  ```powershell
  $env:ALL_PROXY = "socks5h://192.168.1.183:1080"
  $env:HTTPS_PROXY = "socks5h://192.168.1.183:1080"
  ```

### 8.3. Cấu hình trong VS Code / Cursor:
Trong file `settings.json` của VS Code / Cursor:
```json
{
  "http.proxy": "socks5h://192.168.1.183:1080",
  "http.proxySupport": "override"
}
```

### 8.4. Kiểm tra kết nối SOCKS5 với cURL:
```bash
curl -v -x socks5h://192.168.1.183:1080 https://api.openai.com
```
*Nếu thành công, Gateway sẽ ghi nhận log kết nối với provider `socks5` và mã hành động `ALLOWED` trên Dashboard.*

