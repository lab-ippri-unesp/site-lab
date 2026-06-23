# site-lab — Laboratório Multiusuário do IPPRI

Site público do **Laboratório Multiusuário do IPPRI** (UNESP). Site estático em Astro,
trilíngue (pt/en/es), com modelo de conteúdo **pronto para Directus**.

Este repositório também serve de **base reutilizável** para os próximos sites do
ecossistema — ver [`docs/template-e-frota.md`](docs/template-e-frota.md).

> ⚠️ **Estado atual: esqueleto com conteúdo placeholder.** Os textos, a identidade visual
> (cores, logo, fontes) e os dados (equipe, equipamentos) são exemplos marcados com
> `TODO(lab)`, prontos para serem substituídos pelo conteúdo oficial.

## Stack

- **Astro** (output estático) + **MDX**
- **Tailwind CSS 4** + **DaisyUI 5** (temas claro/escuro)
- **Pagefind** (busca client-side)
- **TypeScript** (strict) · **ESLint** + **Prettier**
- Fontes self-hosted (`@fontsource`)

## Requisitos

- Node 22 (ver `.nvmrc`) · npm · Git

## Começando

```bash
npm install
npm run dev        # http://localhost:4321
```

## Scripts

| Script              | O que faz                                            |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                          |
| `npm run build`     | Build estático + índice Pagefind (`dist/`)           |
| `npm run preview`   | Pré-visualiza o build                                |
| `npm run typecheck` | `astro check`                                        |
| `npm run lint`      | ESLint                                               |
| `npm run format`    | Prettier (escreve)                                   |
| `npm run ci`        | typecheck + lint + build (mesmo portão do CI)        |

## Estrutura

```
src/
  content.config.ts   # schemas Zod das coleções (paginas, noticias, equipe, equipamentos)
  content/            # conteúdo MDX por coleção e idioma
  i18n/               # idiomas e dicionários (pt/en/es)
  layouts/ components/ pages/ utils/ plugins/ styles/
public/               # imagens, favicon, robots.txt
docs/                 # arquitetura, conteúdo, deploy, directus, template-e-frota
```

## Documentação

- [`docs/arquitetura.md`](docs/arquitetura.md) — visão geral técnica
- [`docs/conteudo.md`](docs/conteudo.md) — como editar páginas, notícias, equipe e equipamentos
- [`docs/deploy.md`](docs/deploy.md) — deploy no Cloudflare Pages
- [`docs/directus.md`](docs/directus.md) — **integração futura com o Directus**
- [`docs/template-e-frota.md`](docs/template-e-frota.md) — **reuso entre os sites do ecossistema**

## Idiomas

Português (padrão), Inglês e Espanhol, por prefixo de rota (`/pt/`, `/en/`, `/es/`).
Conteúdo sem tradução usa o português como fallback.

## Deploy

Cloudflare Pages (`npm run build` → `dist/`). Ver [`docs/deploy.md`](docs/deploy.md).
Lembre de atualizar `site` em `astro.config.mjs` e o `Sitemap:` em `public/robots.txt`
com o domínio definitivo.
