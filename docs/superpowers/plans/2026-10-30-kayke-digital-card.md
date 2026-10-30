# Cartão Digital Kayke.Dados — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cartão digital de 1 página (HTML/CSS/JS vanilla) para o Kayke, publicado no GitHub Pages em `https://kayke-dados.github.io/kayke-hub/`, com identidade real do GitHub dele (roxo `#a78bfa` sobre `#0d0d0d`, Fira Code), PT/EN, QR, compartilhar/copiar e conteúdo apenas factual do perfil.

**Architecture:** Página única estática. Textos PT embutidos no HTML (SEO/no-JS), EN como dicionário JS que sobrepõe via `data-i18n`. Tokens de design em custom properties CSS. Assets estáticos pré-gerados (avatar, favicon SVG, QR SVG, og-image). Sem build, sem backend, caminhos 100% relativos.

**Tech Stack:** HTML5 semântico, CSS3 (custom properties, grid/flex, `prefers-reduced-motion`), JavaScript vanilla (ES2020), Python 3 (scripts de assets e testes, `segno` puro-python para QR, `Pillow` opcional para og-image).

**Spec:** `docs/superpowers/specs/2026-10-30-kayke-digital-card-design.md` (vital para conteúdo real — executor DEVE ler os dois)

## Global Constraints

- URL final obrigatória: `https://kayke-dados.github.io/kayke-hub/` (constante `SITE_URL` em `js/main.js`, usada no botão copiar/compartilhar).
- Paleta exata: fundo `#0d0d0d`, acento `#a78bfa`, acento-2 `#8b5cf6` (só decoração/grande), texto `#e0d7ff`, título `#fff`; cor de erro/toast neutra escura.
- Tipografia: Fira Code 400/600 (Google Fonts, `preconnect`, `display=swap`) com fallback `ui-monospace, SFMono-Regular, Menlo, monospace`; corpo em `system-ui`.
- Conteúdo real apenas: "Estudando para me tornar Analista de Dados"; capítulos Python-Journey 01–05 ✓ concluídas (12/16/25/18/5 estudos), 06 funções ◐ (10, `ex105` pendente), 07 — reservado; 85 exercícios; base: Curso em Vídeo; techs: Python, Windows, Office. Frases reais: "Consistência > intensidade", "feito no ritmo de quem está aprendendo". Nada inventado além desses fatos do perfil.
- Links: GitHub `https://github.com/kayke-dados`, Instagram `https://www.instagram.com/kayke.dados/`, Python-Journey `https://github.com/kayke-dados/Python-Journey`, e-mail `mailto:kayke0812@proton.me` (mailto discreto, ícone; aprovado pelo usuário).
- Todos os caminhos de assets relativos (`assets/...`) — funcionam em `/kayke-hub/` e localhost.
- Idioma padrão PT-BR (`<html lang="pt-BR">`); EN via dicionário; chave `localStorage`: `kd-lang`.
- `prefers-reduced-motion: reduce` desliga digitação e animações.
- Git: commits frequentes, conventional commits, em português curto. Push só no repo `kayke-dados/kayke-hub` e apenas na Task final (autorização já dada para esse repo).
- A skill `design-taste-frontend` deve ser carregada e aplicada no início da Task 4 (estilização). Duplicação de skills/plugins: proibida.

## Review Focus

1. **Pages em subdiretório:** um caminho absoluto `/assets/...` no HTML/CSS/JS quebraria o site → tarefa 5 testa absolutamente todo `href|src|url()` ser relativo (teste `test_paths.py`).
2. **i18n fantasma:** chave `data-i18n` no HTML sem equivalente no dicionário EN (ou vice-versa) renderiza `undefined` → teste `test_i18n.py` cruza as duas fontes.
3. **QR ilegível:** QR escuro sobre fundo escuro, ou SVG quebrado → QR gerado com módulos escuros `#0d0d0d` sobre quiet zone branca ≥4 módulos; teste valida existência e decodificação do conteúdo embutido. O usuário deve confirmar escaneando antes do push (task 7).
4. **Usuário sem JS:** página inteira em `undefined`/vazia → textos PT inline no HTML; JS só sobrepõe EN e adiciona extras (task 6 testa duplicando conteúdo). 
5. **Clipboard em iOS/HTTP:** `navigator.clipboard` falha → fallback `execCommand('copy')` com toast; testado por inspeção de código do listener (task 6).

---

### Task 1: Assets image estáticos (avatar, favicon, QR, og-image)

**Files:**
- Create: `tools/make_assets.py`, `tools/gen_og.py`, `assets/avatar.png`, `assets/favicon.svg`, `assets/qr-code.svg`, `assets/og-image.png`
- Test: `tests/test_assets.py`

**Interfaces:**
- Produces: `assets/avatar.png` (400×400, baixado de `https://avatars.githubusercontent.com/u/318036195?s=400&v=4`); `favicon.svg` (quadrado escuro, `"K."` em acento `#a78bfa`); `assets/qr-code.svg` (segno, dados: SITE_URL, cores fg `#0d0d0d`/bg `#ffffff`, `scale=10`, `border=4`); `assets/og-image.png` (1200×630: fundo `#0d0d0d`, título "Kayke", "Python e Dados" em acento, via Pillow; se Pillow indisponível → gerar PNG só do QR ampliado mantendo base escura, função `pilih_og_fallback`).

- [ ] **Step 1: Escrever teste que falha** — `tests/test_assets.py`: 4 asserts de existência + dimensões (Pillow se disponível) + primeira linha do SVG do favicon contém `<svg` + QR contém `viewBox`.
- [ ] **Step 2: Rodar e ver falhar** — `python3 -m unittest tests.test_assets -v` → FAIL (arquivos não existem).
- [ ] **Step 3: Implementar** — instalar `segno` (puro-Python, gerou SVG sem deps) e tentar `pillow`; se pillow falhar, `tools/gen_og.py` usa variante QR-only (PNG/SVG do QR ampliado sobre base escura). Baixar avatar com `urllib.request`.
- [ ] **Step 4: Rodar e ver passar** — unittest PASS.
- [ ] **Step 5: Commit** — `git add assets tools tests && git commit -m "feat: assets estáticos (avatar, favicon, QR, og-image)"`

### Task 2: Esqueleto HTML semântico com conteúdo real PT (texto inline)

**Files:**
- Create: `index.html`
- Test: `tests/test_html.py`

**Interfaces:**
- Produces: landmarks `<header id="card">, <main> (seções #links, #estudos), <footer id="share">`; cada elemento tradutível com `data-i18n="chave"` (chaves ver Tabela I18n da Task 5); `<head>` com meta SEO/OG/Twitter completos + JSON-LD `Person` (name "Kayke", url, sameAs GitHub/Instagram, jobTitle "Estudante de Análise de Dados").

- [ ] **Step 1: Teste que falha** — `tests/test_html.py` (stdlib `html.parser`): existem `<html lang="pt-BR">`, `<title>`, um único `<h1>`, meta og:title/og:image/og:url (valor `https://kayke-dados.github.io/kayke-hub/`), JSON-LD parseável, todos os 4 links com `href` exatos da Global Constraints, links externos com `target="_blank" rel="noopener"`, `data-i18n` presente nos textos tradutíveis, `<meta name="viewport">`.
- [ ] **Step 2: Rodar e ver falhar** — FAIL (index.html inexistente).
- [ ] **Step 3: Implementar** — estrutura: header (avatar png, `<h1>Kayke</h1>`, linha typewriter `<span data-i18n=...>`), 4 cartões de link (`<a class="link-card">` com ícone SVG inline), seção estudos (trilha dinâmica pré-renderizada em PT: linhas dos capítulos + chips de tech + futuro), footer (QR img, botões copiar/compartilhar `<button>`, bordão, ano `<span id="year">`).
- [ ] **Step 4: Rodar testes** — PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: esqueleto HTML semântico com conteúdo real"`

### Task 3: CSS — identidade visual, cartões, responsividade, acessibilidade

**Files:**
- Create: `css/style.css`
- Test: `tests/test_css.py`

**Interfaces:**
- Consumes: classes definidas no index.html da Task 2 (nata fixa: `.link-card`, `.card`, `.chip`, `.btn`, `.lang-toggle`, `.skip-link`, `.track-row`).
- Produces: tokens `:root{--bg:#0d0d0d;--accent:#a78bfa;--accent-2:#8b5cf6;--text:#e0d7ff;--heading:#fff;...}`; grid do cartão; dark base; foco visível (`outline: 2px solid var(--accent)`), contraste AA números conferidos na implementação.

- [ ] **Step 1: Teste que falha** — `tests/test_css.py`: `style.css` contém os tokens exatos acima, `prefers-reduced-motion` presente, `@media` para ≤480px presente, nenhum `url(` absoluto (`http`), `.link-card:focus-visible` presente.
- [ ] **Step 2: Rodar e ver falhar** — FAIL.
- [ ] **Step 3: Implementar** — aplicar skill **design-taste-frontend** antes de escrever (registrar aplicação no relatório); estilizar conforme spec §Identidade: dark minimal, cartões borda 1px rgba(167,139,250,.25), hover com elevação sutil, tipografia Fira Code p/ títulos + system-ui p/ corpo, mobile-first.
- [ ] **Step 4: Rodar testes** — PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: CSS da identidade Kayke.Dados"`

### Task 4: JS — i18n PT/EN, copiar/compartilhar, digitação, ano

**Files:**
- Create: `js/main.js`
- Test: `tests/test_i18n.py` + `tests/test_i18n_live.mjs` (via `node`)

**Interfaces:**
- Consumes: `data-i18n` no HTML (Task 2), classes CSS (Task 3), `SITE_URL` constante.
- Produces: `const SITE_URL="https://kayke-dados.github.io/kayke-hub/"`, `const I18N = {en:{...}}` (dict), função `applyLang(lang)` global.

- [ ] **Step 1: Teste que falha** — `tests/test_i18n.py` lê `main.js`, extrai chaves do dict EN por regex, cruza com `data-i18n` do index.html: sem chave órfã/faltando. `tests/test_i18n_live.mjs`: `node` executa `applyLang("en")` num DOM fake mínimo (objeto com quantas chaves sinonimamente) — simplificando: node --check + verificação textual de que cada chave do dict aparece no HTML. Fallback se o DOM emulável não for trivial: `node --check js/main.js` + cruzamento textual chave↔HTML, e a limitação vai registrada no relatório de testes.
- [ ] **Step 2: Rodar e ver falhar** — FAIL (sem main.js/dict).
- [ ] **Step 3: Implementar** — módulo único: dict EN (traduz os textos PT reais — ver tabela abaixo), listener no `.lang-toggle` ( alterna pt/en, salva `localStorage`, troca `document.documentElement.lang`), `copyLink()` (navigator.clipboard → fallback execCommand, toast `.toast`), `shareCard()` (navigator.share → fallback copyLink), efeito typewriter do headline com array de frases reais PT/EN, `new Date().getFullYear()`.
- [ ] **Step 4: Rodar testes** — PASS (cruzar HTML↔dict).
- [ ] **Step 5: Commit** — `git commit -m "feat: i18n PT/EN, copiar, compartilhar, digitação"`

### Task 5: Verificação integrada de caminhos + links externos + desempenho

**Files:**
- Create: `tests/test_paths.py`, `tests/test_links.py`
- (Test): roda todos os testes anteriores de uma vez: `python3 -m unittest discover -s tests -v`

**Interfaces:**
- Consumes: index.html, css/style.css, js/main.js, assets/* das Tasks 1–4.

- [ ] **Step 1: Teste que falha** — `tests/test_paths.py`: nenhum `href|src|url()` começa com `http://localhost`, `/assets`, `C:\`; todos os arquivos referenciados existem. `tests/test_links.py`: cada URL externo (4 links + permalink + CDN Google Fonts) responde HTTP 200/3xx via GET com stream truncado (fallback se HEAD 405).
- [ ] **Step 2: Rodar e ver falhar** — deve PASSAR se tudo certo; FALHAS reais tratadas aqui (corrigir e re-rodar).
- [ ] **Step 3: Corrigir problemas** + re-rodar suíte completa → verde.
- [ ] **Step 4: Commit** — `git commit -m "test: verificação de caminhos e links"`

### Task 6: README, relatórios, ZIP (entrega FASE 8)

**Files:**
- Create: `README.md`, `reports/01-auditoria-ambiente.md`, `reports/02-skills-utilizadas.md`, `reports/03-mcps-plugins.md`, `reports/04-relatorio-testes.md`, `reports/05-publicacao-github-pages.md`, `kayke-dados-cartao-digital.zip` (via `python3 -m zipfile -c`)

**Interfaces:**
- Consumes: resultados das Tasks 1–5 (quem testou o quê — invisível ao executor, colado no 04).

- [ ] **Step 1: Escrever README** — em PT: objetivo, estrutura, como editar (trocar cores nos tokens, textos na tabela i18n, `SITE_URL`, regenerar QR `python3 tools/qr_build.py`), limitação honesta EN-somente-com-JS, passos Pages (criar branch main, Settings→Pages→Deploy from branch, URL `https://kayke-dados.github.io/kayke-hub/`, ativar Enforce HTTPS).
- [ ] **Step 2: Escrever relatórios** — auditoria do ambiente real (skills/presence real listada), skills aplicadas com local onde cada regra entrou, MCPs/plugins (superpowers, ausência de MCPs — honesto), teste executado com saídas coladas, publicação passo-a-passo.
- [ ] **Step 3: ZIP** — `python3 -m zipfile -c kayke-dados-cartao-digital.zip index.html css js assets README.md reports tools tests docs` (sem `.git`).
- [ ] **Step 4: Verificar ZIP** — `python3 -m zipfile -t` + listagem.
- [ ] **Step 5: Commit** — `git commit -m "docs: README, relatórios e pacote de entrega"`

### Task 7: Publicação no repo autorizado (única ação externa)

**Files:** — (remoto: `github.com/kayke-dados/kayke-hub`)

- [ ] **Step 1: Mostrar pré-corrida** — `git remote -v` (configurar `origin` para o repo se não existir), resumo do que será enviado.
- [ ] **Step 2: Push** — `git push -u origin main:main` no repo `kayke-dados/kayke-hub` (autorização explícita dada nesta sessão). Se não houver credencial, entregar comandos exatos para o usuário rodar.
- [ ] **Step 3: Instruções pós-push** — ativar Pages no repo (Settings → Pages → main/(root)); mensagem final com URL esperada e checklist "escanear o QR e confirmar" (única validação impossível automatizar aqui).
- [ ] **Step 4: Commit final** (se algum ajuste pós-revisão foi necessário) — `git commit && git push`.

---

## Tabela I18n (chaves-cânone — Task 2 cria os `data-i18n`, Task 4 cria o dict EN)

`tagline, moto, link_github, link_instagram, link_journey, link_email, about_title, about_p1, about_p2, trail_title, trail_col_cap, trail_col_status, trail_row_1..7 (nome/), status_done, status_partial, status_planned, tech_title, tech_note, future_title, share_title, share_hint, btn_copy, btn_share, footer_note, toast_copied, toast_fail, lang_label`
