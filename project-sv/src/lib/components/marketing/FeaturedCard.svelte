<script lang="ts">
  import { page } from "$app/state";
  import type { BannerKey } from "$lib/types/content";
  import BannerFrame from "$lib/components/marketing/BannerFrame.svelte";
  import { getRouteMeta } from "$lib/utils/route-meta";
  import { pushEvent } from "$lib/utils/tracking";

  let { card } = $props<{
    card: {
      title: string;
      description: string;
      path: string;
      bannerKey: BannerKey;
      eyebrow?: string;
      transitionKey?: string;
      category?: string;
      section?: string;
      position?: number;
    };
  }>();

  function trackCardClick() {
    pushEvent("model_card_click", {
      ...getRouteMeta(page.url.pathname),
      destination_path: card.path,
      source_component: "model_card",
      card_title: card.title,
      card_category: card.category ?? "model",
      card_section: card.section ?? "listing",
      card_position: card.position ?? null,
      banner_key: card.bannerKey,
    });
  }
</script>

<a class="featured-card group block" href={card.path} onclick={trackCardClick}>
  <div class="featured-card__visual">
    <BannerFrame
      bannerKey={card.bannerKey}
      title={card.title}
      className="min-h-[180px] sm:min-h-[260px]"
      transitionName={card.transitionKey
        ? `card-banner-${card.transitionKey}`
        : undefined}
      fallbackLabel="Cole o URL do banner deste modelo"
    />
  </div>
  <div class="featured-card__body pt-4">
    <span
      class="featured-card__eyebrow mb-2 block text-[11px] uppercase tracking-[0.09rem] text-neutral-500"
    >
      {card.eyebrow ?? "Descubra o modelo"}
    </span>
    <h3
      class="featured-card__title mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950"
      style:view-transition-name={card.transitionKey
        ? `card-title-${card.transitionKey}`
        : undefined}
    >
      {card.title}
    </h3>
    <p
      class="featured-card__description text-[14px] leading-[1.6] text-neutral-600"
    >
      {card.description}
    </p>
  </div>
</a>
