<script lang="ts">
  import { page } from '$app/state';

  let { status, error } = $props<{
    status: number;
    error?: { message?: string };
  }>();

  const isNotFound = $derived(status === 404);
  const title = $derived(isNotFound ? 'Página não encontrada' : 'Ocorreu um erro');
  const description = $derived(
    isNotFound
      ? 'O endereço que procurou não existe ou foi movido. Continue a navegação a partir das páginas principais.'
      : error?.message || 'Não foi possível apresentar esta página.',
  );
</script>

<svelte:head>
  <title>{title} | Nissan Portugal</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto flex min-h-[60vh] w-[min(95.9%,900px)] items-center px-4 py-16">
  <div class="grid gap-6 rounded-[32px] border border-neutral-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-10">
    <p class="text-[12px] font-bold uppercase tracking-[0.16em] text-[#c3002f]">
      Erro {status}
    </p>
    <div class="grid gap-3">
      <h1 class="m-0 text-[clamp(2.4rem,2rem+1.5vw,4rem)] uppercase leading-[0.95] tracking-tight text-neutral-950">
        {title}
      </h1>
      <p class="max-w-[60ch] text-[15px] leading-[1.7] text-neutral-600">
        {description}
      </p>
      {#if page.url.pathname !== '/'}
        <p class="text-[14px] leading-[1.7] text-neutral-500">
          URL atual: <span class="font-medium text-neutral-700">{page.url.pathname}</span>
        </p>
      {/if}
    </div>

    <div class="flex flex-wrap gap-3">
      <a
        href="/"
        class="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c3002f] px-6 text-[13px] font-semibold uppercase tracking-[0.05rem] text-white transition hover:bg-[#920023]"
      >
        Ir para início
      </a>
      <a
        href="/modelos/"
        class="inline-flex min-h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-[13px] font-semibold uppercase tracking-[0.05rem] text-neutral-900 transition hover:border-neutral-500"
      >
        Ver modelos
      </a>
    </div>
  </div>
</section>
