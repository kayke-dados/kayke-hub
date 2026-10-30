# Design — Cartão Digital Kayke.Dados (2026-10-30)

## Intenção e porquê
Cartão digital pessoal com aparência de portfólio de desenvolvedor-estudante ("jornada", não vitrine), hospedado no GitHub Pages (`kayke-dados.github.io/<repo>`), seguindo a identidade visual real do GitHub do Kayke com alternância PT/EN. O público: quem escaneia o QR e chega em 5 segundos — precisa entender quem é, o que ele estuda e como seguir seu progresso.

## Metas, não-metas, anti-metas
- **Metas:** apresentação real, links funcionais, QR, compartilhar/copiar, SEO/OG, favicon, acessibilidade AA, performance (sem frameworks), PT/EN.
- **Não-metas:** inventar experiências; publicar sem autorização; usar o e-mail em texto plano sem opt-in explícito do usuário (está público no perfil — usaremos link `mailto:` discreto).
- **Anti-metas:** esteticamente "mais um template roxo genérico"; depender de CDN/framework obrigatório.

## Restrições
- Estático puro (HTML/CSS/JS), funciona em subdiretório (caminhos relativos).
- Ambiente de dev: Termux/Android — sem navegador automatizado, sem gh CLI, sem zip.
- Conteúdo só do perfil real: capítulos 1–5 concluídos, cap. 6 com `ex105` pendente, 85 exercícios, Curso em Vídeo como base.

## Abordagens consideradas
- **A) Vanilla HTML/CSS/JS, 1 página** — ✅ escolhida. Zero build, SEO excelente, contrata o mandato do prompt (prioriza HTML/CSS/JS) e é o que o GitHub Pages abriga mais rápido. Compensação: i18n à mão (`data-i18n` + dicionário JS).
- **B) SSG (Astro/11ty)** — rejeitada: toolchain desnecessária para 1 página em ambiente Android; lento para verificar.
- **C) React/Vue SPA** — rejeitada: SEO pior, build obrigatório, zero ganho para uma página de cartão.

## Decisões tomadas (com o usuário)
- **Idioma:** alternador PT/EN. PT é o padrão (idioma do perfil real). Persistência via `localStorage`, `<html lang>` atualizado, textos todos via dicionário; URLs/links não traduzíveis.
- **Tom:** estudante em jornada. Headline real: "Estudando para me tornar Analista de Dados". Progresso real do Python-Journey (capítulos 1–6 com estado verdadeiro). Frases reais do perfil como bordões ("Consistência > intensidade").
- **Domínio:** GitHub Pages `kayke-dados.github.io/<repo>` (afeta QR, OG url, botão copiar — centralizado em `js/main.js` como constante de config, fácil de trocar).

## Identidade visual (do GitHub)
- Fundo `#0d0d0d`; acento `#a78bfa` (roxo suave, contraste AA em texto grande e títulos); acento secundário `#8b5cf6` (apenas em decoração, não em texto pequeno); texto `#e0d7ff`/`#fff`; são exatamente as cores dos badges/stats do perfil.
- **Tipografia:** Fira Code (a fonte do banner do perfil) para títulos/etiquetas — via Google Fonts subset (pesos 400/600) com preconnect e `display=swap`; corpo em stack nativo (system-ui) para performance. Fonte de fallback `ui-monospace` caso o CDN falhe.
- **Estética:** dark, minimalista, monoespaçada — "diário de bordo de código". Cartões com borda `1px` roxo translúcido, cantos arredondados suaves; sem gradientes chamativos.

## Arquitetura / estrutura de arquivos
```
/
index.html          # única página, semanticamente marcada
css/style.css       # tokens CSS (custom properties) + estilos
js/main.js          # i18n, copiar/compartilhar, efeito de digitação, ano no rodapé
assets/
  favicon.svg       # "K." roxo sobre escuro
  qr-code.svg / png # estático, gerado offline na fase de dev para a URL final
  avatar.png        # salvo do GitHub (https://avatars.githubusercontent.com/u/318036195)
  og-image.png      # banner do cartão para Open Graph
README.md           # como editar, como publicar
reports/            # relatórios de auditoria, skills, MCPs, testes
docs/superpowers/   # este design + planos
prompt.md           # preservado, intocado
```

## Componentes da página
1. **Head:** meta SEO + OG/Twitter, favicon SVG, `lang="pt-BR"`, preloads.
2. **Header (cartão):** avatar, nome, headline com efeito de digitação (respeita `prefers-reduced-motion`), alternador PT/EN (botão com `aria-label`).
3. **Cartões de links (interativos):** GitHub, Instagram, Python-Journey, E-mail — ícone, label, hover/focus visíveis, `target="_blank" rel="noopener"` externos.
4. **Seção Sobre/Tecnologias & Estudos:** parágrafo real ("diário de bordo") + trilha com estado real (capítulos 1–5 ✓, 6 parciais, 7 reservado) + chips de tech (Python, Windows, Office — só o que o perfil declara) + plano futuro (portfólio de dados, painel de indicadores — listado no README real como "em breve/planejamento").
5. **Rodapé/compartilhar:** botão copiar link (clipboard API + fallback), botão compartilhar (Web Share API com fallback p/ copiar), QR code em cartão, frase real "feito no ritmo de quem está aprendendo", ano corrente via JS.

## Acessibilidade & performance
- HTML semântico, landmarks, labels; foco sempre visível; contraste: texto corpo `#e0d7ff` sobre `#0d0d0d` (≈13:1), acento só em tamanhos maiores/bold; QR com área clara garantida para escaneio.
- Sem frameworks; CSS ~10KB, JS ~6KB; async/defer; imagens otimizadas (png otimizado quando possível, SVG preferido); LCP = avatar otimizado.
- `prefers-reduced-motion` desliga digitação/animações.

## Publicação
- Estático, HTTPS por padrão no Pages; completo: `README.md` com passos (criar repo `kayke-dados` ou `<repo>`, Settings → Pages → main, HTTPS, URL final), aviso para atualizar a constante de URL + regenerar QR se o repo for diferente. **Nada é feito no repositório do GitHub sem autorização explícita.**

## Plano de testes (honesto quanto ao ambiente)
Sem navegador no Android/Termux — testes automatizados: `node --check` (JS), validação estrutural do HTML e do CSS (Python), script de verificação de todos os `href`/`src` (existência + caminhos relativos), verificação dos URLs externos (HTTP HEAD), verificação de pares `data-i18n` ↔ dicionário PT/EN, sintaxe do QR (decodificação do PNG se dependências instaláveis), `node` para extrair e validar JSON-LD. Playwright/Lighthouse/MCPs não existem aqui → registrado como "não disponível" no relatório, sem simulação.
