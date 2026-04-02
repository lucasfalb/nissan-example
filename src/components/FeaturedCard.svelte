<script lang="ts">
  import { page } from "$app/state";
  import BannerFrame from "$components/BannerFrame.svelte";
  import type { BannerKey } from "$lib/types";
  import { pushLinkEvent } from "$lib/tracking";
  import {
    setPendingNavigationContext,
    toTransitionToken,
  } from "$lib/transitions";

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

  function primeCardTransition(link: HTMLAnchorElement) {
    const transitionKey = toTransitionToken(card.transitionKey ?? card.path);

    const title = link.querySelector('[data-transition-part="card-title"]');

    if (title instanceof HTMLElement) {
      title.style.viewTransitionName = `card-title-${transitionKey}`;
    }
  }

  function trackCardClick(event: MouseEvent) {
    const link = event.currentTarget;
    if (link instanceof HTMLAnchorElement) {
      primeCardTransition(link);
    }

    setPendingNavigationContext({
      from: page.url.pathname,
      to: card.path,
      source: 'card',
      transitionKey: card.transitionKey ?? card.path
    });

    pushLinkEvent({
      page: page.url.pathname,
      destination: card.path,
      title: card.title,
      position: card.position ?? null,
    });
  }
</script>

<a class="featured-card group block" href={card.path} onclick={trackCardClick}>
  <div class="featured-card__visual">
    <BannerFrame
      bannerKey={card.bannerKey}
      title={card.title}
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      className="min-h-[180px] sm:min-h-[260px]"
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
      data-transition-part="card-title"
      class="featured-card__title mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950"
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
