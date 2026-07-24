import unittest
from knowledgebase.gemini_search import SEARCH_TOOL_DEF, is_search_requested, is_search_needed

class TestGeminiSearchTool(unittest.TestCase):
    def test_search_tool_declaration(self):
        self.assertEqual(SEARCH_TOOL_DEF["name"], "search_with_gemini")
        self.assertIn("Google Search", SEARCH_TOOL_DEF["description"])
        self.assertIn("query", SEARCH_TOOL_DEF["parameters"])

    def test_is_search_requested(self):
        self.assertTrue(is_search_requested("tìm kiếm giá vàng hôm nay"))
        self.assertTrue(is_search_requested("cho tôi tra cứu thời tiết Hà Nội"))
        self.assertFalse(is_search_requested("xin chào bạn"))

    def test_is_search_needed_keyword(self):
        self.assertTrue(is_search_needed("tìm kiếm thông tin mới nhất về AI"))

    def test_is_search_needed_context_combining(self):
        context = "Người dùng hỏi: Bạn có biết tin tức thời sự không?"
        current_msg = "Giá vàng hôm nay là bao nhiêu?"
        self.assertTrue(is_search_needed(current_msg, context))

if __name__ == "__main__":
    unittest.main()
