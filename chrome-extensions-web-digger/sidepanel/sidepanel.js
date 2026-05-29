// sidepanel.js - Logic điều khiển Trợ lý AI Gemini (Web Digger) - v2.1 Cancel + Tab Guard

// === ĐỊNH NGHĨA CÁC BIẾN & PHẦN Tử UI ===
const configPanel = document.getElementById('config-panel');
const toggleConfigBtn = document.getElementById('toggle-config-btn');
const apiKeyInput = document.getElementById('api-key-input');
const togglePasswordBtn = document.getElementById('toggle-password-btn');
const modelSelect = document.getElementById('model-select');
const customModelInput = document.getElementById('custom-model-input');
const saveConfigBtn = document.getElementById('save-config-btn');
const saveStatus = document.getElementById('save-status');
const maxMessagesInput = document.getElementById('max-messages-input');

const chatHistory = document.getElementById('chat-history');
const welcomeBox = document.getElementById('welcome-box');
const apiStatusWarning = document.getElementById('api-status-warning');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const clearChatBtn = document.getElementById('clear-chat-btn');
const stopBtn = document.getElementById('stop-btn');
const cancelBtn = document.getElementById('cancel-btn');

const actionStatusPill = document.getElementById('action-status-pill');
const actionStatusText = document.getElementById('action-status-text');

const tabWarningBanner = document.getElementById('tab-warning-banner');
const tabWarningDetail = document.getElementById('tab-warning-detail');
const tabSwitchBtn = document.getElementById('tab-switch-btn');
const tabDismissBtn = document.getElementById('tab-dismiss-btn');

// Danh sách lưu trữ hội thoại trong phiên làm việc hiện tại
let conversationMessages = [];

// Giới hạn số lượng tin nhắn hội thoại được lưu (mặc định là 100)
let maxMessagesLimit = 100;

// === CANCEL & ABORT STATE ===
let currentAbortController = null; // AbortController cho fetch hiện tại
let isProcessing = false;           // Cờ trạng thái đang xử lý
let conversationTabId = null;       // Tab ID gắn với cuộc hội thoại
let tabChangeWarningTabId = null;   // Tab mới user đã chuyển sang

// === 1. QUẢN LÝ CẤU HÌNH & THIẾT LẬP (SETTINGS) ===

toggleConfigBtn.addEventListener('click', () => {
  const isCollapsed = configPanel.classList.contains('collapsed');
  if (isCollapsed) {
    configPanel.classList.remove('collapsed');
    toggleConfigBtn.textContent = '▲ Thu gọn';
  } else {
    configPanel.classList.add('collapsed');
    toggleConfigBtn.textContent = '⚙️ Cấu hình';
  }
});

togglePasswordBtn.addEventListener('click', () => {
  const isPassword = apiKeyInput.type === 'password';
  apiKeyInput.type = isPassword ? 'text' : 'password';
  togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
});

modelSelect.addEventListener('change', () => {
  if (modelSelect.value === 'custom') {
    customModelInput.classList.remove('hidden');
  } else {
    customModelInput.classList.add('hidden');
  }
});

saveConfigBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  const selectedModel = modelSelect.value;
  let modelName = selectedModel;
  
  if (selectedModel === 'custom') {
    modelName = customModelInput.value.trim();
  }
  
  let maxMessages = parseInt(maxMessagesInput.value, 10);
  if (isNaN(maxMessages) || maxMessages < 10) {
    maxMessages = 100;
  }
  
  if (!apiKey) {
    showNotification('Vui lòng điền Gemini API Key!', 'error');
    return;
  }
  
  if (!modelName) {
    showNotification('Vui lòng nhập tên mô hình tùy biến!', 'error');
    return;
  }

  saveConfigBtn.disabled = true;
  saveConfigBtn.textContent = 'Đang lưu...';

  try {
    await chrome.storage.local.set({ apiKey, selectedModel, modelName, maxMessages });
    maxMessagesLimit = maxMessages;
    updateMessageCount();
    
    saveStatus.classList.remove('hidden');
    saveStatus.textContent = 'Đã lưu cấu hình!';
    saveStatus.style.color = 'var(--success-text)';
    
    chatInput.disabled = false;
    sendChatBtn.disabled = false;
    apiStatusWarning.classList.add('hidden');
    
    setTimeout(() => {
      saveStatus.classList.add('hidden');
      configPanel.classList.add('collapsed');
      toggleConfigBtn.textContent = '⚙️ Cấu hình';
    }, 1500);
  } catch (error) {
    console.error('Lỗi khi lưu cấu hình:', error);
    saveStatus.classList.remove('hidden');
    saveStatus.textContent = 'Lỗi lưu trữ!';
    saveStatus.style.color = 'var(--error-text)';
  } finally {
    saveConfigBtn.disabled = false;
    saveConfigBtn.textContent = 'Lưu & Khởi tạo';
  }
});

function updateMessageCount() {
  const charCountEl = document.getElementById('char-count');
  if (charCountEl) {
    charCountEl.textContent = `Đã lưu ${conversationMessages.length}/${maxMessagesLimit} tin nhắn`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const settings = await chrome.storage.local.get(['apiKey', 'selectedModel', 'modelName', 'maxMessages', 'chatHistory']);
    
    if (settings.apiKey) {
      apiKeyInput.value = settings.apiKey;
      chatInput.disabled = false;
      sendChatBtn.disabled = false;
      apiStatusWarning.classList.add('hidden');
    }
    
    if (settings.selectedModel) {
      modelSelect.value = settings.selectedModel;
      if (settings.selectedModel === 'custom') {
        customModelInput.classList.remove('hidden');
        customModelInput.value = settings.modelName || '';
      }
    }
    
    if (settings.maxMessages) {
      maxMessagesLimit = parseInt(settings.maxMessages, 10);
      maxMessagesInput.value = settings.maxMessages;
    }
    
    if (settings.chatHistory && Array.isArray(settings.chatHistory) && settings.chatHistory.length > 0) {
      conversationMessages = settings.chatHistory;
      welcomeBox.classList.add('hidden');
      conversationMessages.forEach(msg => {
        if (msg.role === 'user') {
          appendMessageToUI('user', msg.parts[0].text);
        } else if (msg.role === 'model') {
          appendMessageToUI('bot', msg.parts[0].text);
        }
      });
      scrollToBottom();
    }
    updateMessageCount();

    // Khởi tạo conversationTabId cho active tab hiện tại để theo dõi chuyển đổi ngay từ đầu
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTab) {
        conversationTabId = activeTab.id;
      }
    } catch (e) {
      console.error('Lỗi khi lấy tab active ban đầu:', e);
    }
  } catch (error) {
    console.error('Lỗi khôi phục trạng thái:', error);
  }
});

// === 2. ĐIỀU KHIỂN KHUNG NHẬP LIỆU CHAT ===

chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = (chatInput.scrollHeight - 6) + 'px';
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

sendChatBtn.addEventListener('click', handleSendMessage);

// === CANCEL / STOP HANDLERS ===

function performCancel() {
  if (!isProcessing) return;
  // Abort fetch hiện tại
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
  isProcessing = false;
  hideStopBtn();
  hideActionStatus();
  appendStatusToUI('⛔ Đã hủy tiến trình. Bạn có thể tiếp tục nhắn tin nhắn mới.');
  scrollToBottom();
}

// Nút dừng trong input row
stopBtn.addEventListener('click', performCancel);

// Nút hủy trong action pill
cancelBtn.addEventListener('click', performCancel);

// === TAB CHANGE MONITORING ===

function showTabWarning(newTabId) {
  tabChangeWarningTabId = newTabId;
  if (tabWarningDetail) {
    tabWarningDetail.textContent = `Cuộc trò chuyện đang gắn với tab ${conversationTabId}. Mọi lệnh AI sẽ tác động lên tab đó.`;
  }
  tabWarningBanner.classList.remove('hidden');
}

function hideTabWarning() {
  tabWarningBanner.classList.add('hidden');
  tabChangeWarningTabId = null;
}

// Nút "Đóng cảnh báo"
tabDismissBtn.addEventListener('click', hideTabWarning);

// Nút "Chuyển lại tab cũ" - focus vào tab cũ và đóng cảnh báo
tabSwitchBtn.addEventListener('click', async () => {
  if (conversationTabId) {
    try {
      await chrome.tabs.update(conversationTabId, { active: true });
    } catch (e) {
      // Tab cũ có thể đã đóng
      showNotification('Tab gốc đã bị đóng hoặc không tìm thấy.', 'error');
    }
  }
  hideTabWarning();
});

// Lắng nghe sự kiện đổi tab trong cuộc trò chuyện đang diễn ra
chrome.tabs.onActivated.addListener(({ tabId }) => {
  // Chỉ cảnh báo khi đang xử lý và user chuyển sang tab khác
  if (conversationTabId && tabId !== conversationTabId) {
    showTabWarning(tabId);
  } else if (tabId === conversationTabId) {
    // User quay lại tab gốc → ẩn cảnh báo tự động
    hideTabWarning();
  }
});

// Cài đặt conversationTabId khi tab bị đóng
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === conversationTabId) {
    conversationTabId = null;
    hideTabWarning();
  }
});

// Helper: Hiển/ẩn stop button
function showStopBtn() {
  stopBtn.classList.remove('hidden');
  sendChatBtn.classList.add('hidden');
}

function hideStopBtn() {
  stopBtn.classList.add('hidden');
  sendChatBtn.classList.remove('hidden');
}

clearChatBtn.addEventListener('click', async () => {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện này không?')) {
    conversationMessages = [];
    await chrome.storage.local.remove('chatHistory');
    const messages = chatHistory.querySelectorAll('.message');
    messages.forEach(m => m.remove());
    welcomeBox.classList.remove('hidden');
    scrollToBottom();
    updateMessageCount();
    showNotification('Đã xóa sạch lịch sử chat!', 'success');
  }
});

async function handleSendMessage() {
  const promptText = chatInput.value.trim();
  if (!promptText || isProcessing) return;

  // Lấy active tab ID trước khi gử tin để track
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab) {
      conversationTabId = activeTab.id;
      hideTabWarning(); // Ẩn cảnh báo nếu user đang trên đúng tab
    }
  } catch (_) {}

  isProcessing = true;
  currentAbortController = new AbortController();

  chatInput.disabled = true;
  sendChatBtn.disabled = true;
  showStopBtn(); // Hiển nút dừng
  chatInput.value = '';
  chatInput.style.height = 'auto';
  welcomeBox.classList.add('hidden');
  appendMessageToUI('user', promptText);
  scrollToBottom();

  try {
    const reply = await chatWithGemini(promptText, conversationMessages, currentAbortController.signal);
    appendMessageToUI('bot', reply);
    
    conversationMessages.push({ role: 'user', parts: [{ text: promptText }] });
    conversationMessages.push({ role: 'model', parts: [{ text: reply }] });
    
    if (conversationMessages.length > maxMessagesLimit) {
      conversationMessages = conversationMessages.slice(-maxMessagesLimit);
    }
    
    await chrome.storage.local.set({ chatHistory: conversationMessages });
    updateMessageCount();
  } catch (error) {
    console.error('Lỗi hội thoại:', error);
    if (error.name === 'AbortError') {
      // Đã xử lý trong performCancel, không cần hiển lỗi
    } else {
      appendErrorToUI(error.message);
    }
  } finally {
    isProcessing = false;
    currentAbortController = null;
    chatInput.disabled = false;
    sendChatBtn.disabled = false;
    hideStopBtn(); // Ẩn nút dừng
    hideActionStatus();
    chatInput.focus();
    scrollToBottom();
  }
}

// === 3. CÁC HÀM TIỆN ÍCH HIỂN THỊ UI ===

function appendMessageToUI(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender === 'user' ? 'user' : 'bot'}`;

  const labelDiv = document.createElement('div');
  labelDiv.className = 'message-label';
  labelDiv.textContent = sender === 'user' ? 'Bạn' : 'Trợ lý Gemini';
  
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'message-bubble';
  bubbleDiv.innerHTML = formatMarkdown(text);
  
  messageDiv.appendChild(labelDiv);
  messageDiv.appendChild(bubbleDiv);
  chatHistory.appendChild(messageDiv);
}

function appendErrorToUI(errorMessage) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message error';
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'message-bubble';
  bubbleDiv.innerHTML = `❌ <strong>Lỗi hệ thống:</strong> ${escapeHtml(errorMessage)}`;
  messageDiv.appendChild(bubbleDiv);
  chatHistory.appendChild(messageDiv);
}

function appendStatusToUI(statusText) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message status';
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'message-bubble';
  bubbleDiv.innerHTML = `⚙️ <em>${escapeHtml(statusText)}</em>`;
  messageDiv.appendChild(bubbleDiv);
  chatHistory.appendChild(messageDiv);
  scrollToBottom();
}

function scrollToBottom() {
  setTimeout(() => {
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 50);
}

function showActionStatus(text) {
  actionStatusText.textContent = text;
  actionStatusPill.classList.remove('hidden');
}

function hideActionStatus() {
  actionStatusPill.classList.add('hidden');
}

function showNotification(text, type = 'success') {
  saveStatus.classList.remove('hidden');
  saveStatus.textContent = text;
  saveStatus.style.color = type === 'success' ? 'var(--success-text)' : 'var(--error-text)';
  setTimeout(() => { saveStatus.classList.add('hidden'); }, 3000);
}

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return String(unsafe || '');
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMarkdown(text) {
  let escaped = escapeHtml(text);
  // Bold
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  escaped = escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Code blocks
  escaped = escaped.replace(/```([\s\S]*?)```/g, (m, code) => `<pre><code>${code.trim()}</code></pre>`);
  // Inline code
  escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Numbered lists (1️⃣ or 1.)
  escaped = escaped.replace(/^(\d+[\.\)])\s/gm, '<br><strong>$1</strong> ');
  // Newlines
  escaped = escaped.replace(/\n/g, '<br>');
  return escaped;
}

function logActionToUI(text) {
  console.log(`[CDP Action] ${text}`);
  appendStatusToUI(text);
}

// === 4. CDP (CHROME DEVTOOLS PROTOCOL) CORE ENGINE ===

/**
 * Hàm lõi: attach debugger, chạy Runtime.evaluate, detach
 */
async function cdpEvaluate(tabId, codeString) {
  const target = { tabId };
  try {
    await chrome.debugger.attach(target, "1.3");
  } catch (e) {
    if (!e.message.includes("Already attached")) throw e;
  }
  try {
    const res = await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
      expression: codeString,
      returnByValue: true,
      awaitPromise: false
    });
    if (res.exceptionDetails) {
      const desc = res.exceptionDetails.exception?.description || res.exceptionDetails.text || "CDP Runtime Error";
      throw new Error(desc);
    }
    return res.result.value;
  } finally {
    try { await chrome.debugger.detach(target); } catch (_) {}
  }
}

/**
 * Hàm lõi: attach debugger, chạy lệnh CDP bất kỳ, detach
 */
async function cdpCommand(tabId, method, params = {}) {
  const target = { tabId };
  try {
    await chrome.debugger.attach(target, "1.3");
  } catch (e) {
    if (!e.message.includes("Already attached")) throw e;
  }
  try {
    return await chrome.debugger.sendCommand(target, method, params);
  } finally {
    try { await chrome.debugger.detach(target); } catch (_) {}
  }
}

/**
 * Hàm lõi: chạy nhiều lệnh CDP trong 1 lần attach (hiệu quả hơn)
 */
async function cdpSession(tabId, fn) {
  const target = { tabId };
  try {
    await chrome.debugger.attach(target, "1.3");
  } catch (e) {
    if (!e.message.includes("Already attached")) throw e;
  }
  try {
    return await fn(target);
  } finally {
    try { await chrome.debugger.detach(target); } catch (_) {}
  }
}

// === 5. CÁC TOOL TƯƠNG TÁC WEB (10 TOOLS - DEVELOPER EDITION) ===

// ---- NHÓM 1: NHẬN THỨC (PERCEPTION) ----

/** Tool 1: Đọc nội dung văn bản và URL trang web */
async function executeReadPageContent(tabId) {
  logActionToUI("📄 Đang đọc nội dung trang web...");
  try {
    const code = `(() => ({
      title: document.title,
      url: window.location.href,
      textContent: document.body.innerText.substring(0, 50000)
    }))()`;
    return await cdpEvaluate(tabId, code);
  } catch (e) {
    return { error: `Không thể đọc trang: ${e.message}` };
  }
}

/** Tool 2: Đọc cấu trúc DOM tổng quan (headings, forms, sections) */
async function executeGetPageStructure(tabId) {
  logActionToUI("🗂️ Đang phân tích cấu trúc DOM trang...");
  try {
    const code = `(() => {
      const info = { url: window.location.href, title: document.title, structure: [] };
      // Headings
      document.querySelectorAll('h1,h2,h3').forEach(h => {
        info.structure.push({ type: h.tagName, text: h.innerText.trim().substring(0,80) });
      });
      // Forms
      document.querySelectorAll('form').forEach((f, i) => {
        const inputs = f.querySelectorAll('input,textarea,select,button').length;
        info.structure.push({ type: 'FORM', id: f.id || 'form-' + i, action: f.action || '', inputs });
      });
      // Nav links
      const navLinks = [];
      document.querySelectorAll('nav a').forEach(a => {
        if (navLinks.length < 10) navLinks.push({ text: a.innerText.trim().substring(0,40), href: a.href });
      });
      info.navLinks = navLinks;
      // Main content area
      const main = document.querySelector('main, [role="main"], #main, #content, .content');
      if (main) info.mainArea = { tag: main.tagName, id: main.id, classes: main.className.substring(0,50) };
      return info;
    })()`;
    return await cdpEvaluate(tabId, code);
  } catch (e) {
    return { error: `Lỗi phân tích cấu trúc: ${e.message}` };
  }
}

/** Tool 3: Chụp ảnh màn hình trang web */
async function executeTakeScreenshot(tabId) {
  logActionToUI("📸 Đang chụp ảnh màn hình trang web...");
  try {
    const result = await cdpCommand(tabId, "Page.captureScreenshot", {
      format: "jpeg",
      quality: 55
    });
    return { success: true, base64: result.data };
  } catch (e) {
    return { success: false, error: `Lỗi chụp ảnh: ${e.message}` };
  }
}

// ---- NHÓM 2: TÌM KIẾM THÔNG MINH (SMART FINDING) ----

/** Tool 4: Tìm element theo nội dung text (có disambiguation) */
async function executeFindElementsByText(tabId, text, elementType = 'any') {
  logActionToUI(`🔍 Đang tìm kiếm element với text: "${text}"...`);
  // Guard: nếu text rỗng thì không tìm vô nghĩa
  if (!text || String(text).trim() === '') {
    return { error: 'Không thể tìm kiếm với text rỗng. Hãy dùng find_interactive_elements để liệt kê tất cả element.' };
  }
  try {
    const code = `(() => {
      const needle = ${JSON.stringify(String(text || '').toLowerCase().trim())};
      const typeFilter = ${JSON.stringify(elementType || 'any')};
      // Bao gồm contenteditable cho messaging apps (Messenger, Zalo, Teams...)
      const selector = typeFilter === 'any'
        ? 'a, button, input, label, h1, h2, h3, h4, span, div, p, li, td, th, [role="button"], [role="link"], [role="menuitem"], [contenteditable]'
        : typeFilter;
      const results = [];
      document.querySelectorAll(selector).forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;
        const texts = [
          el.innerText || '',
          el.value || '',
          el.placeholder || '',
          el.getAttribute('aria-label') || '',
          el.getAttribute('title') || '',
          el.getAttribute('alt') || '',
          // Quan trọng: data-placeholder và aria-placeholder cho contenteditable (Messenger, Zalo)
          el.getAttribute('data-placeholder') || '',
          el.getAttribute('aria-placeholder') || '',
          el.getAttribute('data-lexical-editor') ? 'contenteditable editor' : ''
        ].join(' ').toLowerCase();
        if (!texts.includes(needle)) return;
        let sel = '';
        if (el.id) sel = '#' + el.id;
        else if (el.getAttribute('data-testid')) sel = '[data-testid="' + el.getAttribute('data-testid') + '"]';
        else if (el.name) sel = el.tagName.toLowerCase() + '[name="' + el.name + '"]';
        else if (el.getAttribute('aria-label')) sel = '[aria-label="' + el.getAttribute('aria-label') + '"]';
        else {
          sel = el.tagName.toLowerCase();
          const classes = Array.from(el.classList).filter(c => !c.includes(':')).slice(0, 2).join('.');
          if (classes) sel += '.' + classes;
        }
        const parent = el.closest('form, section, nav, main, header, footer, article, aside') || el.parentElement;
        const parentCtx = parent ? (parent.tagName + (parent.id ? '#' + parent.id : '') + (parent.getAttribute('aria-label') ? '[' + parent.getAttribute('aria-label') + ']' : '')) : '';
        results.push({
          index: results.length + 1,
          tagName: el.tagName,
          text: (el.innerText || el.value || el.placeholder || '').trim().substring(0, 100),
          selector: sel,
          type: el.type || el.getAttribute('role') || '',
          context: parentCtx.substring(0, 60),
          position: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) }
        });
      });
      return results.slice(0, 10);
    })()`;
    const results = await cdpEvaluate(tabId, code);
    if (!results || results.length === 0) {
      return { found: 0, message: `Không tìm thấy element nào với text: "${text}"`, results: [] };
    }
    return { found: results.length, results, needsDisambiguation: results.length > 1 };
  } catch (e) {
    return { error: `Lỗi tìm kiếm: ${e.message}` };
  }
}

/** Tool 5: Liệt kê các element tương tác đang hiển thị */
async function executeFindInteractiveElements(tabId) {
  logActionToUI("🎯 Đang quét các phần tử tương tác trên trang...");
  try {
    const code = `(() => {
      const elements = [];
      // Bao gồm contenteditable (messaging apps) và các role phổ biến
      const queried = document.querySelectorAll('input:not([type="hidden"]), textarea, select, button, a[href], [role="button"], [role="tab"], [role="checkbox"], [role="radio"], [role="combobox"], [role="textbox"], [contenteditable="true"]');
      queried.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return;
        let sel = '';
        if (el.id) sel = '#' + el.id;
        else if (el.getAttribute('data-testid')) sel = '[data-testid="' + el.getAttribute('data-testid') + '"]';
        else if (el.name) sel = el.tagName.toLowerCase() + '[name="' + el.name + '"]';
        else if (el.getAttribute('aria-label')) sel = '[aria-label="' + el.getAttribute('aria-label') + '"]';
        else if (el.getAttribute('data-placeholder')) sel = '[data-placeholder="' + el.getAttribute('data-placeholder').substring(0,30).replace(/"/g,'\\"') + '"]';
        else if (el.placeholder) sel = el.tagName.toLowerCase() + '[placeholder="' + el.placeholder.substring(0,30).replace(/"/g,'\\"') + '"]';
        else {
          sel = el.tagName.toLowerCase();
          const classes = Array.from(el.classList).filter(c => !c.includes(':')).slice(0, 2).join('.');
          if (classes) sel += '.' + classes;
        }
        // Lấy placeholder của contenteditable từ nhiều nguồn
        const cePlaceholder = el.getAttribute('data-placeholder') || el.getAttribute('aria-placeholder') || el.getAttribute('aria-label') || '';
        elements.push({
          index: elements.length + 1,
          tagName: el.tagName,
          type: el.type || el.getAttribute('role') || (el.contentEditable === 'true' ? 'contenteditable' : ''),
          id: el.id || '',
          name: el.name || '',
          placeholder: el.placeholder || cePlaceholder,
          ariaLabel: el.getAttribute('aria-label') || '',
          dataPlaceholder: el.getAttribute('data-placeholder') || '',
          innerText: (el.innerText || '').trim().substring(0, 60),
          value: (el.value || '').substring(0, 30),
          selector: sel,
          isContentEditable: el.contentEditable === 'true',
          disabled: el.disabled || false
        });
      });
      return elements.slice(0, 50);
    })()`;
    const results = await cdpEvaluate(tabId, code);
    return { count: results ? results.length : 0, elements: results || [] };
  } catch (e) {
    return { error: `Lỗi quét element: ${e.message}` };
  }
}

/** Tool 6: Lấy chi tiết đầy đủ của 1 element cụ thể */
async function executeGetElementDetails(tabId, selector) {
  logActionToUI(`🔎 Đang lấy chi tiết element: "${selector}"...`);
  try {
    const code = `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return { found: false, selector: ${JSON.stringify(selector)} };
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const attrs = {};
      for (const attr of el.attributes) attrs[attr.name] = attr.value;
      return {
        found: true,
        tagName: el.tagName,
        id: el.id,
        name: el.name || '',
        type: el.type || '',
        value: el.value || '',
        innerText: (el.innerText || '').trim().substring(0, 200),
        placeholder: el.placeholder || '',
        ariaLabel: el.getAttribute('aria-label') || '',
        disabled: el.disabled,
        readOnly: el.readOnly || false,
        required: el.required || false,
        checked: el.checked !== undefined ? el.checked : undefined,
        attributes: attrs,
        position: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        visible: rect.width > 0 && rect.height > 0 && style.display !== 'none',
        parentHTML: el.parentElement ? el.parentElement.tagName + (el.parentElement.id ? '#' + el.parentElement.id : '') : ''
      };
    })()`;
    return await cdpEvaluate(tabId, code);
  } catch (e) {
    return { error: `Lỗi lấy chi tiết: ${e.message}` };
  }
}

// ---- NHÓM 3: HÀNH ĐỘNG CHÍNH XÁC (PRECISE ACTIONS) ----

/** Tool 7: Click element với CDP Mouse Events (realistic) */
async function executeSimulateClick(tabId, selector) {
  logActionToUI(`🖱️ Đang click vào: "${selector}"...`);
  try {
    // Bước 1: Scroll element vào view và lấy tọa độ
    const rectResult = await cdpEvaluate(tabId, `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return { found: false };
      el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
      const rect = el.getBoundingClientRect();
      return { found: true, x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    })()`);
    
    if (!rectResult || !rectResult.found) {
      return { success: false, error: `Không tìm thấy element: ${selector}` };
    }
    
    const { x, y } = rectResult;
    
    // Bước 2: Dispatch mouse events qua CDP trong 1 session
    return await cdpSession(tabId, async (target) => {
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mouseMoved", x, y, button: "none", modifiers: 0
      });
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mousePressed", x, y, button: "left", clickCount: 1, modifiers: 0
      });
      await new Promise(r => setTimeout(r, 50)); // Nhỏ delay để realistic
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mouseReleased", x, y, button: "left", clickCount: 1, modifiers: 0
      });
      return { success: true, clickedAt: { x: Math.round(x), y: Math.round(y) } };
    });
  } catch (e) {
    // Fallback: thử el.click() thông thường
    try {
      await cdpEvaluate(tabId, `document.querySelector(${JSON.stringify(selector)})?.click()`);
      return { success: true, method: 'fallback_click' };
    } catch (e2) {
      return { success: false, error: `Lỗi click: ${e.message}` };
    }
  }
}

/** Tool 8: Gõ chữ vào input bằng CDP Input.insertText (compatible với React/Vue/Angular/contenteditable) */
async function executeSimulateTyping(tabId, selector, text, clearFirst = true) {
  logActionToUI(`✍️ Đang gõ vào "${selector}": "${String(text).substring(0, 30)}"...`);
  try {
    // Toàn bộ thực hiện trong 1 CDP session để không mất focus
    return await cdpSession(tabId, async (target) => {
      // Bước 1: Kiểm tra element và xác định loại
      const elInfoRes = await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector(${JSON.stringify(selector)});
          if (!el) return { found: false };
          el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
          const rect = el.getBoundingClientRect();
          return {
            found: true,
            isContentEditable: el.contentEditable === 'true',
            tagName: el.tagName,
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };
        })()`,
        returnByValue: true
      });
      const elInfo = elInfoRes.result?.value;
      if (!elInfo || !elInfo.found) {
        return { success: false, error: `Không tìm thấy element: ${selector}` };
      }

      // Bước 2: Click để focus (dùng cả mouse event lẫn JS focus)
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mousePressed", x: elInfo.x, y: elInfo.y, button: "left", clickCount: 1
      });
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mouseReleased", x: elInfo.x, y: elInfo.y, button: "left", clickCount: 1
      });

      // Bước 3: Clear nội dung cũ nếu cần
      if (clearFirst) {
        await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
          expression: `(() => {
            const el = document.querySelector(${JSON.stringify(selector)});
            if (!el) return;
            if (el.contentEditable === 'true') {
              // Contenteditable: select all và delete
              el.focus();
              document.execCommand('selectAll', false, null);
              document.execCommand('delete', false, null);
            } else {
              // Input/textarea: native value setter cho React
              const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value') ||
                           Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
              if (desc && desc.set) desc.set.call(el, '');
              else el.value = '';
              el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          })()`,
          returnByValue: true
        });
      }

      // Bước 4: Gõ text qua CDP Input.insertText (kích hoạt đúng event handlers)
      await chrome.debugger.sendCommand(target, "Input.insertText", { text: String(text) });

      // Bước 5: Trigger change event sau khi gõ xong
      await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
        expression: `(() => {
          const el = document.querySelector(${JSON.stringify(selector)});
          if (el && el.contentEditable !== 'true') {
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        })()`,
        returnByValue: true
      });
      return { success: true, typed: String(text), isContentEditable: elInfo.isContentEditable };
    });
  } catch (e) {
    // Fallback cho input/textarea thông thường
    try {
      await cdpEvaluate(tabId, `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) throw new Error('Not found');
        el.value = ${JSON.stringify(String(text))};
        el.focus();
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      })()`);
      return { success: true, method: 'fallback_setValue', typed: String(text) };
    } catch (e2) {
      return { success: false, error: `Lỗi gõ chữ: ${e.message}` };
    }
  }
}

/** Tool BONUS: Gõ chữ vào element đang focused hiện tại (sau khi đã click thủ công) */
async function executeTypeInFocusedElement(tabId, text, clearFirst = true) {
  logActionToUI(`⌨️ Đang gõ vào element đang focused: "${String(text).substring(0, 30)}"...`);
  try {
    return await cdpSession(tabId, async (target) => {
      // Clear nếu cần
      if (clearFirst) {
        await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
          expression: `(() => {
            const el = document.activeElement;
            if (!el) return;
            if (el.contentEditable === 'true') {
              document.execCommand('selectAll', false, null);
              document.execCommand('delete', false, null);
            } else if (el.value !== undefined) {
              const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value') ||
                           Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
              if (desc && desc.set) desc.set.call(el, '');
              else el.value = '';
              el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          })()`,
          returnByValue: true
        });
      }
      // Gõ text vào focused element
      await chrome.debugger.sendCommand(target, "Input.insertText", { text: String(text) });
      // Lấy thông tin element đang focused để xác nhận
      const focusedRes = await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
        expression: `(() => {
          const el = document.activeElement;
          if (!el) return { focused: false };
          return {
            focused: true,
            tagName: el.tagName,
            id: el.id || '',
            type: el.type || el.contentEditable || '',
            currentValue: (el.value || el.innerText || '').substring(0, 50)
          };
        })()`,
        returnByValue: true
      });
      return { success: true, typed: String(text), focusedElement: focusedRes.result?.value };
    });
  } catch (e) {
    return { success: false, error: `Lỗi gõ vào focused element: ${e.message}` };
  }
}

/** Tool 9: Nhấn phím đặc biệt (Enter, Tab, Escape, Arrow keys...) */
async function executeSimulateKeyPress(tabId, key) {
  logActionToUI(`⌨️ Đang nhấn phím: "${key}"...`);
  const keyMap = {
    'Enter':     { code: 'Enter',     keyCode: 13, text: '\r' },
    'Tab':       { code: 'Tab',       keyCode: 9  },
    'Escape':    { code: 'Escape',    keyCode: 27 },
    'ArrowDown': { code: 'ArrowDown', keyCode: 40 },
    'ArrowUp':   { code: 'ArrowUp',   keyCode: 38 },
    'ArrowLeft': { code: 'ArrowLeft', keyCode: 37 },
    'ArrowRight':{ code: 'ArrowRight',keyCode: 39 },
    'Backspace': { code: 'Backspace', keyCode: 8  },
    'Delete':    { code: 'Delete',    keyCode: 46 },
    'Space':     { code: 'Space',     keyCode: 32, text: ' ' }
  };
  const ki = keyMap[key] || { code: key, keyCode: 0 };
  try {
    return await cdpSession(tabId, async (target) => {
      await chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", {
        type: "keyDown", key, code: ki.code, windowsVirtualKeyCode: ki.keyCode, nativeVirtualKeyCode: ki.keyCode
      });
      if (ki.text) {
        await chrome.debugger.sendCommand(target, "Input.insertText", { text: ki.text });
      }
      await chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", {
        type: "keyUp", key, code: ki.code, windowsVirtualKeyCode: ki.keyCode, nativeVirtualKeyCode: ki.keyCode
      });
      return { success: true, key };
    });
  } catch (e) {
    return { success: false, error: `Lỗi nhấn phím: ${e.message}` };
  }
}

/** Tool 10: Cuộn trang đến element được chỉ định */
async function executeScrollToElement(tabId, selector) {
  logActionToUI(`📜 Đang cuộn đến element: "${selector}"...`);
  try {
    const code = `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return { success: false, error: 'Element không tồn tại' };
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      const rect = el.getBoundingClientRect();
      return { success: true, position: { x: Math.round(rect.x), y: Math.round(rect.y) } };
    })()`;
    return await cdpEvaluate(tabId, code);
  } catch (e) {
    return { success: false, error: `Lỗi scroll: ${e.message}` };
  }
}

// === 6. VÒNG LẶP GEMINI API - DEVELOPER EDITION ===

async function chatWithGemini(userPrompt, history, abortSignal = null) {
  const settings = await chrome.storage.local.get(['apiKey', 'modelName']);
  const apiKey = settings.apiKey;
  const modelName = settings.modelName || 'gemini-2.5-flash';

  if (!apiKey) {
    throw new Error("Thiếu API Key! Vui lòng mở Cấu hình (⚙️) phía trên để nhập.");
  }

  // Khởi tạo contents từ lịch sử
  let contents = history.map(msg => ({
    role: msg.role,
    parts: msg.parts.map(p => ({ text: p.text }))
  }));

  contents.push({ role: "user", parts: [{ text: userPrompt }] });

  // System Instruction - Developer Mindset
  const systemInstruction = `Bạn là một lập trình viên web giỏi đang dùng Chrome DevTools (F12) để hiểu và tương tác với website theo yêu cầu của người dùng.

**Mindset Developer của bạn:**
1. INSPECT trước khi hành động: Dùng find_interactive_elements hoặc find_elements_by_text để khám phá trang trước khi thao tác mù quáng. KHÔNG tìm text rỗng.
2. KHI TÌM THẤY NHIỀU KẾT QUẢ → LUÔN hỏi người dùng chọn cái nào. Đừng tự đoán. Liệt kê rõ ràng từng option.
3. CHỌN ĐÚNG TOOL:
   - Tìm theo text/label → find_elements_by_text (KHÔNG dùng text rỗng)
   - Liệt kê form/inputs → find_interactive_elements
   - Xem chi tiết → get_element_details
   - Click → simulate_click
   - Gõ chữ với selector cụ thể → simulate_typing
   - Gõ chữ sau khi đã click/focus xong → type_in_focused_element (KHÔNG cần selector)
   - Phím Enter/Tab/Escape → simulate_key_press
   - Cuộn đến element → scroll_to_element
   - Nhìn giao diện → take_screenshot
4. **MESSAGING APPS (Messenger, Zalo, Teams, Slack):** Ô nhập tin nhắn thường là div[contenteditable]. Quy trình:
   a. Dùng find_interactive_elements → tìm entry có isContentEditable=true hoặc type='contenteditable'
   b. Dùng simulate_click với selector đó để focus
   c. Dùng type_in_focused_element để gõ (KHÔNG cần selector sau khi đã click)
   d. Dùng simulate_key_press("Enter") để gửi
5. SAU KHI ACTION: Xác nhận kết quả. Nếu thất bại: thử scroll rồi thử lại.
6. GIẢI THÍCH NGẮN GỌN từng bước. Trả lời tiếng Việt, thân thiện.`;

  const requestBody = {
    contents,
    systemInstruction: { parts: [{ text: systemInstruction }] },
    tools: [{
      functionDeclarations: [
        // --- NHÓM 1: NHẬN THỨC ---
        {
          name: "read_page_content",
          description: "Đọc tiêu đề, URL và toàn bộ nội dung văn bản hiển thị trên trang web hiện tại. Dùng khi cần tóm tắt, tìm thông tin, kiểm tra nội dung sau action."
        },
        {
          name: "get_page_structure",
          description: "Phân tích cấu trúc DOM tổng quan: headings, forms, navigation links, vùng nội dung chính. Dùng để hiểu layout trang trước khi thao tác."
        },
        {
          name: "take_screenshot",
          description: "Chụp ảnh màn hình trang web hiện tại. Dùng khi cần 'nhìn' giao diện để hiểu layout, xác nhận trạng thái trang sau action."
        },
        // --- NHÓM 2: TÌM KIẾM THÔNG MINH ---
        {
          name: "find_elements_by_text",
          description: "Tìm element theo nội dung chữ hiển thị, aria-label, hoặc placeholder. Trả về danh sách kèm selector để chọn. QUAN TRỌNG: Khi có nhiều kết quả (needsDisambiguation=true), hãy hỏi người dùng chọn cái nào.",
          parameters: {
            type: "OBJECT",
            properties: {
              text: { type: "STRING", description: "Chuỗi chữ muốn tìm (tìm partial match, không phân biệt hoa thường)" },
              elementType: { type: "STRING", description: "Lọc theo loại element: 'any' (mặc định), 'button', 'input', 'a', 'label'. Dùng 'any' nếu không chắc." }
            },
            required: ["text"]
          }
        },
        {
          name: "find_interactive_elements",
          description: "Quét và liệt kê tất cả các element tương tác đang visible trên trang (input, button, textarea, select, link, checkbox...) kèm CSS selector tối ưu. Dùng khi muốn khám phá form hoặc giao diện."
        },
        {
          name: "get_element_details",
          description: "Lấy thông tin chi tiết đầy đủ của 1 element theo CSS selector: tất cả attributes, vị trí, trạng thái (disabled, required, checked...). Dùng để xác nhận element trước khi thao tác.",
          parameters: {
            type: "OBJECT",
            properties: {
              selector: { type: "STRING", description: "CSS selector của element cần xem chi tiết (ví dụ: '#login-btn', 'input[name=\"email\"]')" }
            },
            required: ["selector"]
          }
        },
        // --- NHÓM 3: HÀNH ĐỘNG CHÍNH XÁC ---
        {
          name: "simulate_click",
          description: "Click chuột vào element bằng CDP Mouse Events (realistic, bypass các guard của JS frameworks). Ưu tiên dùng thay vì click() đơn giản.",
          parameters: {
            type: "OBJECT",
            properties: {
              selector: { type: "STRING", description: "CSS selector của element cần click (ví dụ: '#submit-btn', 'button[type=\"submit\"]')" }
            },
            required: ["selector"]
          }
        },
        {
          name: "simulate_typing",
          description: "Gõ văn bản vào ô input/textarea bằng CDP Input.insertText. PHẢI dùng cho các trang React/Vue/Angular để đảm bảo state được cập nhật đúng. Tự động clear nội dung cũ trước khi gõ.",
          parameters: {
            type: "OBJECT",
            properties: {
              selector: { type: "STRING", description: "CSS selector của ô input cần gõ (ví dụ: 'input[name=\"q\"]', '#search-input')" },
              text: { type: "STRING", description: "Văn bản cần gõ vào ô input" },
              clearFirst: { type: "BOOLEAN", description: "Có xóa nội dung cũ trước khi gõ không (mặc định: true)" }
            },
            required: ["selector", "text"]
          }
        },
        {
          name: "simulate_key_press",
          description: "Nhấn phím đặc biệt: Enter (submit form), Tab (chuyển field), Escape (đóng modal), ArrowDown/Up (chọn dropdown), Backspace, Delete, Space.",
          parameters: {
            type: "OBJECT",
            properties: {
              key: { type: "STRING", description: "Tên phím cần nhấn: 'Enter', 'Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Space'" }
            },
            required: ["key"]
          }
        },
        {
          name: "scroll_to_element",
          description: "Cuộn trang web đến vị trí của element. Dùng trước khi click hoặc gõ chữ nếu element nằm ngoài viewport.",
          parameters: {
            type: "OBJECT",
            properties: {
              selector: { type: "STRING", description: "CSS selector của element cần cuộn đến" }
            },
            required: ["selector"]
          }
        },
        {
          name: "type_in_focused_element",
          description: "Gõ văn bản vào element đang được focused (đang có con trỏ nhập liệu). Dùng SAU KHI đã dùng simulate_click để focus vào ô input/contenteditable. KHÔNG cần selector. Đặc biệt hữu ích cho ô chat của Messenger, Zalo, Teams (div contenteditable).",
          parameters: {
            type: "OBJECT",
            properties: {
              text: { type: "STRING", description: "Văn bản cần gõ vào ô đang focused" },
              clearFirst: { type: "BOOLEAN", description: "Có xóa nội dung cũ trước khi gõ không (mặc định: true)" }
            },
            required: ["text"]
          }
        }
      ]
    }],
    generationConfig: { temperature: 0.3 }
  };

  const MAX_TURNS = 20;
  let turns = 0;
  let pendingScreenshot = null;

  while (turns < MAX_TURNS) {
    turns++;
    showActionStatus(`🤖 Đang phân tích... (Bước ${turns}/${MAX_TURNS})`);

    // Nếu có screenshot pending từ turn trước, inject vào contents
    if (pendingScreenshot) {
      requestBody.contents.push({
        role: "user",
        parts: [
          { text: "Đây là ảnh chụp màn hình trang web hiện tại:" },
          { inline_data: { mime_type: "image/jpeg", data: pendingScreenshot } }
        ]
      });
      pendingScreenshot = null;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    
    // Timeout 60 giây cho mỗi lần gọi API
    const timeoutId = setTimeout(() => {
      if (currentAbortController) currentAbortController.abort();
    }, 60000);
    
    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: abortSignal  // AbortController signal để có thể hủy
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const errMsg = errJson.error?.message || response.statusText;
      throw new Error(`Gemini API Error [${response.status}]: ${errMsg}`);
    }

    const resJson = await response.json();
    if (!resJson.candidates || resJson.candidates.length === 0) {
      throw new Error("Không nhận được câu trả lời từ Gemini. Vui lòng thử lại.");
    }

    const candidate = resJson.candidates[0];
    
    // Kiểm tra finish reason
    if (candidate.finishReason === 'SAFETY') {
      throw new Error("Phản hồi bị chặn bởi bộ lọc an toàn của Gemini.");
    }

    const botContent = candidate.content;
    requestBody.contents.push(botContent);

    const parts = botContent.parts || [];
    const functionCalls = parts.filter(p => p.functionCall);

    // Có yêu cầu gọi Tool
    if (functionCalls.length > 0) {
      const toolResponseParts = [];

      for (const call of functionCalls) {
        const { name, args } = call.functionCall;
        
        // Cập nhật Action Pill
        const actionLabels = {
          read_page_content: "📄 Đang đọc nội dung trang...",
          get_page_structure: "🗂️ Đang phân tích cấu trúc trang...",
          take_screenshot: "📸 Đang chụp ảnh màn hình...",
          find_elements_by_text: `🔍 Đang tìm: "${args?.text}"...`,
          find_interactive_elements: "🎯 Đang quét element tương tác...",
          get_element_details: `🔎 Đang xem chi tiết: "${args?.selector}"...`,
          simulate_click: `🖱️ Đang click: "${args?.selector}"...`,
          simulate_typing: `✍️ Đang gõ vào: "${args?.selector}"...`,
          type_in_focused_element: `⌨️ Đang gõ vào focused element: "${String(args?.text || '').substring(0,20)}"...`,
          simulate_key_press: `⌨️ Đang nhấn phím: "${args?.key}"...`,
          scroll_to_element: `📜 Đang cuộn đến: "${args?.selector}"...`
        };
        showActionStatus(actionLabels[name] || `⚙️ Đang thực thi: ${name}...`);

        // Lấy active tab
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!activeTab) {
          throw new Error("Không tìm thấy tab đang hoạt động. Vui lòng mở một trang web.");
        }

        let resultData;
        try {
          switch (name) {
            case 'read_page_content':
              resultData = await executeReadPageContent(activeTab.id); break;
            case 'get_page_structure':
              resultData = await executeGetPageStructure(activeTab.id); break;
            case 'take_screenshot':
              const ssResult = await executeTakeScreenshot(activeTab.id);
              if (ssResult.success && ssResult.base64) {
                pendingScreenshot = ssResult.base64;
                resultData = { success: true, message: "Đã chụp ảnh màn hình thành công. Ảnh sẽ được gửi kèm trong tin nhắn tiếp theo." };
              } else {
                resultData = ssResult;
              }
              break;
            case 'find_elements_by_text':
              resultData = await executeFindElementsByText(activeTab.id, args?.text, args?.elementType); break;
            case 'find_interactive_elements':
              resultData = await executeFindInteractiveElements(activeTab.id); break;
            case 'get_element_details':
              resultData = await executeGetElementDetails(activeTab.id, args?.selector); break;
            case 'simulate_click':
              resultData = await executeSimulateClick(activeTab.id, args?.selector); break;
            case 'simulate_typing':
              resultData = await executeSimulateTyping(activeTab.id, args?.selector, args?.text, args?.clearFirst !== false); break;
            case 'simulate_key_press':
              resultData = await executeSimulateKeyPress(activeTab.id, args?.key); break;
            case 'scroll_to_element':
              resultData = await executeScrollToElement(activeTab.id, args?.selector); break;
            case 'type_in_focused_element':
              resultData = await executeTypeInFocusedElement(activeTab.id, args?.text, args?.clearFirst !== false); break;
            default:
              resultData = { error: `Tool "${name}" không được định nghĩa.` };
          }
        } catch (err) {
          resultData = { error: err.message };
        }

        toolResponseParts.push({
          functionResponse: { name, response: resultData }
        });
      }

      requestBody.contents.push({ role: "tool", parts: toolResponseParts });
      continue; // Lặp lại để Gemini phân tích kết quả
    }

    // Không có tool call → kết thúc, trả về câu trả lời cuối cùng
    hideActionStatus();
    const finalAnswer = parts.map(p => p.text || '').join('');
    return finalAnswer || "(Không có phản hồi từ AI)";
  }

  hideActionStatus();
  throw new Error(`Vượt quá ${MAX_TURNS} bước tương tác trong 1 lượt. Vui lòng thử chia nhỏ yêu cầu.`);
}
