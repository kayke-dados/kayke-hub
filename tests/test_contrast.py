import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "css", "style.css")

BG = (0x0D, 0x0D, 0x0D)
SURFACE_RGB = (0xA7, 0x8B, 0xFA)
SURFACE_ALPHA = 0.08


def compositing_base():
    """Fundo real de .track-row ímpar: rgba(167,139,250,.08) sobre #0d0d0d."""
    return tuple(
        fg * SURFACE_ALPHA + bg * (1 - SURFACE_ALPHA)
        for fg, bg in zip(SURFACE_RGB, BG)
    )


def hex_to_rgb(value):
    return tuple(int(value[i : i + 2], 16) for i in (1, 3, 5))


def rel_luminance(color):
    def chan(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4

    r, g, b = (chan(v) for v in color)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = rel_luminance(a), rel_luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def token(name):
    with open(CSS, encoding="utf-8") as f:
        css = f.read()
    return hex_to_rgb(re.search(re.escape(name) + r": (#([0-9a-f]{6}))", css).group(1))


class TestContrast(unittest.TestCase):
    def test_body_text_token(self):
        self.assertGreater(contrast(token("--text"), BG), 4.5)

    def test_muted_token_readable_over_solid_and_striped_rows(self):
        """I3: --muted é usado em texto pequeno (track-status, link-desc):
        precisa passar 4.5:1 sobre o ground sólido e sobre a linha listrada."""
        muted = token("--muted")
        self.assertGreaterEqual(contrast(muted, BG), 4.5)
        self.assertGreaterEqual(contrast(muted, compositing_base()), 4.5)

    def test_small_text_css_uses_readable_token(self):
        """#8b5cf6 é só decoração: nenhum seletor pode corar texto com ele."""
        with open(CSS, encoding="utf-8") as f:
            css = f.read()
        self.assertNotIn("color: var(--muted-deco)", css)


if __name__ == "__main__":
    unittest.main()
