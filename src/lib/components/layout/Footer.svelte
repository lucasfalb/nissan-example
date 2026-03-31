<script lang="ts">
  import { page } from "$app/state";
  import { getRouteMeta } from "$lib/utils/route-meta";
  import { pushEvent } from "$lib/utils/tracking";

  function trackFooterClick(destinationPath: string, sourceLabel: string) {
    pushEvent("footer_click", {
      ...getRouteMeta(page.url.pathname),
      source_component: "footer",
      source_label: sourceLabel,
      destination_path: destinationPath,
    });
  }
</script>

<footer class="site-footer mt-auto bg-black text-white">
  <div class="mx-auto w-[min(95.9%,1170px)] py-14 md:py-16">
    <div
      class="flex flex-col items-center gap-5 border-t border-white/30 py-7 text-[14px] text-white/70 sm:items-start md:flex-row md:flex-wrap md:items-center md:justify-between"
    >
      <nav class="flex flex-wrap gap-x-8 gap-y-3">
        <a
          class="footer-link"
          href="/"
          onclick={() => trackFooterClick("/", "Nissan Global")}
          >Nissan Global</a
        >
        <a
          class="footer-link"
          href="/"
          onclick={() => trackFooterClick("/", "Mapa do website")}
          >Mapa do website</a
        >
      </nav>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          class="footer-link"
          href="/"
          onclick={() => trackFooterClick("/", "Privacidade")}>Privacidade</a
        >
        <a
          class="footer-link"
          href="/"
          onclick={() => trackFooterClick("/", "Cookies")}>Cookies</a
        >
        <a
          class="footer-link"
          href="/"
          onclick={() => trackFooterClick("/", "Aviso legal")}>Aviso legal</a
        >
        <span class="text-white">© Nissan 2026</span>
      </div>
    </div>
  </div>
</footer>
