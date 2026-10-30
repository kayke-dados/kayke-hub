import json
import os
import re
import unittest
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")

EXPECTED_SAME_AS = [
    "https://github.com/kayke-dados",
    "https://www.instagram.com/kayke.dados/",
    "https://github.com/kayke-dados/Python-Journey",
]


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.metas = {}
        self.links = []
        self.i18n_keys = []
        self._last_tag = None
        self._script_raw = None

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        self.tags.append(tag)
        if tag == "meta":
            if d.get("property") in ("og:title", "og:image", "og:url", "og:description"):
                self.metas[d["property"]] = d.get("content")
            if d.get("name") == "viewport":
                self.metas["viewport"] = d.get("content")
        if tag == "a" and d.get("href"):
            self.links.append((d["href"], d.get("rel", ""), d.get("target", "")))
        if "data-i18n" in d:
            self.i18n_keys.append(d["data-i18n"])
        self._last_tag = tag

    def handle_data(self, data):
        if self._last_tag == "script" and self._script_raw is None:
            self._script_raw = data

    def handle_starttag_extra(self):
        pass


def collect():
    with open(INDEX, encoding="utf-8") as f:
        raw = f.read()
    p = Collector()
    p.feed(raw)
    return raw, p


class TestHtml(unittest.TestCase):
    def test_file_exists(self):
        self.assertTrue(os.path.isfile(INDEX), "index.html faltando")

    def test_lang_ptbr_and_viewport(self):
        raw, p = collect()
        self.assertIn('<html lang="pt-BR">', raw)
        self.assertIn('name="viewport"', raw)

    def test_single_h1(self):
        _, p = collect()
        self.assertEqual(p.tags.count("h1"), 1)

    def test_og_tags(self):
        _, p = collect()
        self.assertEqual(p.metas.get("og:url"), "https://kayke-dados.github.io/kayke-hub/")
        self.assertIn("og:title", p.metas)
        self.assertIn("og:image", p.metas)
        self.assertIn("og:description", p.metas)

    def test_jsonld_person_parseable(self):
        raw, _ = collect()
        m = re.search(
            r'<script type="application/ld\+json">(.*?)</script>', raw, re.S
        )
        self.assertIsNotNone(m, "JSON-LD Person ausente")
        data = json.loads(m.group(1))
        self.assertEqual(data["@type"], "Person")
        self.assertEqual(data["name"], "Kayke")
        for url in EXPECTED_SAME_AS[:2]:
            self.assertIn(url, data["sameAs"])

    def test_expected_links(self):
        _, p = collect()
        hrefs = [h for h, _, _ in p.links]
        for url in EXPECTED_SAME_AS:
            self.assertIn(url, hrefs)
        self.assertIn("mailto:kayke0812@proton.me", hrefs)
        for href, rel, target in p.links:
            if href.startswith("http"):
                self.assertEqual(target, "_blank", href)
                self.assertIn("noopener", rel, href)

    def test_data_i18n_present(self):
        _, p = collect()
        self.assertGreaterEqual(len(p.i18n_keys), 20)
        self.assertIn("tagline", p.i18n_keys)

    def test_relative_asset_paths(self):
        raw, _ = collect()
        for m in re.finditer(r'(?:src|href)="(assets/[^"]+)"', raw):
            path = os.path.join(ROOT, m.group(1))
            self.assertTrue(os.path.isfile(path), path)


if __name__ == "__main__":
    unittest.main()
