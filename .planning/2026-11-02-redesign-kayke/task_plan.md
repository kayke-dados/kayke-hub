# Task Plan: Redesign do portfólio Kayke (Kayke-Space)

## Goal
Transformar o Kayke Hub em um portfólio profissional em Next.js na Vercel, com identidade dark minimalista + tech, conteúdo real, jornada/calendário, cursos controlados por `VITE_CURSOS_CONCLUIDOS` e uma área administrativa real com Supabase (auth, rascunhos, publicação, histórico e exportação).

## Next Step
Nenhum. As 5 etapas foram concluídas. Próximos passos dependem de configuração externa (Supabase + Vercel).

## Current Phase
Concluído

## Phases

### Etapa 1: Auditoria e arquitetura
- [x] Clonar e analisar o repositório kayke-hub
- [x] Identificar tecnologias, estrutura e problemas
- [x] Coletar dados reais (GitHub, playlists, Python-Journey)
- [x] Definir arquitetura recomendada (Next.js + Supabase + Vercel)
- [x] Registrar achados em findings.md
- **Status:** complete

### Etapa 2: Fundação e design system
- [x] Scaffold Next.js (App Router, TypeScript)
- [x] Tokens, tipografia, layout e componentes base
- [x] Modelo de dados, seed real e fallback sem banco
- [x] Preservar assets úteis do projeto antigo
- **Status:** complete

### Etapa 3: Portfólio público
- [x] Hero, história, momento atual, jornada (timeline + calendário)
- [x] Cursos (10, ordem fixa, env var), projetos, habilidades
- [x] Experiências, conquistas/objetivos, contato
- [x] SEO, Open Graph, sitemap, robots, acessibilidade e responsivo
- **Status:** complete

### Etapa 4: Dados e administração
- [x] Schema Supabase + RLS + seed
- [x] Autenticação real e proteção de rotas/operações
- [x] CRUD das 8 seções, rascunho/publicação/arquivamento
- [x] Pré-visualização desktop/mobile, histórico e exportação JSON/CSV
- **Status:** complete

### Etapa 5: Qualidade e publicação
- [x] Testes unitários e de build
- [x] Revisão de acessibilidade, responsividade e segurança
- [x] Documentação de deploy na Vercel e configuração de env
- [x] Relatório final e instruções de manutenção
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Next.js 15 (App Router) + TypeScript | Necessário SSR/SEO para o público e server actions/middleware para o admin real; mantém deploy simples na Vercel. |
| Supabase (Postgres + Auth + RLS) | Autenticação e persistência reais sem servidor próprio; RLS protege dados no servidor. |
| CSS próprio com tokens | Preserva a identidade editorial e evita aparência de template genérico. |
| Conteúdo público com fallback local | O site funciona antes da configuração do Supabase; o banco sobrescreve quando configurado. |
| `VITE_CURSOS_CONCLUIDOS` lida no servidor | Atende ao requisito do prompt; valor público, validado entre 0 e 10. |
| Cursos com títulos reais via oEmbed | Evita inventar nomes; títulos confirmados nas playlists. |
| Cursos fixos no admin | A ordem 1–10 é requisito; permitir criar/excluir quebraria a sequência. |
| Testes com `node:test` | O binário nativo do Vitest/Rollup não carrega em `/storage` no Termux. |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `npm install` falha com `EACCES` em symlinks no Termux | Instalar com `--no-bin-links` e chamar Next/TypeScript pelo caminho em `node_modules`. |
| Vitest/Rollup falha com `ERR_DLOPEN_FAILED` em `/storage` | Migrar os testes para `node:test` com loader de TypeScript. |
| `/projetos/inexistente` retornava 200 por causa do streaming do `loading.tsx` | Mover a home para `(site)/(home)` e manter o loading apenas nesse segmento; 404 voltou a responder 404. |
| Campos de texto vazios viravam `null` em colunas `not null` | Passar string vazia para campos de texto e `null` apenas para data/URL opcionais. |
