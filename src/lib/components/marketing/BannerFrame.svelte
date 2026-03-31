<script lang="ts">
  import { getBannerUrl } from '$lib/content/model-banners';
  import type { BannerKey } from '$lib/types/content';

  let {
    bannerKey,
    title,
    className = '',
    fallbackLabel = 'Adicionar URL do banner',
    imageClassName = '',
    transitionName = undefined as string | undefined
  } = $props<{
    bannerKey: BannerKey;
    title: string;
    className?: string;
    fallbackLabel?: string;
    imageClassName?: string;
    transitionName?: string;
  }>();

  const imageUrl = $derived(getBannerUrl(bannerKey));
</script>

{#if imageUrl}
  <div class={`${className} relative overflow-hidden border border-neutral-200 bg-neutral-100`} style:view-transition-name={transitionName}>
    <img src={imageUrl} alt={title} class={`absolute h-full w-full object-cover ${imageClassName}`.trim()} />
  </div>
{:else}
  <div class={`${className} flex min-h-[320px] flex-col items-center justify-center gap-3 border border-dashed border-neutral-300 bg-neutral-100 px-6 py-10 text-center text-neutral-700`} style:view-transition-name={transitionName}>
    <span class="text-[11px] uppercase tracking-[0.12rem] text-[#c3002f]">{bannerKey}</span>
    <strong class="text-[20px] uppercase tracking-[0.08rem] text-neutral-950">{title}</strong>
    <p class="max-w-[34ch] text-[14px] leading-[1.6]">{fallbackLabel}</p>
  </div>
{/if}
