# Relatório 11 — Reformulação v6 (`type-only-statement`)

## Pedido

Implementar o `prompt.md` v6 no site: hero tipográfico, sobre com ficha, projetos detalhados, jornada em escada, Python Journey capítulo por capítulo, "Atualmente", diário, contato invertido, integração com a API do GitHub, PT/EN, responsivo e acessível — mantendo a paleta e sem inventar dados.

## Direção

Sorteio `type-only-statement` ("Type and nothing else", seed 5142264), com o hero `stacked-name-two-inks`:

- O nome **Kayke / Hub** ocupa duas linhas, em duas tintas (`--text` e `--accent`), com máscara de entrada.
- O texto vem primeiro; a faixa de 86 exercícios entra como figura secundária, não como hero.
- Seções com posições diferentes: ficha lateral no sobre, projetos em blocos editoriais, jornada em escada, listas de dois extremos, contato como display e rodapé com o nome primeiro.
- O contato inverte a página: campo `#F5F3EF`, texto `#141414`, QR com `mix-blend-mode: multiply`.

## O que mudou

| Área | v6 |
|---|---|
| Hero | nome em duas linhas, status real `85/86 · 5 capítulos · ex105` |
| Sobre | ficha (foco, base, agora, depois) + prosa + `Ex103` real |
| Projetos | Python-Journey e Kayke Hub detalhados; "Em desenvolvimento" separado |
| GitHub | API pública, cache de 10 min em `sessionStorage`, fallback e estados |
| Jornada | 4 etapas em escada + 7 capítulos com contagens reais |
| Atualmente | 3 frentes abertas + radar (POO, SQLite, análise, web) |
| Diário | 3 marcos reais, sem datas inventadas |
| Contato | e-mail display, links, QR, copiar e compartilhar |
| Rodapé | wordmark grande, links, nota de IA e voltar ao topo |

## Dados reais preservados

- 85 de 86 exercícios; capítulo 06 em **9/10**; `ex105` em aberto; capítulo 07 reservado.
- Contagens por capítulo: **12 / 16 / 25 / 18 / 5 / 9-10 / —**; a soma dos inteiros é 85.
- Nenhuma data, certificação, cargo ou projeto inventado.

## GitHub API

`https://api.github.com/users/kayke-dados/repos?sort=pushed&per_page=6`, sem token. O bloco só busca quando chega perto da viewport (`IntersectionObserver`, `rootMargin: 300px`), guarda o resultado por 10 minutos e, em erro/limite, mostra um link para o perfil. As descrições passam por limpeza de emoji e o DOM é montado com `createElement`/`textContent`.

## i18n e acessibilidade

- `I18N.en` com todas as 150 chaves usadas no HTML; PT fica no HTML e é cacheado em `data-default-pt`.
- `data-i18n-aria` e `data-i18n-alt` para rótulos e alts; `lang` do documento muda junto.
- Um `h1`, `aria-labelledby` nas seções, skip link, foco visível, alvos de 44 px, `prefers-reduced-motion` e menu mobile com `aria-expanded`.
- O contato claro usa `outline-color: var(--bg)` para o foco continuar legível.

## Verificação

```bash
python3 -m pytest tests/ -q          # 61 passed, 1 skipped
node --check js/main.js              # OK
taste lint index.html css/style.css js/main.js   # 0 FAIL, 0 WARN
```

## Limites

- Sem Chrome/Chromium no ambiente: não foi possível rodar `inspect.mjs` nem screenshots; a conferência visual foi por CSS, testes e lint estático.
- Sem Pillow: o teste de dimensões de imagem continua skipado; `og-image.png` não foi regerado.
- A API do GitHub é pública e pode limitar por IP; o fallback cobre esse caso.
