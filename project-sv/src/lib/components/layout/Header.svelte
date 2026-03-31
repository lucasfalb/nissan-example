<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { navigationGroups } from "$lib/content/navigation";
  import { getRouteMeta } from "$lib/utils/route-meta";
  import { pushEvent } from "$lib/utils/tracking";

  let mobileOpen = $state(false);
  let openDesktopGroup = $state<string | null>(null);

  function isActive(
    path?: string,
    items: ReadonlyArray<{ path: string }> = [],
  ) {
    return (
      page.url.pathname === path ||
      items.some((item) => item.path === page.url.pathname)
    );
  }

  function closeAllMenus() {
    mobileOpen = false;
    openDesktopGroup = null;
  }

  function trackHeaderClick(
    destinationPath: string,
    sourceLabel: string,
    navGroup: string,
  ) {
    pushEvent("header_click", {
      ...getRouteMeta(page.url.pathname),
      source_component: "header",
      source_label: sourceLabel,
      nav_group: navGroup,
      destination_path: destinationPath,
    });
  }

  onMount(() => {
    const onWindowClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const insideHeader = (target as HTMLElement).closest("header");
      if (!insideHeader) {
        closeAllMenus();
      }
    };

    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  });
</script>

<header
  class="sticky top-0 z-[9999] border-t-4 border-t-neutral-950 border-b border-b-neutral-200 bg-white/95 backdrop-blur"
>
  <div
    class="mx-auto flex min-h-[55px] w-[min(95%,1170px)] items-center justify-between gap-6 md:min-h-[88px]"
  >
    <a
      href="/"
      class="inline-flex items-center"
      aria-label="Nissan - Pagina inicial"
      onclick={() => trackHeaderClick("/", "Logo Nissan", "brand")}
    >
      <img src="/assets/nissan.svg" alt="Nissan" class="h-6 w-auto sm:h-8" />
    </a>

    <nav
      class="hidden items-center gap-2 md:flex"
      aria-label="Navegacao principal"
    >
      {#each navigationGroups as group}
        {#if "path" in group}
          <a
            href={group.path}
            onclick={() => trackHeaderClick(group.path, group.label, "primary")}
            class={`inline-flex min-h-12 items-center gap-2 px-3 text-[13px] font-medium uppercase tracking-[0.06em] text-neutral-700 transition hover:text-neutral-950 ${isActive(group.path) ? "bg-neutral-100 text-neutral-950" : ""}`}
          >
            {group.label}
          </a>
        {:else}
          <details
            class="nav-group relative w-full md:w-auto"
            open={openDesktopGroup === group.label}
          >
            <summary
              class={`inline-flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-3 text-[13px] font-medium uppercase tracking-[0.06em] text-neutral-700 transition hover:text-neutral-950 md:justify-start ${isActive(undefined, group.items) ? "bg-neutral-100 text-neutral-950" : ""}`}
              onclick={(event) => {
                event.preventDefault();
                openDesktopGroup =
                  openDesktopGroup === group.label ? null : group.label;
              }}
            >
              <span>{group.label}</span>
              <svg
                class="nav-caret h-6 w-6 shrink-0 opacity-60 transition-transform duration-200 ease-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div
              class={`nav-menu mt-2 grid min-w-[220px] gap-1 border border-neutral-200 bg-white p-3 shadow-[0_18px_40px_rgba(26,26,26,0.08)] md:absolute md:top-full ${group.align === "right" ? "md:right-0 md:left-auto" : "md:left-0"}`}
            >
              {#each group.items as item}
                <a
                  href={item.path}
                  onclick={() =>
                    trackHeaderClick(item.path, item.label, group.label)}
                  class={`block px-3 py-2 text-[13px] font-normal text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 ${page.url.pathname === item.path ? "bg-neutral-100 text-neutral-950" : ""}`}
                >
                  {item.label}
                </a>
              {/each}
            </div>
          </details>
        {/if}
      {/each}
    </nav>

    <button
      class="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-neutral-950 md:hidden"
      type="button"
      aria-expanded={mobileOpen}
      aria-controls="mobile-nav-shell"
      onclick={() => {
        mobileOpen = !mobileOpen;
      }}
    >
      <span>Menu</span>
      <div class="flex w-4 flex-col gap-1">
        <span class="h-0.5 w-full bg-current"></span>
        <span class="h-0.5 w-full bg-current"></span>
      </div>
    </button>
  </div>

  <div
    id="mobile-nav-shell"
    class={`fixed inset-0 z-[120] min-h-[100dvh] overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? "visible" : "invisible"}`}
  >
    <button
      class={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
      aria-label="Fechar menu"
      onclick={closeAllMenus}
    ></button>

    <div
      class={`absolute right-0 top-0 flex h-full w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div
        class="flex items-center justify-between border-b border-neutral-200 px-5 py-5"
      >
        <span
          class="text-[2rem] font-bold uppercase tracking-[-0.03em] text-neutral-950"
          >Menu</span
        >
        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-[4rem] leading-none text-neutral-950 transition hover:border-neutral-400 hover:bg-neutral-50"
          type="button"
          aria-label="Fechar menu"
          onclick={closeAllMenus}>X</button
        >
      </div>

      <div class="flex-1 space-y-4 overflow-y-auto p-6">
        {#each navigationGroups as group}
          {#if "path" in group}
            <a
              href={group.path}
              onclick={() => {
                trackHeaderClick(group.path, group.label, "primary");
                closeAllMenus();
              }}
              class={`flex min-h-14 items-center justify-between rounded-[22px] border px-5 py-4 text-[1.6rem] leading-[1.2] font-medium transition-[border-color,background-color,color,transform] duration-200 ${isActive(group.path) ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-200 bg-white text-neutral-950 hover:-translate-y-[1px] hover:border-neutral-300"}`}
            >
              <span>{group.label}</span>
              <span
                class="inline-flex min-w-[6.8rem] items-center justify-end gap-3"
              >
                <span
                  class={`text-[1.05rem] font-semibold uppercase tracking-[0.12em] ${isActive(group.path) ? "text-white/70" : "text-neutral-500"}`}
                  >Ver</span
                >
                <svg
                  class={`h-5 w-5 ${isActive(group.path) ? "text-white/80" : "text-neutral-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
          {:else}
            <details
              class="group overflow-hidden rounded-[22px] border border-neutral-200 bg-white font-normal transition-[border-color,box-shadow] duration-200 open:border-neutral-300 open:shadow-[0_14px_36px_rgba(15,23,42,0.07)]"
            >
              <summary
                class="flex min-h-14 list-none cursor-pointer items-center justify-between gap-4 px-5 py-4"
              >
                <span
                  class="text-[1.6rem] font-medium leading-[1.2] text-neutral-950"
                >
                  {group.label}
                </span>
                <span
                  class="inline-flex min-w-[6.8rem] items-center justify-end gap-3"
                >
                  <span
                    class="text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-neutral-500 transition-opacity duration-200 group-open:opacity-80"
                  >
                    Abrir
                  </span>
                  <svg
                    class="h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 ease-out group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div
                class="hidden border-t border-t-neutral-200 bg-linear-to-b from-white to-neutral-50 p-2 group-open:grid group-open:gap-2"
              >
                {#each group.items as item}
                  <a
                    href={item.path}
                    onclick={() => {
                      trackHeaderClick(item.path, item.label, group.label);
                      closeAllMenus();
                    }}
                    class={`flex min-h-12 items-center rounded-[16px] px-4 py-3 text-[1.45rem] leading-[1.35] font-normal transition-[background-color,color,transform] duration-200 ${page.url.pathname === item.path ? "bg-neutral-950 text-white" : "text-neutral-600 hover:translate-x-[2px] hover:bg-neutral-100 hover:text-neutral-950"}`}
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            </details>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</header>
