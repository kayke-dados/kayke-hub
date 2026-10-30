# Kayke.Dados — Cartão Digital

Cartão digital pessoal de **Kayke | Python e Dados**, com cara de portfólio de estudante — um "diário de bordo" em código, 100% estático (HTML + CSS + JS puro, sem framework, sem backend), pronto para o **GitHub Pages**.

> 🔗 Endereço final: **https://kayke-dados.github.io/kayke-hub/**

Tudo que aparece no cartão é verdade em tempo real: capítulos do [Python-Journey](https://github.com/kayke-dados/Python-Journey) com o estado real, links para o GitHub e o Instagram, e um QR Code para compartilhar o cartão de qualquer celular.

## O que tem no cartão

- **Apresentação pessoal** com headline e bordões reais do perfil ("Consistência > intensidade")
- **Cartões de links** para GitHub, Instagram, Python-Journey e e-mail
- **Trilha em construção** — estado real dos capítulos do Python-Journey, com números auditados contra o repositório (85 exercícios resolvidos de 86; capítulo 06 em 9/10, faltando `ex105`; capítulo 07 reservado)
- **Tecnologias de agora** em categorias honestas: Programação (Python, em aprendizado) · Sistema e ambiente (Windows) · Produtividade (Excel, Word e PowerPoint, nível básico)
- **Seção Projetos** — Python-Journey (em construção, com números reais) e este próprio site (no ar), além dos planos "em desenvolvimento" claramente marcados
- **Transparência sobre IA** — o rodapé declara que o código foi desenvolvido com 100% de auxílio de inteligência artificial, com link para o repositório
- **QR Code** do endereço + botões **Copiar endereço** e **Compartilhar** (Web Share API com fallback)
- **Alternador PT/EN** (o inglês é aplicado no navegador; rastreadores indexam o PT — limitação documentada, não omissão)
- SEO + Open Graph (`og:site_name` incluído), favicon SVG, acessibilidade AA, `prefers-reduced-motion` respeitado

## Estrutura

```
index.html        página única (conteúdo em PT inline; EN via js/main.js)
css/style.css     tokens da marca (cores/fontes) + estilos "quiet-instrument"
js/main.js        SITE_URL, dicionário EN, copiar/compartilhar, digitação
assets/           avatar, favicon.svg, qr-code.svg, og-image.png
tools/            scripts que geram os assets (segno/assets)
tests/            55 testes + 1 skipped (python3 -m pytest tests/ ou python3 -m unittest discover -s tests)
docs/             design + plano (docs/superpowers/)
reports/          auditoria, skills, MCPs, testes, publicação
```

## Como editar

| O que | Onde |
|---|---|
| Cores da marca | `css/style.css` → `:root` |
| Textos PT | direto no `index.html` (`data-i18n` guarda o padrão) |
| Textos EN | `js/main.js` → `const I18N` |
| URL do cartão | `js/main.js` → `SITE_URL` (+ `tools/make_assets.py` para regerar o QR) |
| Capítulos da trilha | `index.html` → `<ol class="trail">` |
| Regenerar assets | `python3 tools/make_assets.py` |

## Publicar no GitHub Pages (passo a passo)

1. Este repositório é o `kayke-dados/kayke-hub` — o conteúdo já está nele.
2. No GitHub: **Settings → Pages** → *Build and deployment* → **Deploy from a branch** → branch **`main`** / pasta **`/ (root)`** → **Save**.
3. Em ~1 minuto o site fica em `https://kayke-dados.github.io/kayke-hub/` (HTTPS automático).
4. Abra o site, escaneie o QR Code da página e confirme que abre o mesmo endereço.
5. Se mudar o nome do repositório/dominio: atualize `SITE_URL`, rode `python3 tools/make_assets.py` e commit.

## Notas honestas

- O **EN só aparece com JavaScript ligado** (rastreadores e no-JS veem PT — é o conteúdo que indexa).
- O código todo foi desenvolvido com **100% de auxílio de IA** — declarado no rodapé do site e assumido aqui.
- **Números auditados, não copiados**: a trilha do site é comparada ao estado real do repositório Python-Journey pelos testes automatizados (`tests/test_v2.py`); ela reflete o branch `main` do repo.
- `og-image.png` foi gerada por script (sem Pillow no ambiente de desenvolvimento); para uma arte mais rica, substitua por um PNG 1200×630 de sua criação.
- Auditoria Lighthouse/navegador real não pôde rodar neste ambiente (Android/Termux, sem Chrome); os testes funcionais estão em `reports/04-relatorio-testes.md` e a auditoria da v2 em `reports/06-evolucao-v2.md`.
