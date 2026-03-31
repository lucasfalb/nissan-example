<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import TrackingManager from '$lib/components/system/TrackingManager.svelte';

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="description" content={data.site.description} />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-white text-neutral-950">
  <TrackingManager />
  <div class="flex min-h-screen flex-col">
    <Header />
    {@render children()}
    <Footer />
  </div>
</div>
