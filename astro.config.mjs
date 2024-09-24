import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import astroI18next from 'astro-i18next';
import { loadEnv } from 'vite';
import starlight from '@astrojs/starlight';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    vue({ devtools: true }),
    tailwind(),
    svelte(),
    sitemap(),
    astroI18next(),
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
  experimental: {
    env: {
      schema: {
        GOOGLE_MAP_KEY: envField.string({
          context: 'client',
          access: 'public',
          default: env.PUBLIC_GOOGLE_MAP_KEY,
        }),
      },
    },
  },
});
