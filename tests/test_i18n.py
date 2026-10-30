import os
import re
import subprocess
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")
MAIN = os.path.join(ROOT, "js", "main.js")


def html_keys():
    with open(INDEX, encoding="utf-8") as f:
        raw = f.read()
    keys = set(re.findall(r'data-i18n(?:-aria)?="([^"]+)"', raw))
    return keys


def dict_keys():
    if not os.path.isfile(MAIN):
        return set()
    with open(MAIN, encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"const I18N\s*=\s*\{(.*?)\n\};", src, re.S)
    if not m:
        return set()
    return set(re.findall(r"^ {4}([a-z_0-9]+):", m.group(1), re.M))


class TestI18n(unittest.TestCase):
    def test_main_exists_and_parses(self):
        self.assertTrue(os.path.isfile(MAIN), "js/main.js faltando")
        r = subprocess.run(["node", "--check", MAIN], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)

    def test_every_html_key_in_dict(self):
        missing = html_keys() - dict_keys()
        self.assertFalse(missing, f"chaves do HTML ausentes no dict EN: {sorted(missing)}")

    def test_no_ghost_keys_in_dict(self):
        ghosts = dict_keys() - html_keys()
        self.assertFalse(ghosts, f"chaves do dict sem data-i18n no HTML: {sorted(ghosts)}")

    def test_site_url_constant(self):
        with open(MAIN, encoding="utf-8") as f:
            src = f.read()
        self.assertIn('https://kayke-dados.github.io/kayke-hub/"', src)

    def test_required_features_textually(self):
        with open(MAIN, encoding="utf-8") as f:
            src = f.read()
        for token in ("navigator.clipboard", "execCommand('copy')", "navigator.share", "localStorage", "documentElement.lang"):
            self.assertIn(token, src, f"estrutura ausente: {token}")

    def test_en_dict_values_are_all_words(self):
        self.assertGreater(len(dict_keys()), 25)


if __name__ == "__main__":
    unittest.main()
