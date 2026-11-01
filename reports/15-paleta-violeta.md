# 15 — Nova paleta grafite + violeta

**Data:** 01/11/2026
**Pedido:** trocar a identidade visual do Kayke Hub para grafite profundo com violeta suave, mantendo a estética moderna, elegante e minimalista.

## Paleta aplicada

| Papel | Hex | Token |
|---|---|---|
| Fundo principal (grafite profundo) | `#0B0D12` | `--bg` |
| Fundo secundário | `#10141C` | `--bg-2` |
| Superfícies (grafite azulado) | `#151A24` | `--surface` |
| Bordas | `#262C38` | `--border` |
| Texto principal (branco suave) | `#F1F0F5` | `--text` |
| Texto secundário (cinza) | `#A1A1AA` | `--muted` |
| Destaque principal (violeta suave) | `#A78BFA` | `--accent` |
| Interações (roxo profundo) | `#7C5CC4` | `--accent-2` |
| Hover de botão | `#8B6FDD` | `--accent-hover` |

`--bg-2`, `--border` e `--accent-hover` são tons derivados da paleta, necessários para hierarquia e estados — não introduzem cores novas.

## Decisões de contraste

- `#7C5CC4` é usado em **bordas, foco, hovers, sublinhados e elementos decorativos**, como pede o papel de "interações".
- Textos pequenos que antes usavam o roxo profundo passaram a usar `#A78BFA` ou `#F1F0F5`, porque `#7C5CC4` sobre o fundo fica em ~3.8:1 (abaixo de AA para texto pequeno).
- O hover do botão primário usa `#8B6FDD` (mistura dos dois violetas) com texto `#0B0D12`, garantindo ~4.9:1.
- Todos os pares são verificados por `tests/test_contrast.py`.

## Onde mudou

- `css/style.css`: tokens, cores de destaque, foco, seleção, gradientes das barras e barra de progresso.
- `index.html`: `theme-color`.
- `tools/make_assets.py` e regeneração de `assets/favicon.svg`, `assets/qr-code.svg`, `assets/og-image.png`.
- `assets/projects/python-journey.svg` e `assets/projects/kayke-hub.svg`.
- `tests/test_css.py` e `tests/test_contrast.py`.
- `README.md`.

## Verificação

- `python3 -m pytest tests/ -q` → **66 passed, 1 skipped**.
- `node --check js/main.js` → OK.
- Favicon, QR e capas com XML válido; og-image em 1200×630.
- Aplicado também no mobile: os tokens são globais e o layout mobile usa as mesmas variáveis.
