# Relatório 02 — Skills utilizadas e onde (FASE 2)

Cada skill abaixo foi *lida e aplicada* (não apenas citada), conforme o pedido do prompt.md.

| Skill | Onde foi aplicada |
|---|---|
| **brainstorming** | design doc `docs/superpowers/specs/2026-10-30-kayke-digital-card-design.md` + perguntas de decisão (idioma, tom, domínio) |
| **writing-plans** | plano `docs/superpowers/plans/2026-10-30-kayke-digital-card.md` (7 tasks, TDD, estruturas) |
| **executing-plans** | modo "nativo" — execução inline com ledger em `.superpowers/sdd/` |
| **test-driven-development** | todo o código: `tests/test_assets.py`, `test_html.py`, `test_css.py`, `test_i18n.py`, `test_paths.py`, `test_links.py` — cada um visto falhando antes do código |
| **design-taste-frontend** | composição "quiet-instrument" do `css/style.css` (coluna 520px, two-ended rows, ledger), lint 0 FAIL, .taste-skill/direction.json |
| **karpathy-guidelines** | HTML/CSS/JS mínimos (zero frameworks, ~6KB JS), ruído zero |
| **systematic-debugging** | 2 bugs de fixture (Collector init, regex do I18N) resolvidos com causa-raiz |
| **verification-before-completion** | nenhuma fase declarada sem comando+saída; limitações documentadas |
| **subagent-driven-development (scripts)** | `sdd-workspace`, `task-brief` para briefs/ledger |
| **using-superpowers** | governou a ativação de todos os acima |

## Skills listadas no prompt e o porquê DOS pares

| Área pedida | Skill/atuação equivalente | Motivo |
|---|---|---|
| UI/UX, Web Design Guidelines, Responsive | `design-taste-frontend` (inclui responsive: media 480px, mobile-first) | única skill de design instalada |
| Accessibility, SEO, Web Performance, HTML5, CSS3, JS | implementadas em `index.html` (semântico, JSON-LD, OG) e `css/style.css` (tokens, contraste, reduced-motion) — testadas por `tests/test_*` | não existem skills dedicadas instaladas |
| TypeScript | **não aplicável** — justificativa: cartão de 1 página, ~150 linhas JS vanilla; TS agregaria build (contraria "sem dependências") | decisão no design doc |
| GitHub Pages, Git Workflow | `README.md` + `reports/05-publicacao-github-pages.md`; commits atômicos | no repo autorizado |
| Code Review | revisão final da branch (revisão externa por subagente) | etapa finish |
| Browser Testing, QA, Lighthouse | `tests/` (31 testes estruturais) + honestidade: browser não existe no Android | relatório 04 |
| Image Optimization | imagens: avatar 400px (escolhido ?s=400), QR/og em PNG/SVG enxutos (8KB/1.6KB) | — |

## Skills preservadas (nada desativado)
- i-have-adhd: disponível, não aplicada (sem solicitação; projeto longo)
- Todo restante do plugin superpowers: íntegro.
