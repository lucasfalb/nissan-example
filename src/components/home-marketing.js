export function createHomeMarketingBlock() {
  return `
    <section class="bg-white px-0 py-12 md:py-16">
      <div class="mx-auto w-[min(95.9%,1170px)]">
        <div class="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <div class="mb-6 grid gap-3">
            <h2 class="m-0 text-[clamp(2.2rem,1.8rem+1.5vw,3.2rem)] uppercase leading-[1.05] tracking-[0.011rem] text-neutral-900">
              Descubra o Nissan ideal para si.
            </h2>
          </div>

          <div class="mb-8 grid gap-4">
            <p class="m-0 text-[15px] leading-[1.6] text-justify sm:text-center text-neutral-600">
              Da mobilidade urbana à aventura em família, há sempre um Nissan à sua medida.
              A gama combina elétricos, eletrificados, crossovers e SUV preparados para
              diferentes estilos de condução.
            </p>
            <p class="m-0 text-[15px] leading-[1.6] text-justify sm:text-center text-neutral-600">
              Explore campanhas em destaque, encontre o modelo certo e avance para o próximo
              passo com mais contexto, menos fricção e uma navegação mais direta.
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="/modelos/"
              class="inline-flex min-h-12 items-center justify-center bg-[#c3002f] px-8 text-[14px] uppercase font-medium tracking-[0.05rem] text-white transition hover:bg-[#920023]"
              data-link
            >
              Explore a Gama
            </a>
            <a
              href="/popup/"
              class="inline-flex min-h-12 py-4 items-center justify-center border border-neutral-300 bg-white px-8 text-[14px] uppercase font-medium tracking-[0.05rem] text-neutral-900 transition hover:border-neutral-700"
              data-link
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
