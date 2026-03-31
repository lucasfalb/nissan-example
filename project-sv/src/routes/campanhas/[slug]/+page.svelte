<script lang="ts">
  import DetailLanding from '$lib/components/pages/DetailLanding.svelte';

  let { data } = $props();
</script>

<DetailLanding page={data.page} seo={data.seo} />
