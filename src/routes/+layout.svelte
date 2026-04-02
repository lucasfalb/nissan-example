<script lang="ts">
  import { onNavigate } from '$app/navigation';
  import './layout.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ExternalScripts from '$components/ExternalScripts.svelte';

  let { children, data } = $props();

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
</script>

<svelte:head>
  <link
    rel="icon"
    type="image/svg+xml"
    href="/assets/nissan.svg"
  />
  <meta name="description" content={data.site.description} />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-white text-neutral-950">
  <ExternalScripts />
  <div class="flex min-h-screen flex-col">
    <Header />
    <div class="page-wrapper flex-1">
      {@render children()}
    </div>
    <Footer />
  </div>
</div>
