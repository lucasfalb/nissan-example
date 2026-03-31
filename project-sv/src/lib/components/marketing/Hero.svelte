<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import type { BannerKey } from "$lib/types/content";
  import BannerFrame from "$lib/components/marketing/BannerFrame.svelte";
  import { getRouteMeta } from "$lib/utils/route-meta";
  import { pushEvent } from "$lib/utils/tracking";

  let {
    title,
    eyebrow,
    subtitle,
    bannerKey,
    ctas,
    transitionKey = undefined as string | undefined,
  } = $props<{
    title: string;
    eyebrow: string;
    subtitle: string;
    bannerKey: BannerKey;
    ctas: { primary: string; secondary: string };
    transitionKey?: string;
  }>();

  let heroTitleElement: HTMLHeadingElement | undefined;

  function trackHeroCtaClick(sourceLabel: string, ctaType: string) {
    pushEvent("cta_click", {
      ...getRouteMeta(page.url.pathname),
      source_component: "hero",
      source_label: sourceLabel,
      cta_type: ctaType,
      destination_path: "#lead-form",
    });

    if (typeof window !== "undefined") {
      const mappedInterestType =
        ctaType === "test_drive"
          ? "test_drive"
          : ctaType === "catalog"
            ? "more_info"
            : "";

      window.dispatchEvent(
        new CustomEvent("app:lead-interest", {
          detail: { interestType: mappedInterestType },
        }),
      );
    }
  }

  onMount(() => {
    if (!transitionKey) {
      return;
    }

    if (heroTitleElement) {
      heroTitleElement.style.viewTransitionName = `card-title-${transitionKey}`;
    }
  });
</script>

<section class="relative w-full overflow-x-hidden pb-16 md:pb-14">
  <div
    class="relative flex min-h-[420px] w-full bg-neutral-950 md:min-h-[500px]"
  >
    <div class="absolute inset-0 z-0" data-hero-banner>
      <BannerFrame
        {bannerKey}
        {title}
        className="h-full w-full object-cover border-0"
        fallbackLabel="Imagem não configurada"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent md:bg-gradient-to-r md:from-neutral-950/90 md:via-neutral-950/50 md:to-transparent"
      ></div>
    </div>

    <div
      class="relative z-10 mx-auto mb-0 mt-auto h-full w-[min(95.9%,1170px)] px-1 pb-24 pt-12 md:mb-8 md:px-0 md:py-24"
    >
      <div class="flex h-full flex-col justify-end pb-3 sm:pb-0">
        <p
          data-hero-stage="eyebrow"
          class="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-[11px] md:font-bold md:tracking-[0.2em]"
        >
          {eyebrow}
        </p>

        <h1
          bind:this={heroTitleElement}
          data-hero-title
          class="text-balance text-[3.8rem] font-light uppercase leading-[0.9] tracking-[-0.04em] text-white md:max-w-none md:text-7xl md:tracking-tighter lg:text-8xl"
        >
          {title}
        </h1>

        <p
          data-hero-stage="subtitle"
          class="mt-4 inline-block max-w-[58ch] rounded-[16px] text-[14px] leading-[1.55] text-white md:text-[17px] md:leading-[1.65]"
        >
          {subtitle}
        </p>

        <div
          data-hero-stage="ctas"
          class="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8"
        >
          <a
            href="#lead-form"
            onclick={() => trackHeroCtaClick(ctas.primary, "test_drive")}
            class="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e3e2e2] md:min-h-12 md:px-8 md:text-[13px] md:font-bold md:tracking-wider"
          >
            {ctas.primary}
          </a>
          <a
            href="#lead-form"
            onclick={() => trackHeroCtaClick(ctas.secondary, "catalog")}
            class="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-[12px] font-medium! uppercase tracking-[0.08em] text-white! backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20 md:min-h-12 md:px-8 md:text-[13px] md:font-bold md:tracking-wider"
          >
            {ctas.secondary}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
