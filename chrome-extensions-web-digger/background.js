// background.js - Chrome Extension Service Worker

// Tự động mở Side Panel khi người dùng click vào biểu tượng Extension
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Lỗi cấu hình sidePanel:", error));

// Ghi log khi service worker khởi động thành công để hỗ trợ debug
chrome.runtime.onInstalled.addListener(() => {
  console.log("Gemini Web Digger Extension đã cài đặt thành công!");
});
