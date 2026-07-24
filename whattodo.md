program.py đang dùng cloudflare tunnel để có https public subdomain cho việc làm telegram web hook. cần thêm option để chạy gemma4 local 
mặc định chạy config_dunp và gemma4 local (gemma4/program.py port 8000) 
khi là gemma4 local thi cần start api gemma4 local port 8000 lên để dùng
dùng api gemma4 local thay cho gemini api 
    cần viết xử lý gọi api gemma4 ở gemma4_process_chat_history_and_current_msg 
        cho phép lưu 20 message gần nhất kèm kể cả đường link, audio, image, text chat, reply, quote...
        system prompt là một trợ lý đa năng hỗ trợ việc đọc converation với 20 message gần nhất, có thể cần đọc nội dung đường link, đọc ảnh, đọc audio để hiểu điều cần nói
        khi có câu trả lời có thể gửi lại message cho người dùng (await bot_telegram.send_telegram_message)
            chỉ reply nếu được tag tên hoặc được đề cập tên trong message hiện tại 
                hoặc người dùng chat private 1-1 với chatbot 
            bot_telegram.send_telegram_message cần nâng cấp hàm để nếu cần reply text nếu cần ảnh đính kèm, audio
            nếu có thể hiểu được cần tag cụ thể cho người đã mention thì cần phải có hàm để trả lời đúng cho người cần trả lời 

khi tiến trình program.py tắt thì cần kill cả tiến trình gemma4, có thể dùng các lệnh dạng fuser -k 8000/tcp và fuser -k {PORT}/tcp 

                
        