import unittest
from unittest.mock import patch, MagicMock
from myassitant.agent import markdown_to_telegram_html, _send_telegram_message


class TestMarkdownToTelegramHTML(unittest.TestCase):

    def test_bold(self):
        self.assertEqual(markdown_to_telegram_html("This is **bold** text"), "This is <b>bold</b> text")
        self.assertEqual(markdown_to_telegram_html("This is __bold__ text"), "This is <b>bold</b> text")

    def test_italic(self):
        self.assertEqual(markdown_to_telegram_html("This is *italic* text"), "This is <i>italic</i> text")

    def test_strikethrough(self):
        self.assertEqual(markdown_to_telegram_html("This is ~~deleted~~ text"), "This is <s>deleted</s> text")

    def test_headers(self):
        self.assertEqual(markdown_to_telegram_html("# Header 1"), "<b>Header 1</b>")
        self.assertEqual(markdown_to_telegram_html("### Sub header"), "<b>Sub header</b>")

    def test_link(self):
        input_text = "Visit [Google](https://google.com?q=1&v=2)"
        expected = 'Visit <a href="https://google.com?q=1&amp;v=2">Google</a>'
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    def test_inline_code(self):
        input_text = "Run `pip install <package>` now"
        expected = "Run <code>pip install &lt;package&gt;</code> now"
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    def test_code_block(self):
        input_text = "```python\ndef foo():\n    return a < b and c > d\n```"
        expected = '<pre><code class="language-python">def foo():\n    return a &lt; b and c &gt; d</code></pre>'
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    def test_escaping_special_chars(self):
        input_text = "1 < 2 & 3 > 2"
        expected = "1 &lt; 2 &amp; 3 &gt; 2"
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    def test_blockquote(self):
        input_text = "> This is a quote"
        expected = "<blockquote>This is a quote</blockquote>"
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    def test_bullet_list(self):
        input_text = "- Item 1\n* Item 2"
        expected = "• Item 1\n• Item 2"
        self.assertEqual(markdown_to_telegram_html(input_text), expected)

    @patch("httpx.Client")
    def test_send_telegram_message_success(self, mock_client_cls):
        mock_client = MagicMock()
        mock_client_cls.return_value.__enter__.return_value = mock_client
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"ok": True, "result": {}}
        mock_client.post.return_value = mock_resp

        res = _send_telegram_message("12345", "Hello **world**", reply_to_message_id=99)
        self.assertEqual(res, {"ok": True, "result": {}})

        mock_client.post.assert_called_once()
        args, kwargs = mock_client.post.call_args
        self.assertEqual(kwargs["json"]["chat_id"], "12345")
        self.assertEqual(kwargs["json"]["text"], "Hello <b>world</b>")
        self.assertEqual(kwargs["json"]["parse_mode"], "HTML")
        self.assertEqual(kwargs["json"]["reply_to_message_id"], 99)

    @patch("httpx.Client")
    def test_send_telegram_message_fallback(self, mock_client_cls):
        mock_client = MagicMock()
        mock_client_cls.return_value.__enter__.return_value = mock_client

        # First call returns 400 Bad Request (HTML parse error)
        mock_resp_err = MagicMock()
        mock_resp_err.status_code = 400
        mock_resp_err.text = "Bad Request: can't parse entities"

        # Second call (fallback) returns 200 OK
        mock_resp_ok = MagicMock()
        mock_resp_ok.status_code = 200
        mock_resp_ok.json.return_value = {"ok": True, "result": {}}

        mock_client.post.side_effect = [mock_resp_err, mock_resp_ok]

        res = _send_telegram_message("12345", "Invalid <tag> **text**")
        self.assertEqual(res, {"ok": True, "result": {}})

        self.assertEqual(mock_client.post.call_count, 2)
        # Check fallback call did not pass parse_mode
        fallback_kwargs = mock_client.post.call_args_list[1][1]
        self.assertNotIn("parse_mode", fallback_kwargs["json"])
        self.assertEqual(fallback_kwargs["json"]["text"], "Invalid <tag> **text**")


if __name__ == "__main__":
    unittest.main()
