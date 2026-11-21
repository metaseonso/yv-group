// YV Group: one static page per language. English at the base, the others under their code.
// Preview on GitHub Pages: https://metaseonso.github.io/yv-group/ (Seonso, 2026-11-21: "its supposed to be just github pages").
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://metaseonso.github.io',
  base: '/yv-group',
  i18n: {
    locales: ['en', 'pt', 'uk', 'ru'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'always' },
});
