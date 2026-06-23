# Integração futura com o Directus

Este site já nasce **pronto para Directus**. Nada precisa do Directus hoje — o conteúdo
vem de arquivos MDX. Mas a arquitetura foi desenhada para que, quando o Directus entrar,
a troca seja **localizada e barata**, sem reescrever páginas nem mudar o deploy.

## O princípio: 3 camadas desacopladas

```
┌─────────────────────────────────────────────────────────────┐
│  Páginas .astro  →  getCollection('noticias')                │  ← NÃO muda
├─────────────────────────────────────────────────────────────┤
│  Schema Zod (content.config.ts)  =  o CONTRATO dos campos    │  ← NÃO muda
├─────────────────────────────────────────────────────────────┤
│  loader: glob()  →  loader: directusLoader()                 │  ← único ponto que muda
└─────────────────────────────────────────────────────────────┘
```

- **Schema Zod = contrato.** Os campos definidos em `src/content.config.ts` são exatamente
  os campos que existirão nas coleções do Directus.
- **`getCollection`/`getEntry` = abstração.** Todas as páginas leem conteúdo por essas
  funções (nunca lendo arquivo direto). Elas não sabem nem se importam de onde vêm os dados.
- **`loader` = ponto de troca.** Hoje `glob()` lê MDX. Amanhã, um `directusLoader()` busca
  da API. O build continua estático (SSG) → o deploy no Cloudflare Pages não muda.

## Mapeamento coleção ↔ Directus

| Coleção (site) | Coleção (Directus) | Campos-chave (= campos no Directus)                                   |
| -------------- | ------------------ | -------------------------------------------------------------------- |
| `paginas`      | `paginas`          | title, lang, slug, description, order, hero, nav, updated, **body**   |
| `noticias`     | `noticias`         | title, lang, slug, date, excerpt, image, tags, author, featured, **body** |
| `equipe`       | `equipe`           | name, lang, role, affiliation, photo, pagina, order, links, **body**  |
| `equipamentos` | `equipamentos`     | name, lang, slug, category, summary, image, specs[], location, status, booking_url, order, featured, **body** |

`body` = o texto longo (corpo do MDX) → no Directus, um campo `markdown` ou `wysiwyg`.
`specs[]` e `links` → no Directus, um campo **repeater**/JSON.

### Regras que mantêm a paridade (já seguidas neste repo)

1. `slug` e `lang` são **explícitos** no front-matter (não derivados de caminho/arquivo).
   O par `(lang, slug)` é a chave estável da entrada — a mesma no MDX e no Directus.
2. Todo acesso a conteúdo passa por `getCollection`/`getEntry`.
3. Campos são planos e tipados (fáceis de virar campo no CMS).

## Como será o `directusLoader` (esboço)

O Astro 6 expõe a **Content Layer API**: um loader é um objeto com `name` e `load()`.
Exemplo (a escrever no futuro, em `src/loaders/directus.ts`):

```ts
import type { Loader } from 'astro/loaders';
import { createDirectus, rest, readItems } from '@directus/sdk';

export function directusLoader(collection: string): Loader {
  return {
    name: `directus:${collection}`,
    load: async ({ store, parseData, generateDigest }) => {
      const client = createDirectus(import.meta.env.DIRECTUS_URL).with(rest());
      const items = await client.request(
        readItems(collection, {
          filter: { status: { _eq: 'published' } },
          limit: -1,
        })
      );

      store.clear();
      for (const item of items) {
        const id = `${item.lang}/${item.slug}`; // mesma chave do glob loader
        const data = await parseData({ id, data: item }); // valida pelo MESMO schema Zod
        store.set({
          id,
          data,
          body: item.body ?? '',
          digest: generateDigest(item),
          rendered: { html: item.body_html ?? '' }, // se o corpo já vier em HTML
        });
      }
    },
  };
}
```

E em `content.config.ts`, a troca fica assim (o `schema` permanece idêntico):

```ts
const noticias = defineCollection({
  loader: import.meta.env.DIRECTUS_URL
    ? directusLoader('noticias')
    : glob({ pattern: '**/*.{md,mdx}', base: './src/content/noticias', generateId: idFromPath }),
  schema: z.object({ /* … inalterado … */ }),
});
```

> Estratégia recomendada: **híbrida com fallback** (acima) — se `DIRECTUS_URL` estiver
> definido, usa o CMS; senão, usa os MDX. Isso permite migrar uma coleção por vez e manter
> o desenvolvimento local sem depender do Directus.

## Variáveis de ambiente

```bash
# .env (NUNCA commitar — já está no .gitignore)
DIRECTUS_URL=https://cms.exemplo.unesp.br
DIRECTUS_TOKEN=...        # token de leitura (somente conteúdo publicado)
```

## i18n no Directus

Manter o **campo `lang`** em cada item (como hoje), com uma entrada por idioma. É o modelo
mais simples e mantém paridade 1:1 com o site. (A alternativa — _Translations_ nativo do
Directus — é mais sofisticada, mas exigiria adaptar o loader; só vale a pena se a edição
multilíngue exigir.)

## Rebuild quando o conteúdo muda

Como o site é estático, é preciso reconstruir quando um editor publica no Directus:

1. No Cloudflare Pages, criar um **Deploy Hook** (URL).
2. No Directus, criar um **Flow** (gatilho em create/update/delete das coleções) que faz
   um `POST` nesse Deploy Hook.

Resultado: editor salva no Directus → dispara o build → site no ar em ~1 min.

## Fases de migração

1. **Hoje** — conteúdo em MDX (`glob`). _(estado atual)_
2. **Fase 2** — adicionar `@directus/sdk` + `src/loaders/directus.ts` neste repo e migrar
   coleção por coleção com o fallback híbrido.
3. **Fase 3** — extrair o `directusLoader` para o **pacote compartilhado** do ecossistema
   (ver `docs/template-e-frota.md`), para que todos os sites adotem o CMS de uma só vez.
