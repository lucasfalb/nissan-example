import { pushEvent } from "../dataLayer.js";
import { isViewTransitionRunning } from "../lib/view-transitions.js";
import { getBannerUrl, HOME_SLIDES } from "../model-banners.js";

const DRAG_CLICK_THRESHOLD = 10;

export function createHomeSlideshow() {
  return `
    <section class="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen" aria-roledescription="carousel" aria-label="Destaques Nissan">
      <div
        id="home-slideshow-container"
        class="group relative overflow-hidden border-y border-neutral-200 bg-neutral-100 select-none"
        style="touch-action: pan-y;"
      >
        <a id="home-slideshow-link" href="#" class="block" data-link draggable="false">
          <div class="relative min-h-[360px] overflow-hidden md:min-h-[32vw] md:max-h-[560px]">
            <div id="home-slideshow-track" class="absolute inset-0 transition-transform duration-300 ease-out">
              <div id="home-slideshow-layer-a" class="absolute inset-0 scale-[1.02] bg-cover bg-center opacity-100 transition-[opacity,transform] duration-700 ease-out"></div>
              <div id="home-slideshow-layer-b" class="absolute inset-0 scale-105 bg-cover bg-center opacity-0 transition-[opacity,transform] duration-700 ease-out"></div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/45 via-black/18 to-transparent"></div>
          </div>

          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-6 py-8 text-white md:px-10 md:py-10">
            <div class="mx-auto mb-5 w-[min(95.9%,1170px)]">
              <p id="home-slideshow-eyebrow" class="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"></p>
              <h2 id="home-slideshow-title" class="text-[32px] font-bold uppercase leading-tight tracking-tight md:text-[40px]"></h2>
            </div>
          </div>
        </a>

        <div class="pointer-events-none absolute bottom-8 left-0 right-0 z-20 px-6 md:px-10">
          <div class="mx-auto w-[min(95.9%,1170px)]">
            <div id="home-slideshow-dots" class="pointer-events-auto flex flex-wrap gap-2" role="tablist"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function setupHomeSlideshow() {
  const container = document.querySelector("#home-slideshow-container");
  const link = document.querySelector("#home-slideshow-link");
  const track = document.querySelector("#home-slideshow-track");
  const layerA = document.querySelector("#home-slideshow-layer-a");
  const layerB = document.querySelector("#home-slideshow-layer-b");
  const title = document.querySelector("#home-slideshow-title");
  const eyebrow = document.querySelector("#home-slideshow-eyebrow");
  const dotsContainer = document.querySelector("#home-slideshow-dots");

  if (
    !container ||
    !link ||
    !track ||
    !layerA ||
    !layerB ||
    !title ||
    !eyebrow ||
    !dotsContainer ||
    HOME_SLIDES.length === 0
  ) {
    return () => {};
  }

  const slides = HOME_SLIDES.filter((slide) => getBannerUrl(slide.bannerKey));
  const activeSlides = slides.length > 0 ? slides : HOME_SLIDES;
  const slideDuration = 5000;
  const swipeThreshold = 60;

  let currentIndex = 0;
  let activeLayer = "a";
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let activePointerId = null;
  let didDrag = false;
  let suppressNextClick = false;
  let intervalId = null;
  let lastInteractionType = "initial";

  function getSlideTrackingPayload(slide, extra = {}) {
    return {
      source_component: "slideshow",
      page_path: window.location.pathname,
      slide_index: currentIndex,
      slide_title: slide.title,
      banner_key: slide.bannerKey,
      destination_path: slide.path,
      ...extra,
    };
  }

  function renderDots() {
    dotsContainer.innerHTML = activeSlides
      .map(
        (_, index) => `
          <button
            type="button"
            role="tab"
            aria-selected="${index === currentIndex}"
            data-index="${index}"
            class="h-2 border transition-all duration-300 ${index === currentIndex ? "w-10 border-white bg-white" : "w-6 border-white/45 bg-white/25 hover:border-white/70 hover:bg-white/40"}"
            aria-label="Slide ${index + 1}"
          ></button>
        `,
      )
      .join("");
  }

  function applyLayerBackground(layer, bannerUrl) {
    layer.style.backgroundImage = bannerUrl
      ? `linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08)), url("${bannerUrl}")`
      : "linear-gradient(180deg, #f5f5f5, #ebebeb)";
  }

  function syncContent(slide) {
    title.textContent = slide.title;
    eyebrow.textContent = slide.eyebrow;
    link.setAttribute("href", slide.path);
    link.dataset.transitionSource = "slideshow";
    link.dataset.transitionKey = slide.path;
    renderDots();
  }

  function updateSlide(index, { force = false, interactionType = null } = {}) {
    if (!force && isViewTransitionRunning()) {
      return;
    }

    const previousIndex = currentIndex;
    currentIndex = index;
    const slide = activeSlides[index];
    const bannerUrl = getBannerUrl(slide.bannerKey);
    const incomingLayer = activeLayer === "a" ? layerB : layerA;
    const outgoingLayer = activeLayer === "a" ? layerA : layerB;

    applyLayerBackground(incomingLayer, bannerUrl);
    incomingLayer.style.zIndex = "2";
    outgoingLayer.style.zIndex = "1";
    incomingLayer.classList.remove("opacity-0", "scale-105");
    incomingLayer.classList.add("opacity-100", "scale-[1.02]");
    outgoingLayer.classList.remove("opacity-100", "scale-[1.02]");
    outgoingLayer.classList.add("opacity-0", "scale-105");
    track.style.transform = "translate3d(0,0,0)";

    syncContent(slide);
    activeLayer = activeLayer === "a" ? "b" : "a";

    if (!force && interactionType) {
      pushEvent(
        interactionType === "auto"
          ? "slideshow_auto_change"
          : "slideshow_slide_change",
        getSlideTrackingPayload(slide, {
          interaction_type: interactionType,
          slide_index_from: previousIndex,
          slide_index_to: index,
        }),
      );
    }
  }

  function nextSlide() {
    updateSlide((currentIndex + 1) % activeSlides.length, {
      interactionType: lastInteractionType,
    });
  }

  function previousSlide() {
    updateSlide(
      (currentIndex - 1 + activeSlides.length) % activeSlides.length,
      {
        interactionType: lastInteractionType,
      },
    );
  }

  function resetTimer() {
    if (intervalId) {
      window.clearInterval(intervalId);
    }

    intervalId = window.setInterval(() => {
      if (isViewTransitionRunning()) {
        return;
      }

      lastInteractionType = "auto";
      nextSlide();
    }, slideDuration);
  }

  function navigateToSlide() {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const slide = activeSlides[currentIndex];
    pushEvent(
      "slideshow_click",
      getSlideTrackingPayload(slide, {
        interaction_type: "click",
      }),
    );

    window.dispatchEvent(
      new CustomEvent("app:navigate", {
        detail: {
          path: href,
          source: link.dataset.transitionSource || "slideshow",
          transitionKey: link.dataset.transitionKey || href,
        },
      }),
    );
  }

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (event.target.closest("#home-slideshow-dots")) {
      return;
    }

    isDragging = true;
    activePointerId = event.pointerId;
    didDrag = false;
    startX = event.clientX;
    currentX = event.clientX;
    container.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    currentX = event.clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD) {
      didDrag = true;
    }
  }

  function finishDrag() {
    isDragging = false;
    activePointerId = null;
    track.style.transform = "translate3d(0,0,0)";
  }

  function onPointerUp(event) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    currentX = event.clientX;
    const deltaX = currentX - startX;
    finishDrag();

    if (Math.abs(deltaX) > swipeThreshold) {
      suppressNextClick = true;
      lastInteractionType = "swipe";
      deltaX < 0 ? nextSlide() : previousSlide();
      pushEvent(
        "slideshow_swipe",
        getSlideTrackingPayload(activeSlides[currentIndex], {
          interaction_type: "swipe",
          direction: deltaX < 0 ? "next" : "previous",
        }),
      );
      resetTimer();
      return;
    }

    if (Math.abs(deltaX) <= DRAG_CLICK_THRESHOLD) {
      suppressNextClick = true;
      navigateToSlide();
    }
  }

  function onPointerCancel(event) {
    if (!isDragging || event.pointerId !== activePointerId) {
      return;
    }

    finishDrag();
    didDrag = false;
  }

  function onDotClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const button = event.target.closest("[data-index]");
    if (!(button instanceof HTMLButtonElement) || isViewTransitionRunning()) {
      return;
    }

    const nextIndex = Number(button.dataset.index);
    lastInteractionType = "dot";
    updateSlide(nextIndex, { interactionType: "dot" });
    pushEvent(
      "slideshow_dot_click",
      getSlideTrackingPayload(activeSlides[nextIndex], {
        interaction_type: "dot",
        slide_index_to: nextIndex,
      }),
    );
    resetTimer();
  }

  function onDotsPointerDown(event) {
    event.stopPropagation();
  }

  function onLinkClick(event) {
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
    event.stopPropagation();
    navigateToSlide();
  }

  function onContainerClick() {
    didDrag = false;
  }

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerCancel);
  container.addEventListener("click", onContainerClick);
  link.addEventListener("click", onLinkClick, { capture: true });
  dotsContainer.addEventListener("pointerdown", onDotsPointerDown);
  dotsContainer.addEventListener("click", onDotClick);

  updateSlide(0, { force: true });
  resetTimer();

  return () => {
    if (intervalId) {
      window.clearInterval(intervalId);
    }

    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerUp);
    container.removeEventListener("pointercancel", onPointerCancel);
    container.removeEventListener("click", onContainerClick);
    link.removeEventListener("click", onLinkClick, true);
    dotsContainer.removeEventListener("pointerdown", onDotsPointerDown);
    dotsContainer.removeEventListener("click", onDotClick);
  };
}
