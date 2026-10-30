"""Desenha as imagens editoriais do site a partir dos dados reais do projeto.

Nada aqui é stock: a faixa de exercícios, o mapa dos capítulos, as capas dos
projetos e a mesa de ferramentas são desenhados com a paleta v4 e os números
auditados do Python-Journey. Rode de novo depois de mudar os dados.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, "assets", "art")
PROJECTS = os.path.join(ROOT, "assets", "projects")

BG = "#141414"
SURFACE = "#202020"
TEXT = "#F5F3EF"
MUTED = "#A6A29C"
ACCENT = "#9B8AC4"
BORDER = "#343434"

SANS = "Manrope, Arial, Helvetica, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"


def svg(width, height, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" role="img" aria-label="{title}">\n'
        f"  <title>{title}</title>\n{body}</svg>\n"
    )


def write(name, content):
    path = os.path.join(ART if not name.startswith("projects/") else PROJECTS,
                        os.path.basename(name))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("escrito", os.path.relpath(path, ROOT))


def exercicios():
    """85 quadrados preenchidos + o ex105 em aberto, em 4 fileiras de 22."""
    cols, rows, size, gap = 22, 4, 30, 7
    grid_w = cols * size + (cols - 1) * gap
    grid_h = rows * size + (rows - 1) * gap
    x0 = (900 - grid_w) / 2
    y0 = (190 - grid_h) / 2
    parts = []
    for i in range(86):
        r, c = divmod(i, cols)
        x = x0 + c * (size + gap)
        y = y0 + r * (size + gap)
        if i < 85:
            parts.append(
                f'  <rect x="{x:.1f}" y="{y:.1f}" width="{size}" height="{size}" '
                f'rx="2" fill="{ACCENT}" opacity="0.92"/>'
            )
        else:
            parts.append(
                f'  <rect x="{x:.1f}" y="{y:.1f}" width="{size}" height="{size}" '
                f'rx="2" fill="none" stroke="{ACCENT}" stroke-width="1.6" '
                f'stroke-dasharray="4 3"/>'
            )
    parts.append(
        f'  <text x="854" y="176" text-anchor="end" font-family="{MONO}" '
        f'font-size="11" letter-spacing="1.6" fill="{MUTED}">85/86</text>'
    )
    return svg(900, 190, "\n".join(parts) + "\n",
               "Faixa de 86 exercícios: 85 preenchidos e o último em aberto")


def mapa():
    xs = [70 + i * (860 / 6) for i in range(7)]
    y = 88
    labels = ["fundamentos", "condições", "laços", "listas",
              "dicionários", "funções", "próximos"]
    counts = ["12", "16", "25", "18", "5", "9/10", "—"]
    parts = [
        f'  <text x="70" y="30" font-family="{MONO}" font-size="11" '
        f'letter-spacing="2" fill="{MUTED}">PYTHON-JOURNEY · 85/86</text>',
        f'  <line x1="70" y1="{y}" x2="{xs[5]}" y2="{y}" stroke="{ACCENT}" '
        f'stroke-width="2"/>',
        f'  <line x1="{xs[5]}" y1="{y}" x2="{xs[6]}" y2="{y}" stroke="{BORDER}" '
        f'stroke-width="1.5"/>',
    ]
    for i, x in enumerate(xs):
        if i < 5:
            parts.append(
                f'  <circle cx="{x:.1f}" cy="{y}" r="22" fill="{ACCENT}"/>'
                f'\n  <text x="{x:.1f}" y="{y + 5}" text-anchor="middle" '
                f'font-family="{MONO}" font-size="12" font-weight="700" '
                f'fill="{BG}">0{i + 1}</text>'
            )
        elif i == 5:
            parts.append(
                f'  <circle cx="{x:.1f}" cy="{y}" r="22" fill="{BG}" '
                f'stroke="{ACCENT}" stroke-width="2"/>'
                f'\n  <text x="{x:.1f}" y="{y + 5}" text-anchor="middle" '
                f'font-family="{MONO}" font-size="12" font-weight="700" '
                f'fill="{ACCENT}">06</text>'
            )
        else:
            parts.append(
                f'  <circle cx="{x:.1f}" cy="{y}" r="22" fill="none" '
                f'stroke="{BORDER}" stroke-width="1.5" stroke-dasharray="4 5"/>'
                f'\n  <text x="{x:.1f}" y="{y + 5}" text-anchor="middle" '
                f'font-family="{MONO}" font-size="12" fill="{MUTED}">07</text>'
            )
        color = ACCENT if i == 5 else MUTED
        parts.append(
            f'  <text x="{x:.1f}" y="138" text-anchor="middle" '
            f'font-family="{SANS}" font-size="12" fill="{color}">{labels[i]}</text>'
        )
        parts.append(
            f'  <text x="{x:.1f}" y="160" text-anchor="middle" '
            f'font-family="{MONO}" font-size="11" fill="{MUTED}">{counts[i]}</text>'
        )
    return svg(1000, 210, "\n".join(parts) + "\n",
               "Mapa de sete capítulos: cinco concluídos, o sexto em andamento e o sétimo reservado")


def capa_journey():
    tree = [
        ("01-fundamentos", TEXT, 0),
        ("02-condicoes", TEXT, 0),
        ("03-lacos-e-logica", TEXT, 0),
        ("04-listas-e-tuplas", TEXT, 0),
        ("05-dicionarios", TEXT, 0),
        ("06-funcoes", ACCENT, 0),
        ("Ex104 - Validar Inteiro.py", MUTED, 24),
        ("ex105.py", MUTED, 24),
    ]
    tree_svg = "\n".join(
        f'  <text x="{700 + indent}" y="{168 + i * 36}" font-family="{MONO}" '
        f'font-size="17" fill="{color}">{label}</text>'
        for i, (label, color, indent) in enumerate(tree)
    )
    parts = [
        f'  <rect width="1200" height="675" fill="{SURFACE}"/>',
        f'  <rect x="0.75" y="0.75" width="1198.5" height="673.5" fill="none" '
        f'stroke="{BORDER}" stroke-width="1.5"/>',
        f'  <rect x="0" y="0" width="10" height="675" fill="{ACCENT}"/>',
        f'  <text x="56" y="66" font-family="{MONO}" font-size="14" '
        f'letter-spacing="2" fill="{MUTED}">REPOSITÓRIO · PYTHON-JOURNEY</text>',
        f'  <text x="56" y="204" font-family="{SANS}" font-size="104" '
        f'font-weight="800" letter-spacing="-4" fill="{TEXT}">Python</text>',
        f'  <text x="56" y="300" font-family="{SANS}" font-size="104" '
        f'font-weight="800" letter-spacing="-4" fill="{ACCENT}">Journey</text>',
        f'  <text x="56" y="356" font-family="{MONO}" font-size="20" '
        f'fill="{TEXT}">85/86 exercícios resolvidos</text>',
        f'  <text x="56" y="392" font-family="{MONO}" font-size="15" '
        f'fill="{MUTED}">6 capítulos + 1 reservado</text>',
        f'  <line x1="56" y1="438" x2="560" y2="438" stroke="{BORDER}"/>',
        f'  <text x="56" y="486" font-family="{SANS}" font-size="17" '
        f'fill="{MUTED}">um registro honesto, na ordem em que aprendi.</text>',
        f'  <rect x="650" y="66" width="500" height="540" rx="8" fill="{BG}" '
        f'stroke="{BORDER}"/>',
        f'  <text x="700" y="112" font-family="{MONO}" font-size="13" '
        f'letter-spacing="1.4" fill="{MUTED}">06-funcoes /</text>',
        f'  <line x1="700" y1="132" x2="1100" y2="132" stroke="{BORDER}"/>',
        tree_svg,
        f'  <text x="700" y="540" font-family="{MONO}" font-size="13" '
        f'fill="{MUTED}">ex105 ainda em aberto</text>',
        f'  <circle cx="700" cy="566" r="4" fill="{ACCENT}"/>',
    ]
    for i in range(86):
        r, c = divmod(i, 43)
        x = 56 + c * 11
        y = 552 + r * 11
        if i < 85:
            parts.append(
                f'  <rect x="{x}" y="{y}" width="8" height="8" rx="1" '
                f'fill="{ACCENT}" opacity="0.8"/>'
            )
        else:
            parts.append(
                f'  <rect x="{x}" y="{y}" width="8" height="8" rx="1" '
                f'fill="none" stroke="{ACCENT}" stroke-width="1"/>'
            )
    return svg(1200, 675, "\n".join(parts) + "\n",
               "Capa ilustrada do Python-Journey com a árvore de capítulos e 85 de 86 exercícios")


def capa_hub():
    squares = []
    for i in range(86):
        r, c = divmod(i, 22)
        x = 700 + c * 18
        y = 150 + r * 18
        if i < 85:
            squares.append(
                f'  <rect x="{x}" y="{y}" width="14" height="14" rx="1" '
                f'fill="{ACCENT}" opacity="0.9"/>'
            )
        else:
            squares.append(
                f'  <rect x="{x}" y="{y}" width="14" height="14" rx="1" '
                f'fill="none" stroke="{ACCENT}" stroke-width="1.2"/>'
            )
    parts = [
        f'  <rect width="1200" height="675" fill="{BG}"/>',
        f'  <rect x="0.75" y="0.75" width="1198.5" height="673.5" fill="none" '
        f'stroke="{BORDER}" stroke-width="1.5"/>',
        f'  <rect width="1200" height="64" fill="{SURFACE}"/>',
        f'  <circle cx="28" cy="32" r="6" fill="{BORDER}"/>',
        f'  <circle cx="50" cy="32" r="6" fill="{BORDER}"/>',
        f'  <circle cx="72" cy="32" r="6" fill="{BORDER}"/>',
        f'  <rect x="118" y="17" width="440" height="30" rx="15" fill="{BG}" '
        f'stroke="{BORDER}"/>',
        f'  <text x="138" y="37" font-family="{MONO}" font-size="12" '
        f'fill="{MUTED}">kayke-dados.github.io/kayke-hub/</text>',
        f'  <text x="56" y="140" font-family="{MONO}" font-size="13" '
        f'letter-spacing="2" fill="{MUTED}">CARTÃO DIGITAL · 2026</text>',
        f'  <text x="56" y="282" font-family="{SANS}" font-size="124" '
        f'font-weight="800" letter-spacing="-5" fill="{TEXT}">Kayke</text>',
        f'  <text x="56" y="334" font-family="{SANS}" font-size="27" '
        f'font-weight="600" fill="{TEXT}">Estudando para me tornar '
        f'<tspan fill="{ACCENT}">Analista de Dados</tspan></text>',
        f'  <text x="56" y="382" font-family="{SANS}" font-size="18" '
        f'fill="{MUTED}">Python do zero, documentado no Python-Journey.</text>',
        f'  <text x="56" y="410" font-family="{SANS}" font-size="18" '
        f'fill="{MUTED}">Um dia por vez, sem atalhos.</text>',
        f'  <rect x="56" y="448" width="150" height="46" rx="8" fill="{ACCENT}"/>',
        f'  <text x="131" y="477" text-anchor="middle" font-family="{SANS}" '
        f'font-size="16" font-weight="700" fill="{BG}">GitHub</text>',
        f'  <rect x="222" y="448" width="164" height="46" rx="8" fill="none" '
        f'stroke="{BORDER}"/>',
        f'  <text x="304" y="477" text-anchor="middle" font-family="{SANS}" '
        f'font-size="16" font-weight="600" fill="{TEXT}">Instagram</text>',
        "\n".join(squares),
        f'  <text x="700" y="292" font-family="{MONO}" font-size="15" '
        f'fill="{ACCENT}">85/86 exercícios</text>',
        f'  <text x="700" y="318" font-family="{MONO}" font-size="13" '
        f'fill="{MUTED}">5 capítulos concluídos</text>',
        f'  <text x="1120" y="600" text-anchor="end" font-family="{SANS}" '
        f'font-size="190" font-weight="800" fill="{ACCENT}" opacity="0.08">K.</text>',
    ]
    return svg(1200, 675, "\n".join(parts) + "\n",
               "Prévia ilustrada do Kayke Hub com o nome Kayke e a chamada do site")


def tecnologias():
    parts = [
        f'  <text x="40" y="34" font-family="{MONO}" font-size="11" '
        f'letter-spacing="2" fill="{MUTED}">FERRAMENTAS · DIA A DIA</text>',
        # terminal
        f'  <rect x="40" y="60" width="340" height="250" rx="10" fill="{SURFACE}" '
        f'stroke="{BORDER}"/>',
        f'  <rect x="40" y="60" width="340" height="34" rx="10" fill="{BG}"/>',
        f'  <circle cx="60" cy="77" r="4" fill="{BORDER}"/>',
        f'  <circle cx="76" cy="77" r="4" fill="{BORDER}"/>',
        f'  <circle cx="92" cy="77" r="4" fill="{BORDER}"/>',
        f'  <text x="64" y="130" font-family="{MONO}" font-size="15" '
        f'fill="{ACCENT}">&gt;&gt;&gt; print("olá")</text>',
        f'  <text x="64" y="158" font-family="{MONO}" font-size="15" '
        f'fill="{TEXT}">olá</text>',
        f'  <text x="64" y="196" font-family="{MONO}" font-size="15" '
        f'fill="{MUTED}">&gt;&gt;&gt; 85/86</text>',
        f'  <text x="64" y="224" font-family="{MONO}" font-size="15" '
        f'fill="{TEXT}">quase lá</text>',
        # planilha
        f'  <rect x="430" y="60" width="340" height="250" rx="10" fill="{SURFACE}" '
        f'stroke="{BORDER}"/>',
        f'  <rect x="430" y="60" width="340" height="34" rx="10" fill="{BG}"/>',
        f'  <text x="454" y="83" font-family="{MONO}" font-size="12" '
        f'fill="{MUTED}">planilha.xlsx</text>',
    ]
    for c in range(6):
        for r in range(4):
            x = 458 + c * 46
            y = 116 + r * 40
            fill = ACCENT if (c + r) % 7 == 0 else "none"
            op = ' opacity="0.18"' if fill != "none" else ""
            parts.append(
                f'  <rect x="{x}" y="{y}" width="46" height="40" fill="{fill}"{op} '
                f'stroke="{BORDER}"/>'
            )
    for i, v in enumerate(("12", "16", "25", "18")):
        parts.append(
            f'  <text x="{481 + i * 46}" y="141" text-anchor="middle" '
            f'font-family="{MONO}" font-size="12" fill="{MUTED}">{v}</text>'
        )
    parts += [
        # slides
        f'  <rect x="820" y="60" width="340" height="250" rx="10" fill="{SURFACE}" '
        f'stroke="{BORDER}"/>',
        f'  <rect x="820" y="60" width="340" height="34" rx="10" fill="{BG}"/>',
        f'  <text x="844" y="83" font-family="{MONO}" font-size="12" '
        f'fill="{MUTED}">apresentação</text>',
        f'  <text x="850" y="130" font-family="{SANS}" font-size="18" '
        f'font-weight="700" fill="{TEXT}">Jornada</text>',
        f'  <rect x="850" y="226" width="34" height="54" fill="{ACCENT}" opacity="0.35"/>',
        f'  <rect x="900" y="196" width="34" height="84" fill="{ACCENT}" opacity="0.55"/>',
        f'  <rect x="950" y="166" width="34" height="114" fill="{ACCENT}" opacity="0.8"/>',
        f'  <rect x="1000" y="206" width="34" height="74" fill="{ACCENT}" opacity="0.45"/>',
        f'  <line x1="850" y1="280" x2="1090" y2="280" stroke="{BORDER}"/>',
        f'  <text x="210" y="350" text-anchor="middle" font-family="{MONO}" '
        f'font-size="12" fill="{MUTED}">Python</text>',
        f'  <text x="600" y="350" text-anchor="middle" font-family="{MONO}" '
        f'font-size="12" fill="{MUTED}">Excel · Word</text>',
        f'  <text x="990" y="350" text-anchor="middle" font-family="{MONO}" '
        f'font-size="12" fill="{MUTED}">PowerPoint</text>',
    ]
    return svg(1200, 380, "\n".join(parts) + "\n",
               "Ilustração de um terminal Python, uma planilha e uma apresentação")


def grao():
    content = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" '
        'viewBox="0 0 1000 1000">\n'
        '  <filter id="g">\n'
        '    <feTurbulence type="fractalNoise" baseFrequency="0.85" '
        'numOctaves="2" stitchTiles="stitch"/>\n'
        '    <feColorMatrix type="saturate" values="0"/>\n'
        '  </filter>\n'
        '  <rect width="1000" height="1000" filter="url(#g)" opacity="0.04"/>\n'
        '</svg>\n'
    )
    path = os.path.join(ART, "grain.svg")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("escrito", os.path.relpath(path, ROOT))


if __name__ == "__main__":
    os.makedirs(ART, exist_ok=True)
    os.makedirs(PROJECTS, exist_ok=True)
    write("exercicios.svg", exercicios())
    write("mapa-jornada.svg", mapa())
    write("projects/python-journey.svg", capa_journey())
    write("projects/kayke-hub.svg", capa_hub())
    write("tecnologias.svg", tecnologias())
    grao()
