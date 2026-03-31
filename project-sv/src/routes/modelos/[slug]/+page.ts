import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { modelSlugs, pageDefinitions } from '$lib/content/page-definitions';
import { buildSeoMeta } from '$lib/utils/seo';

export const prerender = true;
export const entries: EntryGenerator = () => modelSlugs.map((slug) => ({ slug }));

export const load: PageLoad = ({ params, url }) => {
  if (!modelSlugs.includes(params.slug as (typeof modelSlugs)[number])) {
    throw error(404, 'Modelo não encontrado');
  }

  const page = pageDefinitions[params.slug as keyof typeof pageDefinitions];
  return {
    page,
    transitionKey: page.seo.canonicalPath,
    seo: buildSeoMeta(page.seo, url.origin)
  };
};
