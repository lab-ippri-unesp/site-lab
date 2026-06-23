# Como editar o conteúdo

Todo o conteúdo fica em `src/content/<coleção>/<lang>/<slug>.mdx`. O front-matter (YAML no
topo) é validado pelos schemas em `src/content.config.ts` — se algum campo obrigatório
faltar, o build falha com uma mensagem clara.

> Mantenha **`slug` e `lang`** sempre explícitos e use o **mesmo `slug`** para as versões
> de uma página nos vários idiomas (é o que liga as traduções e habilita o hreflang).

## Páginas institucionais (`paginas`)

`src/content/paginas/pt/exemplo.mdx`:

```mdx
---
title: 'Título da página'
lang: pt
slug: exemplo
description: 'Resumo curto para SEO e topo da página.'
order: 30
nav: true
---

Conteúdo em **Markdown/MDX**.
```

## Notícias (`noticias`)

```mdx
---
title: 'Título da notícia'
lang: pt
slug: minha-noticia
date: 2026-06-20
excerpt: 'Chamada curta exibida nos cards e no SEO.'
image: /imagens/noticias/minha-noticia.jpg # opcional
tags: ['evento']
---

Corpo da notícia.
```

## Equipe (`equipe`)

```mdx
---
name: 'Nome da Pessoa'
lang: pt
role: 'Cargo'
affiliation: 'IPPRI · UNESP'
photo: /imagens/equipe/pessoa.jpg # opcional
order: 1
links: { lattes: 'https://...', orcid: 'https://...', email: 'pessoa@unesp.br' }
---

Mini-bio em Markdown.
```

As bios podem existir só em pt — os demais idiomas usam o português como fallback.

## Equipamentos (`equipamentos`)

```mdx
---
name: 'Nome do equipamento'
lang: pt
slug: nome-do-equipamento
category: 'Computação'
summary: 'Descrição curta para os cards.'
status: disponivel # disponivel | manutencao | indisponivel
booking_url: 'https://...' # opcional: sistema/formulário de agendamento
featured: true # destaca na home
order: 1
specs:
  - { label: 'Memória', value: '128 GB RAM' }
  - { label: 'Software', value: 'R, Python' }
---

Descrição longa do equipamento, aplicações e pré-requisitos.
```

## Imagens

Coloque os arquivos em `public/imagens/...` e referencie a partir da raiz
(`/imagens/...`). O plugin `rehype-base-url` ajusta o caminho e injeta
`width`/`height`/`loading="lazy"` automaticamente.
