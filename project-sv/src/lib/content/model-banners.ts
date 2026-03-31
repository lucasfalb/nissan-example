import type { BannerKey, HomeSlide } from '$lib/types/content';

export const MODEL_BANNERS: Record<BannerKey, string> = {
  POPUP:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/happiniss-days/bc50cf1f-hero-happiniss-03-2026-v2_11hc0jh000000000000000.jpg',
  HAPPINISS_DAYS:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/happiniss-days/bc50cf1f-hero-happiniss-03-2026-v2_11hc0jh000000000000000.jpg',
  NISSAN_JUKE_STANDALONE:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-juke/96e7b30a-grupo-9326-1-2x-1_11hc0jh000000000000000.jpg',
  NISSAN_LEAF:
    'https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_europe/vehicles/Leaf-unveil/LHD/SCULPTED%201%20-%20LHD.png',
  NISSAN_ARIYA:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-ariya/53ae86e6-grupo-9332_11je0k81hc0k8010000028.png',
  NISSAN_QASHQAI:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-qashqai/a17fd374-grupo-de-mascara-93-1_11nn0in1hc0in035000000.jpg',
  NISSAN_X_TRAIL:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-x-trail/d153675e-grupo-9299_11jp0kc1hc0kc016000028.png',
  NOVO_NISSAN_JUKE:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-juke/96e7b30a-grupo-9326-1-2x-1_11hc0jh000000000000000.jpg',
  NOVO_MICRA:
    'https://campanhas.nissan.pt/889620a-F275-Nissan_Micra_lifestyle_LHD_LOW_001.jpg',
  USADOS_JUKE:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-juke/96e7b30a-grupo-9326-1-2x-1_11hc0jh000000000000000.jpg',
  USADOS_QASHQAI:
    'https://d9hhrg4mnvzow.cloudfront.net/ofertasespeciais.nissan.pt/nissan-qashqai/a17fd374-grupo-de-mascara-93-1_11nn0in1hc0in035000000.jpg'
};

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
