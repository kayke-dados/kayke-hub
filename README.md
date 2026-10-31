<p align="center">
  <img src="assets/readme/banner.svg" alt="Kayke Hub — caderno de exercícios de Python e dados" width="100%" />
</p>

<p align="center">
  <a href="https://kayke-dados.github.io/kayke-hub/"><strong>Site ao vivo</strong></a> ·
  <a href="https://github.com/kayke-dados/Python-Journey">Python-Journey</a> ·
  <a href="https://github.com/kayke-dados">GitHub</a> ·
  <a href="https://www.instagram.com/kayke.dados/">Instagram</a> ·
  <a href="mailto:kayke0812@proton.me">E-mail</a>
</p>

![tests](https://github.com/kayke-dados/kayke-hub/actions/workflows/tests.yml/badge.svg)
![licença](https://img.shields.io/badge/licen%C3%A7a-MIT-141414?style=flat-square)

Portfólio e diário de aprendizado de **Kayke — Python e Dados**. Página única, estática e bilíngue, construída como um **caderno de exercícios**: capa de papel sobre o grafite, fichas de progresso, pastas de projeto com abas, diário em folha de registro e contato em cupom destacável. O caderno é o Python-Journey; o site é a sua mesa de trabalho.

## O que tem

- **Capa com identidade real** — nome, ficha de estudante, 85 de 86 exercícios, 5 capítulos concluídos e o ex105 em aberto.
- **Jornada verificada** — ficha de progresso com a faixa dos 86 exercícios, mapa dos capítulos e o registro capítulo por capítulo (12, 16, 25, 18, 5, 9/10, reservado).
- **Projetos como pastas** — Python-Journey e Kayke Hub com abas, capa, objetivo, tecnologias, aprendizado e links; "Em desenvolvimento" separado com clareza.
- **GitHub ao vivo** — repositórios públicos via API, cache de 10 min e fallback para o perfil.
- **Diário e agora** — três marcos reais sem datas inventadas, o que está aberto agora e o radar do que vem.
- **Contato em cupom** — e-mail real, links, QR, copiar endereço e Web Share API, com picote e marca de recorte.
- **PT/EN** — inglês aplicado no navegador por um dicionário `data-i18n`.
- **Acessibilidade** — contraste AA, foco visível, alvos de 44 px, `aria-current`, `prefers-reduced-motion` e menu funcional sem JavaScript.

<p align="center">
  <img src="assets/og-image.png" alt="Prévia social do Kayke Hub com QR Code" width="720" />
</p>

## Stack e estrutura

HTML5, CSS3 e JavaScript puro — sem framework, bundler ou backend. Fontes Newsreader (voz do caderno), Manrope (interface) e IBM Plex Mono (apenas código real). Publicado no GitHub Pages.

```
index.html          página única (PT inline; EN via js/main.js)
css/style.css       design system + caderno, fichas, pastas e cupom
js/main.js          i18n, navegação, copiar/compartilhar e GitHub
assets/             avatar, favicon, QR, og-image, art/ e capas dos projetos
tools/              geração de assets, arte SVG e pacote de entrega
tests/              61 testes + 1 skip
reports/            auditoria, testes, publicação e histórico (v2–v7)
```

## Rodar e testar

```bash
python3 -m http.server 8000        # http://localhost:8000
python3 -m pytest tests/ -q        # 61 passed, 1 skipped
node --check js/main.js
```

## Design

<p align="center">
  <img src="assets/readme/palette.svg" alt="Paleta: #141414, #202020, #F5F3EF, #A6A29C, #9B8AC4, #343434" width="100%" />
</p>

A direção é **the page is the object**: o site é o próprio caderno. O grafite `#141414` é a mesa; as folhas `#F5F3EF` e `#EAE6DE` são o papel; o lilás `#9B8AC4` é a fita, a aba e o carimbo. Texto principal 16,6:1 sobre o papel e sobre o grafite; secundário 6,37:1 no papel e 7,25:1 no escuro; acento 5,99:1 no escuro e 5,4:1 no papel. Zero gradientes, zero sombras; bordas desenhadas com `clip-path` (abas, picote e recorte do cupom) e um picote pontilhado no contato. As imagens de dados são os SVGs reais do Python-Journey, colados como recortes escuros no papel.

## Publicação

`git push` na `main` reconstrói o GitHub Pages (Settings → Pages → `main` / `/ (root)`). Se a URL mudar, atualize `SITE_URL` em `js/main.js` e rode `python3 tools/make_assets.py`.

## Notas honestas

- O **EN depende de JavaScript**; rastreadores e navegadores sem JS veem o PT.
- Os números são **atualizados manualmente** e conferidos pelos testes — sem promessa de tempo real.
- A API do GitHub é pública e sem token; se falhar ou limitar, o bloco mostra o link para o perfil.
- Sem Chrome e sem Pillow no ambiente: a verificação é por testes e lint, não por Lighthouse; o teste de dimensões de imagem fica skipado. Nenhum dado, projeto ou certificação é inventado.
- O código do site foi desenvolvido com auxílio de IA; o processo está documentado no repositório.

---

Feito no ritmo de quem está aprendendo — consistência > intensidade.

[Kayke](https://github.com/kayke-dados) · [Python-Journey](https://github.com/kayke-dados/Python-Journey) · MIT
