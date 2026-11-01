<div align="center">

# Kayke Hub

**Portfólio pessoal e registro da minha jornada na tecnologia.**

Um espaço para apresentar quem sou, o que estou estudando e os projetos que construo — estático, rápido e bilíngue.

<img src="assets/readme/banner.svg" alt="Kayke Hub — portfólio pessoal de Python e análise de dados" width="100%" />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![testes](https://github.com/kayke-dados/kayke-hub/actions/workflows/tests.yml/badge.svg)
![licença](https://img.shields.io/badge/licen%C3%A7a-MIT-A78BFA?style=flat-square)

[Site](https://kayke-dados.github.io/kayke-hub/) ·
[GitHub](https://github.com/kayke-dados) ·
[Instagram](https://www.instagram.com/kayke.dados/) ·
[E-mail](mailto:kayke0812@proton.me)

</div>

## Navegação

[Sobre o projeto](#sobre-o-projeto) · [Demonstração visual](#demonstração-visual) · [Funcionalidades](#funcionalidades) · [Tecnologias](#tecnologias-utilizadas) · [Estrutura](#estrutura-de-diretórios)

[Execução local](#execução-local) · [Vercel](#hospedagem-na-vercel) · [Manutenção](#personalização-e-manutenção) · [Testes](#testes-e-qualidade)

[Segurança](#segurança-e-privacidade) · [Roadmap](#roadmap) · [Autor](#autor) · [IA](#transparência-sobre-o-uso-de-ia) · [Licença](#licença)

## Sobre o projeto

O **Kayke Hub** é o meu espaço pessoal na internet. Ele reúne, em uma única página estática:

- quem eu sou e o que estou aprendendo;
- a minha jornada de estudos, com dados reais dos meus exercícios;
- os projetos que estou construindo;
- as formas de entrar em contato.

**Por que ele existe.** Eu queria um endereço fixo para acompanhar e documentar a minha evolução na tecnologia, em vez de espalhar isso por vários lugares. Também queria praticar desenvolvimento web de verdade: HTML semântico, CSS, JavaScript puro, acessibilidade, i18n e publicação.

**A quem se destina.** A qualquer pessoa que queira entender rapidamente quem eu sou e onde estou na minha trajetória — e, principalmente, a mim: é o meu registro público de aprendizado.

**Como pode evoluir.** O site acompanha o ritmo dos meus estudos. Novos projetos, novas seções de jornada e um registro de evolução entram conforme o conteúdo real aparece. Sem pressa e sem inventar o que ainda não existe.

> Este é um projeto pessoal de estudo, não um produto comercial.

## Demonstração visual

O banner acima usa a identidade violeta do site. O cartão social (`assets/og-image.png`, 1200×630) é gerado por `tools/make_assets.py` e é o que aparece quando o link é compartilhado.

<img src="assets/og-image.png" alt="Cartão social do Kayke Hub com o nome, a chamada e um QR Code" width="480" />

Para uma apresentação ainda melhor, seria interessante adicionar futuramente:

- uma captura de tela do site no **desktop**;
- uma captura de tela no **celular**;
- um GIF curto mostrando a alternância de idioma e o compartilhamento.

Ainda não existem capturas de tela reais no repositório, então nada foi inventado aqui.

## Funcionalidades

### Implementado

- **Apresentação** — nome, área de interesse, frase de identidade e botões de ação.
- **Projetos** — cards com nome, descrição, objetivo, tecnologias, estado e links.
- **Jornada** — o que já conheço, o que estudo agora e objetivos futuros, além do painel real do Python-Journey.
- **Contato** — GitHub, Instagram e e-mail.
- **Alternância PT/EN** — inglês natural, preferência salva no navegador, português como padrão.
- **QR Code** — para abrir o site pelo celular.
- **Copiar endereço** — com fallback quando a Clipboard API não está disponível.
- **Compartilhar** — Web Share API, com cópia do link como alternativa.
- **GitHub ao vivo** — repositórios públicos via API, com cache de 10 minutos e fallback para o perfil.
- **Responsividade** — layout pensado primeiro para o celular.
- **Acessibilidade** — HTML semântico, foco visível, alvos de toque de 44 px, `aria-current` e menu funcional sem JavaScript.
- **Movimento reduzido** — as animações respeitam `prefers-reduced-motion`.
- **SEO e compartilhamento** — título, descrição, canonical, Open Graph, Twitter Cards, JSON-LD, `robots.txt` e `sitemap.xml`.

### Planejado

- capturas de tela no README;
- uma seção de registro de evolução (diário) integrada à página;
- atualização contínua do conteúdo conforme os estudos avançam.

## Tecnologias utilizadas

**Estrutura e interface**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

- HTML5 semântico.
- CSS puro com variáveis customizadas (sem pré-processador).
- JavaScript puro (ES6+), sem framework, bundler ou transpilador.

**Funcionalidades no navegador**

- `fetch` para a API pública do GitHub.
- `Web Share API` e `Clipboard API`, com fallbacks.
- `localStorage` e `sessionStorage` para preferência e cache.
- `IntersectionObserver` para seção ativa e revelações de entrada.

**Ferramentas de desenvolvimento**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

- Python 3 para gerar assets (`tools/make_assets.py`).
- [segno](https://pypi.org/project/segno/) para gerar o QR Code.
- Google Fonts (Manrope, Inter e JetBrains Mono).

**Testes**

- `pytest` executando casos escritos com `unittest`.
- `node --check` para a sintaxe do JavaScript.
- GitHub Actions para rodar tudo a cada push e pull request.

**Hospedagem**

- Alvo: **Vercel** (site estático, sem build).
- Atual: **GitHub Pages** (endereço ainda ativo enquanto a Vercel não é configurada).

## Estrutura de diretórios

```text
kayke-hub/
├── .github/workflows/tests.yml   # CI: pytest + node --check
├── assets/                       # avatar, favicon, QR, og-image e capas
│   └── projects/                 # capas em SVG dos projetos
├── css/
│   └── style.css                 # design system e layout
├── docs/superpowers/             # specs e planos do projeto
├── js/
│   └── main.js                   # i18n, navegação, compartilhar e GitHub
├── reports/                      # histórico de auditoria e versões
├── tests/                        # testes automatizados
├── tools/
│   └── make_assets.py            # gera avatar, favicon, QR e og-image
├── index.html                    # página única
├── robots.txt
├── sitemap.xml
├── vercel.json                   # cache e cabeçalhos para a Vercel
└── LICENSE
```

- **`index.html`** — todo o conteúdo (português embutido; inglês aplicado pelo JS).
- **`css/style.css`** — variáveis de cor, tipografia e layout mobile-first.
- **`js/main.js`** — definição de `SITE_URL`, textos em inglês e interações.
- **`assets/`** — imagens estáticas; `og-image.png` é a imagem de compartilhamento.
- **`tools/make_assets.py`** — regenera os assets a partir do `SITE_URL`.
- **`tests/`** — garante que HTML, CSS, contraste, i18n, links e caminhos continuam corretos.

## Execução local

**Pré-requisitos**

- `git`
- Python 3 (para servir o site e rodar os testes)
- Node.js (opcional, só para checar a sintaxe do JavaScript)

```bash
# 1. clonar
git clone https://github.com/kayke-dados/kayke-hub.git

# 2. entrar na pasta
cd kayke-hub

# 3. servir localmente
python3 -m http.server 8000
```

Abra `http://localhost:8000` no navegador. Se aparecer o site com os textos em português e o nome "Kayke", está funcionando.

> Não existe `package.json` e nada depende de `npm`. O projeto é estático de propósito.

## Hospedagem na Vercel

O projeto é estático, então a Vercel publica sem etapa de build.

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório `kayke-dados/kayke-hub`.
2. Em configuração do projeto:
   - **Framework Preset:** `Other`
   - **Build Command:** deixe vazio
   - **Output Directory:** `.`
3. Clique em **Deploy**. A Vercel passa a publicar automaticamente a cada push na `main`.
4. Depois do primeiro deploy, copie a URL final.

O arquivo `vercel.json` já define cache longo para `assets/` e cabeçalhos básicos de segurança (`X-Content-Type-Options` e `Referrer-Policy`).

### Atualizar a URL de produção

A URL fica em **um único lugar**: `SITE_URL`, no topo de `js/main.js`.

```js
const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";
```

Enquanto a Vercel não tiver endereço definitivo, esse valor continua apontando para o GitHub Pages, que é o endereço real e ativo. Quando a URL da Vercel existir, troque o valor e regenere os assets:

```bash
python3 tools/make_assets.py
```

O script lê o `SITE_URL` de `js/main.js`, então essa é a única fonte de verdade. Atualize também o `canonical` e o Open Graph em `index.html` e o `sitemap.xml`.

**O domínio definitivo da Vercel ainda não está configurado.** Nada de URL inventada.

## Personalização e manutenção

| O que mudar | Onde |
|---|---|
| Textos em português | `index.html` (conteúdo das tags `data-i18n`) |
| Textos em inglês | `js/main.js` (objeto `I18N.en`) |
| Projetos e links | `index.html`, seção `#projetos` |
| Redes sociais e e-mail | `index.html` (contato e rodapé) |
| Cores e tipografia | `css/style.css`, bloco `:root` |
| Imagem de compartilhamento e QR | `tools/make_assets.py` |

As cores do site ficam em `:root`, em `css/style.css`:

```css
--bg: #0B0D12;        /* grafite profundo */
--bg-2: #10141C;
--surface: #151A24;   /* grafite azulado */
--border: #262C38;
--text: #F1F0F5;      /* branco suave */
--muted: #A1A1AA;     /* cinza secundário */
--accent: #A78BFA;    /* violeta principal */
--accent-2: #7C5CC4;  /* roxo profundo (interações) */
```

Depois de mexer nas cores, rode os testes: eles verificam o contraste dos textos principais.

## Testes e qualidade

```bash
python3 -m pytest tests/ -q     # suíte completa
node --check js/main.js         # sintaxe do JavaScript
```

O que a suíte cobre:

- estrutura e metadados do `index.html`;
- tokens de cor, fontes e responsividade no CSS;
- contraste mínimo (AA) dos textos principais;
- consistência entre as chaves de tradução do HTML e o dicionário em inglês;
- links externos e caminhos locais;
- configuração de produção (`vercel.json`, `robots.txt`, `sitemap.xml`);
- âncoras internas com destino existente.

A CI (`.github/workflows/tests.yml`) roda os testes e o `node --check` a cada push e pull request. No último check local: **66 testes passando e 1 ignorado** — o teste de dimensões de imagem é pulado quando a biblioteca `Pillow` não está instalada. Nenhuma falha foi escondida.

## Segurança e privacidade

Verificado no código:

- **Sem backend, sem banco de dados, sem formulários.**
- **Sem variáveis de ambiente e sem segredos** no repositório.
- `localStorage` guarda apenas a **preferência de idioma** (`kd-lang`).
- `sessionStorage` guarda um **cache temporário** (10 minutos) da lista de repositórios do GitHub.
- O site faz **requisições externas** à API pública do GitHub e ao Google Fonts.
- A API do GitHub é acessada **sem token**; se falhar, o bloco mostra um link para o perfil.
- Os links de contato usam `mailto:`; nenhum dado é coletado ou enviado pelo site.

## Roadmap

**Concluído**

- [x] Redesign do site com identidade visual própria.
- [x] Paleta grafite + violeta aplicada de forma consistente (incluindo mobile).
- [x] Alternância PT/EN com preferência persistida.
- [x] QR Code, copiar endereço e compartilhamento.
- [x] Repositórios do GitHub ao vivo, com cache e fallback.
- [x] Acessibilidade e respeito a `prefers-reduced-motion`.
- [x] SEO, Open Graph e `sitemap.xml`.
- [x] Suíte de testes e integração contínua.

**Em andamento**

- [ ] Definir a URL definitiva da Vercel e atualizar `SITE_URL`, canonical e Open Graph.
- [ ] Manter o conteúdo (projetos e jornada) atualizado conforme os estudos.
- [ ] Adicionar capturas de tela reais ao README.

**Próximos passos**

- [ ] Publicar uma seção de registro de evolução na própria página.
- [ ] Ampliar a apresentação dos projetos conforme novos forem concluídos.
- [ ] Avaliar um tema claro opcional, mantendo a identidade violeta.

## Autor

Sou o **Kayke**, estudante e estou construindo a minha trajetória na tecnologia.

- Estudo **Python**, lógica e fundamentos da programação, com foco futuro em **análise de dados**.
- Gosto de aprender na prática, documentar a evolução e transformar o estudo em pequenos projetos.
- O [Python-Journey](https://github.com/kayke-dados/Python-Journey) registra os meus exercícios, organizados por capítulo.
- O Kayke Hub começou como prática de desenvolvimento web e virou o meu espaço pessoal na internet.

Não tenho experiência profissional, formação ou certificações na área para apresentar — estou começando, e este repositório é parte disso.

[GitHub](https://github.com/kayke-dados) · [Instagram](https://www.instagram.com/kayke.dados/) · [E-mail](mailto:kayke0812@proton.me)

## Transparência sobre o uso de IA

Ferramentas de inteligência artificial fazem parte do processo de desenvolvimento deste projeto. Elas foram usadas para me ajudar a escrever e implementar o código, sempre a partir das minhas decisões, do meu conteúdo e da minha identidade.

A IA é uma ferramenta de aprendizado e desenvolvimento: eu testo, leio, ajusto e entendo o que entra no projeto. Não atribuo a mim, como escrita manual, partes do código que não escrevi pessoalmente — e este README existe também para deixar isso claro.

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE).

<div align="center">

Feito no ritmo de quem está aprendendo — **consistência > intensidade**.

</div>
