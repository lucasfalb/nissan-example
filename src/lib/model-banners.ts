import bannerManifest from '$lib/banner-manifest.json';
import type { BannerKey, HomeSlide } from '$lib/types';

export const MODEL_BANNERS = bannerManifest as Record<BannerKey, string>;

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
