import './chunks/astro-designed-error-pages_ms9GRl-u.mjs';
import { d as defineMiddleware, s as sequence } from './chunks/index_DPgU8seP.mjs';
import { u as useTranslations } from './chunks/translations_BXDXnc_6.mjs';

const onRequest$1 = defineMiddleware((context, next) => {
  context.locals.t = useTranslations(context.currentLocale);
  return next();
});

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
