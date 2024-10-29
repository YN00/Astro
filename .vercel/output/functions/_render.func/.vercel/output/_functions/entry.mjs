import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B6vJIaAM.mjs';
import { manifest } from './manifest_rEBKOIsU.mjs';
import './_astro-internal_middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const _page4 = () => import('./pages/_---slug_.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_terser@5.36.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/index.astro", _page3],
    ["node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "aaa5f552-f10d-405a-962e-0557cb2fa851",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
