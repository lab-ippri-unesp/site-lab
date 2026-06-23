import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { DEFAULT_LANG, t } from '~/i18n/translations';
import { localizedPath } from '~/utils/paths';
import { entrySlug } from '~/utils/content';

export const GET: APIRoute = async (context) => {
  const noticias = (await getCollection('noticias')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: `${t(DEFAULT_LANG, 'site.title')} — ${t(DEFAULT_LANG, 'news.title')}`,
    description: t(DEFAULT_LANG, 'site.tagline'),
    site: context.site!,
    items: noticias.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.excerpt ?? '',
      link: localizedPath(n.data.lang, `noticias/${entrySlug(n)}`),
      categories: n.data.tags,
    })),
  });
};
