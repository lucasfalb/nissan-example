import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { campaignSlugs, pageDefinitions } from '$lib/content/page-definitions';
import { buildSeoMeta } from '$lib/utils/seo';

export const prerender = true;
export const entries: EntryGenerator = () => campaignSlugs.map((slug) => ({ slug }));

export const load: PageLoad = ({ params, url }) => {
  if (!campaignSlugs.includes(params.slug as (typeof campaignSlugs)[number])) {
    throw error(404, 'Campanha não encontrada');
  }

  const page = pageDefinitions[params.slug as keyof typeof pageDefinitions];
  return {
    page,
    transitionKey: page.seo.canonicalPath,
    seo: buildSeoMeta(page.seo, url.origin)
  };
};
