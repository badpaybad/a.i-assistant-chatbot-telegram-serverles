
Cấu trúc để gửi request tạo issue jira

                curl --request POST \
                --url 'https://jira.omt.vn/rest/api/2/issue' \
                --header 'Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN' \
                --header 'Content-Type: application/json' \
                --data '{
                    "fields": {
                    "project": {
                        "key": "PROJ"
                    },
                    "summary": "Tiêu đề issue từ self-host",
                    "description": "Nội dung mô tả đơn giản ở đây.",
                    "issuetype": {
                        "name": "Task"
                    }
                    }
                }'