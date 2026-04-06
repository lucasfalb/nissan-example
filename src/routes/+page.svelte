<script lang="ts">
  import HomeSlideshow from "$components/HomeSlideshow.svelte";
  import SectionHeader from "$components/SectionHeader.svelte";
  import FeaturedCard from "$components/FeaturedCard.svelte";
  import { getBannerUrl } from "$lib/model-banners";
  import { pushLinkEvent } from '$lib/tracking';

  let { data } = $props();

  function trackHomeCtaClick(sourceLabel: string, destinationPath: string) {
    pushLinkEvent({
      event: 'home_link_click',
      page: '/',
      destination: destinationPath,
      title: sourceLabel
    });
  }
</script>

<svelte:head>
  <title>{data.seo.title}</title>
  <meta name="description" content={data.seo.description} />
  <link rel="canonical" href={data.seo.canonicalUrl} />
  <link rel="preload" as="image" href={getBannerUrl(data.slides[0].bannerKey)} />
</svelte:head>

<main class="w-screen overflow-x-hidden">
  <HomeSlideshow slides={data.slides} />

  <section class="bg-white px-0 py-12 md:py-16">
    <div class="mx-auto w-[min(95.9%,1170px)]">
      <div class="mx-auto flex max-w-[860px] flex-col items-center text-center">
        <div class="mb-6 grid gap-3">
          <h2
            class="m-0 text-[clamp(2.2rem,1.8rem+1.5vw,3.2rem)] uppercase leading-[1.05] tracking-[0.011rem] text-neutral-900"
          >
            Descubra o Nissan ideal para si.
          </h2>
        </div>

        <div class="mb-8 grid gap-4">
          <p
            class="m-0 text-justify text-[15px] leading-[1.6] text-neutral-600 sm:text-center"
          >
            Da mobilidade urbana à aventura em família, há sempre um Nissan à
            sua medida. A gama combina elétricos, eletrificados, crossovers e
            SUV preparados para diferentes estilos de condução.
          </p>
          <p
            class="m-0 text-justify text-[15px] leading-[1.6] text-neutral-600 sm:text-center"
          >
            Explore campanhas em destaque, encontre o modelo certo e avance para
            o próximo passo com mais contexto, menos fricção e uma navegação
            mais direta.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="/modelos/"
            onclick={() => trackHomeCtaClick('Explore a Gama', '/modelos/')}
            class="inline-flex min-h-12 items-center justify-center bg-[#c3002f] px-8 text-[14px] font-medium uppercase tracking-[0.05rem] text-white! transition hover:bg-[#920023]"
          >
            Explore a Gama
          </a>
          <a
            href="/campanhas/popup/"
            onclick={() => trackHomeCtaClick('Ver Ofertas', '/campanhas/popup/')}
            class="inline-flex min-h-12 items-center justify-center border border-neutral-300 bg-white px-8 py-4 text-[14px] font-medium uppercase tracking-[0.05rem] text-neutral-900 transition hover:border-neutral-700"
          >
            Ver Ofertas
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="pb-12 md:pb-16">
    <div class="mx-auto w-[min(95.9%,1170px)]">
      <SectionHeader
        eyebrow="Modelos em destaque"
        title="Escolha o Nissan certo para o seu momento"
      />
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {#each data.featuredCards as card}
          <FeaturedCard {card} />
        {/each}
      </div>
    </div>
  </section>

  <section class="bg-neutral-100 py-12 md:py-16">
    <div class="mx-auto w-[min(95.9%,1170px)]">
      <SectionHeader
        eyebrow="Escolha o seu caminho"
        title="Três formas de entrar no universo Nissan"
      />
      <div class="grid gap-6 md:grid-cols-3">
        <a
          class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          href="/campanhas/happiniss-days/"
          onclick={() => trackHomeCtaClick('Ofertas em destaque', '/campanhas/happiniss-days/')}
        >
          <span
            class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]"
            >Campanhas</span
          >
          <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">
            Ofertas em destaque
          </h3>
          <p class="text-[14px] leading-[1.6] text-neutral-600">
            Veja campanhas, ofertas comerciais e chamadas de ação mais diretas
            para gerar contacto.
          </p>
        </a>
        <a
          class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          href="/modelos/"
          onclick={() => trackHomeCtaClick('Descubra a gama Nissan', '/modelos/')}
        >
          <span
            class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]"
            >Novos</span
          >
          <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">
            Descubra a gama Nissan
          </h3>
          <p class="text-[14px] leading-[1.6] text-neutral-600">
            Dos compactos elétricos aos SUV familiares, encontre o modelo certo
            para você.
          </p>
        </a>
        <a
          class="border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          href="/usados/qashqai/"
          onclick={() => trackHomeCtaClick('Oportunidades Nissan', '/usados/qashqai/')}
        >
          <span
            class="mb-4 inline-block text-[11px] uppercase tracking-[0.09rem] text-[#c3002f]"
            >Usados</span
          >
          <h3 class="mb-2 text-[22px] uppercase leading-[1.1] text-neutral-950">
            Oportunidades Nissan
          </h3>
          <p class="text-[14px] leading-[1.6] text-neutral-600">
            Explore usados selecionados e aceda rapidamente a proposta, visita
            comercial ou pedido de contacto.
          </p>
        </a>
      </div>
    </div>
  </section>
</main>
