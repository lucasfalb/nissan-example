<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getBannerUrl } from "$lib/content/model-banners";
  import type { HomeSlide } from "$lib/types/content";
  import { setPendingNavigationContext } from '$lib/utils/view-transition-context';

  const DRAG_CLICK_THRESHOLD = 10;
  const slideDuration = 5000;
  const swipeThreshold = 60;

  let { slides } = $props<{ slides: HomeSlide[] }>();

  let currentIndex = $state(0);
  let activeLayer: "a" | "b" = $state("a");
  let layerAStyle = $state("");
  let layerBStyle = $state("");
  let intervalId: number | undefined;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let didDrag = false;
  let suppressNextClick = false;
  let activePointerId: number | null = null;
  let linkElement: HTMLAnchorElement | undefined;

  const activeSlides = $derived(
    slides.filter((slide: HomeSlide) => Boolean(getBannerUrl(slide.bannerKey))),
  );
  const currentSlide = $derived(activeSlides[currentIndex]);

  function buildLayerStyle(bannerUrl: string) {
    return `background-image:linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08)), url("${bannerUrl}");`;
  }

  function applyCurrentSlide(index: number, force = false) {
    const slide = activeSlides[index];
    if (!slide) {
      return;
    }

    currentIndex = index;
    const nextStyle = buildLayerStyle(getBannerUrl(slide.bannerKey));

    if (force || activeLayer === "b") {
      layerAStyle = nextStyle;
      activeLayer = "a";
      return;
    }

    layerBStyle = nextStyle;
    activeLayer = "b";
  }

  function nextSlide() {
    applyCurrentSlide((currentIndex + 1) % activeSlides.length);
  }

  function previousSlide() {
    applyCurrentSlide(
      (currentIndex - 1 + activeSlides.length) % activeSlides.length,
    );
  }

  function resetTimer() {
    if (!browser) {
      return;
    }

    if (intervalId) {
      window.clearInterval(intervalId);
    }

    intervalId = window.setInterval(() => {
      nextSlide();
    }, slideDuration);
  }

  async function navigateToSlide() {
    if (!currentSlide) {
      return;
    }

    setPendingNavigationContext({
      from: window.location.pathname,
      to: currentSlide.path,
      source: 'card',
      transitionKey: currentSlide.path
    });

    await goto(currentSlide.path);
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    isDragging = true;
    activePointerId = event.pointerId;
    didDrag = false;
    startX = event.clientX;
    currentX = event.clientX;
    linkElement?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    currentX = event.clientX;

    if (Math.abs(currentX - startX) > DRAG_CLICK_THRESHOLD) {
      didDrag = true;
    }
  }

  function finishDrag() {
    isDragging = false;
    activePointerId = null;
  }

  function onPointerUp(event: PointerEvent) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    currentX = event.clientX;
    const deltaX = currentX - startX;
    finishDrag();

    if (Math.abs(deltaX) > swipeThreshold) {
      suppressNextClick = true;
      deltaX < 0 ? nextSlide() : previousSlide();
      resetTimer();
      return;
    }

    if (Math.abs(deltaX) <= DRAG_CLICK_THRESHOLD) {
      suppressNextClick = true;
      void navigateToSlide();
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    finishDrag();
    didDrag = false;
  }

  async function onLinkClick(event: MouseEvent) {
    if (suppressNextClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressNextClick = false;
      didDrag = false;
      return;
    }

    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
      return;
    }

    event.preventDefault();
    await navigateToSlide();
  }

  function onDotClick(index: number) {
    applyCurrentSlide(index);
    resetTimer();
  }

  onMount(() => {
    if (activeSlides.length === 0) {
      return;
    }

    applyCurrentSlide(0, true);
    resetTimer();

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  });
</script>

<section
  class="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen"
  aria-roledescription="carousel"
  aria-label="Destaques Nissan"
>
  <div
    class="group relative overflow-hidden border-y border-neutral-200 bg-neutral-100 select-none"
  >
    <a
      bind:this={linkElement}
      href={currentSlide?.path ?? "#"}
      class="block"
      draggable="false"
      style="touch-action: pan-y;"
      onclick={onLinkClick}
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointercancel={onPointerCancel}
    >
      <div
        class="relative min-h-90 overflow-hidden md:min-h-[32vw] md:max-h-140"
      >
        <div
          class="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <div
            class={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-700 ease-out ${activeLayer === "a" ? "z-2 scale-[1.02] opacity-100" : "z-1 scale-105 opacity-0"}`}
            style={layerAStyle}
          ></div>
          <div
            class={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-700 ease-out ${activeLayer === "b" ? "z-2 scale-[1.02] opacity-100" : "z-1 scale-105 opacity-0"}`}
            style={layerBStyle}
          ></div>
        </div>
        <div
          class="absolute inset-0 bg-linear-to-r from-black/45 via-black/18 to-transparent"
        ></div>
      </div>

      <div
        class="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/35 to-transparent px-2 py-8 text-white md:px-10 md:py-10"
      >
        <div class="mx-auto mb-5 w-[min(95.9%,1170px)]">
          <p
            class="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"
          >
            {currentSlide?.eyebrow}
          </p>
          <h2
            class="text-[32px] font-bold uppercase leading-tight tracking-tight md:text-[40px]"
          >
            {currentSlide?.title}
          </h2>
        </div>
      </div>
    </a>

    <div
      class="pointer-events-none absolute bottom-8 left-0 right-0 z-20 px-2 md:px-10"
    >
      <div class="mx-auto w-[min(95.9%,1170px)]">
        <div class="pointer-events-auto flex flex-wrap gap-2" role="tablist">
          {#each activeSlides as slide, index}
            <button
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              class={`h-2 border transition-all duration-300 ${index === currentIndex ? "w-10 border-white bg-white" : "w-6 border-white/45 bg-white/25 hover:border-white/70 hover:bg-white/40"}`}
              aria-label={`Slide ${index + 1}`}
              onclick={() => onDotClick(index)}
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
