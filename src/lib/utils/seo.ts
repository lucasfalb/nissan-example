import { resolveSiteUrl } from '$lib/config/site';
import type { SeoMeta } from '$lib/types/content';

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
