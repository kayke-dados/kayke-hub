# Kayke Space

Portfólio profissional de **Kayke** — estudante de Análise de Dados — construído para documentar a trajetória real: história, momento atual, jornada, cursos, projetos, habilidades, experiências, conquistas e objetivos.

O projeto reformula o **Kayke Hub** (site estático em GitHub Pages) em uma aplicação **Next.js** preparada para crescer, com área administrativa real, banco de dados, autenticação, rascunhos, pré-visualização, histórico de alterações e exportação.

- Site público: `/`
- Área administrativa: `/admin`
- Stack: **Next.js 15 (App Router) + TypeScript + Supabase + Vercel**
- Identidade: **Dark Minimalist + Tech** (grafite profundo, azul usado com moderação, tipografia branca/cinza)

---

## 1. O que foi entregue

### Portfólio público

1. **Hero** — foto do GitHub, nome, área, momento atual e números reais (87/87 exercícios, 6 capítulos, 10 cursos, 2 projetos).
2. **História** — texto em primeira pessoa, ficha rápida e link para o Python-Journey.
3. **Momento atual** — estudo, foco, curso, projeto e próximo objetivo, com data de atualização.
4. **Jornada** — linha do tempo + calendário de atividades alimentado apenas por registros reais.
5. **Cursos** — as 10 playlists na ordem fixa, com título real, canal, link, status, progresso e conclusão calculada por `VITE_CURSOS_CONCLUIDOS`.
6. **Projetos** — cards reais, metadados e páginas próprias em `/projetos/[slug]`.
7. **Habilidades** — separação honesta entre “em aprendizado”, “conhecimento desenvolvido” e “aplicado em projetos”, sem níveis inventados.
8. **Experiências** — estado vazio elegante, pronto para a primeira oportunidade (inclusive de outras áreas).
9. **Conquistas e objetivos** — fatos separados de metas, com horizontes de curto, médio e longo prazo.
10. **Contato** — canais reais: e-mail, GitHub e Instagram.

### Área administrativa

- Login com Supabase Auth (e-mail e senha), restrito a `ADMIN_EMAIL`.
- Rotas protegidas por middleware **e** verificação de sessão em cada operação no servidor.
- CRUD de: cursos, projetos, jornada, experiências, conquistas, objetivos, história e momento atual.
- **Rascunho / publicado / fora do ar**. Rascunhos nunca aparecem no público.
- **Pré-visualização** desktop e mobile antes de publicar.
- **Histórico de alterações** independente da linha do tempo (criação, edição, publicação, retirada, exclusão).
- **Exportação JSON** completa e **CSV** por seção, sem senhas, tokens ou segredos.
- Registro automático de ações administrativas no histórico.

### SEO, acessibilidade e desempenho

- Metadata, Open Graph, Twitter Cards, canonical, JSON-LD `Person`, sitemap e robots.
- `noindex` na área administrativa e em rascunhos.
- HTML semântico, skip link, foco visível, navegação por teclado, `aria-*`, `prefers-reduced-motion`.
- Layout responsivo (celular, tablet, desktop) e estados de carregamento/erro/vazio.
- Imagens locais, fontes com `display=swap`, JS enxuto e cache de assets na Vercel.

---

## 2. As 5 etapas do trabalho

| Etapa | Entrega |
|---|---|
| **1. Auditoria e arquitetura** | Clone e análise do `kayke-hub`, tecnologias, problemas, dados reais do GitHub/playlists e decisão da stack. |
| **2. Fundação e design system** | Next.js, TypeScript, tokens, layout, componentes base, modelo de dados e conteúdo inicial real. |
| **3. Portfólio público** | Todas as seções, progresso dos cursos, linha do tempo, calendário, projetos, SEO e responsividade. |
| **4. Dados e administração** | Supabase (schema + RLS), autenticação, CRUD, rascunhos, publicação, prévia, histórico e exportação. |
| **5. Qualidade e publicação** | Testes, build, revisão de acessibilidade/segurança, documentação de deploy e manutenção. |

---

## 3. Estrutura do projeto

```
kayke-space/
├── src/
│   ├── app/
│   │   ├── (site)/                 # páginas públicas (header/footer)
│   │   │   ├── (home)/
│   │   │   │   ├── page.tsx        # portfólio
│   │   │   │   └── loading.tsx     # carregamento da home
│   │   │   └── projetos/[slug]/    # detalhe do projeto
│   │   ├── admin/
│   │   │   ├── login/              # login real
│   │   │   ├── actions.ts          # server actions (CRUD, auth, histórico)
│   │   │   └── (panel)/            # painel protegido
│   │   ├── api/admin/export/       # rotas JSON e CSV autenticadas
│   │   ├── globals.css             # design system + admin
│   │   ├── layout.tsx              # metadata, fontes, html/body
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/                 # seções públicas e navegação
│   ├── lib/
│   │   ├── seed.ts                 # conteúdo real de fallback
│   │   ├── data.ts                 # leitura pública/admin no Supabase
│   │   ├── courses.ts              # VITE_CURSOS_CONCLUIDOS
│   │   ├── entities.ts             # configuração dos formulários
│   │   ├── export.ts               # CSV/JSON
│   │   ├── auth.ts                 # sessão e autorização
│   │   ├── activity.ts             # histórico
│   │   └── supabase/               # clients server/middleware
│   └── middleware.ts               # proteção de /admin
├── supabase/
│   ├── schema.sql                  # tabelas, RLS, triggers, índices
│   └── seed.sql                    # conteúdo inicial real
├── public/assets/                  # avatar, favicon, OG e capas
├── tests/                          # testes de lógica (node:test)
├── .env.example
├── next.config.ts
├── vercel.json
└── package.json
```

---

## 4. Rodar localmente

Requisitos: **Node.js 22.6+** (os testes usam `--experimental-strip-types`) e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

Sem Supabase configurado, o site público funciona normalmente com o conteúdo de `src/lib/seed.ts`. A área `/admin` mostra as instruções de configuração — **nada é simulado**.

### Scripts

```bash
npm run dev         # desenvolvimento
npm run build       # build de produção
npm start           # servir o build
npm run typecheck   # TypeScript
npm test            # testes de lógica
npm run check       # typecheck + testes + build
```

> Os scripts chamam o Next e o TypeScript pelo caminho em `node_modules` para também funcionarem em ambientes sem symlinks de binários (como Termux/Android).

---

## 5. Variáveis de ambiente

| Variável | Onde | Para que serve |
|---|---|---|
| `VITE_CURSOS_CONCLUIDOS` | Vercel / `.env.local` | Número inteiro de 0 a 10. Define quantos cursos da ordem fixa estão concluídos. Ausente/inválido = 0. |
| `NEXT_PUBLIC_SITE_URL` | Vercel / `.env.local` | URL pública usada em canonical, Open Graph e sitemap. Em produção, use a URL real da Vercel; sem ela, o padrão é `http://localhost:3000`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel / `.env.local` | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel / `.env.local` | Chave anon pública do Supabase (protegida por RLS). |
| `ADMIN_EMAIL` | Vercel / `.env.local` | E-mail do único administrador autorizado. |

> `NEXT_PUBLIC_*` e `VITE_*` chegam ao navegador. **Nunca** coloque a `service_role` key ou qualquer segredo em variáveis com esses prefixos.
>
> `NEXT_PUBLIC_SITE_URL` é usada no build para canonical, Open Graph e `robots.txt`. Defina-a antes de `npm run build` ou do deploy na Vercel.

### Cursos

A conclusão sempre segue a ordem:

- `0` = nenhum concluído
- `1` = primeiro concluído
- `2` = primeiros dois concluídos
- …
- `10` = todos concluídos

O site calcula automaticamente quantidade concluída, restante, porcentagem, status por card e a barra de progresso. Alterações em variáveis `VITE_` exigem **novo build/deploy** na Vercel.

---

## 6. Configurar o Supabase (necessário para o admin)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de `supabase/schema.sql`.
3. Execute `supabase/seed.sql` para começar com o conteúdo real (opcional).
4. Em **Authentication → Users**, crie o usuário administrador com o e-mail definido em `ADMIN_EMAIL` e uma senha forte.
5. Confirme que o e-mail está em `public.admin_users` (o schema já insere `kayke0812@proton.me`; ajuste se necessário).
6. Em **Project Settings → API**, copie `Project URL` e `anon public key` para as variáveis da Vercel.
7. Faça o deploy. Acesse `/admin` e entre com o usuário criado.

### Segurança

- **RLS ativo** em todas as tabelas.
- Público lê apenas `published` (perfil, momento atual e cursos são públicos).
- Administração só passa em `public.is_admin()`, que compara o e-mail do JWT com `admin_users`.
- Middleware bloqueia `/admin` sem sessão válida.
- Cada server action verifica a sessão novamente antes de gravar.
- O histórico é somente leitura para o admin; não é editável pela interface.
- Senhas, tokens e chaves nunca são exportados nem enviados ao frontend.

---

## 7. Publicar na Vercel

1. Envie o projeto para o GitHub.
2. Na Vercel: **Add New → Project → Import Git Repository**.
3. O preset é detectado automaticamente como **Next.js**. Build: `npm run build`.
4. Configure as variáveis da seção 5 (Production e Preview, se desejar).
5. Depois do primeiro deploy, copie a URL final e atualize `NEXT_PUBLIC_SITE_URL`.
6. Faça um novo deploy para canonical, Open Graph e sitemap refletirem a URL.
7. Commits na branch principal disparam novos deploys automaticamente.

### Checklist pós-deploy

- [ ] `/` abre e mostra o conteúdo real.
- [ ] `/projetos/python-journey` abre.
- [ ] `/sitemap.xml` e `/robots.txt` respondem.
- [ ] `/admin` redireciona para `/admin/login` (com Supabase configurado).
- [ ] Login funciona apenas com o e-mail autorizado.
- [ ] Um rascunho não aparece no site público.
- [ ] Publicar/retirar do ar reflete no site após revalidação.
- [ ] Exportação JSON e CSV baixam autenticadas.
- [ ] `VITE_CURSOS_CONCLUIDOS` altera o progresso após novo deploy.

---

## 8. Como atualizar o conteúdo

Tudo pelo painel `/admin`:

| Seção | O que faz |
|---|---|
| Cursos | Edita título, canal, link e observações. Os 10 cursos são fixos: não há criação nem exclusão pelo painel. A ordem e a conclusão continuam fixas. |
| Projetos | Cria/edita projetos, ferramentas, imagem, links, data e status. |
| Jornada | Registra aprendizados, conquistas, projetos, experiências e objetivos. Alimenta timeline e calendário. |
| Experiências | Registra empresa, cargo, período, atividades, ferramentas, aprendizados e resultados. |
| Conquistas | Certificações, cursos, projetos, marcos acadêmicos e profissionais. |
| Objetivos | Metas de curto, médio e longo prazo. |
| História | Nome, bio, história, avatar e canais de contato. |
| Momento atual | Estudo, foco, curso, projeto e próximo objetivo. |
| Histórico | Consulta das alterações administrativas. |
| Exportar | Backup JSON e CSV por seção. |

Fluxo recomendado: **criar como rascunho → pré-visualizar desktop/mobile → publicar**.

---

## 9. Modelo de dados

| Tabela | Conteúdo |
|---|---|
| `profile` | Perfil público (singleton). |
| `current_status` | Momento atual (singleton). |
| `courses` | 10 cursos, posição única de 1 a 10. |
| `projects` | Projetos com slug único, ferramentas e links. |
| `journey_entries` | Linha do tempo/calendário, com origem manual ou automática. |
| `experiences` | Experiências profissionais. |
| `achievements` | Conquistas reais. |
| `goals` | Objetivos por horizonte. |
| `activity_log` | Histórico administrativo com antes/depois. |
| `admin_users` | Allowlist de e-mails administradores. |

---

## 10. Testes e verificação

```bash
npm test
npm run typecheck
npm run build
```

Cobertura atual dos testes de lógica:

- validação de `VITE_CURSOS_CONCLUIDOS` (0–10, inválidos = 0);
- cálculo de concluídos, restantes, porcentagem e status;
- ordem fixa das 10 playlists;
- geração e escape de CSV;
- validação de formulários, URLs, tags e slug;
- conteúdo inicial sem experiências fictícias e sem datas futuras.

Limitações desta entrega:

- **Não há importação/restauração de backup** (fora do escopo solicitado).
- A área administrativa depende de um projeto Supabase configurado.
- A conclusão dos cursos é centralizada na variável de ambiente, não editável pelo painel.
- Os testes exigem Node 22.6+ por usarem TypeScript nativo; o build da Vercel não executa os testes.

---

## 11. Decisões de arquitetura

- **Next.js App Router**: SSR para SEO, server actions para operações autenticadas e middleware para proteger `/admin`.
- **Supabase**: banco relacional, autenticação e RLS sem manter servidor próprio. A proteção acontece no banco e no servidor, não só na interface.
- **Conteúdo de fallback**: o site público não depende do banco para funcionar; se o Supabase falhar, o seed real mantém a página de pé.
- **CSS próprio**: a identidade editorial não foi trocada por um template genérico; os tokens ficam em `globals.css`.
- **Sem excesso de infraestrutura**: uma tabela por seção, um histórico e uma allowlist. Sem filas, cache externo ou microsserviços.

---

## 12. Transparência

O código foi desenvolvido com auxílio de inteligência artificial, a partir de decisões e conteúdo do Kayke. Nenhuma experiência, certificação, projeto ou data foi inventada: o conteúdo inicial vem do repositório existente, da API pública do GitHub e dos títulos reais das playlists.
