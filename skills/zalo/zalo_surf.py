import sys
import os
# Thêm thư mục gốc vào sys.path để có thể import các module bot_telegram, config
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

import asyncio
from playwright.async_api import async_playwright

import random
import os
import time
import base64
import requests
import bot_telegram
import queue


from config import TELEGRAM_OWNER_USERID,TELEGRAM_BOT_GROUP_CHATID,HISTORY_CHAT_MAX_LEN,TELEGRAM_BOT_TOKEN, TELEGRAM_API_URL, PORT, TELEGRAM_BOT_CHATID, TELEGRAM_BOT_USERNAME, GEMINI_APIKEY,GEMINI_MODEL, DISCORD_PUBKEY, DISCORD_APPID, DISCORD_TOKEN,  TELEGRAM_API_ID, TELEGRAM_API_HASH, REPLY_ON_TAG_BOT_USERNAME

import bot_telegram

"""_summary_
các action queue vào sẽ thực hiện lần lượt, vd nếu có while true ở action trước thì đến sau sẽ đợi xong phía trước break while 
"""
browserActionBlockQueue= queue.Queue()
isStop=False
page=None
context=None
playwright_instance=None

async def run_browser_agent():
    global browserActionBlockQueue
    global isStop
    global page
    global context
    global playwright_instance

    async with async_playwright() as p:
        playwright_instance=p
        # 1. Khởi chạy trình duyệt (headless=False để quan sát)
        # browser = await p.chromium.launch(headless=False)
        # context = await browser.new_context()
        # page = await context.new_page()
        # Playwright sẽ tự tìm Chrome trong các đường dẫn mặc định của Ubuntu

        # Lấy username để tạo đường dẫn chính xác
        user_home = os.path.expanduser("~")
        user_data_dir = f"{user_home}/.config/google-chrome/Zalo"
        print("user_data_dir",user_data_dir)

        # browser = await p.chromium.launch(channel="chrome", headless=False,
        # args=["--no-sandbox"])
        # page = await browser.new_page()

        context = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            channel="chrome",
            # headless=True, # chạy ngầm
            headless=False, # xem được thao tác 
            args=["--no-sandbox"] # Cần thiết nếu chạy với quyền root hoặc môi trường đặc biệt
        )
        
        page = context.pages[0] # Persistent context tạo sẵn 1 page

        try:
            # 2. Đi tới trang Login

            # 3. Nhập liệu (Playwright tự đợi selector này xuất hiện)
            # await page.fill('input[id="inputA"]', f"{random.randint(0, 1000) }")
            # await page.fill('input[id="inputB"]', f"{random.randint(0, 1000) }")

            # 4. Click Submit và đợi chuyển hướng (Redirect)
            # print("Đang nhấn đăng nhập và đợi chuyển hướng...")
            # # Playwright có cơ chế thông minh: nhấn và đợi URL thay đổi
            # await asyncio.gather(
                # page.click('#checkBtn'),
            #     #page.wait_for_url("**/dashboard", timeout=10000) # Đợi tới khi URL chứa chữ 'dashboard'
            # )

            # # 5. Đợi nội dung ở trang mới load xong
            # print(f"Đã tới trang: {page.url}")
            # await page.wait_for_selector(".balance-amount") 

            # # 6. Lấy dữ liệu (Scraping)
            # balance = await page.inner_text(".balance-amount")
            # print(f"Dữ liệu lấy được: {balance}")

            # # Lấy cấu trúc trang web dưới dạng đơn giản nhất để AI đọc
            # snapshot = await page.accessibility.snapshot()
            # print(snapshot)

            # 7. Chụp ảnh làm bằng chứng cho AI Agent
            # await page.screenshot(path="dashboard_result.png")

            while not isStop:

                if browserActionBlockQueue.empty():
                    await asyncio.sleep(1)
                    continue

                nextact= browserActionBlockQueue.get()

                if not nextact:
                    await asyncio.sleep(1)
                    continue
                
                if asyncio.iscoroutinefunction(nextact):
                    await nextact()
                else :
                    nextact()


            await asyncio.sleep(1)
            print("Done")

        except Exception as e:
            print(f"Lỗi rồi: {e}")
        finally:
            # await browser.close()
            await context.close()
            pass
async def open_zalo_web():

    print("Đang mở trang đăng nhập...")
    await page.goto("https://chat.zalo.me/")
    await page.wait_for_load_state("networkidle")
    await asyncio.sleep(3)
    pass


async def download_qr_code():
    await page.wait_for_load_state("networkidle")
    file_name="zalo_qr.png"
    # 1. Tìm selector: tìm img bên trong class .qr-container
    qr_selector = ".qr-container img"
    
    try:
        # Đợi QR xuất hiện
        # await page.wait_for_selector(qr_selector, timeout=10000)
        
        # 2. Lấy thuộc tính src của thẻ img
        qr_src = await page.locator(qr_selector).get_attribute("src")
                
        if not qr_src:
            print("Không tìm thấy thuộc tính src của QR")

            try:
                await page.get_by_text("Đã hiểu").click(force=True)    
                print(f"Click nút Đã hiểu") 

                await asyncio.sleep(3)
            except Exception as e:
                print(f"Không tìm thấy nút Đã hiểu")
            
            qr_src = await page.locator(qr_selector).get_attribute("src", timeout=10000)    
            if not qr_src:
                print("Không tìm thấy thuộc tính src của QR")
            return None

        # 3. Xử lý nếu là Base64 (Zalo thường dùng cái này cho QR)
        if "base64," in qr_src:
            header, encoded = qr_src.split(",", 1)
            data = base64.b64decode(encoded)
            with open(file_name, "wb") as f:
                f.write(data)
            print(f"Đã lưu QR từ Base64: {file_name}")
            
        # 4. Xử lý nếu là URL thông thường
        else:
            response = requests.get(qr_src)
            if response.status_code == 200:
                with open(file_name, "wb") as f:
                    f.write(response.content)
                print(f"Đã tải QR từ URL: {file_name}")

        return file_name
    except Exception as e:
        print(f"Lỗi khi tải QR: {e}")

        return None

async def sync_zalo_chats_groups():
    await page.wait_for_load_state("networkidle")
    await asyncio.sleep(3)
    try:
        # z--btn--v2 btn-primary small sync-v2-ok suggestNewSync --rounded sync-v2-ok suggestNewSync
        # await page.locator(".suggestNewSync.btn-primary", timeout=10000).click(force=True)

        # Đợi cho tới khi DOM của trang mới thực sự sẵn sàng
        await page.wait_for_selector(".sync-v2-banner.suggestNewSync", state="attached", timeout=10000)
        await page.locator(".sync-v2-banner.suggestNewSync").click(force=True)

    except Exception as e:
        print(f"Không tìm thấy nút Đồng bộ ngay .suggestNewSync.btn-primary")
    try:
        # tds-conversation__footer-content-sync-button
        await page.locator(".tds-conversation__footer-content-sync-button", timeout=10000).click(force=True)
    except Exception as e:
        print(f"Không tìm thấy nút Đồng bộ ngay .tds-conversation__footer-content-sync-button")

    try:
        await page.get_by_text("Nhấn để đồng bộ ngay", timeout=10000).click(force=True)    
        print(f"Click nút Nhấn để đồng bộ ngay") 

        await asyncio.sleep(3)
    except Exception as e:
        print(f"Không tìm thấy nút Nhấn để đồng bộ ngay")
    try:
        await page.get_by_text("Đồng bộ ngay", timeout=10000).click(force=True)    
        print(f"Click nút Đồng bộ ngay") 

        await asyncio.sleep(3)
    except Exception as e:
        print(f"Không tìm thấy nút Đồng bộ ngay")

    try:
        #sync-message-popup
            
        qr_selector = ".sync-message-popup"
        while not isStop:
            try:
                found=await page.wait_for_selector(qr_selector, timeout=10000)
                if found:
                    print("Đang đồng bộ")
                    await asyncio.sleep(10)

                    print("Vẫn đang hiện .sync-message-popup")
                    await bot_telegram.send_telegram_message(TELEGRAM_OWNER_USERID,f"Vẫn đang hiện .sync-message-popup, bạn mở zalo để đồng ý đồng bộ")
                    await asyncio.sleep(10)
            except Exception as ex:

                print("Không có .sync-message-popup -> đã đồng bộ")
                print(ex)
                break 
                
                pass
    except:
        pass

async def check_zalo_qr_auth():
    await page.wait_for_load_state("networkidle")

    # https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F

    # qr_file=await download_qr_code()
    qr_file=None

    qr_selector = ".fa-Contact_28_Line"
    while not isStop:
        try:
            found=await page.wait_for_selector(qr_selector, timeout=10000)
            if found:
                print("QR code đã ẩn, đã vào trang chat")

                return 
            else:
                print(f"Redownload QR để check qr_selector: {qr_selector}")
                if not qr_file:
                    qr_file=await download_qr_code()
                    print("Redownload QR")
                else:
                    print("QR code download xong, cần đăng nhập bằng điện thoại để vào trang chat")
                    await bot_telegram.send_telegram_message(TELEGRAM_OWNER_USERID,f"QR code download xong, cần đăng nhập bằng điện thoại để vào trang chat", 
                    files=[qr_file])
                    await asyncio.sleep(5)      
                    
            await asyncio.sleep(3)               
        except Exception as ex:
            print(f"check_zalo_qr_auth Lỗi khi check QR: {ex}")
            # case timeout dom selector

            print(f"Redownload QR để check qr_selector: {qr_selector}")
            if not qr_file:
                qr_file=await download_qr_code()
                print("Redownload QR")
            else:
                print("QR code download xong, cần đăng nhập bằng điện thoại để vào trang chat")
                await bot_telegram.send_telegram_message(TELEGRAM_OWNER_USERID,f"QR code download xong, cần đăng nhập bằng điện thoại để vào trang chat", 
                files=[qr_file])
                await asyncio.sleep(5) 

            await asyncio.sleep(3)
       
        pass

#qr-container

    pass
# vi du action queue, khi cần làm j đó với 1 page đã được mở lên, không tạo mới page ko sợ mất session         
async def open_zalo_group_omt_tbp():
    await page.wait_for_load_state("networkidle")

    print("click OMT-TBP")

    # page.locator("div:has-text('OMT-TBP')").click()
   
    await page.get_by_text("OMT-TBP").click(force=True, timeout=10000)

    # await page.wait_for(state="visible", timeout=10000)
    # await page.click(force=True)   

    text = await page.locator("div#messageViewContainer").text_content()

    # text = page.get_by_test_id("messageViewContainer").inner_text()
    # msg=await page.inner_text("messageViewContainer")
    print("messageViewContainer",text)

    chat_items = page.locator("div#messageViewContainer div.chat-item")
    # Lấy số lượng tìm thấy
    count = await chat_items.count()
    print(f"Tìm thấy {count} tin nhắn.")

    # Lặp qua từng cái
    for i in range(count):
        item = chat_items.nth(i)
        print(f"Nội dung item {i}: {await item.inner_text()}")

    all_texts = await page.locator("div#messageViewContainer div.chat-item").all_inner_texts()
    # Kết quả trả về là một mảng: ['Tin nhắn 1', 'Tin nhắn 2', ...]
    print("all_texts",all_texts)
    pass
async def loop():
    global isStop
    
    browserActionBlockQueue.put(open_zalo_web)
    browserActionBlockQueue.put(check_zalo_qr_auth)
    browserActionBlockQueue.put(sync_zalo_chats_groups)

    browserActionBlockQueue.put(open_zalo_group_omt_tbp)

    await asyncio.gather( run_browser_agent())

asyncio.run(loop())