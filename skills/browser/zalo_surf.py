import asyncio
from playwright.async_api import async_playwright

import random
import os
import time


import queue

browserActionQueue= queue.Queue()
isStop=False
page=None
context=None

async def run_browser_agent():
    global browserActionQueue
    global isStop
    global page
    global context

    async with async_playwright() as p:
        # 1. Khởi chạy trình duyệt (headless=False để quan sát)
        # browser = await p.chromium.launch(headless=False)
        # context = await browser.new_context()
        # page = await context.new_page()
        # Playwright sẽ tự tìm Chrome trong các đường dẫn mặc định của Ubuntu

        # Lấy username để tạo đường dẫn chính xác
        user_home = os.path.expanduser("~")
        user_data_dir = f"{user_home}/.config/google-chrome/Default"
        print("user_data_dir",user_data_dir)

        # browser = await p.chromium.launch(channel="chrome", headless=False,
        # args=["--no-sandbox"])
        # page = await browser.new_page()

        context = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            channel="chrome",
            headless=False,
            args=["--no-sandbox"] # Cần thiết nếu chạy với quyền root hoặc môi trường đặc biệt
        )
        
        page = context.pages[0] # Persistent context tạo sẵn 1 page

        try:
            # 2. Đi tới trang Login
            print("Đang mở trang đăng nhập...")
            await page.goto("https://chat.zalo.me/")

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
            await asyncio.sleep(3)

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

                if browserActionQueue.empty():
                    await asyncio.sleep(1)
                    continue

                nextact= browserActionQueue.get()

                if not nextact:
                    await asyncio.sleep(1)
                    continue
                
                if asyncio.iscoroutinefunction(nextact):
                    await nextact(p)
                else :
                    nextact(p)


            await asyncio.sleep(1)
            print("Done")

        except Exception as e:
            print(f"Lỗi rồi: {e}")
        finally:
            # await browser.close()
            await context.close()
            pass

# vi du action queue, khi cần làm j đó với 1 page đã được mở lên, không tạo mới page ko sợ mất session         
async def open_group_omt_tbp(playwright_instance):

    print("click OMT-TBP")
    # page.locator("div:has-text('OMT-TBP')").click()
    await asyncio.gather(
        page.get_by_text("OMT-TBP").click()                
    )


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
    
    browserActionQueue.put(open_group_omt_tbp)

    await asyncio.gather( run_browser_agent())

asyncio.run(loop())