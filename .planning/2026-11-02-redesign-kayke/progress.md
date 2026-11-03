# Progress Log

## Session: 2026-11-02

### Current Status
- **Phase:** 5 - Qualidade e publicação
- **Status:** Concluída
- **Started:** 2026-11-02

### Actions Taken

#### Etapa 1 — Auditoria e arquitetura
- Clone e leitura do `kayke-hub` em `/data/data/com.termux/files/usr/tmp/opencode/kayke-hub`.
- Identificação da stack antiga (HTML/CSS/JS, GitHub Pages, testes pytest) e dos problemas de manutenção.
- Coleta de dados reais via API pública do GitHub e YouTube oEmbed.
- Definição da arquitetura Next.js 15 + TypeScript + Supabase + Vercel.
- Registro em `.planning/2026-11-02-redesign-kayke/findings.md`.

#### Etapa 2 — Fundação e design system
- Scaffold Next.js 15.5.28 com App Router e TypeScript.
- Design system em `src/app/globals.css`: tokens, tipografia Sora/Inter/JetBrains Mono, componentes públicos e admin.
- Modelo de dados, `src/lib/seed.ts` e fallback sem banco.
- Cópia dos assets úteis para `public/assets/`.

#### Etapa 3 — Portfólio público
- Home completa com hero, história, momento atual, jornada, cursos, projetos, habilidades, experiências, conquistas/objetivos e contato.
- Página `/projetos/[slug]`, timeline, calendário, progresso dos cursos e links reais.
- Metadata, canonical, Open Graph, Twitter Cards, JSON-LD, sitemap, robots, skip link, foco visível e responsividade.
- Home movida para `(site)/(home)` com loading próprio para preservar 404 correto nos projetos.

#### Etapa 4 — Dados e administração
- `supabase/schema.sql` com tabelas, RLS, `is_admin()`, triggers e índices.
- `supabase/seed.sql` com conteúdo real.
- Login Supabase, middleware, layout protegido e verificação de sessão em cada server action.
- CRUD de cursos, projetos, jornada, experiências, conquistas, objetivos, história e momento atual.
- Rascunho/publicado/fora do ar, prévia desktop/mobile, histórico e exportação JSON/CSV.
- Registro automático de projeto publicado na jornada.
- Cursos fixos: edição permitida, criação/exclusão bloqueadas para manter os 10 cards na ordem.

#### Etapa 5 — Qualidade e publicação
- 20 testes de lógica com `node:test`.
- Typecheck e build de produção aprovados.
- Verificação de runtime com `curl`: home, projeto, 404, admin, login, sitemap, robots e exportação 401 sem sessão.
- Auditoria de HTML público (um `h1`, sem IDs duplicados, imagens com `alt`, sem links vazios).
- README e `docs/ENTREGA.md` com setup, deploy, segurança, manutenção e limitações.
- Scripts ajustados para chamar Next/TypeScript por caminho em `node_modules`, funcionando sem symlinks.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `npm test` | 20 aprovados | 20 aprovados, 0 falhas | OK |
| `npm run typecheck` | Sem erros | Sem erros | OK |
| `npm run build` | Build concluído | Build concluído | OK |
| `/` | 200 | 200 | OK |
| `/projetos/python-journey` | 200 | 200 | OK |
| `/projetos/inexistente` | 404 | 404 | OK |
| `/admin` sem Supabase | 200 com instruções | 200 com instruções | OK |
| `/admin/login` | 200 | 200 | OK |
| `/sitemap.xml` e `/robots.txt` | 200 | 200 | OK |
| Exportação sem sessão | 401 | 401 | OK |

### Errors
| Error | Resolution |
|-------|------------|
| `npm install` falha com `EACCES` em symlinks no Termux | Instalar com `--no-bin-links`; scripts usam caminhos diretos em `node_modules`. |
| Vitest/Rollup falha com `ERR_DLOPEN_FAILED` em `/storage` | Testes migrados para `node:test` com loader. |
| `/projetos/inexistente` respondia 200 | Loading da home isolado em `(site)/(home)`; rota de projeto sem streaming. |
| Texto vazio virava `null` em coluna `not null` | Campos de texto passaram a enviar `""`; data/URL opcionais continuam `null`. |
| `next` não encontrado via npm script no Termux | Scripts chamam `node node_modules/next/dist/bin/next`. |

### Pendências externas
- Configurar Supabase e testar login/CRUD autenticado de ponta a ponta.
- Publicar na Vercel e definir `NEXT_PUBLIC_SITE_URL` com a URL final.
- Definir `VITE_CURSOS_CONCLUIDOS` conforme o progresso real.
