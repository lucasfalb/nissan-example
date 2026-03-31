<script lang="ts">
  import { afterNavigate, onNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import TrackingManager from '$lib/components/system/TrackingManager.svelte';

  let { children, data } = $props();
  let pageWrapperElement: HTMLDivElement | undefined;

  function activatePageEntrance() {
    if (!pageWrapperElement) {
      return;
    }

    pageWrapperElement.classList.remove('is-ready');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pageWrapperElement?.classList.add('is-ready');
      });
    });
  }

  onNavigate((navigation) => {
    if (typeof document === 'undefined' || typeof document.startViewTransition !== 'function') {
      return;
    }

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  onMount(() => {
    activatePageEntrance();
  });

  afterNavigate(() => {
    activatePageEntrance();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="description" content={data.site.description} />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-white text-neutral-950">
  <TrackingManager />
  <div class="flex min-h-screen flex-col">
    <Header />
    <div bind:this={pageWrapperElement} class="page-wrapper flex-1">
      {@render children()}
    </div>
    <Footer />
  </div>
</div>
