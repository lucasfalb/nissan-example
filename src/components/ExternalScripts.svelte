<script lang="ts">
  import { onMount } from "svelte";

  const COOKIE_SCRIPT_SRC =
    "https://cookies.rigorcg.pt/script/?token=fIZoaeu9lOxnf7x3DWdQXRqv";

  onMount(() => {
    if (document.querySelector(`script[src="${COOKIE_SCRIPT_SRC}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = COOKIE_SCRIPT_SRC;
    document.body.appendChild(script);
  });
</script>
