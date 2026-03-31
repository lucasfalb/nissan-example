<script lang="ts">
  import SectionHeader from '$lib/components/marketing/SectionHeader.svelte';
  import FeaturedCard from '$lib/components/marketing/FeaturedCard.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.seo.title}</title>
  <meta name="description" content={data.seo.description} />
  <link rel="canonical" href={data.seo.canonicalUrl} />
</svelte:head>

<section class="px-0 py-12 md:py-16">
  <div class="mx-auto w-[min(95.9%,1170px)]">
    <SectionHeader eyebrow="Modelos" title="Todos os Modelos Nissan" lead="Explore a gama completa de modelos novos e descubra qual Nissan se adapta melhor ao seu dia a dia." />
    <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {#each data.cards as card}
        <FeaturedCard {card} />
      {/each}
    </div>
  </div>
</section>
