<script lang="ts">
  import { PUBLIC_GTM_ID } from '$env/static/public';
  import { onMount } from 'svelte';
  import { initGoogleTagManager } from '$lib/utils/gtm';

  onMount(() => {
    initGoogleTagManager(PUBLIC_GTM_ID);
  });
</script>
