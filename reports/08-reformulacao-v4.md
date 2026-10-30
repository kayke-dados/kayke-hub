# Relatório 08 — Reformulação v4 (editorial minimalista, ametista)

Data: 2026-10-30
Base: v3 (commit `782311b`, "Dark Editorial Tech Portfolio", azul `#60A5FA`)

## Pedido (prompt v4)

- Reformulação completa com estética **minimalista editorial**: espaço em branco generoso,
  hierarquia por tipografia, bordas finas, menos caixas.
- Paleta fechada: ground `#141414`, superfícies `#202020`, acento `#9B8AC4` (ametista),
  texto `#F5F3EF`, secundário `#A6A29C`, bordas `#343434`.
- Proibido azul/verde/laranja/amarelo de identidade, gradientes, neon e sombras pesadas.
- Manter todas as funcionalidades e **não inventar** experiência, projetos ou certificados.
- **Não publicar automaticamente** sem autorização.

## O que mudou

### Identidade

| Antes (v3) | Depois (v4) |
|---|---|
| azul `#60A5FA`, deep `#2563EB` | ametista `#9B8AC4`, hover `#B0A0D0` |
| amarelo `#FACC15` em detalhes | removido; `.spark`/caret/terminal-dot agora são ametista |
| fundo `#080B12` / superfície `#131B29` | ground `#141414` / superfície `#202020` |
| texto `#F4F7FB` / secundário `#929CAD` | texto `#F5F3EF` / secundário `#A6A29C` |

`--bg-2` e `--accent-deep` deixaram de existir. Hover de superfícies usa
`rgba(255,255,255,0.04)`; linhas de lista usam hairline `--border` sem preenchimento.

### Composição

- Containers com borda/cartão em **Jornada**, **Tecnologias** e **Contato** viraram
  listas editoriais: hairline superior + `border-bottom` por linha, fundo transparente.
- Removidas as listras zebradas (a separação agora é só a hairline).
- Chips: raio `999px → 6px`, borda fina, sem preenchimento pesado.
- Painéis (`hero-visual`, projetos, bloco de contato) raio `14px → 10px`.
- Título display limitado a `clamp(2.75rem, 8vw, 4rem)` (menos "grito", mais editorial).
- Seções com respiro maior: `clamp(80px, 12vw, 160px)`.
- Sem gradientes, sem sombras, sem glow.

### Correções vindas da revisão independente

- **Conteúdo**: "6 capítulos concluídos" → **5 concluídos** (o capítulo 06 está em 9/10,
  com `ex105` pendente). Corrigido no hero, na seção Sobre e no texto do projeto, em PT e EN.
- "verdade em tempo real" → "dados atualizados manualmente" (os números são estáticos).
- "Só o que já existe de verdade" ajustado para separar claramente projetos reais de "Em desenvolvimento".
- **Contraste**: hover do botão sólido usava texto `--ink` sobre `--accent-hover` (2.16:1).
  Agora mantém `--bg` sobre o ametista (5.99:1 normal; hover mais claro, ainda AA).
- **A11y**: `aria-current="location"` na seção ativa; rótulo do menu mobile sincronizado em
  abrir/fechar/link/troca de idioma; `aria-label` e `alt` traduzidos (`data-i18n-aria`/`data-i18n-alt`);
  símbolos decorativos (`●`, dot do terminal) com `aria-hidden`; segundo heading do contato virou `h3`;
  `role="list"` redundante removido do `<ol>`.
- **Sem JS**: classe `.js` no `<html>` (script inline de 1 linha) faz o menu mobile só se esconder
  quando há JS; sem JS os links continuam visíveis e o hambúrguer não aparece.
- **Storage seguro**: `localStorage` em `try/catch` — modo privado/restrito não derruba o script.
- **Digitação**: token de geração elimina corrida entre o loop antigo (em pausa) e o novo ao trocar idioma.
- **Toque**: `.nav-toggle`/`.lang-toggle` com 44px mínimos; links de rodapé e de projeto com padding.
- **Barras no mobile**: em ≤480px o rótulo e a contagem ficam na primeira linha e a barra ocupa a linha inteira.
- **Cópia**: fallback restaura o foco no botão; `shareData.title` acompanha o idioma.
- **SEO**: `og:image:alt`, `twitter:image:alt`, `theme-color`; repositório removido de `sameAs`
  (não é perfil) e `knowsAbout` adicionado.
- **Mobile**: o endereço de e-mail não é mais escondido em telas pequenas.

## Verificação

| Checagem | Resultado |
|---|---|
| `python3 -m pytest tests/ -q` | **61 passed, 1 skipped** (Pillow ausente, skip esperado) |
| `node --check js/main.js` | OK |
| Lint design-taste | **0 FAIL, 9 WARN** (bordas intencionais + em-dashes do conteúdo) |
| Paleta antiga em produção | nenhuma ocorrência de `#60A5FA`, `#080B12`, `#FACC15`, `#2563EB`, `#a78bfa` |
| Contraste AA | texto 16.6:1; secundário 7.25:1 (bg) / 6.42:1 (surface); acento 5.99:1 / 5.30:1; botão sólido 5.99:1 |
| Assets | favicon, QR e og-image regenerados com `#141414`/`#9B8AC4` |

Novos testes: consistência da contagem de capítulos, dados declarados como manuais,
texto do ground no hover do botão sólido, fallback do menu sem JS e chaves `data-i18n-alt`.

## Limitações honestas

- Sem Chrome/Chromium no ambiente (Android/Termux): não houve Lighthouse nem inspeção visual
  em navegador real. A verificação foi por testes automatizados, lint e leitura do CSS.
- A fonte continua **Manrope** (permitida no prompt) + **IBM Plex Mono** só em detalhes técnicos.
- A paleta de bordas `#343434` tem contraste não-textual baixo (~1.5:1); foi mantida porque o
  prompt fixa o valor — a indicação de interação vem de texto, acento e foco visível, não da borda.
- **Nada foi publicado**: aguardando autorização explícita para commit/push e build do Pages.
