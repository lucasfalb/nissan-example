import { createBannerMarkup } from "./banner.js";

const renderHighlights = (highlights = []) => {
  return highlights
    .slice(0, 3)
    .map(
      (item) => `
      <span class="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
        ${item}
      </span>
    `,
    )
    .join("");
};

export function createHero(pageConfig) {
  const { title, eyebrow, subtitle, ctas, bannerKey, transitionKey } =
    pageConfig;

  const bannerTransitionName = transitionKey
    ? `card-banner-${transitionKey}`
    : "";
  const titleTransitionName = transitionKey
    ? `card-title-${transitionKey}`
    : "";

  const section = document.createElement("section");
  section.className = "relative w-full overflow-x-hidden pb-16 md:pb-14";

  section.innerHTML = `
    <div class="relative flex w-full bg-neutral-950 min-h-[420px] md:min-h-[500px]">
      <div class="absolute inset-0 z-0">
        ${createBannerMarkup({
          bannerKey,
          title,
          className: "h-full w-full object-cover border-0",
          fallbackLabel: "Imagem não configurada",
        })}
<div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent md:bg-gradient-to-r md:from-neutral-950/90 md:via-neutral-950/50 md:to-transparent"></div>
      </div>

      <div class="relative z-10 mx-auto mb-0 mt-auto h-full w-[min(95.9%,1170px)] px-1 pb-24 pt-12 md:mb-8 md:px-0 md:py-24">
        <div class="pb-3 sm:pb-0 flex h-full flex-col justify-end">
          <p class="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60 md:mb-4 md:text-[11px] md:font-bold md:tracking-[0.2em]" data-hero-stage="eyebrow">
            ${eyebrow}
          </p>

          <h1 class="text-balance text-[3.8rem] font-light uppercase leading-[0.9] tracking-[-0.04em] text-white md:max-w-none md:text-7xl md:tracking-tighter lg:text-8xl" data-hero-title ${titleTransitionName ? `style="view-transition-name:${titleTransitionName}"` : ""}>
            ${title}
          </h1>

          <p class="mt-4 inline-block max-w-[58ch] rounded-[16px] bg-neutral-950/48 px-3 py-2 text-[14px] leading-[1.55] text-white md:mt-6 md:px-4 md:py-3 md:text-[17px] md:leading-[1.65]" data-hero-stage="subtitle">
            ${subtitle}
          </p>

          <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8" data-hero-stage="ctas">
            <button id="btn-test-drive" class="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e3e2e2] md:min-h-12 md:px-8 md:text-[13px] md:font-bold md:tracking-wider">
              ${ctas.primary}
            </button>
            <button id="btn-download-catalog" class=" min-h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-[12px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20 inline-flex md:min-h-12 md:px-8 md:text-[13px] md:font-bold md:tracking-wider">
              ${ctas.secondary}
            </button>
          </div>

         
        </div>
      </div>
    </div>
  `;

  return section;
}
