# Relatório 07 — Redesign v3 do Kayke Hub (Dark Editorial Tech Portfolio)

## 1. O que foi pedido e o que foi feito
Redesign visual completo do front-end, preservando identidade, conteúdo real e funcionalidades.
Todo o HTML, CSS e JavaScript foram reconstruídos.

## 2. Nova identidade visual
| Elemento | Antes (v2, quiet-instrument) | Depois (v3, Dark Editorial Tech Portfolio) |
|---|---|---|
| Ground | #0d0d0d | #080B12 |
| Painéis | rgba(violeta, .08) | #0E1420 / #131B29 sólidos |
| Acento | #a78bfa (violeta) | #60A5FA (azul), #2563EB (deep em hover) |
| Destaque | — | #FACC15 (amarelo) só em detalhes vivos: caret, dot do painel, marcador do exercício pendente |
| Texto | #e0d7ff | #F4F7FB · secundário #929CAD (AA ≥ 6:1 comprovado por teste) |
| Tipografia | Fira Code em quase tudo | **Manrope** (títulos 800 e corpo 400/600) · **IBM Plex Mono** só em detalhes técnicos (tags, contadores, labels mono) |
| Composição | coluna única, todo texto à esquerda | hero assimétrico 2 colunas + seções editoriais, header sticky com navegação |
| Cantos | 2px | 6–14px (chip pílula) |

**Idea do redesign:** a jornada real (85/86 exercícios) vira a própria arte do hero — painel `~/python-journey` com barra por capítulo (12 · 16 · 25 · 18 · 5 · 9/10 · reservado), o 1 exercício restante marcado em amarelo. Nenhum número inventado.

**Coisa viva:** digitação no hero (frases reais, respeitando reduced-motion) + estados vivos nos botões.

## 3. Estrutura nova
1. **Header fixo** — marca "Kayke Hub", links Início/Sobre/Jornada/Projetos, alternador PT/EN, **menu mobile** (hamburger acessível, aria-expanded, fecha ao clicar link) e **indicador de seção ativa** (IntersectionObserver)
2. **Hero** (identidade + arte da jornada real)
3. **Sobre** — editorial 2 colunas: fatos reais (foco · base · agora · depois) + texto
4. **Jornada** — ledger dos capítulos com números auditados
5. **Projetos** — 2 blocos reais (Python-Journey destaque; Kayke Hub no ar) + "Em desenvolvimento"
6. **Tecnologias** — 3 blocos: atuais / aprendendo / próximas no radar
7. **Redes e contato** — GitHub, Instagram, e-mail + QR + Copiar + Compartilhar
8. **Footer** — marca, links, ano automático, aviso de IA

## 4. Funcionalidades preservadas (todas)
Alternador PT/EN · links externos com rel=noopener · e-mail · QR Code (regenerado na nova paleta) · Compartilhar (Web Share API + fallback copy/execCommand) · Copiar endereço · toast · ano automático · JSON-LD · Open Graph/Twitter (og:site_name mantido) · favicon regenerado · caminhos relativos (compatível com /kayke-hub/) · prefers-reduced-motion (agora também desliga reveals e digitação extra) · contraste AA (testado: muted 7.1 sobre ground).

## 5. Animações (acabamento premium)
- **Reveals de entrada** com stagger de 70ms, adicionados **apenas via JS** (sem JS = nada escondido)
- Hover/estados em todos os controles: nav, botões, cards de projeto, linhas de contato, chips
- Transform/opacity apenas; `prefers-reduced-motion` desliga tudo e mantém conteúdo
- Animações curtas (160–600ms)

## 6. Verificações executadas
| Verificação | Resultado |
|---|---|
| `pytest tests/` | **57 passed, 1 skipped** (testes de paleta/tokens/fontes de marca atualizados para v3; testes de conteúdo real e anti-invenção mantidos) |
| `taste lint.mjs` | **0 FAIL, 12 WARN** — WARNs defendidos: bordas 1px de componentes/chips/painéis (linguagem editorial do prompt) e travessões "—" (convenção dos nomes reais dos capítulos do Python-Journey). Numeração 01–07 foi removida do hero — trocada pelos **nomes reais dos capítulos** |
| `node --check js/main.js` | OK |
| Contraste (tests/test_contrast.py) | muted 7.11 (bg) / 6.23 (painel); accent 7.74; botão sólido 5.17 — todos AA |
| `inspect.mjs`/screenshots/Lighthouse | **não executável** (Android/Termux sem Chrome) — recomenda-se conferência visual no celular do autor; contraste e estrutura cobertos por testes |

## 7. Arquivos
| Ação | Arquivo |
|---|---|
| Reescrito | `index.html`, `css/style.css`, `js/main.js` |
| Atualizado | `tools/make_assets.py` (paleta), `assets/favicon.svg`, `assets/qr-code.svg`, `assets/og-image.png` (regenerados) |
| Atualizado | `tests/test_css.py`, `tests/test_contrast.py`, `tests/test_html.py` (identidade v3) |
| Atualizado | `README.md`, `tools/make_zip.py` (entrega completa) |
| Criado | `reports/07-redesign-v3.md` (este), `kayke-dados-cartao-digital.zip` regenerado |

## 8. O que ainda precisa de atenção
1. **Conferência visual real** (celular/desktop) — ambiente sem navegador; abrir https://kayke-dados.github.io/kayke-hub/ após publicar
2. **Preview de compartilhamento** (WhatsApp/X) — og-image regenerada 1200×630; cache de plataforma pode demorar
3. **Lighthouse** — rodar em uma máquina com Chrome

## 9. Como publicar
Commit + push na `main` → redeploy automático do Pages (~1 min). Hard refresh (Ctrl+Shift+R) para ver a v3.
