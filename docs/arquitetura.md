# Arquitetura

Site estático em **Astro** (output `static`), **Tailwind 4 + DaisyUI 5**, busca
**Pagefind**, trilíngue (**pt/en/es**). Conteúdo em **content collections** validadas por
**Zod**, hoje carregadas de MDX (e prontas para Directus — ver `docs/directus.md`).

## Estrutura

```
src/
  content.config.ts     # schemas Zod das coleções (o contrato dos dados)
  content/              # MDX por coleção e idioma: <colecao>/<lang>/<slug>.mdx
    paginas/ noticias/ equipe/ equipamentos/
  i18n/translations.ts  # idiomas, locales e dicionários pt/en/es (função t())
  layouts/BaseLayout.astro   # casca: <head>, SEO, hreflang, tema, header/footer
  components/           # casca + cards (NoticiaCard, EquipamentoCard…)
  pages/
    index.astro         # redireciona / → /pt/
    [lang]/             # rotas localizadas (uma por idioma via getStaticPaths)
      index.astro       # home
      [...slug].astro   # páginas institucionais (coleção paginas)
      equipamentos/     # lista + detalhe
      noticias/         # lista + detalhe
      equipe.astro busca.astro
    sitemap.xml.ts rss.xml.ts 404.astro
  utils/                # paths (base/i18n) e content (entrySlug)
  plugins/rehype-base-url.mjs  # ajusta imagens/links do markdown
  styles/global.css     # temas DaisyUI (lab/labdark) + tipografia
```

## Decisões-chave

- **i18n por prefixo de rota** (`/pt/…`, `/en/…`, `/es/…`). `getLangFromUrl` implícito via
  `Astro.params.lang`. `t(lang, chave)` com fallback para pt e depois para a própria chave.
- **`slug` + `lang` explícitos** no front-matter → chave estável `(lang, slug)`, essencial
  para a paridade com o Directus.
- **Fallback de idioma**: listas (notícias, equipamentos) sem versão traduzida exibem as
  entradas em português; o seletor de idioma só oferece os idiomas existentes (hreflang
  reflete isso).
- **Tema claro/escuro** via `data-theme` + `localStorage`, com script inline anti-FOUC.
- **SEO**: canonical, hreflang + x-default, Open Graph, JSON-LD, sitemap e RSS.
