// YV Group: one static page per language. English at /, the others under their code.
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    locales: ['en', 'pt', 'uk', 'ru'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'always' },
});
