import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "css", "style.css")

BG = (0x0B, 0x0D, 0x12)
SURFACE = (0x15, 0x1A, 0x24)


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
    return hex_to_rgb(
        re.search(re.escape(name) + r": (#([0-9a-fA-F]{6}))(?![0-9a-fA-F])", css).group(1).lower()
    )


class TestContrast(unittest.TestCase):
    def test_body_text_token(self):
        self.assertGreater(contrast(token("--text"), BG), 4.5)

    def test_muted_token_readable_over_ground_and_panel(self):
        """--muted é usado em texto pequeno: precisa passar 4.5:1 sobre o
        ground e sobre o painel --surface."""
        muted = token("--muted")
        self.assertGreaterEqual(contrast(muted, BG), 4.5)
        self.assertGreaterEqual(contrast(muted, SURFACE), 4.5)

    def test_accent_on_dark_surfaces(self):
        accent = token("--accent")
        self.assertGreaterEqual(contrast(accent, BG), 4.5)
        self.assertGreaterEqual(contrast(accent, SURFACE), 4.5)

    def test_solid_button_text(self):
        """Botão primário: texto do ground sobre o verde."""
        self.assertGreater(contrast(BG, token("--accent")), 4.5)

    def test_accent_hover_still_readable(self):
        """O hover interativo precisa manter o texto do ground legível."""
        self.assertGreater(contrast(BG, token("--accent-hover")), 4.5)


if __name__ == "__main__":
    unittest.main()
