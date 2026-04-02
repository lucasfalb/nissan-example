export type PageKind = 'campaign' | 'model' | 'used' | 'standalone';

export type BannerKey =
  | 'POPUP'
  | 'HAPPINISS_DAYS'
  | 'NISSAN_JUKE_STANDALONE'
  | 'NISSAN_LEAF'
  | 'NISSAN_ARIYA'
  | 'NISSAN_QASHQAI'
  | 'NISSAN_X_TRAIL'
  | 'NOVO_NISSAN_JUKE'
  | 'NOVO_MICRA'
  | 'USADOS_JUKE'
  | 'USADOS_QASHQAI';

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
};

export type CtaSet = {
  primary: string;
  secondary: string;
};

export type BasePageDefinition = {
  slug: string;
  kind: PageKind;
  title: string;
  subtitle: string;
  eyebrow: string;
  categoryLabel: string;
  seo: SeoMeta;
  bannerKey: BannerKey;
  highlights: string[];
  ctas: CtaSet;
};

export type CampaignPageDefinition = BasePageDefinition & {
  kind: 'campaign' | 'standalone';
};

export type ModelPageDefinition = BasePageDefinition & {
  kind: 'model' | 'used';
  versions: string[];
};

export type PageDefinition = CampaignPageDefinition | ModelPageDefinition;

export type HomeSlide = {
  title: string;
  path: string;
  bannerKey: BannerKey;
  eyebrow: string;
};
