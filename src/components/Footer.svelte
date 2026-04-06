<script lang="ts">
  import { page } from "$app/state";
  import { pushLinkEvent } from "$lib/tracking";

  function trackFooterClick(destinationPath: string, sourceLabel: string) {
    pushLinkEvent({
      event: "footer_link_click",
      page: page.url.pathname,
      destination: destinationPath,
      title: sourceLabel,
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
        <span class="footer-link js-rgc-open-cookies-settings">Cookies</span>
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
