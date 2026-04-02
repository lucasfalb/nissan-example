<script lang="ts">
  import Hero from "$components/Hero.svelte";
  import LeadForm from "$components/LeadForm.svelte";
  import { getBannerUrl } from "$lib/model-banners";
  import type { PageDefinition } from "$lib/types";
  import {
    consumePendingNavigationContext,
    normalizeTransitionPath,
  } from "$lib/transitions";

  let { page, seo } = $props<{
    page: PageDefinition;
    seo: {
      title: string;
      description: string;
      canonicalUrl: string;
    };
  }>();

  const navigationContext = consumePendingNavigationContext();
  const canonicalPath = $derived(
    normalizeTransitionPath(new URL(seo.canonicalUrl).pathname),
  );
  const transitionKey = $derived(
    navigationContext?.to === canonicalPath
      ? navigationContext.transitionKey
      : null,
  );
  const heroBannerUrl = $derived(getBannerUrl(page.bannerKey));
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.canonicalUrl} />
  <link rel="preload" as="image" href={heroBannerUrl} />
</svelte:head>

<Hero
  title={page.title}
  eyebrow={page.eyebrow}
  subtitle={page.subtitle}
  bannerKey={page.bannerKey}
  ctas={page.ctas}
  transitionKey={transitionKey ?? undefined}
/>
<LeadForm {page} />
