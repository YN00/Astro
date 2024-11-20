/// <reference types="vitest" />

import { getViteConfig, type ViteUserConfig } from 'astro/config';

const config: ViteUserConfig = {
  // @ts-ignore
  // test: {
  //   globals: true,
  // include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  // exclude: [
  //   '**/node_modules/**',
  //   '**/dist/**',
  //   '**/cypress/**',
  //   '**/.{idea,git,cache,output,temp}/**',
  //   '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  // ],
  // },
};

export default getViteConfig(config);
