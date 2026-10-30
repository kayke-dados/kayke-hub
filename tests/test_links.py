import os
import re
import unittest
from urllib import request as urlreq
from urllib.error import HTTPError, URLError

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as _f:
    INDEX_RAW = _f.read()

EXTERNAL_URLS = sorted(
    set(
        m.group(1)
        for m in re.finditer(r'<a [^>]*?href="(https?://[^"]+)"', INDEX_RAW)
    )
)

SELF_BASE = "https://kayke-dados.github.io"
ORIGIN_HINTS = ("https://fonts.googleapis.com", "https://fonts.gstatic.com")

CHECKABLE = [u for u in EXTERNAL_URLS if not u.startswith(SELF_BASE) and not any(u.startswith(o) for o in ORIGIN_HINTS)] + [
    u for u in EXTERNAL_URLS if any(u.startswith(o) for o in ORIGIN_HINTS)
][:0]


def status_ok(url):
    req = urlreq.Request(url, headers={"User-Agent": "Mozilla/5.0 (link check)"})
    try:
        with urlreq.urlopen(req, timeout=20) as r:
            return r.status
    except HTTPError as e:
        return e.code
    except URLError:
        return 0


class TestLinks(unittest.TestCase):
    def test_external_anchor_urls_respond(self):
        broken = []
        for url in CHECKABLE:
            code = status_ok(url)
            if code not in (200, 301, 302, 303, 307, 308):
                broken.append((url, code))
        self.assertFalse(broken, f"links quebrados (código): {broken}")

    def test_self_urls_documented_for_publish_check(self):
        self.assertIn("https://kayke-dados.github.io/kayke-hub/", INDEX_RAW)



if __name__ == "__main__":
    unittest.main()
