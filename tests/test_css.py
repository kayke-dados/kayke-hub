import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_PATH = os.path.join(ROOT, "css", "style.css")

TOKENS = {
    "--bg": "#141414",
    "--surface": "#202020",
    "--accent": "#9B8AC4",
    "--accent-hover": "#B0A0D0",
    "--muted": "#A6A29C",
    "--text": "#F5F3EF",
    "--ink": "#F5F3EF",
    "--border": "#343434",
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

    def test_botao_solido_usa_texto_do_ground_no_hover(self):
        css = css_text()
        m = re.search(r"\.btn-solid:hover,[^{]*\{([^}]*)\}", css)
        self.assertIsNotNone(m, "regra .btn-solid:hover ausente")
        self.assertIn("color: var(--bg)", m.group(1), "hover do botão sólido precisa de texto do ground (contraste AA)")

    def test_menu_mobile_tem_fallback_sem_js(self):
        css = css_text()
        self.assertIn(".js .nav-toggle", css)
        self.assertIn(".js .nav-menu", css)
