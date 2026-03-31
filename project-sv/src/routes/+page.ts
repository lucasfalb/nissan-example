import type { PageLoad } from './$types';
import { pageDefinitions } from '$lib/content/page-definitions';
import { HOME_SLIDES } from '$lib/content/model-banners';
import { buildSeoMeta } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = ({ url }) => {
  const featuredCards = HOME_SLIDES.map((slide) => ({
    title: slide.title,
    description:
      slide.title === 'Nissan Qashqai'
        ? 'Conheça o híbrido reinventado com espaço, tecnologia e uma condução mais fluida em cidade e estrada.'
        : slide.title === 'Nissan Ariya'
          ? '100% elétrico com até 536 km de autonomia, conforto premium e uma presença mais sofisticada.'
          : slide.title === 'Novo Nissan Juke'
            ? 'O crossover coupé com design ousado, disponível em versões híbridas e gasolina para o dia a dia.'
            : slide.title === 'Novo Micra'
              ? 'Olá diversão: uma proposta urbana, elétrica e pronta para redefinir a rotina com mais energia.'
              : slide.title === 'Nissan Leaf'
                ? 'Mobilidade 100% elétrica com condução intuitiva, eficiência e tecnologia pensada para todos os dias.'
                : 'Um SUV versátil para viagens em família, mais espaço e confiança em percursos longos.',
    path: slide.path,
    bannerKey: slide.bannerKey,
    transitionKey: slide.path,
    category: 'featured_model',
    section: 'home_featured'
  }));

  const modelCards = [
    pageDefinitions['nissan-leaf'],
    pageDefinitions['nissan-ariya'],
    pageDefinitions['nissan-qashqai'],
    pageDefinitions['nissan-x-trail'],
    pageDefinitions['novo-nissan-juke'],
    pageDefinitions['novo-micra']
  ].map((page, index) => ({
    title: page.title,
    description: page.subtitle,
    path: page.seo.canonicalPath,
    bannerKey: page.bannerKey,
    transitionKey: page.seo.canonicalPath,
    category: 'new_model',
    section: 'models_hub',
    position: index + 1
  }));

  return {
    seo: buildSeoMeta(
      {
        title: 'Nissan Portugal | Modelos, Campanhas e Ofertas',
        description:
          'Explore modelos Nissan, campanhas em destaque, oportunidades em usados e pedidos de contacto para test drive ou proposta.',
        canonicalPath: '/'
      },
      url.origin
    ),
    slides: HOME_SLIDES,
    featuredCards,
    modelCards
  };
};
