import json
import os
import re
import unittest
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")
VERCEL = os.path.join(ROOT, "vercel.json")
ROBOTS = os.path.join(ROOT, "robots.txt")
SITEMAP = os.path.join(ROOT, "sitemap.xml")

with open(INDEX, encoding="utf-8") as f:
    HTML = f.read()


class TestConfigProducao(unittest.TestCase):
    def test_vercel_json_valido(self):
        with open(VERCEL, encoding="utf-8") as f:
            config = json.load(f)
        self.assertTrue(config.get("cleanUrls"))
        self.assertTrue(config.get("headers"))

    def test_robots_aponta_para_sitemap(self):
        with open(ROBOTS, encoding="utf-8") as f:
            robots = f.read()
        self.assertIn("Sitemap:", robots)
        self.assertIn("sitemap.xml", robots)

    def test_sitemap_valido(self):
        tree = ET.parse(SITEMAP)
        loc = tree.find(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        self.assertIsNotNone(loc)
        self.assertTrue(loc.text.startswith("https://"))

    def test_canonical_e_sitemap_consistentes(self):
        with open(SITEMAP, encoding="utf-8") as f:
            loc = re.search(r"<loc>([^<]+)</loc>", f.read()).group(1)
        self.assertIn(f'<link rel="canonical" href="{loc}" />', HTML)


class TestLinksInternos(unittest.TestCase):
    def test_todo_ancora_tem_destino(self):
        ids = set(re.findall(r'\sid="([^"]+)"', HTML))
        anchors = set(re.findall(r'href="#([^"]+)"', HTML))
        quebrados = sorted(a for a in anchors if a not in ids)
        self.assertFalse(quebrados, f"âncoras sem destino: {quebrados}")


if __name__ == "__main__":
    unittest.main()
