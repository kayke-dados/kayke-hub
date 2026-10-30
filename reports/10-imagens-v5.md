# Relatório 10 — Imagens na v5 (menos seco, mesma paleta)

## Pedido

"Tenta colocar um pouco de imagem em tudo, tá muito seco." A v5 tinha acertado a direção editorial, mas ficou só tipografia e hairlines. A resposta foi criar imagens **do próprio assunto**, sem stock, sem mockup inventado e sem mudar a paleta.

## O que entrou

| Onde | Imagem | Origem real |
|---|---|---|
| Nav | avatar de 30 px | `assets/avatar.png` |
| Hero | faixa de 86 quadrados | 85 resolvidos + `ex105` em aberto |
| Sobre | retrato + caderno de código | `Ex103.py` real, capítulo 06 |
| Jornada | mapa de 7 capítulos | 12/16/25/18/5/9/10/— |
| Projetos | capas do Python-Journey e do Kayke Hub | árvore de capítulos e prévia do site |
| Tecnologias | mesa com terminal, planilha e slides | ferramentas declaradas no conteúdo |
| Contato | QR Code | `assets/qr-code.svg` |
| Rodapé | miniatura da faixa de exercícios | mesmo dado do hero |
| Fundo | grão SVG sutil | textura, não fotografia |

As capas e ilustrações são SVGs desenhados por `tools/make_art.py`, com a paleta v4 (`#141414`, `#202020`, `#F5F3EF`, `#A6A29C`, `#9B8AC4`, `#343434`). O código do "caderno" é um trecho literal de `06-funcoes/Ex103 - Parâmetros Opcionais.py`; a capa do Python-Journey usa a árvore real do repositório.

## Cuidados

- Nenhuma imagem de banco, nenhum resultado de exercício inventado.
- `loading="lazy"` fora do hero; `width`/`height` para evitar layout shift.
- Alt em PT/EN (`data-i18n-alt`) e legendas traduzidas.
- O grão é um `<img>` fixo, decorativo (`alt=""`, `aria-hidden`), porque o teste de caminhos proíbe `url()` no CSS.
- Nada de gradiente, sombra ou card genérico; as imagens são chapadas, com a mesma tipografia e o mesmo acento.

## Verificação

```bash
python3 -m pytest tests/ -q   # 61 passed, 1 skipped
node --check js/main.js
taste lint                    # 0 FAIL, 1 WARN (em-dashes)
```

Sem Chrome/Lighthouse no ambiente; a conferência foi por testes, lint, validação XML dos SVGs e inspeção do HTML/CSS.
