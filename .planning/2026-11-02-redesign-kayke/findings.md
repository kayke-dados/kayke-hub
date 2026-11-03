# Findings — Auditoria do Kayke Hub

## Repositório atual (clonado de github.com/kayke-dados/kayke-hub)
- Site estático de uma página: `index.html` (396 linhas), `css/style.css` (1375), `js/main.js` (560).
- Sem framework, sem build, sem package.json. Deploy atual em GitHub Pages.
- `vercel.json` já existe (cleanUrls, cache de assets, headers de segurança).
- Testes em Python/pytest (66 passed, 1 skipped no último relatório).
- Bilíngue PT/EN via `data-i18n`; GitHub API com cache; QR code; share; menu mobile.
- Identidade atual: "Quiet Tech" grafite + violeta, fontes Manrope/Inter/JetBrains Mono.
- Conteúdo real: Python-Journey 87/87 exercícios, 6 capítulos; 2 projetos (Python-Journey e Kayke Hub).

## Dados reais confirmados
- GitHub: `kayke-dados`, nome "Kayke | Python e Dados", bio "Aprendendo Python e Análise de Dados", 3 repositórios públicos, conta criada em 17/08/2026.
- Repos: kayke-hub, Python-Journey, kayke-dados (perfil).
- Contato real: kayke0812@proton.me, Instagram @kayke.dados, GitHub kayke-dados.
- Avatar: https://github.com/kayke-dados.png

## Títulos reais das 10 playlists (YouTube oEmbed)
1. Curso em vídeo - Python — Joao Pedro Loyola
2. Curso gratuito Git e GitHub — Tiago Matos
3. Curso de SQL com MySQL (Completo) — Otávio Miranda
4. Curso Analista de dados Python / Numpy / Pandas — Geração Analítica
5. Curso Python para Machine Learning e Análise de Dados — Didática Tech
6. Curso de Power BI - Do Básico ao Profissional — Prime Cursos do Brasil
7. Introdução à Ciência de Dados 3.0 — Data Science Academy
8. Trilha EstaTiDados – Data Science — EstaTiDados
9. Domine Machine Learning com Scikit-Learn e Google Colab! — AI4Tech
10. Curso Grátis de Inteligência Artificial - Módulo 01 — Curso em Vídeo

## Problemas identificados no site atual
1. Não há área administrativa nem persistência: todo conteúdo é hardcoded no HTML.
2. Não há autenticação, banco, rascunhos, histórico ou exportação.
3. Conteúdo de cursos não existe; a seção de 10 cursos do prompt não está implementada.
4. Jornada sem linha do tempo e sem calendário de atividades reais.
5. Habilidades/experiências/conquistas/objetivos não têm seções próprias.
6. Conteúdo duplicado entre HTML e dicionário i18n manual (difícil de manter).
7. SEO preso à URL do GitHub Pages; canonical/OG/sitemap apontam para lá.
8. Sem estados de erro/carregamento consistentes fora do painel GitHub.
9. Sem testes de build (não há build) e sem CI de deploy na Vercel.

## Arquitetura recomendada
- **Next.js 15 App Router + TypeScript** na Vercel.
- **Supabase**: Postgres + Auth (e-mail/senha) + RLS. Admin autorizado por `ADMIN_EMAIL`.
- Conteúdo público lido no servidor; fallback em `src/content/seed.ts` quando o banco não está configurado.
- Admin em `/admin` com middleware, server actions e verificação de sessão em cada operação.
- Tabelas: `profile`, `current_status`, `courses`, `projects`, `journey_entries`, `experiences`, `achievements`, `goals`, `activity_log`.
- Rascunho/publicado/arquivado via coluna `status`; RLS só expõe `published` ao público.
- Exportação JSON/CSV em route handler autenticado, sem segredos.
- `VITE_CURSOS_CONCLUIDOS` (0–10) define conclusão sequencial dos cursos.

## Restrições
- Não inventar biografia, experiências, certificações, projetos ou datas.
- Não gerar atividades fictícias no calendário.
- Não simular autenticação.
- Não expor segredos no frontend.
- Manter a ordem fixa dos 10 cursos.
