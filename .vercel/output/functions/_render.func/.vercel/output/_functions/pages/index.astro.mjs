import '../chunks/page-ssr_C3bQDqP7.mjs';
import {
  c as createComponent,
  r as renderTemplate,
  e as addAttribute,
  f as renderHead,
  g as renderSlot,
  d as createAstro,
  b as renderComponent,
} from '../chunks/astro/server_BB8JYHJv.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const GOOGLE_MAP_KEY = 'AIzaSyCJDX4GpZBzZ_k6tiXsboJ6N3xtkBCvwDk';

const $$Astro = createAstro();
const $$Layout = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Layout;
    const { title } = Astro2.props;
    return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, 'content')}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots['default'])} </body></html>`;
  },
  '/Users/chan/kiara/src/layouts/Layout.astro',
  void 0,
);

const $$Index = createComponent(
  ($$result, $$props, $$slots) => {
    return renderTemplate`${renderComponent($$result, 'Layout', $$Layout, { title: 'Only for Kiara', class: 'astro-j7pv25f6' }, { default: ($$result2) => renderTemplate` ${renderComponent($$result2, 'MainMap', null, { 'client:only': 'react', mapKey: GOOGLE_MAP_KEY, 'client:component-hydration': 'only', class: 'astro-j7pv25f6', 'client:component-path': '/Users/chan/kiara/src/components/widgets/map/MainMap', 'client:component-export': 'default' })} ` })} `;
  },
  '/Users/chan/kiara/src/pages/home.astro',
  void 0,
);

const $$file = '/Users/chan/kiara/src/pages/home.astro';
const $$url = '';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
