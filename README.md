# Kayke Hub

**Portfólio pessoal de Kayke** — estudante de Python e análise de dados, construindo a trajetória em público.

[Site ao vivo](https://kayke-dados.github.io/kayke-hub/) · [Python-Journey](https://github.com/kayke-dados/Python-Journey) · [GitHub](https://github.com/kayke-dados) · [Instagram](https://www.instagram.com/kayke.dados/) · [E-mail](mailto:kayke0812@proton.me)

![tests](https://github.com/kayke-dados/kayke-hub/actions/workflows/tests.yml/badge.svg)
![licença](https://img.shields.io/badge/licen%C3%A7a-MIT-0B0E0C?style=flat-square)

Página única, estática e bilíngue. A direção visual é **Quiet Tech — editorial developer portfolio**: fundo quase preto esverdeado, verde suave como assinatura, tipografia expressiva e composição assimétrica com bastante espaço vazio.

<p align="center">
  <img src="assets/og-image.png" alt="Prévia social do Kayke Hub" width="640" />
</p>

## O que tem

- **Apresentação** — nome, o que estuda, para onde vai e a frase "Consistência > intensidade."
- **Sobre** — trajetória contada em primeira pessoa, sem atalhos.
- **Jornada** — o que já conhece, o que está estudando, objetivos futuros e o painel real do **87 de 87 exercícios** do Python-Journey (12, 16, 25, 18, 5, 11).
- **Projetos** — Python-Journey e Kayke Hub com links; CalculaFood e Marca Aí marcados como **em desenvolvimento**, sem link inventado.
- **GitHub ao vivo** — repositórios públicos via API, com cache de 10 min e fallback para o perfil.
- **Contato** — GitHub, Instagram, e-mail, QR Code, copiar endereço e Web Share API.
- **PT/EN** — dicionário `data-i18n`, inglês natural, preferência persistida; português é o padrão.
- **Acessibilidade** — contraste AA, foco visível, alvos de 44 px, `aria-current`, `prefers-reduced-motion` e menu funcional sem JavaScript.

## Stack e estrutura

HTML5, CSS3 e JavaScript puro — sem framework, bundler ou backend. Fontes **Manrope** (títulos), **Inter** (texto) e **JetBrains Mono** (detalhes técnicos).

```
index.html          página única (PT inline; EN via js/main.js)
css/style.css       design system Quiet Tech e layout mobile-first
js/main.js          i18n, navegação, copiar/compartilhar e GitHub
assets/             avatar, favicon, QR, og-image e capas dos projetos
tools/make_assets.py  gerador de avatar, favicon, QR e og-image
tests/              testes de HTML, CSS, contraste, i18n, links e caminhos
docs/superpowers/   specs e planos do projeto
reports/            histórico de auditoria, testes e versões
vercel.json         configuração de cache/cabeçalhos para a Vercel
```

## Rodar e testar

```bash
python3 -m http.server 8000        # http://localhost:8000
python3 -m pytest tests/ -q        # inclui contraste, i18n e caminhos
node --check js/main.js
```

## Publicar na Vercel

O projeto é estático: a Vercel detecta e publica sem build.

1. Importe o repositório na Vercel.
2. **Framework Preset:** `Other`. **Build Command:** vazio. **Output Directory:** `.`
3. Depois do primeiro deploy, copie a URL final.

### Onde trocar a URL de produção

A URL fica em **um lugar só**: `SITE_URL` no topo de `js/main.js`.
Ela alimenta copiar/compartilhar e o `tools/make_assets.py` (QR e og-image).

```js
const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";
```

Enquanto a Vercel não tiver URL definitiva, o valor continua sendo o GitHub Pages, que é o endereço real e ativo. Ao publicar, troque pelo domínio e rode:

```bash
python3 tools/make_assets.py       # regenera QR e og-image com a nova URL
```

Não invente a URL antes de ela existir. O `canonical`, o Open Graph e o `sitemap.xml` podem ser atualizados no mesmo momento.

## Design

Paleta Quiet Tech:

| Token | Hex |
|---|---|
| `--bg` | `#0B0E0C` |
| `--bg-2` | `#111612` |
| `--surface` | `#171C18` |
| `--border` | `#293129` |
| `--text` | `#F0F1E9` |
| `--muted` | `#A3AAA1` |
| `--accent` | `#B9D982` |
| `--accent-2` | `#849D68` |

O verde aparece com moderação: botões, indicadores, links selecionados e detalhes. Sem gradientes exagerados, sem neon, sem elementos decorativos sem função.

## Notas honestas

- O **EN depende de JavaScript**; sem JS, o visitante vê o PT.
- Os números do Python-Journey são **atualizados à mão** e conferidos pelos testes; a data de conferência aparece no site.
- **CalculaFood** e **Marca Aí** não têm repositório público; aparecem como ideias em desenvolvimento, sem tecnologia ou resultado inventado.
- A API do GitHub é pública e sem token; se falhar, o bloco mostra o link para o perfil.
- Sem Chrome e sem Pillow no ambiente: a verificação é por testes, lint e inspeção — não por Lighthouse. O teste de dimensões de imagem fica skipado.
- O código do site foi desenvolvido com auxílio de IA, a partir das decisões e do conteúdo de Kayke; o processo está documentado no repositório.

---

Feito no ritmo de quem está aprendendo — consistência > intensidade.

[Kayke](https://github.com/kayke-dados) · [Python-Journey](https://github.com/kayke-dados/Python-Journey) · MIT
