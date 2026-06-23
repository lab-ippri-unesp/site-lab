# Template e frota de sites

Este repositório é a **base reutilizável** dos sites do ecossistema (IPPRI e parceiros).
A ideia: padronizar a engenharia invisível (o _como_) e deixar 100% da identidade e do
conteúdo por conta de cada site (o _quê_ e a _cara_). Assim cada site novo nasce
consistente sem ficar igual aos outros.

## O que é compartilhado × o que é único

| 🔧 Compartilhado (vem do template)                                       | 🎨 Único de cada site                              |
| ------------------------------------------------------------------------ | -------------------------------------------------- |
| Stack e config: Astro, Tailwind/DaisyUI, TS, ESLint/Prettier             | Logo, **cores** (tokens do tema), fontes           |
| Arquitetura: coleções + **schemas Zod**, i18n/rotas, busca (Pagefind)    | Todo o **conteúdo** (`src/content/`)               |
| Casca: `BaseLayout`, `Header`/`Footer`, `ThemeToggle`, SEO, sitemap, RSS | Layout da **home**, hero, seções, menu             |
| CI/CD, convenções (`AGENTS.md`), `docs/`                                 | Domínio (`astro.config.mjs`), `public/imagens/`    |
| Camada de conteúdo **pronta para Directus** (`docs/directus.md`)         | Componentes de seção específicos                   |

Dois sites na mesma base podem ficar **completamente diferentes** — basta trocar cores,
logo, home e conteúdo. O template evita redecidir os ~80% chatos e idênticos a cada site.

## Como criar um site novo a partir desta base

**Opção A — GitHub Template Repository (recomendada):**

1. Marcar este repositório como _template_ (Settings → Template repository).
2. "Use this template" → novo repo (ex.: `site-odr`).
3. Customizar (checklist abaixo).

**Opção B — `degit` (sem histórico):**

```bash
npx degit lab-ippri-unesp/site-lab site-novo
```

### Checklist de customização de um site novo

- [ ] `package.json` → `name`, `description`
- [ ] `astro.config.mjs` → `site` (domínio)
- [ ] `src/styles/global.css` → tokens dos temas (`lab`/`labdark`) e fontes → identidade do site
- [ ] `src/i18n/translations.ts` → `site.title`, `site.tagline`, textos
- [ ] `public/favicon.svg` + `public/imagens/` → logo e imagens
- [ ] `src/content/**` → conteúdo real (apagar os placeholders)
- [ ] Ajustar coleções em `content.config.ts` se o site tiver tipos de conteúdo diferentes
- [ ] `README.md` / `AGENTS.md` → nome do site
- [ ] Conectar ao Cloudflare Pages (ver `docs/deploy.md`)

> Procure por `TODO(lab)` no projeto — marcam todos os pontos a trocar por site.

## Evolução: do template ao pacote compartilhado

A recomendação é **template-first** (baixo atrito, zero infra) e, quando estabilizar,
**extrair as partes 100% genéricas** para um pacote npm (ex.: `@ippri/site-kit` no GitHub
Packages). Candidatos naturais a virar pacote:

- `src/utils/` (paths, content), `src/plugins/rehype-base-url.mjs`
- o núcleo do i18n (mecanismo de tradução e rotas)
- componentes de casca genéricos (`ThemeToggle`, `Breadcrumbs`, `SectionBand`)
- **o futuro `directusLoader`** — assim todos os sites passam a usar o CMS de uma vez

Enquanto o pacote não existe, manter esses arquivos **isolados e sem dependências do
conteúdo** já facilita a extração futura (é o que este repositório faz).

## Sites do ecossistema (referência)

- **Padrão maduro:** `cpps-unesp/site-cpps` (rigor: ESLint/Prettier, AGENTS.md, CI).
- **Migração de WordPress:** `colabhd/site-redalint` (pipeline WXR→MDX, Actions de imagens).
- Irmãos: `site-nefits`, `site-nepps`, `site-gedai`, `site-lantri`, `site-nefa`, `site-odr`…

Esta base combina a estrutura enxuta do redalint com o rigor do cpps.
