import bannerManifest from '$lib/banner-manifest.json';
import bannerSettings from '$lib/banner-settings.json';
import type { BannerKey, HomeSlide } from '$lib/types';

type BannerManifestEntry = {
  remote: string;
  local: string;
};

const BANNER_MANIFEST = bannerManifest as Record<BannerKey, BannerManifestEntry>;

export const REMOTE_MODEL_BANNERS = Object.fromEntries(
  Object.entries(BANNER_MANIFEST).map(([key, value]) => [key, value.remote]),
) as Record<BannerKey, string>;

export const LOCAL_MODEL_BANNERS = Object.fromEntries(
  Object.entries(BANNER_MANIFEST).map(([key, value]) => [key, value.local]),
) as Record<BannerKey, string>;

export const MODEL_BANNERS: Record<BannerKey, string> = bannerSettings.useLocal
  ? LOCAL_MODEL_BANNERS
  : REMOTE_MODEL_BANNERS;

export const HOME_SLIDES: HomeSlide[] = [
  { title: 'Nissan Leaf', path: '/modelos/nissan-leaf/', bannerKey: 'NISSAN_LEAF', eyebrow: '100% Elétrico' },
  { title: 'Nissan Ariya', path: '/modelos/nissan-ariya/', bannerKey: 'NISSAN_ARIYA', eyebrow: 'Crossover Coupé Elétrico' },
  { title: 'Nissan Qashqai', path: '/modelos/nissan-qashqai/', bannerKey: 'NISSAN_QASHQAI', eyebrow: 'Crossover com e-POWER' },
  { title: 'Nissan X-Trail', path: '/modelos/nissan-x-trail/', bannerKey: 'NISSAN_X_TRAIL', eyebrow: 'SUV para família e aventura' },
  { title: 'Novo Nissan Juke', path: '/modelos/novo-nissan-juke/', bannerKey: 'NOVO_NISSAN_JUKE', eyebrow: 'Design ousado' },
  { title: 'Novo Micra', path: '/modelos/novo-micra/', bannerKey: 'NOVO_MICRA', eyebrow: 'Energia urbana' }
];

export function getBannerUrl(key: BannerKey): string {
  return MODEL_BANNERS[key];
}

export function getFallbackBannerUrl(key: BannerKey): string {
  return REMOTE_MODEL_BANNERS[key];
}

export function getFallbackBannerUrlFromUrl(url: string): string | null {
  const normalizedPath = (() => {
    try {
      return new URL(url, 'http://localhost').pathname;
    } catch {
      return url;
    }
  })();

  for (const [key, localUrl] of Object.entries(LOCAL_MODEL_BANNERS)) {
    if (localUrl === normalizedPath || localUrl === url) {
      return REMOTE_MODEL_BANNERS[key as BannerKey];
    }
  }

  return null;
}
