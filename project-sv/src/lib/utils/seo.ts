import type { SeoMeta } from '$lib/types/content';

export function canonicalUrl(path: string, siteUrl: string | undefined): string {
  const normalizedBase = (siteUrl || 'http://localhost:5173').replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function buildSeoMeta(meta: SeoMeta, siteUrl: string | undefined) {
  return {
    ...meta,
    canonicalUrl: canonicalUrl(meta.canonicalPath, siteUrl)
  };
}
