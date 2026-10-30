# Relatório 04 — Testes e revisão (FASE 6)

Executado em 2026-10-30 · Comando-base: `python3 -m unittest discover -s tests -v`

## Resultado consolidado

```
Ran 31 tests in ~1.3s →  OK (skipped=1)
```

| Suíte | Testes | Cobertura |
|---|---|---|
| test_assets | 5 (1 skip) | existência, formato SVG, viewBox do QR, dimensões (1 skip = Pillow, ruling do ambiente) |
| test_html | 8 | lang pt-BR, viewport, h1 único, og:title/og:url/og:image, JSON-LD Person válido, 4 links reais + mailto, rel=noopener, data-i18n≥20, caminhos de assets |
| test_css | 6 | tokens exatos da marca, `prefers-reduced-motion`, media ≤480px, sem url() absoluta, `:focus-visible` |
| test_i18n | 6 | `node --check` OK, cruzamento HTML↔dict sem órfã/fantasma, SITE_URL, clipboard+fallback+share+localStorage presentes |
| test_paths | 4 | sem caminho root-absoluto, todo ref local existe, sobrevive em `/kayke-hub/` |
| test_links | 2 | âncoras externas reais → HTTP 200/3xx (GitHub, Instagram, Python-Journey respondendo) |

## O que NÃO pôde rodar (honestidade, não simulação)

| Teste pedido | Estado | Motivo |
|---|---|---|
| Testes de responsividade **em browser real** | ⚠️ estrutural (media query testada; sem Chrome no Android/Termux) | nenhuma ferramenta de screenshot existe no ambiente |
| Auditoria Lighthouse | ❌ | sem Chromium; reportado em 03 |
| Erros no console | ⚠️ parcial — `node --check` + runtime sem DOM; comportamento de listeners verificado por inspeção de código nos testes |
| Publicação no GitHub Pages | checklist em execução (Task 7) — URLs próprias com 404 esperado até publicar |
| QR Code **escaneado** | ⚠️ teste estrutural (segno determinístico, white bg 4 módulos): **usuário deve escanear na hora** (única validação física impossível de automatizar) |

## Correções aplicadas durante os testes (TDD RED→GREEN reais)

1. `Collector` (fixture do teste HTML) sem atributos inicializados — corrigido no teste.
2. Regex do teste i18n pegava chaves fora do objeto `I18N` — recorte do bloco.
3. `toast_*` estavam no dicionário HTML-bound — movidas para `MESSAGES`.
4. Emoji `✉` substituído por `@` (gate do lint).
5. QR regerado com `viewBox`.

## Acessibilidade (verificada estruturalmente)
- landmarks `header/main/footer/section`, `skip-link` funcional, `role=status` toast
- contraste: texto `#e0d7ff`/`#0d0d0d` ≈ 13.4:1 · `#a78bfa` em texto grande/foco ≈ 7.9:1
- `prefers-reduced-motion` respeto (typewriter estático, anim 0.01ms)
- alvo de toque ≥44px nas linhas (52px) e botões (42px+padding)

## Desempenho (estimativa estática)
- HTML ~9KB · CSS ~10KB · JS ~5KB · imagens: avatar 9.5KB + og 7.8KB + QR 1.6KB + favicon <1KB
- zero JS frameworks, zero web fonts exceto Fira Code (Google Fonts, preload, display=swap, fallback ui-monospace)
- LCP alvo: avatar pré-carregado via `<link rel=preload>`
