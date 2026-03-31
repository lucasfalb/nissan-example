<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { initGoogleTagManager } from '$lib/utils/gtm';
  import { getRouteMeta } from '$lib/utils/route-meta';
  import { pushEvent } from '$lib/utils/tracking';

  function trackPageView(pathname: string) {
    pushEvent('page_view', getRouteMeta(pathname));
  }

  onMount(() => {
    initGoogleTagManager(import.meta.env.PUBLIC_GTM_ID);
    trackPageView(window.location.pathname);

    return afterNavigate(({ to }) => {
      if (to?.url.pathname) {
        trackPageView(to.url.pathname);
      }
    });
  });
</script>
