# Kayke Hub — Portfólio de Aprendizado

Espaço pessoal de **Kayke | Python e Dados** — portfólio editorial dark ("Dark Editorial Tech Portfolio"): apresentação, redes, projetos, jornada de aprendizado e contato. 100% estático (HTML + CSS + JS puro, sem framework, sem backend), pronto para o **GitHub Pages**.

> 🔗 Endereço final: **https://kayke-dados.github.io/kayke-hub/**

Tudo que aparece no cartão é verdade em tempo real: capítulos do [Python-Journey](https://github.com/kayke-dados/Python-Journey) com o estado real, links para o GitHub e o Instagram, e um QR Code para compartilhar o cartão de qualquer celular.

## O que tem no site

- **Header com navegação** (Início · Sobre · Jornada · Projetos), menu mobile e **seção ativa** destacada durante a rolagem
- **Hero assimétrico** — identidade à esquerda; à direita, a arte é a **jornada real**: barras com os exercícios de cada capítulo do Python-Journey (12 · 16 · 25 · 18 · 5 · 9/10 · reservado)
- **Sobre** editorial com fatos reais ao lado (foco · base · agora · depois)
- **Jornada de aprendizado** — capítulos com números auditados (85 de 86; capítulo 06 em 9/10, faltando `ex105`; capítulo 07 reservado)
- **Projetos** — Python-Journey (em construção, números reais) e este site (no ar), com "Em desenvolvimento" claramente marcado
- **Tecnologias** em três blocos honestos: Conhecimentos atuais · Aprendendo agora · Próximas no radar (Excel, Word e PowerPoint, nível básico — nada além disso)
- **Redes e contato** — GitHub, Instagram, e-mail, QR Code, Copiar endereço e Compartilhar (Web Share API com fallback)
- **Transparência sobre IA** — o rodapé declara que o código foi desenvolvido com 100% de auxílio de inteligência artificial, com link para o repositório
- **Alternador PT/EN** (o inglês é aplicado no navegador; rastreadores indexam o PT — limitação documentada, não omissão)
- SEO + Open Graph (`og:site_name` incluído), favicon SVG, acessibilidade AA, `prefers-reduced-motion` respeitado, animações de entrada que só existem se o JavaScript ligar

## Estrutura

```
index.html        página única em 7 seções (conteúdo em PT inline; EN via js/main.js)
css/style.css     tokens v3 (Dark Editorial Tech Portfolio) + todos os componentes
js/main.js        SITE_URL, dicionário EN, menu mobile, seção ativa, reveals, copiar/compartilhar, digitação
assets/           avatar, favicon.svg, qr-code.svg, og-image.png (paleta v3)
tools/            scripts que geram os assets (segno/assets)
tests/            57 testes + 1 skipped (python3 -m pytest tests/ ou python3 -m unittest discover -s tests)
docs/             design + plano (docs/superpowers/)
reports/          auditoria, skills, MCPs, testes, publicação, evolução v2 e redesign v3
```

## Como editar

| O que | Onde |
|---|---|
| Cores da marca | `css/style.css` → `:root` |
| Textos PT | direto no `index.html` (`data-i18n` guarda o padrão) |
| Textos EN | `js/main.js` → `const I18N` |
| URL do site | `js/main.js` → `SITE_URL` (+ `tools/make_assets.py` para regerar o QR) |
| Capítulos do hero e da jornada | `index.html` → `.bars` e `<ol class="trail">` |
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
