# Reformulação v7 — o caderno de exercícios

Data: 2026-10-30
Briefing: `prompt.md` (reescrito pelo Kayke)
Direção visual: `the page is the object` (skill design-taste-frontend, semente 699170723)
Tema: o site é o caderno de exercícios do Python-Journey.

## Resumo

A v7 não corrige a v6: troca a linguagem visual. O grafite vira a mesa; o conteúdo mora em folhas de papel com picote, abas, fita e carimbo. A capa apresenta o caderno; o Sobre é uma carta com retrato e um recorte de código; os projetos são pastas empilhadas com abas; a jornada é uma ficha de progresso com recibo de próximos passos; o diário é uma folha de registro; o contato é um cupom destacável; o rodapé é o verso do cartão. A paleta original foi preservada.

## Brief de design

```
Purpose:    Portfólio e diário de aprendizado de um estudante de Python e dados.
Audience:   Colegas, professores e recrutadores, principalmente no celular.
Tone:       Caderno editorial, minimalista e técnico.
Reference:  Caderno de exercícios, fichário, cupom e cartão-postal.
Palette:    Grafite como mesa, papel como conteúdo, ametista como único acento.
Type:       Newsreader (voz do caderno) + Manrope (interface); IBM Plex Mono só em código.
Memorable:  A página é o caderno: pastas com abas, ficha de progresso e cupom de contato.
Restraint:  Sem gradientes, sombras, grade de cards genérica ou dado inventado.
```

## Decisões da direção

- A skill de direção sorteou três caminhos; o Kayke escolheu **`page-is-the-object`**. O artefato é o caderno de exercícios do Python-Journey, que já existe de verdade.
- O slot de tipografia foi redesenhado por decisão: a fonte sorteada (Anton/Work Sans) é um pôster condensado e contradiz o pedido de elegância e o tom de caderno. A v7 usa **Newsreader** para a voz editorial e **Manrope** para a interface; **IBM Plex Mono** aparece apenas em código real.
- A paleta foi mantida: `#141414`, `#202020`, `#F5F3EF`, `#A6A29C`, `#9B8AC4`, `#343434`. Foram adicionados papéis (`#EAE6DE`, `#DDD8CE`) e um lilás escuro para links no papel (`#5F4F8C`) com contraste 5,4:1.
- Nenhum dado foi inventado. Os números continuam os do Python-Journey: 85 de 86, capítulos 12/16/25/18/5/9-10, ex105 em aberto.

## Estrutura nova

1. **Capa** — folha 5:7 com encadernação, fita, carimbo "em curso", nome, área, status reais e ações.
2. **Sobre** — carta em primeira pessoa, retrato, ficha de fatos e recorte escuro do Ex103.
3. **Projetos** — três pastas com abas (Python-Journey, Kayke Hub e "Em desenvolvimento"), empilhadas com `position: sticky` no desktop e em fluxo no celular; abaixo, a ficha "Do GitHub".
4. **Jornada** — ficha de progresso com 85/86, barra, faixa dos 86 exercícios, mapa dos capítulos, registro capítulo por capítulo; ao lado, o recibo "Agora / No radar / Próximo objetivo".
5. **Diário** — três marcos reais, sem datas inventadas.
6. **Contato** — cupom com picote, notches, e-mail real, links, QR, copiar e compartilhar.
7. **Rodapé** — verso do cartão com borda recortada, assinatura, endereço, selo e nota de transparência sobre IA.

## Funcionalidades preservadas

- PT/EN com dicionário `data-i18n`, persistência em `localStorage` e troca acessível.
- Menu mobile funcional, com fallback sem JavaScript.
- GitHub API pública (sem token), cache de sessão de 10 min, estado de carregamento/erro e fallback para o perfil.
- Copiar endereço com fallback, Web Share API, QR Code, toast acessível.
- Navegação por âncoras, seção ativa, `aria-current`, skip link.
- Contraste AA, foco visível, alvos de 44 px, `prefers-reduced-motion`, alt texts e labels.

## Funcionalidades novas

- Identidade de caderno: encadernação, fita, carimbo, abas com `clip-path`, picote pontilhado, cupom com notches e rodapé em cartão-postal recortado.
- Projetos em pastas empilhadas (cards com função e tamanho próprios, não uma grade repetida).
- Ficha de progresso e recibo de próximos passos.
- Recorte de código como "print" colado no papel.
- Rodapé com selo (retrato) e bloco de endereço.
- Textura de papel em pontos via SVG local.

## Arquivos

| Arquivo | Mudança |
|---|---|
| `index.html` | Reescrito na estrutura da v7 |
| `css/style.css` | Reescrito: tokens, papel, capa, pastas, ficha, diário, cupom, rodapé e responsivo |
| `js/main.js` | Dicionário EN novo, alvos de reveal e seletor da capa |
| `README.md` | Atualizado para a v7 |
| `assets/readme/banner.svg` | Novo banner do caderno |
| `assets/art/paper-dots.svg` | Novo: textura de papel |
| `tests/test_paths.py` | Aceita `url()` relativo e confere o arquivo |
| `reports/13-reformulacao-v7.md` | Este relatório |

Nenhum arquivo foi removido. `prompt.md`, `reports/12` e os documentos de spec/plano ficaram como estavam.

## Testes executados

| Verificação | Comando | Resultado |
|---|---|---|
| Suíte inteira | `python3 -m pytest tests/ -q` | **61 passed, 1 skipped** |
| Sintaxe do JS | `node --check js/main.js` | OK |
| Estrutura | auditoria Python | 1 `h1`, 6 `aria-labelledby`, 21 ids sem duplicata, 151 chaves i18n |
| Caminhos locais | auditoria Python | nenhum `src`/`href` local ausente |
| Links | `tests/test_links.py` | HTTP 200/30x nos links externos |
| Contraste | `tests/test_contrast.py` | tokens escuros e acento aprovados |
| Caminhos do CSS | `tests/test_paths.py` | `url()` relativo existe; nenhum absoluto |
| Lint de direção | `lint.mjs index.html css/style.css js/main.js` | **0 FAIL, 0 WARN** |

## Não executado / limitações

- **Sem Chrome, Chromium ou Playwright no ambiente**: não foi possível rodar o `inspect.mjs`, tirar screenshots em 1440/768/390 nem medir a página renderizada. A validação foi por testes, auditoria de HTML/CSS e leitura do código.
- Lighthouse e teste de dimensões de imagem continuam fora (Pillow ausente; teste skipado).
- O `og-image.png` permanece o da versão anterior; o banner do README foi atualizado.
- Os números da jornada são manuais e conferidos pelos testes.

## Como visualizar

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Nada foi commitado, enviado ou publicado.
