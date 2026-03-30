import "./styles/nissan.css";

import { createFeaturedCard } from "./components/cards.js";
import { createLeadForm } from "./components/form.js";
import { createHeader } from "./components/header.js";
import { createHero } from "./components/hero.js";
import { createHomeMarketingBlock } from "./components/home-marketing.js";
import {
  createHomeSlideshow,
  setupHomeSlideshow,
} from "./components/home-slideshow.js";
import { createSectionHeader } from "./components/section-header.js";
import { pushEvent } from "./dataLayer.js";
import {
  consumeNavigationContext,
  peekNavigationContext,
  setNavigationContext,
} from "./lib/navigation-context.js";
import { pageDefinitions } from "./lib/page-definitions.js";
import { GTM_ID } from "./lib/env.js";
import { initGoogleTagManager } from "./lib/gtm.js";
import { applySeoMetadata } from "./lib/seo.js";
import { startViewTransition } from "./lib/view-transitions.js";
import { HOME_SLIDES } from "./model-banners.js";

initGoogleTagManager(GTM_ID);

const routes = {
  "/": { pageType: "home_page", pageModel: null, pageCategory: "home" },
  "/modelos/": {
    pageType: "models_hub_page",
    pageModel: null,
    pageCategory: "models_hub",
  },
  "/popup/": {
    ...pageDefinitions["/popup/"],
    pageType: "campaign_page",
    pageModel: null,
    pageCategory: "campaign",
  },
  "/happiniss-days/": {
    ...pageDefinitions["/happiniss-days/"],
    pageType: "campaign_page",
    pageModel: null,
    pageCategory: "campaign",
  },
  "/modelos/nissan-leaf/": {
    ...pageDefinitions["/modelos/nissan-leaf/"],
    pageType: "model_page",
    pageModel: "nissan-leaf",
    pageCategory: "new_model",
  },
  "/modelos/nissan-ariya/": {
    ...pageDefinitions["/modelos/nissan-ariya/"],
    pageType: "model_page",
    pageModel: "nissan-ariya",
    pageCategory: "new_model",
  },
  "/modelos/nissan-qashqai/": {
    ...pageDefinitions["/modelos/nissan-qashqai/"],
    pageType: "model_page",
    pageModel: "nissan-qashqai",
    pageCategory: "new_model",
  },
  "/modelos/nissan-x-trail/": {
    ...pageDefinitions["/modelos/nissan-x-trail/"],
    pageType: "model_page",
    pageModel: "nissan-x-trail",
    pageCategory: "new_model",
  },
  "/modelos/novo-nissan-juke/": {
    ...pageDefinitions["/modelos/novo-nissan-juke/"],
    pageType: "model_page",
    pageModel: "nissan-juke",
    pageCategory: "new_model",
  },
  "/modelos/novo-micra/": {
    ...pageDefinitions["/modelos/novo-micra/"],
    pageType: "model_page",
    pageModel: "nissan-micra",
    pageCategory: "new_model",
  },
  "/usados-juke/": {
    ...pageDefinitions["/usados-juke/"],
    pageType: "used_page",
    pageModel: "nissan-juke",
    pageCategory: "used",
  },
  "/usados-qashqai/": {
    ...pageDefinitions["/usados-qashqai/"],
    pageType: "used_page",
    pageModel: "nissan-qashqai",
    pageCategory: "used",
  },
  "/nissan-juke/": {
    ...pageDefinitions["/nissan-juke/"],
    pageType: "standalone_page",
    pageModel: "nissan-juke",
    pageCategory: "standalone",
  },
};

const featuredCards = HOME_SLIDES.map((slide) => ({
  title: slide.title,
  description:
    slide.title === "Nissan Qashqai"
      ? "Conheça o híbrido reinventado com espaço, tecnologia e uma condução mais fluida em cidade e estrada."
      : slide.title === "Nissan Ariya"
        ? "100% elétrico com até 536 km de autonomia, conforto premium e uma presença mais sofisticada."
        : slide.title === "Novo Nissan Juke"
          ? "O crossover coupé com design ousado, disponível em versões híbridas e gasolina para o dia a dia."
          : slide.title === "Novo Micra"
            ? "Olá diversão: uma proposta urbana, elétrica e pronta para redefinir a rotina com mais energia."
            : slide.title === "Nissan Leaf"
              ? "Mobilidade 100% elétrica com condução intuitiva, eficiência e tecnologia pensada para todos os dias."
              : "Um SUV versátil para viagens em família, mais espaço e confiança em percursos longos.",
  path: slide.path,
  bannerKey: slide.bannerKey,
  transitionKey: slide.path,
  category: "featured_model",
  section: "home_featured",
}));

const allModelCards = [
  {
    title: pageDefinitions["/modelos/nissan-leaf/"].title,
    description: pageDefinitions["/modelos/nissan-leaf/"].subtitle,
    path: "/modelos/nissan-leaf/",
    bannerKey: "NISSAN_LEAF",
    transitionKey: "/modelos/nissan-leaf/",
    category: "new_model",
    section: "models_hub",
  },
  {
    title: pageDefinitions["/modelos/nissan-ariya/"].title,
    description: pageDefinitions["/modelos/nissan-ariya/"].subtitle,
    path: "/modelos/nissan-ariya/",
    bannerKey: "NISSAN_ARIYA",
    transitionKey: "/modelos/nissan-ariya/",
    category: "new_model",
    section: "models_hub",
  },
  {
    title: pageDefinitions["/modelos/nissan-qashqai/"].title,
    description: pageDefinitions["/modelos/nissan-qashqai/"].subtitle,
    path: "/modelos/nissan-qashqai/",
    bannerKey: "NISSAN_QASHQAI",
    transitionKey: "/modelos/nissan-qashqai/",
    category: "new_model",
    section: "models_hub",
  },
  {
    title: pageDefinitions["/modelos/nissan-x-trail/"].title,
    description: pageDefinitions["/modelos/nissan-x-trail/"].subtitle,
    path: "/modelos/nissan-x-trail/",
    bannerKey: "NISSAN_X_TRAIL",
    transitionKey: "/modelos/nissan-x-trail/",
    category: "new_model",
    section: "models_hub",
  },
  {
    title: pageDefinitions["/modelos/novo-nissan-juke/"].title,
    description: pageDefinitions["/modelos/novo-nissan-juke/"].subtitle,
    path: "/modelos/novo-nissan-juke/",
    bannerKey: "NOVO_NISSAN_JUKE",
    transitionKey: "/modelos/novo-nissan-juke/",
    category: "new_model",
    section: "models_hub",
  },
  {
    title: pageDefinitions["/modelos/novo-micra/"].title,
    description: pageDefinitions["/modelos/novo-micra/"].subtitle,
    path: "/modelos/novo-micra/",
    bannerKey: "NOVO_MICRA",
    transitionKey: "/modelos/novo-micra/",
    category: "new_model",
    section: "models_hub",
  },
];

const seoByStaticRoute = {
  "/": {
    title: "Nissan Portugal | Modelos, Campanhas e Ofertas",
    description:
      "Explore modelos Nissan, campanhas em destaque, oportunidades em usados e pedidos de contacto para test drive ou proposta.",
  },
  "/modelos/": {
    title: "Modelos Nissan | Gama Completa Nissan Portugal",
    description:
      "Descubra a gama completa de modelos Nissan, dos elétricos aos SUV, e encontre o automóvel ideal para o seu dia a dia.",
  },
};

const legacyRedirects = {
  "/usadosjuke/": "/usados-juke/",
  "/usadosqashqai/": "/usados-qashqai/",
};

const app = document.querySelector("#app");
let cleanupHomeSlideshow = null;
let shellRefs = null;
let pendingEntranceContent = null;

function normalizePath(pathname) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function toTransitionToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function setPendingNavigation(path, source, transitionKey = null) {
  const existingContext = peekNavigationContext();
  const nextTransitionKey =
    transitionKey ?? existingContext?.transitionKey ?? null;

  setNavigationContext({
    from: normalizePath(window.location.pathname),
    to: normalizePath(path),
    source,
    transitionKey: nextTransitionKey
      ? toTransitionToken(nextTransitionKey)
      : null,
  });
}

function setElementTransitionName(element, transitionName) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.style.viewTransitionName = transitionName;
}

function primeNavigationFromElement(link) {
  const transitionKey = toTransitionToken(link.dataset.transitionKey);
  if (!transitionKey) {
    return;
  }

  setPendingNavigation(
    link.getAttribute("href"),
    link.dataset.transitionSource || "link",
    transitionKey,
  );

  setElementTransitionName(
    link.querySelector('[data-transition-part="card-banner"]'),
    `card-banner-${transitionKey}`,
  );
  setElementTransitionName(
    link.querySelector('[data-transition-part="card-title"]'),
    `card-title-${transitionKey}`,
  );
}

function navigate(
  path,
  { replace = false, source = "programmatic", transitionKey = null } = {},
) {
  const normalizedPath = normalizePath(path);
  const currentPath = normalizePath(window.location.pathname);
  const disablePageTransition = source === "card";

  if (!replace && normalizedPath === currentPath) {
    return Promise.resolve();
  }

  setPendingNavigation(normalizedPath, source, transitionKey);

  return startViewTransition(
    () => {
      history[replace ? "replaceState" : "pushState"]({}, "", normalizedPath);
      render();
      flushPageEntrance();
    },
    {
      beforeTransition: () => {
        if (disablePageTransition) {
          setPageTransitionEnabled(false);
        }
      },
    },
  ).finally(() => {
    if (disablePageTransition) {
      setPageTransitionEnabled(true);
    }
  });
}

function getRouteMeta(path) {
  const route = routes[normalizePath(path)];

  return {
    page_path: normalizePath(window.location.pathname),
    page_type: route?.pageType || "unknown",
    page_category: route?.pageCategory || "unknown",
    page_model: route?.pageModel || null,
  };
}

function trackInternalLinkClick(link) {
  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const href = link.getAttribute("href");
  const routeMeta = getRouteMeta(window.location.pathname);
  const basePayload = {
    ...routeMeta,
    destination_path: href,
  };

  if (link.dataset.trackEvent === "model_card_click") {
    const siblings = Array.from(link.parentElement?.children || []).filter(
      (node) => node instanceof HTMLElement && node.matches(".featured-card"),
    );
    const position = siblings.indexOf(link) + 1;

    pushEvent("model_card_click", {
      ...basePayload,
      source_component: link.dataset.sourceComponent || "model_card",
      card_title: link.dataset.cardTitle || link.textContent?.trim() || "",
      card_category: link.dataset.cardCategory || "model",
      card_section: link.dataset.cardSection || "listing",
      card_position: position > 0 ? position : null,
      banner_key: link.dataset.bannerKey || null,
    });
    return;
  }

  if (link.dataset.trackEvent) {
    pushEvent(link.dataset.trackEvent, {
      ...basePayload,
      source_component: link.dataset.sourceComponent || "link",
      source_label: link.dataset.sourceLabel || link.textContent?.trim() || "",
    });
  }
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer mt-auto bg-black text-white";
  footer.innerHTML = ` 
    <div class="mx-auto w-[min(95.9%,1170px)] py-14 md:py-16">
      <div class="flex items-center sm:items-start border-t border-white/30 flex-col gap-5 py-7 text-[14px] text-white/70 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <nav class="flex flex-wrap gap-x-8 gap-y-3">
          <a class="footer-link" href="#" data-footer-link data-source-label="Nissan Global">Nissan Global</a>
          <a class="footer-link" href="#" data-footer-link data-source-label="Mapa do website">Mapa do website</a>
        </nav>

        <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a class="footer-link" href="#" data-footer-link data-source-label="Privacidade">Privacidade</a>
          <a class="footer-link" href="#" data-footer-link data-source-label="Cookies">Cookies</a>
          <a class="footer-link" href="#" data-footer-link data-source-label="Aviso legal">Aviso legal</a>
          <span class="text-white">© Nissan 2026</span>
        </div>
      </div>
    </div>
  `;

  footer.addEventListener("click", (event) => {
    const link = event.target.closest("[data-footer-link]");
    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    event.preventDefault();
    pushEvent("footer_click", {
      ...getRouteMeta(window.location.pathname),
      source_component: "footer",
      source_label: link.dataset.sourceLabel || link.textContent?.trim() || "",
      destination_path: link.getAttribute("href"),
    });
  });

  attachInternalNavigation(footer);
  return footer;
}

function attachInternalNavigation(container) {
  container.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");
    if (link instanceof HTMLAnchorElement) {
      event.preventDefault();
      trackInternalLinkClick(link);
      primeNavigationFromElement(link);
      navigate(link.getAttribute("href"), {
        source: link.dataset.transitionSource || "link",
        transitionKey: link.dataset.transitionKey || null,
      });
    }
  });
}

function createHomeEntryCards() {
  return `
    <section class="bg-neutral-100 py-12 md:py-16">
      <div class="mx-auto w-[min(95.9%,1170px)]">
        ${createSectionHeader({ eyebrow: "Escolha o seu caminho", title: "Três formas de entrar no universo Nissan" })}
        <div class="grid gap-6 md:grid-cols-3">
          <a class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]" href="/happiniss-days/" data-link data-track-event="cta_click" data-source-component="home_entry_card" data-source-label="Ofertas em destaque">
            <span class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]">Campanhas</span>
            <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">Ofertas em destaque</h3>
            <p class="text-[14px] leading-[1.6] text-neutral-600">Veja campanhas, ofertas comerciais e chamadas de ação mais diretas para gerar contacto.</p>
          </a>
          <a class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]" href="/modelos/" data-link data-track-event="cta_click" data-source-component="home_entry_card" data-source-label="Descubra a gama Nissan">
            <span class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]">Novos</span>
            <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">Descubra a gama Nissan</h3>
            <p class="text-[14px] leading-[1.6] text-neutral-600">Dos compactos elétricos aos SUV familiares, encontre o modelo certo para você.</p>
          </a>
          <a class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]" href="/usados-qashqai/" data-link data-track-event="cta_click" data-source-component="home_entry_card" data-source-label="Oportunidades Nissan">
            <span class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]">Usados</span>
            <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">Oportunidades Nissan</h3>
            <p class="text-[14px] leading-[1.6] text-neutral-600">Explore usados selecionados e aceda rapidamente a proposta, visita comercial ou pedido de contacto.</p>
          </a>
        </div>
      </div>
    </section>
  `;
}

function createHomePage() {
  const main = document.createElement("main");
  main.className = "w-screen overflow-x-hidden";
  main.innerHTML = `
    ${createHomeSlideshow()}

    ${createHomeMarketingBlock()}

    <section class="pb-12 md:pb-16">
      <div class="mx-auto w-[min(95.9%,1170px)]">
        ${createSectionHeader({ eyebrow: "Modelos em destaque", title: "Escolha o Nissan certo para o seu momento" })}
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          ${featuredCards.map(createFeaturedCard).join("")}
        </div>
      </div>
    </section>

    ${createHomeEntryCards()}
  `;

  attachInternalNavigation(main);
  return main;
}

function createModelsHubPage() {
  const main = document.createElement("main");
  main.innerHTML = `
    <section class="px-0 py-12 md:py-16">
      <div class="mx-auto w-[min(95.9%,1170px)]">
        ${createSectionHeader({ eyebrow: "Modelos", title: "Todos os Modelos Nissan" })}
        <p class="mb-8 mt-4 max-w-[720px] text-[14px] leading-[1.6] text-neutral-600">
          Explore a gama completa de modelos novos e descubra qual Nissan se adapta melhor ao seu dia a dia.
        </p>
        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          ${allModelCards.map(createFeaturedCard).join("")}
        </div>
      </div>
    </section>
  `;

  attachInternalNavigation(main);
  return main;
}

function createNotFoundPage() {
  const main = document.createElement("main");
  main.className = "px-0 py-12 md:py-16";
  main.innerHTML = `
    <section class="mx-auto w-[min(95.9%,1170px)]">
      ${createSectionHeader({ eyebrow: "Rota inválida", title: "Página não encontrada" })}
      <p class="text-[14px] leading-[1.6] text-neutral-600">
        Use a navegação para voltar a uma página válida do projeto.
      </p>
    </section>
  `;
  return main;
}

function bindPageEvents(container, pageConfig) {
  container.querySelector("#btn-test-drive")?.addEventListener("click", () => {
    pushEvent("cta_click", {
      source_component: "hero",
      source_label: "Agendar Test Drive",
      cta_type: "test_drive",
      page_path: normalizePath(window.location.pathname),
      page_type: pageConfig.pageType,
      page_category: pageConfig.pageCategory,
      page_model: pageConfig.pageModel,
    });

    const interestTypeField = document.querySelector("#interest_type");
    if (interestTypeField instanceof HTMLSelectElement) {
      interestTypeField.value = "test_drive";
      interestTypeField.dispatchEvent(new Event("input", { bubbles: true }));
      interestTypeField.dispatchEvent(new Event("change", { bubbles: true }));
    }

    document
      .querySelector("#lead-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  container
    .querySelector("#btn-download-catalog")
    ?.addEventListener("click", () => {
      pushEvent("cta_click", {
        source_component: "hero",
        source_label: "Descarregar Catálogo",
        cta_type: "catalog",
        page_path: normalizePath(window.location.pathname),
        page_type: pageConfig.pageType,
        page_category: pageConfig.pageCategory,
        page_model: pageConfig.pageModel,
      });
    });
}

function createShell() {
  const shell = document.createElement("div");
  shell.className = "min-h-screen bg-white overflow-x-hidden";

  const headerSlot = document.createElement("div");
  headerSlot.id = "site-header-slot";

  const pageSlot = document.createElement("div");
  pageSlot.id = "page-content";
  pageSlot.className = "site-page-content";

  shell.appendChild(headerSlot);
  shell.appendChild(pageSlot);
  app.replaceChildren(shell);

  return { shell, headerSlot, pageSlot };
}

function getShellRefs() {
  if (!shellRefs) {
    shellRefs = createShell();
  }

  return shellRefs;
}

function renderPageContent(content) {
  const { pageSlot } = getShellRefs();
  pageSlot.replaceChildren(content);
}

function setPageTransitionEnabled(enabled) {
  const { pageSlot } = getShellRefs();
  pageSlot.style.viewTransitionName = enabled ? "page-main" : "none";
}

function activatePageEntrance(content) {
  if (!(content instanceof HTMLElement)) {
    return;
  }

  content.classList.remove("is-ready");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      content.classList.add("is-ready");
    });
  });
}

function queuePageEntrance(content) {
  pendingEntranceContent = content instanceof HTMLElement ? content : null;
}

function flushPageEntrance() {
  if (!pendingEntranceContent) {
    return;
  }

  const content = pendingEntranceContent;
  pendingEntranceContent = null;
  activatePageEntrance(content);
}

function render() {
  if (cleanupHomeSlideshow) {
    cleanupHomeSlideshow();
    cleanupHomeSlideshow = null;
  }

  const pathname = normalizePath(window.location.pathname);
  const redirectPath = legacyRedirects[pathname];

  if (redirectPath) {
    navigate(redirectPath, { replace: true, source: "legacy_redirect" });
    return;
  }

  const pageConfig = routes[pathname];
  const navigationContext = consumeNavigationContext();
  const { shell, headerSlot } = getShellRefs();

  shell.className = "min-h-screen bg-white overflow-x-hidden";
  headerSlot.replaceChildren(
    createHeader({
      currentPath: pathname,
      navigate,
      pageMeta: pageConfig,
    }),
  );

  if (!pageConfig) {
    const pageContent = document.createElement("div");
    pageContent.className = "page-wrapper";
    pageContent.appendChild(createNotFoundPage());
    pageContent.appendChild(createFooter());
    renderPageContent(pageContent);
    queuePageEntrance(pageContent);
    applySeoMetadata({
      path: pathname,
      title: "Página não encontrada | Nissan Portugal",
      description:
        "A página que procura não está disponível. Explore os modelos, campanhas e oportunidades Nissan a partir da navegação principal.",
    });
    return;
  }

  pushEvent("page_view", {
    page_type: pageConfig.pageType,
    page_model: pageConfig.pageModel,
    page_path: pathname,
    page_category: pageConfig.pageCategory,
  });

  const pageContent = document.createElement("div");
  pageContent.className = "page-wrapper";

  if (pathname === "/") {
    pageContent.appendChild(createHomePage());
  } else if (pathname === "/modelos/") {
    pageContent.appendChild(createModelsHubPage());
  } else {
    const main = document.createElement("main");
    const heroElement = createHero({
      ...pageConfig,
      transitionKey:
        navigationContext?.to === pathname
          ? navigationContext.transitionKey
          : null,
    });

    if (navigationContext?.transitionKey) {
      heroElement
        .querySelector("[data-hero-banner]")
        ?.style.setProperty(
          "view-transition-name",
          `card-banner-${navigationContext.transitionKey}`,
        );
      heroElement
        .querySelector("[data-hero-title]")
        ?.style.setProperty(
          "view-transition-name",
          `card-title-${navigationContext.transitionKey}`,
        );
    }

    main.appendChild(heroElement);
    main.appendChild(
      createLeadForm({
        pageConfig,
        pageMeta: {
          pageType: pageConfig.pageType,
          pageModel: pageConfig.pageModel,
        },
      }),
    );
    pageContent.appendChild(main);
  }

  const seoConfig = seoByStaticRoute[pathname] || {
    title: pageConfig.seoTitle || `${pageConfig.title} | Nissan Portugal`,
    description: pageConfig.seoDescription || pageConfig.subtitle,
  };

  applySeoMetadata({
    path: pathname,
    title: seoConfig.title,
    description: seoConfig.description,
  });

  pageContent.appendChild(createFooter());
  renderPageContent(pageContent);
  queuePageEntrance(pageContent);

  if (pathname !== "/" && pageConfig) {
    bindPageEvents(pageContent, pageConfig);
  }

  if (pathname === "/") {
    cleanupHomeSlideshow = setupHomeSlideshow();
  }

  if (navigationContext?.to === pathname) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

window.addEventListener("popstate", () => {
  setNavigationContext({
    from: null,
    to: normalizePath(window.location.pathname),
    source: "history",
    transitionKey: null,
  });

  startViewTransition(
    () => {
      render();
    },
    {
      afterTransition: flushPageEntrance,
    },
  );
});

window.addEventListener("app:navigate", (event) => {
  const { path, source, transitionKey } = event.detail ?? {};
  if (!path) {
    return;
  }

  navigate(path, {
    source: source || "programmatic",
    transitionKey: transitionKey ? toTransitionToken(transitionKey) : null,
  });
});

render();
flushPageEntrance();
