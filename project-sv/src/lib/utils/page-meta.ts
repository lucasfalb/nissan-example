import type { PageDefinition } from '$lib/types/content';

export function getPageType(page: PageDefinition) {
  switch (page.kind) {
    case 'campaign':
      return 'campaign_page';
    case 'model':
      return 'model_page';
    case 'used':
      return 'used_page';
    case 'standalone':
      return 'standalone_page';
  }
}

export function getPageModel(page: PageDefinition) {
  switch (page.slug) {
    case 'novo-nissan-juke':
    case 'nissan-juke':
    case 'juke':
      return 'nissan-juke';
    case 'novo-micra':
      return 'nissan-micra';
    case 'qashqai':
      return 'nissan-qashqai';
    case 'nissan-leaf':
    case 'nissan-ariya':
    case 'nissan-qashqai':
    case 'nissan-x-trail':
      return page.slug;
    default:
      return null;
  }
}
