import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_PATH = os.path.join(ROOT, "css", "style.css")

TOKENS = {
    "--bg": "#0d0d0d",
    "--accent": "#a78bfa",
    "--muted": "#c4b5fd",
    "--muted-deco": "#8b5cf6",
    "--text": "#e0d7ff",
    "--ink": "#ffffff",
}


def css_text():
    if not os.path.isfile(CSS_PATH):
        return ""
    with open(CSS_PATH, encoding="utf-8") as f:
        return f.read()


class TestCss(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.isfile(CSS_PATH), "css/style.css faltando")

    def test_brand_tokens_exact(self):
        css = css_text()
        for var, value in TOKENS.items():
            self.assertIn(f"{var}: {value}", css, f"token {var} com valor errado")

    def test_prefers_reduced_motion(self):
        self.assertIn("prefers-reduced-motion", css_text())

    def test_mobile_media_query(self):
        self.assertRegex(css_text(), r"@media[^{]*max-width:\s*480px")

    def test_no_absolute_asset_urls(self):
        css = css_text()
        for m in re.finditer(r"url\((['\"]?)([^)'\"]+)\1\)", css):
            self.assertNotIn("http", m.group(2), "url absoluto no CSS")
            self.assertFalse(m.group(2).startswith("/"), "url raiz no CSS")

    def test_focus_visible(self):
        self.assertRegex(css_text(), r"focus-visible")
