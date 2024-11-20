import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import react from '@astrojs/react';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astroI18next from 'astro-i18next';

// import vercel from '@astrojs/vercel/serverless';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  // adapter: vercel(),
  integrations: [
    react(),
    vue({ devtools: true }),
    VitePWA(),
    tailwind(),
    svelte(),
    sitemap(),
    astroI18next(),
    mdx(),
  ],
  env: {
    schema: {
      GOOGLE_MAP_KEY: envField.string({
        context: 'client',
        access: 'public',
        default: env.PUBLIC_GOOGLE_MAP_KEY,
      }),
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 1024,
    },
  },
});
