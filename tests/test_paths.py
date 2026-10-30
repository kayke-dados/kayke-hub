import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rel_path(raw):
    r = re.compile(r'(?:src|href)="([^"]+)"')
    for m in r.finditer(raw):
        yield m.group(1)


def css_urls():
    path = os.path.join(ROOT, "css", "style.css")
    with open(path, encoding="utf-8") as f:
        css = f.read()
    return re.findall(r"url\((['\"]?)([^)'\"]+)\1\)", css)


class TestPaths(unittest.TestCase):
    def test_index_no_root_absolute_paths(self):
        with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
            raw = f.read()
        bad = [p for p in rel_path(raw) if p.startswith("/") and not p.startswith("//")]
        self.assertFalse(bad, f"caminhos absolutos: {bad}")

    def test_every_local_ref_exists(self):
        with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
            raw = f.read()
        for ref in rel_path(raw):
            if ref.startswith(("http", "mailto:", "#")):
                continue
            path = os.path.join(ROOT, ref.split("#")[0])
            self.assertTrue(os.path.isfile(path), f"não existe: {ref}")

    def test_css_no_absolute_urls(self):
        self.assertEqual(css_urls(), [], "CSS não pode ter url() absoluta")

    def test_refs_survive_subdirectory(self):
        with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
            raw = f.read()
        for ref in rel_path(raw):
            if ref.startswith(("http", "mailto:", "#")):
                continue
            self.assertFalse(ref.startswith("/"), f"{ref} quebra em /kayke-hub/")


if __name__ == "__main__":
    unittest.main()
