# AGENTS.md

Guia para desenvolvimento (humano e agêntico) neste repositório.

## Snapshot

- **Astro** estático (`output: 'static'`), **MDX** + content collections.
- **Tailwind 4 + DaisyUI 5**; temas `lab`/`labdark` em `src/styles/global.css`.
- **i18n**: `pt` (padrão), `en`, `es` — por prefixo de rota.
- **Busca**: Pagefind (gerado no `build`).
- Conteúdo **pronto para Directus** (ver `docs/directus.md`) — não quebrar essa paridade.

## Comandos

- `npm run dev` — desenvolvimento
- `npm run build` — build + Pagefind (`dist/`)
- `npm run typecheck` — `astro check`
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm run ci` — typecheck + lint + build (portão do CI; rode antes de PR)

Há hook `pre-commit` (`.githooks/`, ativado pelo `prepare`) com typecheck + lint.

## Estrutura

- `src/pages/` — rotas; localizadas em `src/pages/[lang]/`.
- `src/components/` — UI (`PascalCase.astro`).
- `src/content/` — MDX por coleção/idioma; schemas em `src/content.config.ts`.
- `src/i18n/translations.ts` — idiomas e dicionários (`t(lang, chave)`).
- `src/utils/`, `src/plugins/`, `src/styles/`.
- `docs/` — arquitetura, conteúdo, deploy, directus, template-e-frota.

## Estilo de código

- ESM apenas; imports agrupados no topo do frontmatter Astro; use o alias `~/*` (= `src/*`).
- Astro: frontmatter primeiro, lógica no frontmatter, markup limpo.
- TypeScript strict; tipos de retorno explícitos em helpers exportados; **Zod** nas coleções.
- Nomes: componentes `PascalCase`; funções `camelCase`; rotas/slugs `kebab-case`.
- Tratamento: early returns; fallbacks para campos opcionais; não lançar por conteúdo do usuário.
- Prettier: aspas simples, `printWidth` 100, `trailingComma: es5`.

## Coleções de conteúdo

- `paginas` — páginas institucionais. Obrigatórios: `title`, `lang`. `slug` explícito.
- `noticias` — Obrigatórios: `title`, `lang`, `date`. `slug` explícito.
- `equipe` — Obrigatórios: `name`. `lang` (default `pt`). Bios em pt servem de fallback.
- `equipamentos` — Obrigatórios: `name`, `lang`. `specs[]`, `status`, `booking_url` opcionais.

Regras (paridade com Directus): **`slug` e `lang` sempre explícitos**; mesma `slug` entre
idiomas; todo acesso via `getCollection`/`getEntry` (nunca ler arquivo direto).

## i18n

- Resolva o idioma por `Astro.params.lang`.
- Use `t(lang, chave)` (fallback: idioma → pt → chave) e `localizedPath(lang, caminho)`.
- Novas strings: adicione a chave em `pt`, `en` e `es` em `src/i18n/translations.ts`.
- `hreflang` e o seletor de idioma seguem `availableLangs` (idiomas em que a página existe).

## Estilo visual

- Use classes semânticas do DaisyUI e os **tokens** do tema (`primary`/`secondary`/`accent`/
  `neutral`/`base-*`) — não cravar cores. CSS custom localizado em `src/styles/global.css`.
- Pontos a personalizar por site estão marcados com `TODO(lab)`.

## Diretrizes práticas

- Mudanças mínimas e localizadas; siga os padrões dos arquivos vizinhos.
- Não traduzir conteúdo automaticamente; preservar o português quando apropriado.
- Não introduzir dependências novas sem necessidade.
- Ao mexer em conteúdo/loader, **manter a arquitetura pronta para Directus**.
