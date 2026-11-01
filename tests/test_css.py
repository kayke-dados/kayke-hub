import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_PATH = os.path.join(ROOT, "css", "style.css")

TOKENS = {
    "--bg": "#0B0E0C",
    "--bg-2": "#111612",
    "--surface": "#171C18",
    "--border": "#293129",
    "--text": "#F0F1E9",
    "--muted": "#A3AAA1",
    "--accent": "#B9D982",
    "--accent-2": "#849D68",
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

    def test_font_stacks(self):
        css = css_text()
        self.assertIn('--display: "Manrope"', css)
        self.assertIn('--sans: "Inter"', css)
        self.assertIn('--mono: "JetBrains Mono"', css)

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

    def test_botao_primario_usa_texto_do_ground_no_hover(self):
        css = css_text()
        m = re.search(r"\.btn-primary:hover,[^{]*\{([^}]*)\}", css)
        self.assertIsNotNone(m, "regra .btn-primary:hover ausente")
        self.assertIn("color: var(--bg)", m.group(1), "hover do botão primário precisa de texto do ground (contraste AA)")

    def test_menu_mobile_tem_fallback_sem_js(self):
        css = css_text()
        self.assertIn(".js .nav-toggle", css)
        self.assertIn(".js .primary-nav", css)


if __name__ == "__main__":
    unittest.main()
