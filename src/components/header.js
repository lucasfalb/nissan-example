import { pushEvent } from "../dataLayer.js";
import { getPublicAssetUrl } from "../lib/env.js";

const NAV_GROUPS = [
  {
    label: "Campanhas",
    items: [
      { label: "PopUp", path: "/popup/" },
      { label: "Happiniss Days", path: "/happiniss-days/" },
    ],
  },
  { label: "Modelos", path: "/modelos/" },
  {
    label: "Usados",
    align: "right",
    items: [
      { label: "Juke Usado", path: "/usados-juke/" },
      { label: "Qashqai Usado", path: "/usados-qashqai/" },
    ],
  },
];

const CLASSES = {
  topLink:
    "inline-flex min-h-12 items-center gap-2 px-3 text-[13px] font-medium uppercase tracking-[0.06em] text-neutral-700 transition hover:text-neutral-950 disabled:pointer-events-none",
  active: "bg-neutral-100 text-neutral-950",
  dropdownMenu:
    "nav-menu mt-2 grid min-w-[220px] gap-1 border border-neutral-200 bg-white p-3 shadow-[0_18px_40px_rgba(26,26,26,0.08)] md:absolute md:top-full",
  subLink:
    "block px-3 py-2 text-[13px] font-normal text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950",
};

let headerEventsController = null;

export function createHeader({ currentPath, navigate, pageMeta }) {
  headerEventsController?.abort();
  headerEventsController = new AbortController();

  const header = document.createElement("header");
  header.className =
    "sticky top-0 z-[9999] border-t-4 border-t-neutral-950 border-b border-b-neutral-200 bg-white/95 backdrop-blur";
  const logoSrc = getPublicAssetUrl("/assets/nissan.svg");

  const isActive = (path, items = []) =>
    currentPath === path || items.some((item) => item.path === currentPath);

  const trackHeaderClick = (link) => {
    pushEvent("header_click", {
      source_component: "header",
      source_label: link.dataset.navLabel || link.textContent?.trim() || "link",
      nav_group: link.dataset.navGroup || "primary",
      destination_path: link.getAttribute("href"),
      page_path: currentPath,
      page_type: pageMeta?.pageType || "unknown",
      page_model: pageMeta?.pageModel || null,
    });
  };

  const renderDesktopNavItems = () =>
    NAV_GROUPS.map((group) => {
      const activeClass = isActive(group.path, group.items)
        ? CLASSES.active
        : "";
      const dropdownAlignmentClass =
        group.align === "right" ? "md:right-0 md:left-auto" : "md:left-0";

      if (group.path) {
        return `<a href="${group.path}" class="${CLASSES.topLink} ${activeClass}" data-link data-nav-group="primary" data-nav-label="${group.label}">${group.label}</a>`;
      }

      return `
        <details class="nav-group relative w-full md:w-auto">
          <summary class="${CLASSES.topLink} ${activeClass} list-none cursor-pointer justify-between md:justify-start">
            <span>${group.label}</span>
            <svg class="nav-caret h-6 w-6 shrink-0 opacity-60 transition-transform duration-200 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="${CLASSES.dropdownMenu} ${dropdownAlignmentClass}">
            ${group.items
              .map(
                (item) => `
                  <a href="${item.path}" class="${CLASSES.subLink} ${currentPath === item.path ? "bg-neutral-100 text-neutral-950" : ""}" data-link data-nav-group="${group.label}" data-nav-label="${item.label}">
                    ${item.label}
                  </a>
                `,
              )
              .join("")}
          </div>
        </details>
      `;
    }).join("");

  const renderMobileNavItems = () =>
    NAV_GROUPS.map((group) => {
      const activeClass = isActive(group.path, group.items)
        ? "border-neutral-950 bg-neutral-950 text-white"
        : "border-neutral-200 bg-white text-neutral-950";

      if (group.path) {
        return `
          <a href="${group.path}" class="mobile-nav-link ${activeClass}" data-link data-nav-group="primary" data-nav-label="${group.label}">
            <span>${group.label}</span>
            <span class="mobile-nav-link__meta">Explorar</span>
          </a>
        `;
      }

      return `
        <details class="mobile-nav-group rounded-[22px] border border-neutral-200 bg-white font-normal">
          <summary class="mobile-nav-summary list-none cursor-pointer">
            <span class="mobile-nav-summary__label font-normal">${group.label}</span>
            <svg class="nav-caret h-10 w-10 shrink-0 opacity-60 transition-transform duration-200 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="mobile-nav-group__body">
            ${group.items
              .map(
                (item) => `
                  <a href="${item.path}" class="mobile-nav-sublink font-normal ${currentPath === item.path ? "is-active" : ""}" data-link data-nav-group="${group.label}" data-nav-label="${item.label}">
                    ${item.label}
                  </a>
                `,
              )
              .join("")}
          </div>
        </details>
      `;
    }).join("");

  header.innerHTML = `
    <div class="mx-auto flex min-h-[55px] w-[min(95%,1170px)] items-center justify-between gap-6 md:min-h-[88px]">
      <a href="/" class="inline-flex items-center" aria-label="Nissan - Página inicial" data-link data-nav-group="brand" data-nav-label="Logo Nissan">
        <img src="${logoSrc}" alt="Nissan" class="h-6 w-auto sm:h-8">
      </a>

      <nav class="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
        ${renderDesktopNavItems()}
      </nav>

      <button
        class="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-neutral-950 md:hidden"
        type="button"
        id="mobile-menu-trigger"
        aria-expanded="false"
        aria-controls="mobile-nav-shell"
      >
        <span>Menu</span>
        <div class="flex w-4 flex-col gap-1">
          <span class="h-0.5 w-full bg-current"></span>
          <span class="h-0.5 w-full bg-current"></span>
        </div>
      </button>
    </div>

    <div
      id="mobile-nav-shell"
      class="invisible fixed inset-0 z-[120] min-h-[100dvh] transition-all duration-300 md:hidden"
    >
      <div class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300" data-mobile-close></div>

      <div
        class="absolute right-0 top-0 flex h-full w-[300px] translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        id="mobile-nav-panel"
      >
        <div class="flex items-center justify-between border-b p-6">
          <span class="font-bold uppercase tracking-tighter">Menu</span>
          <button class="p-2 text-[40px]" type="button" data-mobile-close aria-label="Fechar menu">&times;</button>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto p-6">
          ${renderMobileNavItems()}
        </div>
      </div>
    </div>
  `;

  const trigger = header.querySelector("#mobile-menu-trigger");
  const shell = header.querySelector("#mobile-nav-shell");
  const panel = header.querySelector("#mobile-nav-panel");
  const desktopMenus = Array.from(header.querySelectorAll(".nav-group"));

  const closeDesktopMenus = () => {
    desktopMenus.forEach((menu) => {
      menu.removeAttribute("open");
    });
  };

  const openMobileMenu = () => {
    if (!(shell instanceof HTMLElement) || !(panel instanceof HTMLElement)) {
      return;
    }

    shell.classList.remove("invisible");
    trigger?.setAttribute("aria-expanded", "true");

    setTimeout(() => {
      shell
        .querySelector(".bg-black\\/50")
        ?.classList.replace("opacity-0", "opacity-100");
      panel.classList.remove("translate-x-full");
    }, 10);

    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    if (
      !(shell instanceof HTMLElement) ||
      !(panel instanceof HTMLElement) ||
      shell.classList.contains("invisible")
    ) {
      return;
    }

    panel.classList.add("translate-x-full");
    shell
      .querySelector(".bg-black\\/50")
      ?.classList.replace("opacity-100", "opacity-0");
    trigger?.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      shell.classList.add("invisible");
      document.body.style.overflow = "";
    }, 300);
  };

  trigger?.addEventListener("click", () => {
    if (shell?.classList.contains("invisible")) {
      openMobileMenu();
      return;
    }

    closeMobileMenu();
  });

  header.querySelectorAll("[data-mobile-close]").forEach((element) => {
    element.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!header.contains(event.target)) {
        closeDesktopMenus();
        closeMobileMenu();
      }
    },
    { signal: headerEventsController.signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      closeDesktopMenus();
      closeMobileMenu();
    },
    { signal: headerEventsController.signal },
  );

  header.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");
    if (!(link instanceof HTMLAnchorElement)) {
      return;
    }

    event.preventDefault();
    trackHeaderClick(link);
    closeDesktopMenus();
    closeMobileMenu();
    navigate(link.getAttribute("href"), { source: "header" });
  });

  return header;
}
