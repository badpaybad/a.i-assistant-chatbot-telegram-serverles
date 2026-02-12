from gemini_truyenkieu import fetch_url_content
import os

def test():
    # Test 1: Web page (Text)
    print("Testing Web Page...")
    text, mime = fetch_url_content("https://example.com")
    print(f"MIME: {mime}")
    print(f"Content length: {len(text)}")
    print(f"Content sample: {text[:100]}...")
    assert "Example Domain" in text
    assert "text/html" in mime

    # Test 2: Image (File)
    print("\nTesting Image...")
    # Using a known public image
    path, mime = fetch_url_content("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
    print(f"MIME: {mime}")
    print(f"Saved path: {path}")
    assert os.path.exists(path)
    assert "image/png" in mime
    assert path.endswith(".png")

    print("\nAll tests passed!")

if __name__ == "__main__":
    test()
