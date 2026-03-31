import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = () => ({
  site: {
    title: 'Nissan Portugal',
    description: 'Modelos, campanhas e oportunidades Nissan.'
  }
});
