import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * MODELO DE CONTEÚDO — pronto para Directus.
 *
 * Cada coleção mapeia 1:1 para uma futura coleção do Directus, e o schema Zod
 * abaixo é o CONTRATO dos campos. Hoje o conteúdo vem de arquivos MDX via
 * `glob()`; amanhã, basta trocar o `loader` por um `directusLoader()` (ver
 * docs/directus.md) — todas as páginas usam `getCollection()`/`getEntry()`, então
 * a troca da fonte de dados não afeta o resto do site nem o build estático.
 *
 * Regras para manter a paridade com o CMS:
 *  - `slug` e `lang` são explícitos (não derivados de caminho/arquivo);
 *  - todo acesso a conteúdo passa por `getCollection`/`getEntry` (nunca ler arquivo direto);
 *  - campos novos devem ser planos e tipados (fáceis de virar campo no Directus).
 */

const langField = z.enum(['pt', 'en', 'es']);

// id = caminho do arquivo (ex.: "pt/sobre"). Sem isso, o glob loader usa o `slug`
// do front-matter como id e colide entre idiomas (mesmo slug em pt/en/es).
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx)$/, '');

/** Páginas institucionais (sobre, regras de acesso, etc.). → Directus: `paginas` */
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/paginas', generateId: idFromPath }),
  schema: z.object({
    title: z.string(),
    lang: langField,
    slug: z.string().optional(),
    description: z.string().optional(),
    order: z.number().default(99),
    hero: z.string().optional(),
    nav: z.boolean().default(false), // exibir no menu principal
    updated: z.coerce.date().optional(),
  }),
});

/** Notícias / chamadas / eventos. → Directus: `noticias` */
const noticias = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/noticias',
    generateId: idFromPath,
  }),
  schema: z.object({
    title: z.string(),
    lang: langField,
    slug: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

/** Coordenação e corpo técnico. → Directus: `equipe` */
const equipe = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/equipe' }),
  schema: z.object({
    name: z.string(),
    lang: langField.default('pt'),
    role: z.string().optional(),
    affiliation: z.string().optional(),
    photo: z.string().optional(),
    /** slug de uma página interna com o perfil completo (opcional) */
    pagina: z.string().optional(),
    order: z.number().default(99),
    links: z
      .object({
        lattes: z.string().url().optional(),
        orcid: z.string().url().optional(),
        site: z.string().url().optional(),
        email: z.string().email().optional(),
      })
      .partial()
      .optional(),
  }),
});

/**
 * Equipamentos / infraestrutura compartilhada — coleção específica de laboratório
 * multiusuário. O corpo (MDX) é a descrição longa. → Directus: `equipamentos`
 */
const equipamentos = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/equipamentos',
    generateId: idFromPath,
  }),
  schema: z.object({
    name: z.string(),
    lang: langField,
    slug: z.string().optional(),
    category: z.string().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    /** especificações técnicas em pares rótulo/valor (vira repeater no Directus) */
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    location: z.string().optional(),
    status: z.enum(['disponivel', 'manutencao', 'indisponivel']).default('disponivel'),
    /** link externo para o formulário/sistema de agendamento */
    booking_url: z.string().url().optional(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { paginas, noticias, equipe, equipamentos };
