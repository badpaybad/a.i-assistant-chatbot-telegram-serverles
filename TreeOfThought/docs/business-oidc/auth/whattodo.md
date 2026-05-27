cần thì tham khảo TreeOfThought/docs/business-oidc/whattodo.md

**cập nhật 2026-05-27 21:21:21**

trên UI khi click Đồng bộ quyền. khi thành công cần load lại list, hiện tại đang bị lỗi loading mãi kiểm tra và xử lý

    curl 'http://localhost:5000/api/Auth/claims/sync' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Accept-Language: en-US,en;q=0.9,vi;q=0.8' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImRmOGY0NzdjLTFlZjEtNDZjYi04Y2U5LTEwNTAyZjRmZDI3MiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGZkM2RlNS04YjJjLTQ5ZDgtYjhhNi1lZmMxNmNiNWE2NjciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiQWRtaW5pc3RyYXRvciIsImp0aSI6ImU1MDJlNjA2LTQzZGUtNGJlMy04MDZjLTQ3ODU3NmEwN2FiOSIsImlhdCI6MTc3OTM1NDAzNiwidXNlcklkIjoiY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3IiwicGljdHVyZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kdW5wLXRlc3QtZ2NzL2F2YXRhcnMvY2RmZDNkZTUtOGIyYy00OWQ4LWI4YTYtZWZjMTZjYjVhNjY3XzYzOTE0NTk0ODQxNTI1NjI1MC5qcGciLCJyb2xlIjpbIkFkbWluIiwicHVibGljIl0sImNsYWltcyI6WyJiZS5hZG1pbiIsImZlLmNxcnM6ZGFzaGJvYXJkOnZpZXciXSwibmJmIjoxNzc5MzU0MDM2LCJleHAiOjE3NzkzNTc2MzYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6IlRyZWVPZlRob3VnaHQuRkUifQ.igUwiFPrUmhOyLak_YOEOvY_8rGQFwmn1cllc9mP2G0hDLXHLCp7fdarBGVp9P7kSEAgew5PFqHvZSpUlkcco4ibap_fa7XsSZYmA_5TuLDM2OtWvh45a0SoOeJd18QGt87FgbNwqrh7q9eRqp_iJKAvx8rtjpB158iqeDxEZAgMGyxuKCY8ejna4p1oEeKWPc-lNAjg53r_918MwlPgM0t3Ub5wJNE1zySApV5j3i-4gjDPDvgAwnsIbFSyTnpnZxrxuUSsXwvJknZZOHV4vsC3EkFqWQGoEDrpO2hANgZk8EKa_EoFEUJULrwakaTmzsOa7nHnghI59dLO5mzi6w' \
    -H 'Cache-Control: no-cache' \
    -H 'Connection: keep-alive' \
    -H 'Content-Type: application/json' \
    -b 'TOT_SSO_SESSION=CfDJ8KDUUcfP1nNFlF5gAObaJPCtI-RN23KZ9YadfJ0PuS8r98isQeV3T8TvWHAnaveG7ion4SKtUHS37PpSTqyz8I9oNagBT-HBIh4Y7E1za_d-rQ4z4GpDaphyPSuU9nQYOX8xpY11yikZZpa9WmLuULyie3Zd8yKDqG7QA3bUTaet3Q3BgowrLrIeCa4VSt1aOpwuoOStaKtk9OcPt55cOp9Y2I_hWjwx9GlVWUKXboWl89UtEwrh-Y7rSpeoT-BctOGZ680LlQUKXHsW6AdRReII_MK0Mer5vSO0PZCE0zekeK4RFxaKNcu5nWwnk_GB6lmc-g3oqEPpcwwVKTR30NxjsJ9cOP1HbYxcByS85QtgFMusA23a79ePjTRKzlK0yISJ5SnZ3Dd1ZhVHOrLqHPw' \
    -H 'Origin: http://localhost:5000' \
    -H 'Pragma: no-cache' \
    -H 'Referer: http://localhost:5000/admin/modules/core-infra-auth/claims' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Site: same-origin' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
    -H 'X-Tracking-Id: 006e8340-11a9-4d64-8aeb-a129e8f370ac' \
    -H 'sec-ch-ua: "Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "Linux"' \
    --data-raw '{"version":"1.3.0","claims":["fe.cqrs:dashboard:view","fe.cqrs:dashboard:manage_workers","fe.cqrs:dashboard:retry_messages","fe.test:view","fe.test:fire_commands","fe.auth:roles:view","fe.auth:roles:manage","fe.auth:claims:view","fe.auth:claims:manage","fe.auth:users:view","fe.auth:users:manage","fe.auth:acl:manage","fe.files_folders:view"]}'
