<script lang="ts">
  import { onMount } from 'svelte';
  import { initCookieScript } from '$lib/tracking';

  const COOKIE_SCRIPT_SRC =
    'https://cookies.rigorcg.pt/script/?token=fIZoaeu9lOxnf7x3DWdQXRqv';

  onMount(() => {
    initCookieScript(COOKIE_SCRIPT_SRC);
  });
</script>
