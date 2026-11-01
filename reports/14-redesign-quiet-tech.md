# 14 — Redesign Quiet Tech e preparação para Vercel

**Data:** 01/11/2026
**Direção:** Quiet Tech — editorial developer portfolio
**Hospedagem-alvo:** Vercel (sem publicar)

## Resumo

O Kayke Hub deixou de ser "o caderno de exercícios" (v7) e passou a ser um portfólio editorial quiet tech: fundo quase preto esverdeado, verde suave como assinatura, tipografia expressiva, composição assimétrica e muito espaço vazio. O site continua estático e bilíngue, agora com os dados reais do Python-Journey (**87 de 87 exercícios**, 6 capítulos concluídos) e pronto para a Vercel.

## Identidade visual

- Paleta: `#0B0E0C`, `#111612`, `#171C18`, `#293129`, `#F0F1E9`, `#A3AAA1`, `#B9D982`, `#849D68`.
- Fontes: Manrope (títulos), Inter (texto), JetBrains Mono (detalhes técnicos).
- Contraste AA conferido por testes; verde usado com moderação.

## Principais mudanças

- **Estrutura nova:** Início, Sobre, Jornada (conheço / estudando / objetivos + painel Python-Journey), Projetos, Objetivos e Contato.
- **Hero editorial** com identificador, título em duas linhas, frase "Consistência > intensidade." e um painel de barras com a contagem real dos capítulos.
- **Dados atualizados:** 85/86 → **87/87**; 5 → **6 capítulos**; removido o "ex105 em aberto"; data de conferência visível.
- **Quatro projetos:** Python-Journey e Kayke Hub com links; CalculaFood e Marca Aí como ideias em desenvolvimento, **sem link ou tecnologia inventada**.
- **Barras de domínio removidas:** a jornada mostra o que já existe, o que está em estudo e metas futuras, sem percentuais falsos.
- **Sem "Diário":** a estrutura pedida no prompt não inclui essa seção; o registro de evolução permanece no Python-Journey.

## Funcionalidades preservadas e melhoradas

- PT/EN com dicionário `data-i18n`, inglês natural e preferência persistida.
- QR Code, copiar endereço (com fallback `execCommand`) e Web Share API com fallback.
- Repositórios do GitHub via API, com cache de sessão de 10 min e fallback para o perfil.
- Favicon, Open Graph, Twitter Cards, canonical, JSON-LD, `robots.txt` e `sitemap.xml`.
- Acessibilidade: HTML semântico, foco visível, alvos de 44 px, `aria-current`, menu sem JS e `prefers-reduced-motion`.

## Mobile

- Base mobile-first: uma coluna por padrão e `min-width` para crescer.
- Menu mobile abaixo de 820 px, tipografia fluida com `clamp()`, sem rolagem horizontal (`overflow-x: hidden`).

## Desempenho

- Zero frameworks, bundlers ou dependências de runtime.
- Fontes com `preconnect` e `display=swap`; imagens SVG e PNG; JS pequeno e adiado (`defer`).
- Cache de assets por 1 ano na Vercel via `vercel.json`.

## SEO e acessibilidade

- Title/description próprios, Open Graph e Twitter, canonical, JSON-LD `Person`.
- `lang` dinâmico, skip-link, landmarks e hierarquia de títulos.

## Arquitetura

HTML, CSS e JavaScript puros. Motivada por design, desempenho, simplicidade, SEO e Vercel: o site é uma página estática, então não há ganho real em migrar para framework. Sem build.

## Vercel

- `vercel.json` com `cleanUrls` e cabeçalhos de cache/segurança.
- `SITE_URL` centralizado no topo de `js/main.js`; `tools/make_assets.py` lê esse valor para regenerar QR e og-image.
- **Pendente:** trocar `SITE_URL` pela URL definitiva da Vercel quando ela existir e regenerar os assets. Não inventar a URL.

## Testes executados

- `python3 -m pytest tests/ -q` → **66 passed, 1 skipped** (dimensões de imagem exigem Pillow).
- `node --check js/main.js` → OK.
- Smoke test local (`http.server`): HTML, CSS, JS, favicon, QR, og-image, avatar, capas, robots, sitemap e vercel.json respondem 200.
- XML de favicon, QR e capas validado; og-image em 1200×630.
- Limitação: sem Chrome/Lighthouse no ambiente, a verificação visual fina é por inspeção e testes.

## Arquivos

- Modificados: `index.html`, `css/style.css`, `js/main.js`, `README.md`, `sitemap.xml`, `.gitignore`, `tools/make_assets.py`, `assets/*`, `tests/*`.
- Criados: `vercel.json`, `tests/test_config.py`, `docs/superpowers/specs/2026-11-01-quiet-tech-redesign-design.md`, este relatório.
- Removidos (não usados na nova direção): `assets/art/*`, `assets/readme/*`, `tools/make_art.py`, `tools/make_zip.py`.

## Como rodar

```bash
python3 -m http.server 8000
python3 -m pytest tests/ -q
node --check js/main.js
```

## Próximos passos

1. Importar o repositório na Vercel (preset `Other`, sem build, output `.`).
2. Copiar a URL do deploy e atualizar `SITE_URL` em `js/main.js` + canonical/OG/sitemap.
3. Rodar `python3 tools/make_assets.py` para regenerar QR e og-image.
4. Publicar (somente com autorização).
