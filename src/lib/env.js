const publicUrlFrontend = (import.meta.env.VITE_PUBLIC_URL_FRONTEND || "")
  .trim()
  .replace(/\/+$/, "");

export const WEBHOOK_URL = (import.meta.env.VITE_WEBHOOK_URL || "").trim();
export const GTM_ID = (import.meta.env.VITE_GTM_ID || "").trim();

export function getPublicAssetUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return publicUrlFrontend ? `${publicUrlFrontend}${normalizedPath}` : normalizedPath;
}

export function getPublicPageUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (publicUrlFrontend) {
    return `${publicUrlFrontend}${normalizedPath}`;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}${normalizedPath}`;
  }

  return normalizedPath;
}
