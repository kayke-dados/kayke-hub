# Relatório 05 — Publicação no GitHub Pages (FASE 7)

## Estado garantido

- **Compatibilidade com hospedagem estática:** existe — único `index.html` na raiz, sem backend, sem build.
- **HTTPS:** GitHub Pages aplica **Enforce HTTPS** por padrão em domínio `*.github.io` (ative após publicar: Settings → Pages → Enforce HTTPS).
- **Funcionamento em subdiretório:** garantido por teste automatizado — nenhum caminho absoluto (`/assets/...`) no HTML/CSS/JS; todos os refs são relativos e o suíte `tests/test_paths.py::test_refs_survive_subdirectory` cobre `/kayke-hub/`.
- **Ausência de dependências de backend:** verdade — nenhum fetch de API, tudo embutido/servido localmente (Google Fonts é a única origem externa de conteúdo, com fallback nativo).
- **QR Code:** gerado para `https://kayke-dados.github.io/kayke-hub/` (bg branco + borda 4 módulos).

## Passos exatos (o repositório é `kayke-dados/kayke-hub`)

1. Arquivos já commitados na branch `main`:
   ```bash
   git remote add origin git@github.com:kayke-dados/kayke-hub.git
   git push -u origin main
   ```
   *(Autorização para commit/push neste repositório foi dada explicitamente nesta sessão.)*
2. No GitHub web: **Settings → Pages** →
   Build and deployment → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → **Save**.
3. Aguarde ~1 minuto. O cartão fica em **`https://kayke-dados.github.io/kayke-hub/`**.
4. **Settings → Pages → Enforce HTTPS** (checkbox) — garante o escanear do QR.
5. Abra em um celular real e **escaneie o QR Code da própria página**; o QR abre exatamente a URL publicada.
6. Confira os compartilhamentos: nome do site + imagem no preview cumprem `og-image.png` (1200×630) e `og:title`.

## Se algo mudar depois

- Cor(es) da marca: `css/style.css` → `:root`
- URL nova: `js/main.js` → `SITE_URL`, rode `python3 tools/make_assets.py`, commit/push — QR, canonical e OG regeneram/ajustam.

## Checklist pós-publicação (impossível automatizar aqui)

- [ ] Escanear o QR de um celular real
- [ ] Confirmação do preview do WhatsApp/X/Telegram (og:image)
- [ ] Lighthouse em Chrome (PageSpeed Insights com a URL publicada)
