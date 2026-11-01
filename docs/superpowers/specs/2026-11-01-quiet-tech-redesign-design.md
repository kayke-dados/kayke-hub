# Kayke Hub — Quiet Tech: redesign e preparação para Vercel

**Data:** 01/11/2026
**Direção:** QUIET TECH — EDITORIAL DEVELOPER PORTFOLIO
**Repositório:** https://github.com/kayke-dados/kayke-hub
**Hospedagem-alvo:** Vercel (sem publicar sem autorização)

## Intenção

Transformar o Kayke Hub em um portfólio pessoal com identidade própria: minimalista, editorial, tecnológico e mobile-first. O site deve comunicar em segundos quem é o Kayke, o que estuda, quais projetos constrói e para onde vai — sem template genérico, sem exageros e sem inventar experiência.

O site deixa de ser "o caderno" (v7) e passa a ser **editorial quiet tech**: fundo quase preto esverdeado, verde suave como assinatura, tipografia expressiva e composição assimétrica com muito espaço vazio.

## Fatos verificados (fonte: repositórios)

- **Python-Journey:** 87 exercícios, 6 capítulos concluídos, capítulo 07 reservado.
  - 01 Fundamentos 12 · 02 Condições 16 · 03 Laços e lógica 25 · 04 Listas e tuplas 18 · 05 Dicionários 5 · 06 Funções 11.
- **Repositórios públicos:** apenas `Python-Journey`, `kayke-dados` (perfil) e `kayke-hub`.
- **CalculaFood** e **Marca Aí:** não há repositório público. Entram como "em desenvolvimento", com a descrição dada pelo autor, sem link e sem tecnologia inventada.
- **Contato real:** GitHub `/kayke-dados`, Instagram `@kayke.dados`, e-mail `kayke0812@proton.me`.

## Não-objetivos

- Não migrar para framework (React/Next). A stack estática resolve design, desempenho, SEO, manutenção e Vercel com simplicidade.
- Não criar backend, banco de dados ou autenticação.
- Não inventar domínio, URL da Vercel, certificações, cargos ou funcionalidades.
- Não usar barras de progresso de "domínio" — só dados reais do Python-Journey.

## Paleta (obrigatória)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0B0E0C` | fundo principal |
| `--bg-2` | `#111612` | fundo secundário |
| `--surface` | `#171C18` | superfícies/cards |
| `--border` | `#293129` | bordas discretas |
| `--text` | `#F0F1E9` | texto principal |
| `--muted` | `#A3AAA1` | texto secundário |
| `--accent` | `#B9D982` | destaque principal |
| `--accent-2` | `#849D68` | destaque complementar |

Verde com moderação: botões, indicadores, links selecionados e detalhes. Nunca a página inteira.

## Tipografia

- **Manrope** — títulos.
- **Inter** — corpo.
- **JetBrains Mono** — identificadores e detalhes técnicos.

Carregadas via Google Fonts com `preconnect` e `display=swap`.

## Estrutura

1. **Cabeçalho** — Kayke + Início, Sobre, Jornada, Projetos, Contato; menu mobile; seção ativa; teclado.
2. **Hero** — `KAYKE — PERSONAL PORTFOLIO`, "Construindo minha trajetória na tecnologia.", descrição, "Consistência > intensidade.", CTAs e elemento visual de dados.
3. **Sobre** — texto do autor + características (aprendizado contínuo, curiosidade, organização).
4. **Jornada** — três blocos: conheço / estudando / objetivos, mais o painel real do Python-Journey (87/87, capítulos).
5. **Projetos** — Python-Journey, Kayke Hub (links), CalculaFood e Marca Aí (em desenvolvimento, sem link), em composições diferentes.
6. **Objetivos** — 6 passos futuros, marcados como futuros.
7. **Contato** — GitHub, Instagram, e-mail; QR, copiar endereço, compartilhar.
8. **Rodapé** — Kayke, ano automático, redes, navegação secundária e nota de transparência sobre IA.

## Funcionalidades preservadas

PT/EN (PT padrão, preferência persistida), QR, copiar endereço, Web Share API + fallback, favicon, Open Graph, SEO, acessibilidade, `prefers-reduced-motion`, repositórios do GitHub via API com cache e fallback.

## Vercel

- Stack estática, sem build. `vercel.json` mínimo com cache e `cleanUrls`.
- `SITE_URL` centralizado em `js/main.js`, com comentário e documentação de onde trocar pela URL da Vercel.
- `tools/make_assets.py` lê o `SITE_URL` de `js/main.js` e regenera QR/OG — uma fonte de verdade.
- Não inventar URL da Vercel; não publicar sem autorização.

## Riscos assumidos

- Sem Chrome/Lighthouse no ambiente: verificação por testes, lint e inspeção. Registrar a limitação.
- Números do Python-Journey são atualizados manualmente; a data de conferência fica visível.
- Sem Pillow: OG/favicon/QR gerados por código puro-Python/SVG.
