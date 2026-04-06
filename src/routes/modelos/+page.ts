import type { PageLoad } from './$types';
import { buildSeoMeta } from '$lib/meta';
import { modelSlugs, pageDefinitions } from '$lib/page-definitions';

export const prerender = true;

export const load: PageLoad = ({ url }) => {
  const cards = modelSlugs.map((slug) => {
    const page = pageDefinitions[slug];

    return {
      title: page.title,
      description: page.subtitle,
      path: page.seo.canonicalPath,
      bannerKey: page.bannerKey,
      transitionKey: page.seo.canonicalPath,
      category: 'new_model',
      section: 'models_hub'
    };
  });

  return {
    seo: buildSeoMeta(
      {
        title: 'Modelos Nissan | Gama Completa Nissan Portugal',
        description:
          'Descubra a gama completa de modelos Nissan, dos elétricos aos SUV, e encontre o automóvel ideal para o seu dia a dia.',
        canonicalPath: '/modelos/'
      },
      url.origin
    ),
    cards
  };
};
