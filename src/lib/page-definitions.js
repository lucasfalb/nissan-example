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
  { value: "more_info", label: "Mais Informa\u00e7\u00e3o" },
];

const commonCtaLabels = {
  primary: "Agendar Test Drive",
  secondary: "Descarregar Cat\u00e1logo",
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
    heroMetricLabel: "Vers\u00f5es",
    heroMetricValue: `${versions.length} dispon\u00edveis`,
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
      "Conhe\u00e7a campanhas Nissan em destaque, consulte ofertas comerciais e pe\u00e7a contacto para test drive, proposta ou mais informa\u00e7\u00f5es.",
    subtitle:
      "Descubra a campanha certa para si e deixe os seus dados para ser contactado sem demoras.",
    eyebrow: "Campanhas Nissan",
    categoryLabel: "Campanha",
    bannerKey: "POPUP",
    highlights: [
      "Condi\u00e7\u00f5es especiais em modelos selecionados",
      "Resposta r\u00e1pida da equipa comercial",
      "Marca\u00e7\u00e3o simples de test drive",
    ],
  }),
  "/happiniss-days/": createGenericPage({
    slug: "/happiniss-days/",
    title: "Happiniss Days",
    seoTitle: "Happiniss Days | Campanha Nissan com Ofertas Especiais",
    seoDescription:
      "Descubra a campanha Happiniss Days da Nissan com condi\u00e7\u00f5es especiais, acompanhamento comercial e pedido r\u00e1pido de contacto.",
    subtitle:
      "Uma campanha desenhada para aproximar o seu pr\u00f3ximo Nissan com mais vantagens e menos espera.",
    eyebrow: "Campanhas Nissan",
    categoryLabel: "Campanha",
    bannerKey: "HAPPINISS_DAYS",
    highlights: [
      "Condi\u00e7\u00f5es exclusivas por tempo limitado",
      "Acompanhamento por consultor dedicado",
      "Cat\u00e1logo digital imediato",
    ],
  }),
  "/nissan-juke/": createGenericPage({
    slug: "/nissan-juke/",
    title: "Nissan Juke",
    seoTitle: "Nissan Juke | Crossover Urbano com Design Marcante",
    seoDescription:
      "Conhe\u00e7a o Nissan Juke, um crossover com design ousado, tecnologia conectada e pedido de test drive ou contacto comercial.",
    subtitle:
      "O crossover mais irreverente da Nissan com design urbano, atitude forte e uma presen\u00e7a \u00fanica.",
    eyebrow: "Landing Avulsa",
    categoryLabel: "Standalone",
    bannerKey: "NISSAN_JUKE_STANDALONE",
    highlights: [
      "Design exterior distinto e expressivo",
      "Experi\u00eancia conectada para a cidade",
      "Ideal para quem procura personalidade",
    ],
  }),
  "/modelos/nissan-leaf/": createModelPage({
    slug: "/modelos/nissan-leaf/",
    title: "Nissan Leaf",
    seoTitle: "Nissan Leaf | Carro El\u00e9trico Nissan para o Dia a Dia",
    seoDescription:
      "Explore o Nissan Leaf, o el\u00e9trico da Nissan com tecnologia inteligente, condu\u00e7\u00e3o silenciosa e pedido de test drive online.",
    subtitle:
      "Mobilidade el\u00e9trica simples, silenciosa e pronta para o ritmo do dia a dia.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna"],
    bannerKey: "NISSAN_LEAF",
    highlights: [
      "Condu\u00e7\u00e3o 100% el\u00e9trica",
      "Custos de utiliza\u00e7\u00e3o reduzidos",
      "Tecnologia inteligente em cada viagem",
    ],
  }),
  "/modelos/nissan-ariya/": createModelPage({
    slug: "/modelos/nissan-ariya/",
    title: "Nissan Ariya",
    seoTitle: "Nissan Ariya | SUV El\u00e9trico Premium da Nissan",
    seoDescription:
      "Descubra o Nissan Ariya, SUV el\u00e9trico premium com design marcante, conforto refinado e pedido de proposta ou test drive.",
    subtitle:
      "Um SUV el\u00e9trico premium com presen\u00e7a marcante, conforto refinado e inova\u00e7\u00e3o de nova gera\u00e7\u00e3o.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Evolve", "Evolve+", "Evolve+ 4WD", "Nismo"],
    bannerKey: "NISSAN_ARIYA",
    highlights: [
      "Interior lounge com sensa\u00e7\u00e3o premium",
      "Desempenho el\u00e9trico progressivo",
      "Tecnologia pensada para condu\u00e7\u00e3o intuitiva",
    ],
  }),
  "/modelos/nissan-qashqai/": createModelPage({
    slug: "/modelos/nissan-qashqai/",
    title: "Nissan Qashqai",
    seoTitle: "Nissan Qashqai | SUV Nissan com Tecnologia e Conforto",
    seoDescription:
      "Veja o Nissan Qashqai, SUV da Nissan com design moderno, conforto di\u00e1rio e op\u00e7\u00f5es para pedido de contacto e test drive.",
    subtitle:
      "O SUV que continua a definir o segmento com estilo, conforto e confian\u00e7a para todos os dias.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna", "Tekna+"],
    bannerKey: "NISSAN_QASHQAI",
    highlights: [
      "L\u00edder de segmento em atitude e versatilidade",
      "Acabamentos para diferentes perfis",
      "Oferta comercial em destaque",
    ],
  }),
  "/modelos/nissan-x-trail/": createModelPage({
    slug: "/modelos/nissan-x-trail/",
    title: "Nissan X-Trail",
    seoTitle: "Nissan X-Trail | SUV Familiar com Espa\u00e7o e Versatilidade",
    seoDescription:
      "Conhe\u00e7a o Nissan X-Trail, SUV familiar com mais espa\u00e7o, conforto em viagem e pedido r\u00e1pido de proposta ou test drive.",
    subtitle:
      "Espa\u00e7o, robustez e conforto para viagens em fam\u00edlia com uma presen\u00e7a premium.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Connecta", "Tekna", "Tekna+ e-4ORCE"],
    bannerKey: "NISSAN_X_TRAIL",
    highlights: [
      "Concebido para longas dist\u00e2ncias",
      "Mais espa\u00e7o para tudo o que importa",
      "V\u00e1rias vers\u00f5es para diferentes estilos de vida",
    ],
  }),
  "/modelos/novo-nissan-juke/": createModelPage({
    slug: "/modelos/novo-nissan-juke/",
    title: "Novo Nissan Juke",
    seoTitle: "Novo Nissan Juke | SUV Compacto com Design Ousado",
    seoDescription:
      "Descubra o novo Nissan Juke com visual renovado, conectividade avan\u00e7ada e pedido de test drive ou mais informa\u00e7\u00f5es.",
    subtitle:
      "A nova gera\u00e7\u00e3o do Juke chega com ainda mais presen\u00e7a, conectividade e energia urbana.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["Visia", "Acenta", "N-Design", "Tekna"],
    bannerKey: "NOVO_NISSAN_JUKE",
    highlights: [
      "Nova linguagem de design Nissan",
      "Experi\u00eancia interior mais sofisticada",
      "Ideal para quem quer destacar-se",
    ],
  }),
  "/modelos/novo-micra/": createModelPage({
    slug: "/modelos/novo-micra/",
    title: "Novo Micra",
    seoTitle: "Novo Micra | Citadino Nissan com Estilo Urbano",
    seoDescription:
      "Explore o novo Micra, compacto Nissan pensado para a cidade, com vers\u00f5es distintas e contacto comercial simplificado.",
    subtitle:
      "Uma nova interpreta\u00e7\u00e3o do Micra com linhas atuais, acabamentos frescos e esp\u00edrito urbano.",
    eyebrow: "Modelos Novos",
    categoryLabel: "Modelo",
    versions: ["IM Access", "IM Play", "IM Club", "IM Iconic"],
    bannerKey: "NOVO_MICRA",
    highlights: [
      "Linha mais contempor\u00e2nea",
      "Gamas preparadas para diferentes estilos",
      "Oferta pensada para o quotidiano",
    ],
  }),
  "/usados-juke/": createModelPage({
    slug: "/usados-juke/",
    title: "Juke Usado",
    seoTitle: "Nissan Juke Usado | Oportunidades em Viaturas Seminovas",
    seoDescription:
      "Encontre oportunidades de Nissan Juke usado com sele\u00e7\u00e3o por ano, contacto r\u00e1pido e apoio comercial para proposta ou visita.",
    subtitle:
      "Encontre um Juke usado com sele\u00e7\u00e3o cuidada e diferentes n\u00edveis de oportunidade.",
    eyebrow: "Usados Nissan",
    categoryLabel: "Usado",
    versions: ["At\u00e9 2021", "2022-2023", "2024 Certificado"],
    bannerKey: "USADOS_JUKE",
    highlights: [
      "Sele\u00e7\u00e3o por faixa de ano",
      "Mais proximidade \u00e0 compra ideal",
      "Acompanhamento comercial r\u00e1pido",
    ],
  }),
  "/usados-qashqai/": createModelPage({
    slug: "/usados-qashqai/",
    title: "Qashqai Usado",
    seoTitle: "Nissan Qashqai Usado | SUV Usado com Excelente Rela\u00e7\u00e3o Valor",
    seoDescription:
      "Veja oportunidades de Nissan Qashqai usado com vers\u00f5es para v\u00e1rios or\u00e7amentos e pedido simples de proposta ou contacto.",
    subtitle:
      "Aceda a oportunidades Qashqai usadas com equil\u00edbrio entre valor, design e confian\u00e7a.",
    eyebrow: "Usados Nissan",
    categoryLabel: "Usado",
    versions: ["At\u00e9 2021", "2022-2023", "2024 Certificado"],
    bannerKey: "USADOS_QASHQAI",
    highlights: [
      "Modelos usados com forte procura",
      "Vers\u00f5es para diferentes or\u00e7amentos",
      "Contacto simples para proposta ou visita",
    ],
  }),
};
