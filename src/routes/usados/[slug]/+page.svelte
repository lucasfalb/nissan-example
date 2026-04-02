<script lang="ts">
  import DetailLanding from '$components/DetailLanding.svelte';

  let { data } = $props();
</script>

<DetailLanding page={data.page} seo={data.seo} />
