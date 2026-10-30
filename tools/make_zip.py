import os
import zipfile

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dest = os.path.join(root, "kayke-dados-cartao-digital.zip")

FILES = [
    "index.html",
    "README.md",
    "prompt.md",
    "css/style.css",
    "js/main.js",
    "assets/avatar.png",
    "assets/favicon.svg",
    "assets/qr-code.svg",
    "assets/og-image.png",
    "tools/make_assets.py",
    "tools/make_zip.py",
    "tests/helpers.py",
    "tests/test_assets.py",
    "tests/test_contrast.py",
    "tests/test_html.py",
    "tests/test_css.py",
    "tests/test_i18n.py",
    "tests/test_paths.py",
    "tests/test_links.py",
    "tests/test_publish.py",
    "tests/test_v2.py",
    "docs/superpowers/specs/2026-10-30-kayke-digital-card-design.md",
    "docs/superpowers/plans/2026-10-30-kayke-digital-card.md",
    "reports/01-auditoria-ambiente.md",
    "reports/02-skills-utilizadas.md",
    "reports/03-mcps-plugins.md",
    "reports/04-relatorio-testes.md",
    "reports/05-publicacao-github-pages.md",
    "reports/06-evolucao-v2.md",
    "reports/07-redesign-v3.md",
]

with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
    for rel in FILES:
        z.write(os.path.join(root, rel), rel)
