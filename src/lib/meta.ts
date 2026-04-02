import { PUBLIC_SITE_URL } from '$env/static/public';
import type { PageDefinition, SeoMeta } from '$lib/types';

const PRERENDER_ORIGIN = 'http://sveltekit-prerender';
const LOCAL_FALLBACK_ORIGIN = 'http://localhost:5173';

function normalizeOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/\/+$/, '');
}

export function resolveSiteUrl(requestOrigin?: string): string {
  const configuredOrigin = normalizeOrigin(PUBLIC_SITE_URL);
  if (configuredOrigin) {
    return configuredOrigin;
  }

  const runtimeOrigin = normalizeOrigin(requestOrigin);
  if (runtimeOrigin && runtimeOrigin !== PRERENDER_ORIGIN) {
    return runtimeOrigin;
  }

  return LOCAL_FALLBACK_ORIGIN;
}

export function toAbsoluteUrl(path: string, requestOrigin?: string): string {
  const origin = resolveSiteUrl(requestOrigin);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, `${origin}/`).toString();
}

export function canonicalUrl(path: string, siteUrl: string | undefined): string {
  const normalizedBase = resolveSiteUrl(siteUrl);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function buildSeoMeta(meta: SeoMeta, siteUrl: string | undefined) {
  return {
    ...meta,
    canonicalUrl: canonicalUrl(meta.canonicalPath, siteUrl)
  };
}

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
