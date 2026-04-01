import { PUBLIC_SITE_URL } from '$env/static/public';

const PRERENDER_ORIGIN = 'http://sveltekit-prerender';
const LOCAL_FALLBACK_ORIGIN = 'http://localhost:5173';

function normalizeOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/\/+$/, "");
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
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${origin}/`).toString();
}
