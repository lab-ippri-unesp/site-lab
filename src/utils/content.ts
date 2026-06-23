/**
 * Slug de uma entrada de conteúdo: usa o `slug` do front-matter ou, na ausência,
 * o nome do arquivo (id sem o diretório de idioma).
 *
 * Manter o `slug` explícito no front-matter é o que torna a migração para o
 * Directus mecânica: o mesmo `slug` vira a chave da coleção no CMS (ver
 * docs/directus.md).
 */
export function entrySlug(entry: { id: string; data: { slug?: string } }): string {
  return entry.data.slug ?? entry.id.split('/').pop()!;
}
