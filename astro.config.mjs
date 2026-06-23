import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import rehypeBaseUrl from './src/plugins/rehype-base-url.mjs';

const base = '/';

export default defineConfig({
  // TODO(lab): trocar pelo domínio definitivo (ex.: https://lab.ippri.unesp.br)
  site: 'https://lab.ippri.unesp.br',
  base,
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [[rehypeBaseUrl, { base }]],
  },
  integrations: [mdx(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
});
