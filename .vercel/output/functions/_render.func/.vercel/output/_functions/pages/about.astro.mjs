import '../chunks/page-ssr_C3bQDqP7.mjs';
import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BB8JYHJv.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div>
This is about Page
</div>`;
}, "/Users/chan/kiara/src/pages/about.astro", void 0);

const $$file = "/Users/chan/kiara/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
