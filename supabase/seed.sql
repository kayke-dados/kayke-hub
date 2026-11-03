-- ============================================================================
-- Kayke Space — conteúdo inicial real
-- Execute depois de supabase/schema.sql. É seguro rodar mais de uma vez.
-- ============================================================================

insert into public.profile (
  id, name, headline, bio, story, avatar_url, email, github_url, instagram_url, updated_at
) values (
  '00000000-0000-4000-8000-000000000001',
  'Kayke',
  'Estudante de Análise de Dados',
  'Aprendendo Python e Análise de Dados, um exercício de cada vez.',
  E'Sou Kayke e estou construindo minha trajetória na tecnologia. Comecei pelos fundamentos da programação e encontrei no Python a forma mais direta de aprender praticando.\n\nCada conceito que estudo vira um exercício resolvido no Python-Journey, organizado na ordem em que aprendi. São 87 exercícios e 6 capítulos concluídos até aqui — um registro honesto do começo, não uma vitrine de experiência que ainda não tenho.\n\nMeu objetivo é trabalhar com dados. A base começa agora: lógica, Python e a disciplina de documentar a evolução. Este site existe para acompanhar esse processo e crescer junto com ele.',
  '/assets/avatar.png',
  'kayke0812@proton.me',
  'https://github.com/kayke-dados',
  'https://www.instagram.com/kayke.dados/',
  '2026-11-01T00:00:00Z'
)
on conflict (id) do nothing;

insert into public.current_status (
  id, studying, focus, current_course, current_project, next_goal, updated_at
) values (
  '00000000-0000-4000-8000-000000000002',
  'Python e fundamentos da programação',
  'Análise de Dados',
  'Curso em vídeo - Python',
  'Python-Journey',
  'Consolidar Python e avançar para SQL',
  '2026-11-01T00:00:00Z'
)
on conflict (id) do nothing;

insert into public.courses (position, title, channel, url) values
  (1, 'Curso em vídeo - Python', 'Joao Pedro Loyola', 'https://www.youtube.com/playlist?list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0'),
  (2, 'Curso gratuito Git e GitHub', 'Tiago Matos', 'https://www.youtube.com/playlist?list=PLcoYAcR89n-qbO7YAVj5S0alABLis_QVU'),
  (3, 'Curso de SQL com MySQL (Completo)', 'Otávio Miranda', 'https://www.youtube.com/playlist?list=PLbIBj8vQhvm2WT-pjGS5x7zUzmh4VgvRk'),
  (4, 'Curso Analista de dados Python / Numpy / Pandas', 'Geração Analítica', 'https://www.youtube.com/playlist?list=PL3Fmwz_E1hXRWxIkP843DiDf0ZeqgftTy'),
  (5, 'Curso Python para Machine Learning e Análise de Dados', 'Didática Tech', 'https://www.youtube.com/playlist?list=PLyqOvdQmGdTR46HUxDA6Ymv4DGsIjvTQ-'),
  (6, 'Curso de Power BI - Do Básico ao Profissional', 'Prime Cursos do Brasil', 'https://www.youtube.com/playlist?list=PLFKhhNd35zq90tdc3PYpx4IA-SoxSNlmN'),
  (7, 'Introdução à Ciência de Dados 3.0', 'Data Science Academy', 'https://www.youtube.com/playlist?list=PLlDg_wRHtbjLWfS-rGguPi1qNetGQ6Ogr'),
  (8, 'Trilha EstaTiDados – Data Science', 'EstaTiDados', 'https://www.youtube.com/playlist?list=PLjdDBZW3EmXe6hO2Rt5Q9I5wzRZ7j7K8P'),
  (9, 'Domine Machine Learning com Scikit-Learn e Google Colab!', 'AI4Tech', 'https://www.youtube.com/playlist?list=PL8PS-tykU-MiZtXZAYjfSW5-2WN4FwCGA'),
  (10, 'Curso Grátis de Inteligência Artificial - Módulo 01', 'Curso em Vídeo', 'https://www.youtube.com/playlist?list=PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S')
on conflict (position) do nothing;

insert into public.projects (
  id, slug, name, description, objective, problem, tools, image_url, github_url, demo_url, project_date, status, updated_at
) values
  (
    '20000000-0000-4000-8000-000000000001',
    'python-journey',
    'Python-Journey',
    'Meu registro de estudos em Python: cada exercício do Curso em Vídeo, organizado por capítulo, na ordem em que aprendi.',
    'Praticar lógica e estruturas de dados com exercícios pequenos, um por vez, e documentar a evolução.',
    'Aprender programação sem pular etapas e sem esconder o processo: o repositório mostra o começo, não só o resultado.',
    array['Python', 'Git', 'GitHub'],
    '/assets/projects/python-journey.svg',
    'https://github.com/kayke-dados/Python-Journey',
    null,
    '2026-10-30',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'kayke-space',
    'Kayke Space',
    'Este site: portfólio, jornada e área administrativa em uma aplicação Next.js preparada para crescer comigo.',
    'Reunir história, cursos, projetos e evolução em um endereço fixo, com conteúdo fácil de atualizar.',
    'O portfólio anterior era estático e todo o conteúdo vivia no HTML. Atualizar a jornada exigia editar código.',
    array['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    '/assets/projects/kayke-space.svg',
    null,
    null,
    null,
    'published',
    '2026-11-02T00:00:00Z'
  )
on conflict (slug) do nothing;

insert into public.journey_entries (
  id, title, category, entry_date, description, notes, source, status, updated_at
) values
  (
    '30000000-0000-4000-8000-000000000001',
    'Início da jornada no GitHub',
    'aprendizado',
    '2026-08-17',
    'Criação da conta kayke-dados, o ponto de partida público para organizar estudos e projetos.',
    'Data registrada na API pública do GitHub.',
    'auto',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    'Python-Journey registra 87 exercícios',
    'conquista',
    '2026-11-01',
    '87 de 87 exercícios resolvidos e 6 capítulos concluídos, organizados na ordem em que foram estudados.',
    'Contagem conferida nos arquivos do repositório em 2026-11-01.',
    'auto',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    'Início do redesign do Kayke Space',
    'projeto',
    '2026-11-02',
    'Início da reformulação do portfólio com identidade dark minimalista, jornada, cursos e área administrativa.',
    'Registro do processo de desenvolvimento.',
    'manual',
    'published',
    '2026-11-02T00:00:00Z'
  )
on conflict (id) do nothing;

insert into public.achievements (
  id, title, description, kind, achieved_on, status, updated_at
) values
  (
    '40000000-0000-4000-8000-000000000001',
    '87 de 87 exercícios no Python-Journey',
    'Todos os exercícios registrados até aqui foram resolvidos e organizados por capítulo.',
    'projeto',
    null,
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '6 capítulos de Python concluídos',
    'Fundamentos, condições, laços, listas e tuplas, dicionários e funções.',
    'marco',
    null,
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '40000000-0000-4000-8000-000000000003',
    'Python-Journey público no GitHub',
    'Repositório aberto com os exercícios organizados por capítulo.',
    'projeto',
    '2026-10-30',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '40000000-0000-4000-8000-000000000004',
    'Conta no GitHub criada',
    'O começo do registro público da jornada.',
    'marco',
    '2026-08-17',
    'published',
    '2026-11-01T00:00:00Z'
  )
on conflict (id) do nothing;

insert into public.goals (id, title, description, horizon, status, updated_at) values
  (
    '50000000-0000-4000-8000-000000000001',
    'Consolidar Python e lógica de programação',
    'Continuar praticando com exercícios e pequenos programas até os fundamentos ficarem naturais.',
    'curto',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '50000000-0000-4000-8000-000000000002',
    'Avançar na trilha de cursos',
    'Seguir a sequência de dez playlists, sem pular etapas, registrando a conclusão de cada uma.',
    'curto',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '50000000-0000-4000-8000-000000000003',
    'Aprender SQL e modelagem de dados',
    'Consultar, filtrar e combinar dados com segurança antes de partir para ferramentas de visualização.',
    'medio',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '50000000-0000-4000-8000-000000000004',
    'Praticar Pandas, NumPy e visualização',
    'Transformar exercícios de Python em análises pequenas, com dados reais e conclusões claras.',
    'medio',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '50000000-0000-4000-8000-000000000005',
    'Trabalhar com Análise de Dados',
    'Chegar à primeira oportunidade profissional na área, com base técnica e projetos que sustentem a conversa.',
    'longo',
    'published',
    '2026-11-01T00:00:00Z'
  ),
  (
    '50000000-0000-4000-8000-000000000006',
    'Construir um portfólio com projetos reais',
    'Publicar análises e projetos que mostrem evolução, não apenas certificados.',
    'longo',
    'published',
    '2026-11-01T00:00:00Z'
  )
on conflict (id) do nothing;
