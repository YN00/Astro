import { h as decodeKey } from './chunks/astro/server_BB8JYHJv.mjs';
import './chunks/astro-designed-error-pages_ms9GRl-u.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_CT3jP1RJ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === 'string') {
        return [
          key,
          value.normalize().replace(/#/g, '%23').replace(/\?/g, '%3F'),
        ];
      }
      return [key, value];
    }),
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || '';
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content
    .normalize()
    .replace(/\?/g, '%3F')
    .replace(/#/g, '%23')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');
}
function getSegment(segment, params) {
  const segmentPath = segment
    .map((part) => getParameter(part, params))
    .join('');
  return segmentPath ? '/' + segmentPath : '';
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = '';
    if (addTrailingSlash === 'always' && segments.length) {
      trailing = '/';
    }
    const path =
      segments.map((segment) => getSegment(segment, sanitizedParams)).join('') +
      trailing;
    return path || '/';
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(
      rawRouteData.segments,
      rawRouteData._meta.trailingSlash,
    ),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute
      ? deserializeRouteData(rawRouteData.redirectRoute)
      : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData),
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key,
  };
}

const manifest = deserializeManifest({
  hrefRoot: 'file:///Users/chan/kiara/',
  adapterName: '@astrojs/vercel/serverless',
  routes: [
    {
      file: '404.html',
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        type: 'page',
        isIndex: false,
        route: '/404',
        pattern: '^\\/404\\/?$',
        segments: [[{ content: '404', dynamic: false, spread: false }]],
        params: [],
        component:
          'node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/404.astro',
        pathname: '/404',
        prerender: true,
        fallbackRoutes: [],
        _meta: { trailingSlash: 'ignore' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [{ type: 'external', value: '/_astro/page.7qqag-5g.js' }],
      styles: [],
      routeData: {
        type: 'endpoint',
        isIndex: false,
        route: '/_image',
        pattern: '^\\/_image$',
        segments: [[{ content: '_image', dynamic: false, spread: false }]],
        params: [],
        component:
          'node_modules/.pnpm/astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_terser@5.36.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js',
        pathname: '/_image',
        prerender: false,
        fallbackRoutes: [],
        _meta: { trailingSlash: 'ignore' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [{ type: 'external', value: '/_astro/page.7qqag-5g.js' }],
      styles: [{ type: 'external', src: '/_astro/index.D5wDN8si.css' }],
      routeData: {
        route: '/about',
        isIndex: false,
        type: 'page',
        pattern: '^\\/about\\/?$',
        segments: [[{ content: 'about', dynamic: false, spread: false }]],
        params: [],
        component: 'src/pages/about.astro',
        pathname: '/about',
        prerender: false,
        fallbackRoutes: [],
        _meta: { trailingSlash: 'ignore' },
      },
    },
    {
      file: '',
      links: [],
      scripts: [{ type: 'external', value: '/_astro/page.7qqag-5g.js' }],
      styles: [
        { type: 'external', src: '/_astro/index.D5wDN8si.css' },
        { type: 'external', src: '/_astro/index.ClD-RlSb.css' },
      ],
      routeData: {
        route: '/',
        isIndex: true,
        type: 'page',
        pattern: '^\\/$',
        segments: [],
        params: [],
        component: 'src/pages/home.astro',
        pathname: '/',
        prerender: false,
        fallbackRoutes: [],
        _meta: { trailingSlash: 'ignore' },
      },
    },
  ],
  base: '/',
  trailingSlash: 'ignore',
  compressHTML: true,
  componentMetadata: [
    [
      '/Users/chan/kiara/src/pages/home.astro',
      { propagation: 'none', containsHead: true },
    ],
    ['\u0000astro:content', { propagation: 'in-tree', containsHead: false }],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/404.astro',
      { propagation: 'in-tree', containsHead: true },
    ],
    [
      '\u0000@astro-page:node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/404@_@astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '\u0000@astrojs-ssr-virtual-entry',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/utils/routing.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/home.astro',
      { propagation: 'in-tree', containsHead: true },
    ],
    [
      '\u0000@astro-page:node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/index@_@astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/utils/navigation.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components/SidebarPersister.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components/Sidebar.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '\u0000virtual:starlight/components/Sidebar',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components/Page.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/common.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components/SidebarSublist.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/utils/route-data.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/utils/translations.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/internal.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '\u0000virtual:astro-expressive-code/preprocess-config',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/astro-expressive-code@0.35.6_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79._5ukkn7xfqrrvdypxx2qnuuf3um/node_modules/astro-expressive-code/components/renderer.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/astro-expressive-code@0.35.6_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79._5ukkn7xfqrrvdypxx2qnuuf3um/node_modules/astro-expressive-code/components/Code.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/astro-expressive-code@0.35.6_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79._5ukkn7xfqrrvdypxx2qnuuf3um/node_modules/astro-expressive-code/components/index.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/components/Footer.astro',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '\u0000virtual:starlight/components/Footer',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/src/content/docs/index.mdx',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/src/content/docs/index.mdx?astroPropagatedAssets',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/locals.ts',
      { propagation: 'in-tree', containsHead: false },
    ],
    [
      '\u0000astro-internal:middleware',
      { propagation: 'in-tree', containsHead: false },
    ],
  ],
  renderers: [],
  clientDirectives: [
    [
      'idle',
      '(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();',
    ],
    [
      'load',
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
    ],
    [
      'media',
      '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();',
    ],
    [
      'only',
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
    ],
    [
      'visible',
      '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();',
    ],
  ],
  entryModules: {
    '\u0000astro-internal:middleware': '_astro-internal_middleware.mjs',
    '\u0000@astrojs-ssr-adapter': '_@astrojs-ssr-adapter.mjs',
    '\u0000@astrojs-ssr-virtual-entry': 'entry.mjs',
    '\u0000@astro-page:src/pages/about@_@astro': 'pages/about.astro.mjs',
    '\u0000@astro-page:node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/index@_@astro':
      'pages/_---slug_.astro.mjs',
    '\u0000@astro-page:node_modules/.pnpm/astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_terser@5.36.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic@_@js':
      'pages/_image.astro.mjs',
    '\u0000@astro-page:node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/routes/static/404@_@astro':
      'pages/404.astro.mjs',
    '\u0000@astro-page:src/pages/index@_@astro': 'pages/home.astro.mjs',
    '\u0000@astro-renderers': 'renderers.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_terser@5.36.0_typescript@5.6.3/node_modules/astro/dist/env/setup.js':
      'chunks/astro/env-setup_Cr6XTFvb.mjs',
    '/Users/chan/kiara/src/content/docs/guides/example.md?astroContentCollectionEntry=true':
      'chunks/example_Dkml5wRX.mjs',
    '/Users/chan/kiara/src/content/docs/index.mdx?astroContentCollectionEntry=true':
      'chunks/index_CAkv5s4O.mjs',
    '/Users/chan/kiara/src/content/docs/reference/example.md?astroContentCollectionEntry=true':
      'chunks/example_DeRJdJJw.mjs',
    '/Users/chan/kiara/src/content/docs/guides/example.md?astroPropagatedAssets':
      'chunks/example_CpP9JVyT.mjs',
    '/Users/chan/kiara/src/content/docs/index.mdx?astroPropagatedAssets':
      'chunks/index_TG-RB0cI.mjs',
    '/Users/chan/kiara/src/content/docs/reference/example.md?astroPropagatedAssets':
      'chunks/example_CODIiTgV.mjs',
    '\u0000astro:asset-imports': 'chunks/_astro_asset-imports_D9aVaOQr.mjs',
    '\u0000astro:data-layer-content':
      'chunks/_astro_data-layer-content_BcEe_9wP.mjs',
    '\u0000virtual:astro-expressive-code/config': 'chunks/config_Bd__OJQ2.mjs',
    '/Users/chan/kiara/src/content/docs/guides/example.md':
      'chunks/example_B_hfDh2-.mjs',
    '/Users/chan/kiara/src/content/docs/index.mdx': 'chunks/index_DAfuOeHX.mjs',
    '/Users/chan/kiara/src/content/docs/reference/example.md':
      'chunks/example_B0R7lBoP.mjs',
    '\u0000virtual:astro-expressive-code/ec-config':
      'chunks/ec-config_CzTTOeiV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/andromeeda.mjs':
      'chunks/andromeeda_D-dyEEuC.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/aurora-x.mjs':
      'chunks/aurora-x_DshMyg21.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/ayu-dark.mjs':
      'chunks/ayu-dark_DD2fThwq.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/catppuccin-frappe.mjs':
      'chunks/catppuccin-frappe_rfz1Of_7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/catppuccin-latte.mjs':
      'chunks/catppuccin-latte_DALyz8ga.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/catppuccin-macchiato.mjs':
      'chunks/catppuccin-macchiato_mOAM5B3s.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/catppuccin-mocha.mjs':
      'chunks/catppuccin-mocha_DDP8UY-r.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/dark-plus.mjs':
      'chunks/dark-plus_C06_Onhu.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/dracula.mjs':
      'chunks/dracula_CouoCS9k.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/dracula-soft.mjs':
      'chunks/dracula-soft_CxzKlz_N.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/everforest-dark.mjs':
      'chunks/everforest-dark_CXzHRD9z.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/everforest-light.mjs':
      'chunks/everforest-light_YpEbvjLS.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-dark.mjs':
      'chunks/github-dark_D_gS3ClN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-dark-default.mjs':
      'chunks/github-dark-default_ywR9tGEY.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-dark-dimmed.mjs':
      'chunks/github-dark-dimmed_b5JcwDjr.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-dark-high-contrast.mjs':
      'chunks/github-dark-high-contrast_CvFIkt-b.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-light.mjs':
      'chunks/github-light_gaovf5-A.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-light-default.mjs':
      'chunks/github-light-default_DM7VWHsb.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/github-light-high-contrast.mjs':
      'chunks/github-light-high-contrast_CStbdJlV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/houston.mjs':
      'chunks/houston_bDcgnEjL.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/kanagawa-dragon.mjs':
      'chunks/kanagawa-dragon_BdNb11AG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/kanagawa-lotus.mjs':
      'chunks/kanagawa-lotus_Dgiw16LN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/kanagawa-wave.mjs':
      'chunks/kanagawa-wave_wAt3SOuq.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/laserwave.mjs':
      'chunks/laserwave_Bb_pI3nj.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/light-plus.mjs':
      'chunks/light-plus_BO6UoIfJ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/material-theme.mjs':
      'chunks/material-theme_ChAq2e_7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/material-theme-darker.mjs':
      'chunks/material-theme-darker_DzCD7v6U.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/material-theme-lighter.mjs':
      'chunks/material-theme-lighter_CUFfiVL0.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/material-theme-ocean.mjs':
      'chunks/material-theme-ocean_B9CiKwQz.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/material-theme-palenight.mjs':
      'chunks/material-theme-palenight_BYo8VdVU.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/min-dark.mjs':
      'chunks/min-dark_CHh5UpyO.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/min-light.mjs':
      'chunks/min-light_yIv78I0g.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/monokai.mjs':
      'chunks/monokai_DqV4da7o.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/night-owl.mjs':
      'chunks/night-owl_DM8yz4B9.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/nord.mjs':
      'chunks/nord_DVoFGF1J.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/one-dark-pro.mjs':
      'chunks/one-dark-pro_73j3-gIn.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/one-light.mjs':
      'chunks/one-light_C6pcpa1k.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/plastic.mjs':
      'chunks/plastic_C2lZWGLM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/poimandres.mjs':
      'chunks/poimandres_D58Ktq78.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/red.mjs':
      'chunks/red_ckRSu1qt.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/rose-pine.mjs':
      'chunks/rose-pine_ByHF5k5c.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/rose-pine-dawn.mjs':
      'chunks/rose-pine-dawn_CcPubDy5.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/rose-pine-moon.mjs':
      'chunks/rose-pine-moon_BHlgpBNx.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/slack-dark.mjs':
      'chunks/slack-dark_DLj306G7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/slack-ochin.mjs':
      'chunks/slack-ochin_X2jD6z_U.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/snazzy-light.mjs':
      'chunks/snazzy-light_BcaEs35m.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/solarized-dark.mjs':
      'chunks/solarized-dark_B1IYOHQP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/solarized-light.mjs':
      'chunks/solarized-light_CQGt1DxF.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/synthwave-84.mjs':
      'chunks/synthwave-84_Bjjlv9xo.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/tokyo-night.mjs':
      'chunks/tokyo-night_AvzNBbJN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/vesper.mjs':
      'chunks/vesper_DoQTxPZv.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/vitesse-black.mjs':
      'chunks/vitesse-black_BsezKPiF.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/vitesse-dark.mjs':
      'chunks/vitesse-dark_KFjgxGBE.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/themes/vitesse-light.mjs':
      'chunks/vitesse-light_B8BGGTVV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/abap.mjs':
      'chunks/abap_C8WS7zt8.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/actionscript-3.mjs':
      'chunks/actionscript-3_fjlfxW1-.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ada.mjs':
      'chunks/ada_zztYOBLl.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/html.mjs':
      'chunks/html_s1GuqOSN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/javascript.mjs':
      'chunks/javascript_Bcg-Xcn5.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/css.mjs':
      'chunks/css_DLeS5UsS.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/scss.mjs':
      'chunks/scss_C8zmJNqO.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/apache.mjs':
      'chunks/apache_DorU2yBT.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/apex.mjs':
      'chunks/apex_D0JyvdHV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/apl.mjs':
      'chunks/apl_C5Sn8rQW.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/xml.mjs':
      'chunks/xml_CptnnAv5.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/json.mjs':
      'chunks/json_DAB2fhtd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/java.mjs':
      'chunks/java_wH7Hxw7U.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/applescript.mjs':
      'chunks/applescript_B6Lysyf4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ara.mjs':
      'chunks/ara_C8vBglNL.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/asciidoc.mjs':
      'chunks/asciidoc_CpfchJG3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/asm.mjs':
      'chunks/asm_ByWjr62n.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/astro.mjs':
      'chunks/astro_BkJd1PYJ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/typescript.mjs':
      'chunks/typescript_D3dCnY_7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/postcss.mjs':
      'chunks/postcss_BIsend9_.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/awk.mjs':
      'chunks/awk_CfD9F0-T.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ballerina.mjs':
      'chunks/ballerina_Bmcs3F4N.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/bat.mjs':
      'chunks/bat_DJYQGaZJ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/beancount.mjs':
      'chunks/beancount_DbRCqm7X.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/berry.mjs':
      'chunks/berry_C9lp6txK.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/bibtex.mjs':
      'chunks/bibtex_DPniber3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/bicep.mjs':
      'chunks/bicep_STDoQz9X.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/blade.mjs':
      'chunks/blade_DnPKVTrS.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/sql.mjs':
      'chunks/sql_CndA2lM4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/c.mjs':
      'chunks/c_DXkM7cVs.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cadence.mjs':
      'chunks/cadence_DKm3gbFx.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/clarity.mjs':
      'chunks/clarity_CDVVbC5v.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/clojure.mjs':
      'chunks/clojure_C1rB82Oo.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cmake.mjs':
      'chunks/cmake_C2dBWGYN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cobol.mjs':
      'chunks/cobol_CdMo9epN.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/codeowners.mjs':
      'chunks/codeowners_BOc0X9qM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/codeql.mjs':
      'chunks/codeql_ByIAHE-R.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/coffee.mjs':
      'chunks/coffee_CIPbEcRy.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/common-lisp.mjs':
      'chunks/common-lisp_CoQ2Oci1.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/coq.mjs':
      'chunks/coq_BIJRn2Ag.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/regexp.mjs':
      'chunks/regexp_Cg5vPGLH.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/glsl.mjs':
      'chunks/glsl_x96zgVGI.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/crystal.mjs':
      'chunks/crystal_iZ3Gnhc6.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/shellscript.mjs':
      'chunks/shellscript_DTopFY7j.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/csharp.mjs':
      'chunks/csharp_CGpHe81I.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/csv.mjs':
      'chunks/csv_ocqe5pJ3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cue.mjs':
      'chunks/cue_DFiQVQY4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cypher.mjs':
      'chunks/cypher_CcgBvsrb.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/d.mjs':
      'chunks/d_BSTDblpt.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/dart.mjs':
      'chunks/dart_Ca3DkilM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/dax.mjs':
      'chunks/dax_D7KbHkJC.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/desktop.mjs':
      'chunks/desktop_BrVAufZz.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/diff.mjs':
      'chunks/diff_BsuO1XUY.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/docker.mjs':
      'chunks/docker_DaL8wOt9.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/dotenv.mjs':
      'chunks/dotenv_B_E-3J3r.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/dream-maker.mjs':
      'chunks/dream-maker_F5PKmBRl.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/edge.mjs':
      'chunks/edge_CjCgNrE8.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/html-derivative.mjs':
      'chunks/html-derivative_DMeOKGGJ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/elixir.mjs':
      'chunks/elixir_BbqC5dYK.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/elm.mjs':
      'chunks/elm_CA38Ki2H.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/emacs-lisp.mjs':
      'chunks/emacs-lisp_CyyeRKh9.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/erb.mjs':
      'chunks/erb_CGHqTqvd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ruby.mjs':
      'chunks/ruby_bnJmN8k8.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/lua.mjs':
      'chunks/lua_CvLkarzA.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/erlang.mjs':
      'chunks/erlang_DiXqEF8Z.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fennel.mjs':
      'chunks/fennel_BOXBPXAS.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fish.mjs':
      'chunks/fish_D4aJ6teh.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fluent.mjs':
      'chunks/fluent_DpLyTwF9.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fortran-fixed-form.mjs':
      'chunks/fortran-fixed-form_D1l_y_Yd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fortran-free-form.mjs':
      'chunks/fortran-free-form_Bdjk4a-a.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/fsharp.mjs':
      'chunks/fsharp_CCb6wggJ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/markdown.mjs':
      'chunks/markdown_BxAik-hv.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gdresource.mjs':
      'chunks/gdresource_DAFrQRhg.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gdshader.mjs':
      'chunks/gdshader_ChkZtVOW.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gdscript.mjs':
      'chunks/gdscript_CeASdvFx.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/genie.mjs':
      'chunks/genie_Bihrqgu0.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gherkin.mjs':
      'chunks/gherkin_BdXgx9rX.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/git-commit.mjs':
      'chunks/git-commit_DtanSdmP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/git-rebase.mjs':
      'chunks/git-rebase_DxijmKX2.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gleam.mjs':
      'chunks/gleam_Dz7Hs8QD.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/glimmer-js.mjs':
      'chunks/glimmer-js_Cx_VBKYp.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/glimmer-ts.mjs':
      'chunks/glimmer-ts_C8-9ezJO.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/gnuplot.mjs':
      'chunks/gnuplot_B6vi5xjP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/go.mjs':
      'chunks/go_buY-Pi1L.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/graphql.mjs':
      'chunks/graphql_wAvWlki7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jsx.mjs':
      'chunks/jsx_oYDed6Un.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/tsx.mjs':
      'chunks/tsx_Dx8PWl1f.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/groovy.mjs':
      'chunks/groovy_zo4O88Ar.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hack.mjs':
      'chunks/hack_ByJfgEW4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/haml.mjs':
      'chunks/haml_BPtRiGmr.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/handlebars.mjs':
      'chunks/handlebars_BEKE1FHQ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/yaml.mjs':
      'chunks/yaml_260zTuU8.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/haskell.mjs':
      'chunks/haskell_DSo6iDhF.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/haxe.mjs':
      'chunks/haxe_cCvFw8ag.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hcl.mjs':
      'chunks/hcl_CUVqZfQP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hjson.mjs':
      'chunks/hjson_B90pkG1E.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hlsl.mjs':
      'chunks/hlsl_BrfJnmSz.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/http.mjs':
      'chunks/http_CbgszRhZ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hxml.mjs':
      'chunks/hxml_CCcF5WWy.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/hy.mjs':
      'chunks/hy_C5DJBUJf.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/imba.mjs':
      'chunks/imba_wUGGOyUX.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ini.mjs':
      'chunks/ini_CDbyWpp6.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jison.mjs':
      'chunks/jison_i7pmDIRP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/json5.mjs':
      'chunks/json5_Cb30Y2Xp.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jsonc.mjs':
      'chunks/jsonc_BY3km7gq.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jsonl.mjs':
      'chunks/jsonl_BTPREtE7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jsonnet.mjs':
      'chunks/jsonnet_BrZSdKF-.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jssm.mjs':
      'chunks/jssm_DvNH1Qw0.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/julia.mjs':
      'chunks/julia_DWgYGrC4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/python.mjs':
      'chunks/python_BDi2giJR.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/r.mjs':
      'chunks/r_1Wy6Jab8.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/kotlin.mjs':
      'chunks/kotlin_ChqOfp3X.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/kusto.mjs':
      'chunks/kusto_CtUZKff-.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/latex.mjs':
      'chunks/latex_BZHyTQcG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/tex.mjs':
      'chunks/tex_D2CXh5KG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/lean.mjs':
      'chunks/lean_EO5AD8_C.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/less.mjs':
      'chunks/less_VbKKIYqf.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/liquid.mjs':
      'chunks/liquid_MvnFhJbo.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/log.mjs':
      'chunks/log_Cv7OZA-O.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/logo.mjs':
      'chunks/logo_DZF9bNF0.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/luau.mjs':
      'chunks/luau_Dil46PgZ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/make.mjs':
      'chunks/make_Cq8JjzOv.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/marko.mjs':
      'chunks/marko_ClhbJHJG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/matlab.mjs':
      'chunks/matlab_DLbSuEMo.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/mdc.mjs':
      'chunks/mdc_CjD3whHw.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/mdx.mjs':
      'chunks/mdx_Boa-h2Re.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/mermaid.mjs':
      'chunks/mermaid_xcVdCeZP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/mipsasm.mjs':
      'chunks/mipsasm_BHSr0EtV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/mojo.mjs':
      'chunks/mojo_C7arQr3o.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/move.mjs':
      'chunks/move_BaC2X99c.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/narrat.mjs':
      'chunks/narrat_CGVbpauv.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/nextflow.mjs':
      'chunks/nextflow_CXogos4R.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/nginx.mjs':
      'chunks/nginx_vvCOz483.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/nim.mjs':
      'chunks/nim_Cy84zO8a.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/nix.mjs':
      'chunks/nix_C3Nq5TaW.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/nushell.mjs':
      'chunks/nushell_DVfcIg11.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/objective-c.mjs':
      'chunks/objective-c_BAhyVSGL.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/objective-cpp.mjs':
      'chunks/objective-cpp_1QnEaNmn.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ocaml.mjs':
      'chunks/ocaml_10qJvZpx.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/pascal.mjs':
      'chunks/pascal_CW7jD95p.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/perl.mjs':
      'chunks/perl_B9Kr5XMc.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/php.mjs':
      'chunks/php_B2piNcQu.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/plsql.mjs':
      'chunks/plsql_BbJIHGF2.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/po.mjs':
      'chunks/po_CbIdQaY3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/powerquery.mjs':
      'chunks/powerquery_GVfq2WfR.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/powershell.mjs':
      'chunks/powershell_Cp3xBjOd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/prisma.mjs':
      'chunks/prisma_DkY9PvaH.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/prolog.mjs':
      'chunks/prolog_DXDjr8kP.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/proto.mjs':
      'chunks/proto_BtjCkvyu.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/pug.mjs':
      'chunks/pug_CH4w--fy.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/puppet.mjs':
      'chunks/puppet_mPm8KmR-.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/purescript.mjs':
      'chunks/purescript_BhSy5bqg.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/qml.mjs':
      'chunks/qml_DycQo2TW.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/qmldir.mjs':
      'chunks/qmldir_CWYUQ7py.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/qss.mjs':
      'chunks/qss_BCUj-CoC.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/racket.mjs':
      'chunks/racket_DHdbE6gb.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/raku.mjs':
      'chunks/raku_DRYZfpKK.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/razor.mjs':
      'chunks/razor_CYJTqAN7.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/reg.mjs':
      'chunks/reg_egJGv5BG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/rel.mjs':
      'chunks/rel_BYFwgxT_.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/riscv.mjs':
      'chunks/riscv_B_YDdhpM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/rst.mjs':
      'chunks/rst_D4967UpL.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/rust.mjs':
      'chunks/rust_BKnJNaM_.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/sas.mjs':
      'chunks/sas_D1AOOtI1.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/sass.mjs':
      'chunks/sass_CSR5glkE.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/scala.mjs':
      'chunks/scala_CoYc0fuU.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/scheme.mjs':
      'chunks/scheme_DZK4h0Y_.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/shaderlab.mjs':
      'chunks/shaderlab_od7UqDIy.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/shellsession.mjs':
      'chunks/shellsession_CqRzL50X.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/smalltalk.mjs':
      'chunks/smalltalk_6797pgbr.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/solidity.mjs':
      'chunks/solidity_DYsTFYWM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/soy.mjs':
      'chunks/soy_D1u8K6B3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/sparql.mjs':
      'chunks/sparql_CT4kAZA1.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/turtle.mjs':
      'chunks/turtle_JsVDTLqG.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/splunk.mjs':
      'chunks/splunk_DFRfwAfa.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ssh-config.mjs':
      'chunks/ssh-config_BdkMAVIV.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/stata.mjs':
      'chunks/stata_CNYSkOs6.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/stylus.mjs':
      'chunks/stylus_DxdGOOfm.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/svelte.mjs':
      'chunks/svelte_Ct5hErpp.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/swift.mjs':
      'chunks/swift_CVpDgKtH.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/system-verilog.mjs':
      'chunks/system-verilog_BefF4_iw.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/systemd.mjs':
      'chunks/systemd_DsqNKrYi.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/tasl.mjs':
      'chunks/tasl_CNRrA4FU.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/tcl.mjs':
      'chunks/tcl_1Y2A-CL3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/templ.mjs':
      'chunks/templ_B8Xbd2S1.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/terraform.mjs':
      'chunks/terraform_D4kveTkd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/toml.mjs':
      'chunks/toml_BK0hAl_1.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/tsv.mjs':
      'chunks/tsv_bce-g5Jr.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/twig.mjs':
      'chunks/twig_DEO4lZPX.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/typespec.mjs':
      'chunks/typespec_DNap_6J5.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/typst.mjs':
      'chunks/typst_DQMqexbT.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/v.mjs':
      'chunks/v_Dh4PxoYM.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vala.mjs':
      'chunks/vala_BwyZmuMh.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vb.mjs':
      'chunks/vb_CN19HICd.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/verilog.mjs':
      'chunks/verilog_DfIAQehZ.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vhdl.mjs':
      'chunks/vhdl_cuR13GIR.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/viml.mjs':
      'chunks/viml_yR1GiV_3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vue-html.mjs':
      'chunks/vue-html_uTH5w52G.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vyper.mjs':
      'chunks/vyper_BcxpOIV3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/wasm.mjs':
      'chunks/wasm_Cs3Vi-tg.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/wenyan.mjs':
      'chunks/wenyan_ByVRCZpW.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/wgsl.mjs':
      'chunks/wgsl_G7F6VclL.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/wikitext.mjs':
      'chunks/wikitext_CTpx6ANx.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/wolfram.mjs':
      'chunks/wolfram_DD6KU7-r.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/xsl.mjs':
      'chunks/xsl_BWJWG1h3.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/zenscript.mjs':
      'chunks/zenscript_CUhXG9m_.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/zig.mjs':
      'chunks/zig_pJWacXyt.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/wasm.mjs':
      'chunks/wasm_CR5DIDIU.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/@astrojs+react@3.6.2_@types+react-dom@18.3.1_@types+react@18.3.12_react-dom@18.3.1_react@18.3_upbkqt2djqlxwi4fqfoe4w76x4/node_modules/@astrojs/react/vnode-children.js':
      'chunks/vnode-children_C1YIWAGb.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/cpp.mjs':
      'chunks/cpp_CZczuKEE.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/jinja.mjs':
      'chunks/jinja_BR6zj5zH.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/angular-ts.mjs':
      'chunks/angular-ts_gN218hxr.mjs',
    '\u0000@astrojs-manifest': 'manifest_rEBKOIsU.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/vue.mjs':
      'chunks/vue_DFbXl6J4.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/shiki@1.22.2/node_modules/shiki/dist/langs/ts-tags.mjs':
      'chunks/ts-tags_Dui3VvC5.mjs',
    '\u0000virtual:astro-expressive-code/preprocess-config':
      'chunks/preprocess-config_D68J4pCf.mjs',
    '/Users/chan/kiara/node_modules/.pnpm/astro-expressive-code@0.35.6_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79._5ukkn7xfqrrvdypxx2qnuuf3um/node_modules/astro-expressive-code/dist/index.js':
      'chunks/index_BniqTgfs.mjs',
    '/Users/chan/kiara/src/components/widgets/map/MainMap':
      '_astro/MainMap.DiShUlFz.js',
    '@astrojs/react/client.js': '_astro/client.5NRMcsES.js',
    '@astrojs/vue/client.js': '_astro/client.BHVC3W3U.js',
    '/astro/hoisted.js?q=0': '_astro/hoisted.DGx4jJzW.js',
    '/Users/chan/kiara/node_modules/.pnpm/@astrojs+starlight@0.28.4_astro@4.16.7_@types+node@22.8.2_lightningcss@1.27.0_rollup@2.79.2_t_di4xtvu6kn226hvgp6lngvecxe/node_modules/@astrojs/starlight/user-components/Tabs.astro?astro&type=script&index=0&lang.ts':
      '_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js',
    'astro:scripts/page.js': '_astro/page.7qqag-5g.js',
    '/Users/chan/kiara/node_modules/.pnpm/@pagefind+default-ui@1.1.1/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs':
      '_astro/ui-core.TFD7naHv.js',
    'astro:scripts/before-hydration.js': '',
  },
  inlinedScripts: [],
  assets: [
    '/_astro/ec.j8ofn.css',
    '/_astro/ec.8zarh.js',
    '/_astro/houston.CZZyCf7p.webp',
    '/_astro/Badge_astro_astro_type_style_index_0_lang.M2G6Mj43.css',
    '/_astro/Card_astro_astro_type_style_index_0_lang.B5TfaVfB.css',
    '/_astro/LinkButton_astro_astro_type_style_index_0_lang.CDvLw31D.css',
    '/_astro/Steps_astro_astro_type_style_index_0_lang.wzU32tSh.css',
    '/_astro/index.D5wDN8si.css',
    '/_astro/index.ClD-RlSb.css',
    '/_astro/index.D63MtpPb.css',
    '/favicon.svg',
    '/_astro/MainMap.DiShUlFz.js',
    '/_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js',
    '/_astro/client.5NRMcsES.js',
    '/_astro/client.BHVC3W3U.js',
    '/_astro/hoisted.DGx4jJzW.js',
    '/_astro/index.uYDHyRUA.js',
    '/_astro/page.7qqag-5g.js',
    '/_astro/ui-core.TFD7naHv.js',
    '/locales/en/translation.json',
    '/locales/ko/translation.json',
    '/_astro/page.7qqag-5g.js',
    '/404.html',
  ],
  i18n: {
    fallbackType: 'redirect',
    strategy: 'pathname-prefix-other-locales',
    locales: ['en'],
    defaultLocale: 'en',
    domainLookupTable: {},
  },
  buildFormat: 'directory',
  checkOrigin: false,
  serverIslandNameMap: [],
  key: 'URitqTb05ZeeMCvJxKIC4kAzQq6gHbpEz+fiD9xUyVM=',
  experimentalEnvGetSecretEnabled: true,
});

export { manifest };
