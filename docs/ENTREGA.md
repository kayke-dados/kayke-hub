# Entrega — Redesign do portfólio Kayke

## Resumo

O Kayke Hub foi reformulado como uma aplicação **Next.js 15 (App Router) + TypeScript + Supabase + Vercel**, com identidade **dark minimalista + tech**, conteúdo real e uma área administrativa de verdade. O site público continua funcionando sem banco, usando `src/lib/seed.ts` como fallback; ao configurar o Supabase, o conteúdo do banco passa a ser a fonte de verdade.

## As 5 etapas

| Etapa | Status | Entrega |
|---|---|---|
| 1. Auditoria e arquitetura | Concluída | Análise do repositório antigo, dados reais do GitHub/playlists e decisão da stack. |
| 2. Fundação e design system | Concluída | Next.js, TypeScript, tokens, layout, componentes, modelo de dados e seed real. |
| 3. Portfólio público | Concluída | Todas as seções, cursos, jornada, projetos, SEO, acessibilidade e responsividade. |
| 4. Dados e administração | Concluída | Schema Supabase + RLS, auth, CRUD, rascunhos, publicação, prévia, histórico e exportação. |
| 5. Qualidade e publicação | Concluída | Testes, build, verificação de rotas, documentação de deploy e manutenção. |

## Funcionalidades prontas

- Home com hero, história, momento atual, jornada, cursos, projetos, habilidades, experiências, conquistas/objetivos e contato.
- Página individual de projeto em `/projetos/[slug]`, com 404 real para slug inexistente.
- Progresso dos 10 cursos calculado por `VITE_CURSOS_CONCLUIDOS` (0–10, inválido = 0), sempre na ordem fixa.
- Timeline e calendário alimentados por registros reais da jornada.
- SEO com metadata, canonical, Open Graph, Twitter Cards, JSON-LD `Person`, sitemap e robots.
- Admin com Supabase Auth, allowlist em `ADMIN_EMAIL` + `admin_users`, middleware e verificação por operação.
- CRUD de cursos, projetos, jornada, experiências, conquistas, objetivos, história e momento atual.
- Rascunho, publicado e fora do ar; rascunhos não aparecem no público.
- Pré-visualização desktop/mobile antes de publicar.
- Histórico administrativo com antes/depois.
- Exportação autenticada em JSON completo e CSV por seção.
- Registro automático de projeto publicado na jornada.
- Estados de carregamento, erro, vazio, `noindex` no admin, skip link, foco visível e `prefers-reduced-motion`.

## Depende de configuração externa

1. **Supabase**: criar projeto, executar `supabase/schema.sql`, opcionalmente `supabase/seed.sql`, criar o usuário admin e configurar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `ADMIN_EMAIL`.
2. **Vercel**: importar o repositório, configurar as variáveis e definir `NEXT_PUBLIC_SITE_URL` com a URL final.
3. **Playlists**: os títulos e links reais já estão no seed; o admin pode editá-los sem alterar a ordem.
4. **Conclusão dos cursos**: alterar `VITE_CURSOS_CONCLUIDOS` e fazer novo build/deploy.

O login e o CRUD autenticado não foram testados de ponta a ponta neste ambiente porque não há credenciais Supabase configuradas. O código, o schema e as rotas foram verificados por typecheck, build e testes de lógica.

## Arquivos principais

- `src/app/(site)/(home)/page.tsx` — página principal.
- `src/app/(site)/projetos/[slug]/page.tsx` — detalhe do projeto.
- `src/app/admin/actions.ts` — autenticação, CRUD, publicação, histórico e jornada automática.
- `src/app/admin/(panel)/` — painel protegido, formulários, prévia e exportação.
- `src/lib/seed.ts` — conteúdo real de fallback.
- `src/lib/data.ts` — leitura pública/admin no Supabase.
- `src/lib/courses.ts` — cálculo de conclusão dos cursos.
- `src/lib/entities.ts` — configuração e validação dos formulários.
- `src/lib/auth.ts` — sessão e autorização.
- `supabase/schema.sql` — tabelas, RLS, triggers e índices.
- `supabase/seed.sql` — conteúdo inicial real.
- `tests/` — 20 testes de lógica com `node:test`.
- `README.md` — setup, deploy, segurança e manutenção.

## Verificação executada

- `npm test`: 20 testes aprovados.
- `npm run typecheck`: sem erros.
- `npm run build`: build de produção concluído.
- Runtime local: `/` 200, `/projetos/python-journey` 200, `/projetos/inexistente` 404, `/admin` 200 (tela de configuração sem Supabase), `/admin/login` 200, `/sitemap.xml` 200, `/robots.txt` 200.
- Exportação sem sessão: 401 em JSON e CSV.
- HTML público: um `<h1>`, sem IDs duplicados, imagens com `alt`, sem links vazios, 3 cursos concluídos e 1 próximo com `VITE_CURSOS_CONCLUIDOS=3`.

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Para produção:

```bash
npm run check
npm run build
npm start
```

## Como atualizar o conteúdo

Use `/admin`:

- **Cursos**: editar título, canal, link e observações. Os 10 cards são fixos; não há criação/exclusão.
- **Projetos**: criar/editar, ferramentas, imagem, links, data e status.
- **Jornada**: registrar aprendizados, conquistas, projetos, experiências e objetivos.
- **Experiências**: empresa, cargo, período, atividades, ferramentas, aprendizados e resultados.
- **Conquistas**: certificações, cursos, projetos e marcos reais.
- **Objetivos**: curto, médio e longo prazo.
- **História** e **Momento atual**: dados do perfil e foco atual.
- **Histórico**: consultar alterações.
- **Exportar**: backup JSON e CSV por seção.

Fluxo recomendado: criar como rascunho, pré-visualizar, publicar.

## Limitações conhecidas

- Não há importação/restauração de backup; a exportação é somente de saída.
- A conclusão dos cursos não é editável pelo painel, por requisito.
- O admin depende de Supabase configurado.
- O ambiente de desenvolvimento usado (Termux/Android) não carrega binários nativos do Vitest; por isso os testes usam `node:test`.
- Sem `NEXT_PUBLIC_SITE_URL`, canonical, Open Graph e sitemap usam `http://localhost:3000`; configure a URL real na Vercel antes de publicar.
