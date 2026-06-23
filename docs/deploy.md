# Deploy

Site estático (`output: 'static'`). O build gera `dist/` e o índice de busca do Pagefind:

```bash
npm run build   # astro build && pagefind --site dist
```

## Cloudflare Pages (recomendado)

Mesmo padrão dos sites irmãos (cpps, redalint).

1. Conectar o repositório no Cloudflare Pages.
2. Configuração de build:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Framework preset:** Astro
   - **Variável de ambiente:** `NODE_VERSION = 22`
3. **Produção:** branch `main` → domínio definitivo (ex.: `lab.ippri.unesp.br`).
4. **Previews:** demais branches ganham deploy de pré-visualização automático.

Depois de definir o domínio, atualizar:

- `site` em `astro.config.mjs`
- `Sitemap:` em `public/robots.txt`

> Se o deploy for em **subdiretório** (ex.: GitHub Pages em `/site-lab/`), ajustar `base`
> em `astro.config.mjs`. Como os caminhos de assets/links passam por `withBase`/`assetPath`
> e pelo plugin `rehype-base-url`, o site continua funcionando sob qualquer base.

## Qualidade antes do deploy

`npm run ci` roda o mesmo portão do CI: `astro check` (typecheck) + `eslint` + `build`.
O hook `pre-commit` (em `.githooks/`, ativado pelo script `prepare`) roda typecheck + lint
a cada commit.
