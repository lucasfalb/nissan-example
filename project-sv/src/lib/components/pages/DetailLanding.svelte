<script lang="ts">
  import LeadForm from "$lib/components/forms/LeadForm.svelte";
  import Hero from "$lib/components/marketing/Hero.svelte";
  import type { PageDefinition } from "$lib/types/content";

  let { page, seo } = $props<{
    page: PageDefinition;
    seo: {
      title: string;
      description: string;
      canonicalUrl: string;
    };
  }>();
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.canonicalUrl} />
</svelte:head>

<Hero
  title={page.title}
  eyebrow={page.eyebrow}
  subtitle={page.subtitle}
  bannerKey={page.bannerKey}
  ctas={page.ctas}
/>
<LeadForm {page} />
