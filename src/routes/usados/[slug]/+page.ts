import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { pageDefinitions, usedSlugs } from '$lib/content/page-definitions';
import { buildSeoMeta } from '$lib/utils/seo';

export const prerender = true;
export const entries: EntryGenerator = () => usedSlugs.map((slug) => ({ slug }));

export const load: PageLoad = ({ params, url }) => {
  if (!usedSlugs.includes(params.slug as (typeof usedSlugs)[number])) {
    throw error(404, 'Usado não encontrado');
  }

  const page = pageDefinitions[params.slug as keyof typeof pageDefinitions];

  return {
    page,
    transitionKey: page.seo.canonicalPath,
    seo: buildSeoMeta(page.seo, url.origin)
  };
};
