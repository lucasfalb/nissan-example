<script lang="ts">
  let { eyebrow, title, lead = undefined as string | undefined } = $props();
</script>

<div class="mb-8 w-full">
  <p class="mb-2 text-[11px] uppercase tracking-[0.09rem] text-neutral-500">{eyebrow}</p>
  <h2 class="relative pt-5 text-[clamp(2.6rem,2.317rem+0.7547vw,3.2rem)] uppercase leading-[1.2] tracking-[0.011rem] text-neutral-950 before:absolute before:left-0 before:top-0 before:h-[4px] before:w-[50px] before:bg-[#c3002f]">
    {title}
  </h2>
  {#if lead}
    <p class="mt-4 max-w-[720px] text-[14px] leading-[1.6] text-neutral-600">{lead}</p>
  {/if}
</div>
