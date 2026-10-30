"""Geração de assets estáticos do cartão (tooling, sem deps rígidas).

Ruling (ledger Task 1): Pillow não compila em Android/arm64 → og-image usa
escritor PNG puro-Python (zlib + struct). Avatar baixado direto do GitHub.
Favicon/QR em SVG (segno puro-Python).
"""
import os
import struct
import urllib.request
import zlib

import segno

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")

SITE_URL = "https://kayke-dados.github.io/kayke-hub/"
AVATAR_URL = "https://avatars.githubusercontent.com/u/318036195?s=400&v=4"

BG = (0x0D, 0x0D, 0x0D)
WHITE = (0xFF, 0xFF, 0xFF)
ACCENT = (0xA7, 0x8B, 0xFA)
TEXT = (0xE0, 0xD7, 0xFF)


def download_avatar(dest):
    urllib.request.urlretrieve(AVATAR_URL, dest)


def write_favicon(dest):
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<rect width="64" height="64" rx="12" fill="#0d0d0d"/>'
        '<text x="32" y="44" font-family="monospace" font-size="30" '
        'font-weight="700" fill="#a78bfa" text-anchor="middle">K.</text>'
        "</svg>"
    )
    with open(dest, "w", encoding="utf-8") as f:
        f.write(svg)


def write_qr(dest):
    qr = segno.make(SITE_URL, error="m")
    qr.save(dest, kind="svg", scale=20, border=4, dark="#0d0d0d", light="#ffffff")
    with open(dest, encoding="utf-8") as f:
        content = f.read()
    content = content.replace(
        '<svg xmlns="http://www.w3.org/2000/svg" width="740" height="740"',
        '<svg xmlns="http://www.w3.org/2000/svg" width="740" height="740" viewBox="0 0 740 740"',
    )
    with open(dest, "w", encoding="utf-8") as f:
        f.write(content)


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


def generate_og(dest, width=1200, height=630):
    qr = segno.make(SITE_URL, error="m")
    matrix = list(qr.matrix)
    mod = 7
    quiet = 4 * mod
    qr_size = (len(matrix) + 8) * mod
    x0 = 80
    y0 = (height - qr_size) // 2

    pix = [[BG for _ in range(width)] for _ in range(height)]
    _rect(pix, 0, 0, 40, height, ACCENT)
    _rect(pix, x0, y0, x0 + qr_size, y0 + qr_size, WHITE)
    for r, row in enumerate(matrix):
        for c, dark in enumerate(row):
            if dark:
                px = x0 + quiet + c * mod
                py = y0 + quiet + r * mod
                _rect(pix, px, py, px + mod, py + mod, BG)
    _rect(pix, x0 - 2, y0 + qr_size + 48, x0 + qr_size + 2, y0 + qr_size + 54, ACCENT)

    rows = []
    for y in range(height):
        row = bytearray()
        for c in pix[y]:
            row.extend(c)
        rows.append(row)
    with open(dest, "wb") as f:
        f.write(_png_chunks(width, height, rows))


if __name__ == "__main__":
    download_avatar(os.path.join(ASSETS, "avatar.png"))
    write_favicon(os.path.join(ASSETS, "favicon.svg"))
    write_qr(os.path.join(ASSETS, "qr-code.svg"))
    generate_og(os.path.join(ASSETS, "og-image.png"))
    print("assets gerados em", ASSETS)
