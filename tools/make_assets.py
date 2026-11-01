"""Geração de assets estáticos do Kayke Hub (tooling, sem deps rígidas).

Lê a URL de produção diretamente de `js/main.js` (fonte única). Assim, ao trocar
o endereço do site, basta editar o JS e rodar este script de novo.

Sem Pillow: og-image usa escritor PNG puro-Python (zlib + struct). Avatar é
baixado do GitHub. Favicon e QR são SVG (segno puro-Python).
"""
import os
import re
import struct
import urllib.request
import zlib

import segno

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
MAIN_JS = os.path.join(ROOT, "js", "main.js")

AVATAR_URL = "https://avatars.githubusercontent.com/u/318036195?s=400&v=4"

BG = (0x0B, 0x0D, 0x12)
SURFACE = (0x15, 0x1A, 0x24)
WHITE = (0xFF, 0xFF, 0xFF)
ACCENT = (0xA7, 0x8B, 0xFA)
ACCENT_2 = (0x7C, 0x5C, 0xC4)
TEXT = (0xF1, 0xF0, 0xF5)
MUTED = (0xA1, 0xA1, 0xAA)


def read_site_url():
    with open(MAIN_JS, encoding="utf-8") as f:
        match = re.search(r'const SITE_URL = "([^"]+)";', f.read())
    if not match:
        raise SystemExit("SITE_URL não encontrado em js/main.js")
    return match.group(1)


def download_avatar(dest):
    urllib.request.urlretrieve(AVATAR_URL, dest)


def write_favicon(dest):
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<rect width="64" height="64" rx="10" fill="#0B0D12"/>'
        '<rect x="6" y="6" width="52" height="52" rx="8" fill="none" stroke="#262C38"/>'
        '<text x="32" y="45" font-family="monospace" font-size="30" '
        'font-weight="700" fill="#A78BFA" text-anchor="middle">K</text>'
        "</svg>"
    )
    with open(dest, "w", encoding="utf-8") as f:
        f.write(svg)


def write_qr(dest, site_url):
    qr = segno.make(site_url, error="m")
    qr.save(dest, kind="svg", scale=20, border=4, dark="#0B0D12", light="#ffffff")
    with open(dest, encoding="utf-8") as f:
        content = f.read()
    content = content.replace(
        '<svg xmlns="http://www.w3.org/2000/svg" width="740" height="740"',
        '<svg xmlns="http://www.w3.org/2000/svg" width="740" height="740" viewBox="0 0 740 740"',
    )
    with open(dest, "w", encoding="utf-8") as f:
        f.write(content)


# Fonte 5x7 mínima (só o necessário para a imagem social).
FONT = {
    " ": ["00000"] * 7,
    "·": ["00000", "00000", "00100", "00100", "00100", "00000", "00000"],
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "N": ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
}


def text_width(text, scale, spacing=1):
    return len(text) * 5 * scale + (len(text) - 1) * spacing * scale


def draw_text(pix, text, x, y, scale, color, spacing=1):
    cursor = x
    for char in text.upper():
        glyph = FONT.get(char)
        if glyph:
            for row, bits in enumerate(glyph):
                for col, bit in enumerate(bits):
                    if bit == "1":
                        px = cursor + col * scale
                        py = y + row * scale
                        _rect(pix, px, py, px + scale, py + scale, color)
        cursor += 5 * scale + spacing * scale


def _png_chunks(width, height, rows):
    raw = b"".join(b"\x00" + bytes(r) for r in rows)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(raw, 6))
        + chunk(b"IEND", b"")
    )


def _rect(pix, x0, y0, x1, y1, color):
    for y in range(max(0, y0), min(len(pix), y1)):
        row = pix[y]
        for x in range(max(0, x0), min(len(row), x1)):
            row[x] = color


def generate_og(dest, site_url, width=1200, height=630):
    qr = segno.make(site_url, error="m")
    matrix = list(qr.matrix)
    mod = 5
    quiet = 4 * mod
    qr_size = (len(matrix) + 8) * mod
    qr_x = width - 90 - qr_size
    qr_y = (height - qr_size) // 2

    pix = [[BG for _ in range(width)] for _ in range(height)]
    _rect(pix, 0, 0, 12, height, ACCENT)

    draw_text(pix, "KAYKE", 90, 168, 22, TEXT)
    _rect(pix, 90, 356, 90 + text_width("KAYKE", 22), 364, ACCENT)
    draw_text(pix, "PYTHON · DADOS", 90, 400, 8, MUTED)
    draw_text(pix, "PORTFOLIO EM CONSTRUCAO", 90, 470, 6, ACCENT_2)

    _rect(pix, qr_x - 16, qr_y - 16, qr_x + qr_size + 16, qr_y + qr_size + 16, WHITE)
    for r, row in enumerate(matrix):
        for c, dark in enumerate(row):
            if dark:
                px = qr_x + quiet + c * mod
                py = qr_y + quiet + r * mod
                _rect(pix, px, py, px + mod, py + mod, BG)

    rows = []
    for y in range(height):
        row = bytearray()
        for c in pix[y]:
            row.extend(c)
        rows.append(row)
    with open(dest, "wb") as f:
        f.write(_png_chunks(width, height, rows))


if __name__ == "__main__":
    site_url = read_site_url()
    download_avatar(os.path.join(ASSETS, "avatar.png"))
    write_favicon(os.path.join(ASSETS, "favicon.svg"))
    write_qr(os.path.join(ASSETS, "qr-code.svg"), site_url)
    generate_og(os.path.join(ASSETS, "og-image.png"), site_url)
    print("assets gerados em", ASSETS, "para", site_url)
