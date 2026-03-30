export const modelInterestOptions = [
  "Nissan Leaf",
  "Nissan Ariya",
  "Nissan Qashqai",
  "Nissan X-Trail",
  "Nissan Juke",
  "Nissan Micra",
];

export const interestTypeOptions = [
  { value: "test_drive", label: "Test Drive" },
  { value: "proposal", label: "Proposta" },
  { value: "more_info", label: "Mais Informação" },
];

const commonCtaLabels = {
  primary: "Agendar Test Drive",
  secondary: "Descarregar Catálogo",
};

function createGenericPage({
  slug,
  title,
  subtitle,
  seoTitle,
  seoDescription,
  eyebrow,
  categoryLabel,
  highlights,
  bannerKey,
}) {
  return {
    path: slug,
    pageKind: "typeA",
    title,
    subtitle,
    seoTitle,
    seoDescription,
    eyebrow,
    categoryLabel,
    heroMetricLabel: "Destaque",
    heroMetricValue: "Oferta em destaque",
    ctas: commonCtaLabels,
    highlights,
    bannerKey,
  };
}

function createModelPage({
  slug,
  title,
  subtitle,
  seoTitle,
  seoDescription,
  eyebrow,
  categoryLabel,
  versions,
  highlights,
  bannerKey,
}) {
  return {
    path: slug,
    pageKind: "typeB",
    title,
    subtitle,
    seoTitle,
    seoDescription,
    eyebrow,
    categoryLabel,
    versions,
    heroMetricLabel: "Versões",
    heroMetricValue: `${versions.length} disponíveis`,
    ctas: commonCtaLabels,
    highlights,
    bannerKey,
  };
}

export const pageDefinitions = {
  "/popup/": createGenericPage({
    slug: "/popup/",
    title: "Popup Campaign",
    seoTitle: "Campanhas Nissan | Ofertas e Pedido de Contacto",
    seoDescription:
      "Conheça campanhas Nissan em destaque, consulte ofertas comerciais e peça contacto para test drive, proposta ou mais informações.",
    subtitle:
      "Descubra a campanha certa para si e deixe os seus dados para ser contactado sem demoras.",
    eyebrow: "Campanhas Nissan",
    categoryLabel: "Campanha",
    bannerKey: "POPUP",
    highlights: [
      "Condições especiais em modelos selecionados",
      "Resposta rápida da equipa comercial",
      "Marcação simples de test drive",
    ],
  }),
  "/happiniss-days/": createGenericPage({
    slug: "/happiniss-days/",
    title: "Happiniss Days",
    seoTitle: "Happiniss Days | Campanha Nissan com Ofertas Especiais",
    seoDescription:
      "Descubra a campanha Happiniss Days da Nissan com condições especiais, acompanhamento comercial e pedido rápido de contacto.",
    subtitle:
      "Uma campanha desenhada para aproximar o seu próximo Nissan com mais vantagens e menos espera.",
    eyebrow: "Campanhas Nissan",
    categoryLabel: "Campanha",
    bannerKey: "HAPPINISS_DAYS",
    highlights: [
      "Condições exclusivas por tempo limitado",
      "Acompanhamento por consultor dedicado",
      "Catálogo digital imediato",
    ],
  }),
  "/nissan-juke/": createGenericPage({
    slug: "/nissan-juke/",
    title: "Nissan Juke",
    seoTitle: "Nissan Juke | Crossover Urbano com Design Marcante",
    seoDescription:
      "Conheça o Nissan Juke, um crossover com design ousado, tecnologia conectada e pedido de test drive ou contacto comercial.",
    subtitle:
      "O crossover mais irreverente da Nissan com design urbano, atitude forte e uma presença única.",
    eyebrow: "Landing Avulsa",
    categoryLabel: "Standalone",
    bannerKey: "NISSAN_JUKE_STANDALONE",
    highlights: [
      "Design exterior distinto e expressivo",
      "Experiência conectada para a cidade",
      "Ideal para quem procura personalidade",
    ],
  }),
  "/modelos/nissan-leaf/": createModelPage({
    slug: "/modelos/nissan-leaf/",
    title: "Nissan Leaf",
    seoTitle: "Nissan Leaf | Carro Elétrico Nissan para o Dia a Dia",
    seoDescription:
      "Explore o Nissan Leaf, o elétrico da Nissan com tecnologia inteligente, condução silenciosa e pedido de test drive online.",
    subtitle:
      "Mobilidade elétrica simples, silenciosa e pronta para o ritmo do dia a dia.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna"],
    bannerKey: "NISSAN_LEAF",
    highlights: [
      "Condução 100% elétrica",
      "Custos de utilização reduzidos",
      "Tecnologia inteligente em cada viagem",
    ],
  }),
  "/modelos/nissan-ariya/": createModelPage({
    slug: "/modelos/nissan-ariya/",
    title: "Nissan Ariya",
    seoTitle: "Nissan Ariya | SUV Elétrico Premium da Nissan",
    seoDescription:
      "Descubra o Nissan Ariya, SUV elétrico premium com design marcante, conforto refinado e pedido de proposta ou test drive.",
    subtitle:
      "Um SUV elétrico premium com presença marcante, conforto refinado e inovação de nova geração.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Evolve", "Evolve+", "Evolve+ 4WD", "Nismo"],
    bannerKey: "NISSAN_ARIYA",
    highlights: [
      "Interior lounge com sensação premium",
      "Desempenho elétrico progressivo",
      "Tecnologia pensada para condução intuitiva",
    ],
  }),
  "/modelos/nissan-qashqai/": createModelPage({
    slug: "/modelos/nissan-qashqai/",
    title: "Nissan Qashqai",
    seoTitle: "Nissan Qashqai | SUV Nissan com Tecnologia e Conforto",
    seoDescription:
      "Veja o Nissan Qashqai, SUV da Nissan com design moderno, conforto diário e opções para pedido de contacto e test drive.",
    subtitle:
      "O SUV que continua a definir o segmento com estilo, conforto e confiança para todos os dias.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna", "Tekna+"],
    bannerKey: "NISSAN_QASHQAI",
    highlights: [
      "Líder de segmento em atitude e versatilidade",
      "Acabamentos para diferentes perfis",
      "Oferta comercial em destaque",
    ],
  }),
  "/modelos/nissan-x-trail/": createModelPage({
    slug: "/modelos/nissan-x-trail/",
    title: "Nissan X-Trail",
    seoTitle: "Nissan X-Trail | SUV Familiar com Espaço e Versatilidade",
    seoDescription:
      "Conheça o Nissan X-Trail, SUV familiar com mais espaço, conforto em viagem e pedido rápido de proposta ou test drive.",
    subtitle:
      "Espaço, robustez e conforto para viagens em família com uma presença premium.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna", "Tekna+ e-4ORCE"],
    bannerKey: "NISSAN_X_TRAIL",
    highlights: [
      "Concebido para longas distâncias",
      "Mais espaço para tudo o que importa",
      "Várias versões para diferentes estilos de vida",
    ],
  }),
  "/modelos/novo-nissan-juke/": createModelPage({
    slug: "/modelos/novo-nissan-juke/",
    title: "Novo Nissan Juke",
    seoTitle: "Novo Nissan Juke | SUV Compacto com Design Ousado",
    seoDescription:
      "Descubra o novo Nissan Juke com visual renovado, conectividade avançada e pedido de test drive ou mais informações.",
    subtitle:
      "A nova geração do Juke chega com ainda mais presença, conectividade e energia urbana.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Design", "Tekna"],
    bannerKey: "NOVO_NISSAN_JUKE",
    highlights: [
      "Nova linguagem de design Nissan",
      "Experiência interior mais sofisticada",
      "Ideal para quem quer destacar-se",
    ],
  }),
  "/modelos/novo-micra/": createModelPage({
    slug: "/modelos/novo-micra/",
    title: "Novo Micra",
    seoTitle: "Novo Micra | Citadino Nissan com Estilo Urbano",
    seoDescription:
      "Explore o novo Micra, compacto Nissan pensado para a cidade, com versões distintas e contacto comercial simplificado.",
    subtitle:
      "Uma nova interpretação do Micra com linhas atuais, acabamentos frescos e espírito urbano.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["IM Access", "IM Play", "IM Club", "IM Iconic"],
    bannerKey: "NOVO_MICRA",
    highlights: [
      "Linha mais contemporânea",
      "Gamas preparadas para diferentes estilos",
      "Oferta pensada para o quotidiano",
    ],
  }),
  "/usados-juke/": createModelPage({
    slug: "/usados-juke/",
    title: "Juke Usado",
    seoTitle: "Nissan Juke Usado | Oportunidades em Viaturas Seminovas",
    seoDescription:
      "Encontre oportunidades de Nissan Juke usado com seleção por ano, contacto rápido e apoio comercial para proposta ou visita.",
    subtitle:
      "Encontre um Juke usado com seleção cuidada e diferentes níveis de oportunidade.",
    eyebrow: "Usados Nissan",
    categoryLabel: "Usado",
    versions: ["Até 2021", "2022-2023", "2024 Certificado"],
    bannerKey: "USADOS_JUKE",
    highlights: [
      "Seleção por faixa de ano",
      "Mais proximidade à compra ideal",
      "Acompanhamento comercial rápido",
    ],
  }),
  "/usados-qashqai/": createModelPage({
    slug: "/usados-qashqai/",
    title: "Qashqai Usado",
    seoTitle: "Nissan Qashqai Usado | SUV Usado com Excelente Relação Valor",
    seoDescription:
      "Veja oportunidades de Nissan Qashqai usado com versões para vários orçamentos e pedido simples de proposta ou contacto.",
    subtitle:
      "Aceda a oportunidades Qashqai usadas com equilíbrio entre valor, design e confiança.",
    eyebrow: "Usados Nissan",
    categoryLabel: "Usado",
    versions: ["Até 2021", "2022-2023", "2024 Certificado"],
    bannerKey: "USADOS_QASHQAI",
    highlights: [
      "Modelos usados com forte procura",
      "Versões para diferentes orçamentos",
      "Contacto simples para proposta ou visita",
    ],
  }),
};
