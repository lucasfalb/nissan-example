import type { PageDefinition } from '$lib/types';

const commonCtas = {
  primary: 'Agendar Test Drive',
  secondary: 'Descarregar Catálogo'
} as const;

function createCampaignPage(definition: Omit<PageDefinition & { kind: 'campaign' | 'standalone' }, 'ctas'>): PageDefinition {
  return { ...definition, ctas: commonCtas };
}

function createModelPage(definition: Omit<PageDefinition & { kind: 'model' | 'used' }, 'ctas'>): PageDefinition {
  return { ...definition, ctas: commonCtas };
}

export const pageDefinitions = {
  popup: createCampaignPage({
    slug: 'popup',
    kind: 'campaign',
    title: 'Explore as campanhas Nissan',
    subtitle: 'Procura um Nissan? Indique o modelo que lhe interessa e peça informações ou uma proposta à equipa comercial.',
    eyebrow: 'Campanhas Nissan',
    categoryLabel: 'Campanha',
    bannerKey: 'POPUP',
    highlights: [
      'Informações sobre o modelo de interesse',
      'Pedido de proposta à equipa comercial',
      'Espaço para indicar o que procura'
    ],
    seo: {
      title: 'Campanhas Nissan | Informações e Pedido de Proposta',
      description:
        'Explore as campanhas Nissan. Indique o modelo que lhe interessa e peça informações ou uma proposta através do formulário de contacto.',
      canonicalPath: '/campanhas/popup/'
    }
  }),
  'happiniss-days': createCampaignPage({
    slug: 'happiniss-days',
    kind: 'campaign',
    title: 'Happiniss Days',
    subtitle: 'Conheça a campanha Happiniss Days. Escolha o modelo de interesse e peça esclarecimentos sobre as condições aplicáveis.',
    eyebrow: 'Campanhas Nissan',
    categoryLabel: 'Campanha',
    bannerKey: 'HAPPINISS_DAYS',
    highlights: [
      'Informações sobre a campanha Happiniss Days',
      'Esclarecimentos sobre as condições aplicáveis',
      'Pedido de contacto sobre o modelo escolhido'
    ],
    seo: {
      title: 'Happiniss Days | Informações sobre a Campanha Nissan',
      description:
        'Conheça a campanha Happiniss Days da Nissan. Indique o modelo de interesse e peça esclarecimentos sobre as condições aplicáveis.',
      canonicalPath: '/campanhas/happiniss-days/'
    }
  }),
  'nissan-juke': createCampaignPage({
    slug: 'nissan-juke',
    kind: 'standalone',
    title: 'Nissan Juke',
    subtitle: 'O crossover mais irreverente da Nissan com design urbano, atitude forte e uma presença única.',
    eyebrow: 'Landing Avulsa',
    categoryLabel: 'Standalone',
    bannerKey: 'NISSAN_JUKE_STANDALONE',
    highlights: [
      'Design exterior distinto e expressivo',
      'Experiência conectada para a cidade',
      'Ideal para quem procura personalidade'
    ],
    seo: {
      title: 'Nissan Juke | Crossover Urbano com Design Marcante',
      description:
        'Conheça o Nissan Juke, um crossover com design ousado, tecnologia conectada e pedido de test drive ou contacto comercial.',
      canonicalPath: '/nissan-juke/'
    }
  }),
  'nissan-leaf': createModelPage({
    slug: 'nissan-leaf',
    kind: 'model',
    title: 'Nissan Leaf',
    subtitle: 'Mobilidade elétrica simples, silenciosa e pronta para o ritmo do dia a dia.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['Visia', 'Acenta', 'N-Connecta', 'Tekna'],
    bannerKey: 'NISSAN_LEAF',
    highlights: [
      'Condução 100% elétrica',
      'Custos de utilização reduzidos',
      'Tecnologia inteligente em cada viagem'
    ],
    seo: {
      title: 'Nissan Leaf | Carro Elétrico Nissan para o Dia a Dia',
      description:
        'Explore o Nissan Leaf, o elétrico da Nissan com tecnologia inteligente, condução silenciosa e pedido de test drive online.',
      canonicalPath: '/modelos/nissan-leaf/'
    }
  }),
  'nissan-ariya': createModelPage({
    slug: 'nissan-ariya',
    kind: 'model',
    title: 'Nissan Ariya',
    subtitle: 'Um SUV elétrico premium com presença marcante, conforto refinado e inovação de nova geração.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['Evolve', 'Evolve+', 'Evolve+ 4WD', 'Nismo'],
    bannerKey: 'NISSAN_ARIYA',
    highlights: [
      'Interior lounge com sensação premium',
      'Desempenho elétrico progressivo',
      'Tecnologia pensada para condução intuitiva'
    ],
    seo: {
      title: 'Nissan Ariya | SUV Elétrico Premium da Nissan',
      description:
        'Descubra o Nissan Ariya, SUV elétrico premium com design marcante, conforto refinado e pedido de proposta ou test drive.',
      canonicalPath: '/modelos/nissan-ariya/'
    }
  }),
  'nissan-qashqai': createModelPage({
    slug: 'nissan-qashqai',
    kind: 'model',
    title: 'Nissan Qashqai',
    subtitle: 'O SUV que continua a definir o segmento com estilo, conforto e confiança para todos os dias.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['Visia', 'Acenta', 'N-Connecta', 'Tekna', 'Tekna+'],
    bannerKey: 'NISSAN_QASHQAI',
    highlights: [
      'Líder de segmento em atitude e versatilidade',
      'Acabamentos para diferentes perfis',
      'Oferta comercial em destaque'
    ],
    seo: {
      title: 'Nissan Qashqai | SUV Nissan com Tecnologia e Conforto',
      description:
        'Veja o Nissan Qashqai, SUV da Nissan com design moderno, conforto diário e opções para pedido de contacto e test drive.',
      canonicalPath: '/modelos/nissan-qashqai/'
    }
  }),
  'nissan-x-trail': createModelPage({
    slug: 'nissan-x-trail',
    kind: 'model',
    title: 'Nissan X-Trail',
    subtitle: 'Espaço, robustez e conforto para viagens em família com uma presença premium.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['Visia', 'Acenta', 'N-Connecta', 'Tekna', 'Tekna+ e-4ORCE'],
    bannerKey: 'NISSAN_X_TRAIL',
    highlights: [
      'Concebido para longas distâncias',
      'Mais espaço para tudo o que importa',
      'Várias versões para diferentes estilos de vida'
    ],
    seo: {
      title: 'Nissan X-Trail | SUV Familiar com Espaço e Versatilidade',
      description:
        'Conheça o Nissan X-Trail, SUV familiar com mais espaço, conforto em viagem e pedido rápido de proposta ou test drive.',
      canonicalPath: '/modelos/nissan-x-trail/'
    }
  }),
  'novo-nissan-juke': createModelPage({
    slug: 'novo-nissan-juke',
    kind: 'model',
    title: 'Novo Nissan Juke',
    subtitle: 'A nova geração do Juke chega com ainda mais presença, conectividade e energia urbana.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['Visia', 'Acenta', 'N-Design', 'Tekna'],
    bannerKey: 'NOVO_NISSAN_JUKE',
    highlights: [
      'Nova linguagem de design Nissan',
      'Experiência interior mais sofisticada',
      'Ideal para quem quer destacar-se'
    ],
    seo: {
      title: 'Novo Nissan Juke | SUV Compacto com Design Ousado',
      description:
        'Descubra o novo Nissan Juke com visual renovado, conectividade avançada e pedido de test drive ou mais informações.',
      canonicalPath: '/modelos/novo-nissan-juke/'
    }
  }),
  'novo-micra': createModelPage({
    slug: 'novo-micra',
    kind: 'model',
    title: 'Novo Micra',
    subtitle: 'Uma nova interpretação do Micra com linhas atuais, acabamentos frescos e espírito urbano.',
    eyebrow: 'Modelos Novos',
    categoryLabel: 'Modelo',
    versions: ['IM Access', 'IM Play', 'IM Club', 'IM Iconic'],
    bannerKey: 'NOVO_MICRA',
    highlights: [
      'Linha mais contemporânea',
      'Gamas preparadas para diferentes estilos',
      'Oferta pensada para o quotidiano'
    ],
    seo: {
      title: 'Novo Micra | Citadino Nissan com Estilo Urbano',
      description:
        'Explore o novo Micra, compacto Nissan pensado para a cidade, com versões distintas e contacto comercial simplificado.',
      canonicalPath: '/modelos/novo-micra/'
    }
  }),
  juke: createModelPage({
    slug: 'juke',
    kind: 'used',
    title: 'Juke Usado',
    subtitle: 'Encontre um Juke usado com seleção cuidada e diferentes níveis de oportunidade.',
    eyebrow: 'Usados Nissan',
    categoryLabel: 'Usado',
    versions: ['Até 2021', '2022-2023', '2024 Certificado'],
    bannerKey: 'USADOS_JUKE',
    highlights: [
      'Seleção por faixa de ano',
      'Mais proximidade à compra ideal',
      'Acompanhamento comercial rápido'
    ],
    seo: {
      title: 'Nissan Juke Usado | Oportunidades em Viaturas Seminovas',
      description:
        'Encontre oportunidades de Nissan Juke usado com seleção por ano, contacto rápido e apoio comercial para proposta ou visita.',
      canonicalPath: '/usados/juke/'
    }
  }),
  qashqai: createModelPage({
    slug: 'qashqai',
    kind: 'used',
    title: 'Qashqai Usado',
    subtitle: 'Aceda a oportunidades Qashqai usadas com equilíbrio entre valor, design e confiança.',
    eyebrow: 'Usados Nissan',
    categoryLabel: 'Usado',
    versions: ['Até 2021', '2022-2023', '2024 Certificado'],
    bannerKey: 'USADOS_QASHQAI',
    highlights: [
      'Modelos usados com forte procura',
      'Versões para diferentes orçamentos',
      'Contacto simples para proposta ou visita'
    ],
    seo: {
      title: 'Nissan Qashqai Usado | SUV Usado com Excelente Relação Valor',
      description:
        'Veja oportunidades de Nissan Qashqai usado com versões para vários orçamentos e pedido simples de proposta ou contacto.',
      canonicalPath: '/usados/qashqai/'
    }
  })
} as const satisfies Record<string, PageDefinition>;

export const campaignSlugs = ['popup', 'happiniss-days'] as const;
export const modelSlugs = ['nissan-leaf', 'nissan-ariya', 'nissan-qashqai', 'nissan-x-trail', 'novo-nissan-juke', 'novo-micra'] as const;
export const usedSlugs = ['juke', 'qashqai'] as const;
