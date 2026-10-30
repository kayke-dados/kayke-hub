import os
import unittest
from tests import helpers  # noqa: F401  (garante root no sys.path)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

AVATAR = os.path.join(ROOT, "assets", "avatar.png")
FAVICON = os.path.join(ROOT, "assets", "favicon.svg")
QR = os.path.join(ROOT, "assets", "qr-code.svg")
OG = os.path.join(ROOT, "assets", "og-image.png")


class TestAssets(unittest.TestCase):
    def test_avatar_exists(self):
        self.assertTrue(os.path.isfile(AVATAR), "assets/avatar.png faltando")

    def test_favicon_is_svg(self):
        with open(FAVICON, encoding="utf-8") as f:
            first = f.readline()
        self.assertIn("<svg", first)

    def test_qr_has_viewbox(self):
        with open(QR, encoding="utf-8") as f:
            content = f.read()
        self.assertIn("viewBox", content)

    def test_og_image_exists(self):
        self.assertTrue(os.path.isfile(OG), "assets/og-image.png faltando")

    @unittest.skipUnless(helpers.have_pillow(), "Pillow indisponível")
    def test_image_dimensions(self):
        from PIL import Image
        with Image.open(AVATAR) as im:
            self.assertEqual(im.size, (400, 400))
        with Image.open(OG) as im:
            self.assertEqual(im.size, (1200, 630))


if __name__ == "__main__":
    unittest.main()
