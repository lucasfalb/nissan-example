import { createBannerMarkup } from "./banner.js";

export function createFeaturedCard(card) {
  const transitionKey = card.transitionKey || card.path;
  const cardCategory = card.category || "model";
  const cardSection = card.section || "listing";

  return `
    <a
      class="featured-card group block"
      href="${card.path}"
      data-link
      data-transition-source="card"
      data-transition-key="${transitionKey}"
      data-track-event="model_card_click"
      data-source-component="model_card"
      data-card-title="${card.title}"
      data-card-category="${cardCategory}"
      data-card-section="${cardSection}"
      data-banner-key="${card.bannerKey || ""}"
    >
      <div class="featured-card__visual">
        ${createBannerMarkup({
          bannerKey: card.bannerKey,
          title: card.title,
          className: "min-h-[260px]",
          attributes: 'data-transition-part="card-banner"',
          fallbackLabel: "Cole o URL do banner deste modelo",
        })}
      </div>
      <div class="featured-card__body pt-4">
        <span class="featured-card__eyebrow mb-2 block text-[11px] uppercase tracking-[0.09rem] text-neutral-500">Descubra o modelo</span>
        <h3 class="featured-card__title mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950" data-transition-part="card-title">${card.title}</h3>
        <p class="featured-card__description text-[14px] leading-[1.6] text-neutral-600">${card.description}</p>
      </div>
    </a>
  `;
}
