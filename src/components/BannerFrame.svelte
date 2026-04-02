<script lang="ts">
  import { getBannerUrl, getFallbackBannerUrl } from '$lib/model-banners';
  import type { BannerKey } from '$lib/types';

  let {
    bannerKey,
    title,
    className = '',
    surfaceClassName = 'bg-white',
    fallbackLabel = 'Adicionar URL do banner',
    imageClassName = '',
    transitionName = undefined as string | undefined,
    priority = false,
    sizes = '100vw'
  } = $props<{
    bannerKey: BannerKey;
    title: string;
    className?: string;
    surfaceClassName?: string;
    fallbackLabel?: string;
    imageClassName?: string;
    transitionName?: string;
    priority?: boolean;
    sizes?: string;
  }>();

  const imageUrl = $derived(getBannerUrl(bannerKey));
  const fallbackImageUrl = $derived(getFallbackBannerUrl(bannerKey));

  function handleImageError(event: Event) {
    const image = event.currentTarget;
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    if (image.dataset.fallbackApplied === 'true' || !fallbackImageUrl) {
      return;
    }

    image.dataset.fallbackApplied = 'true';
    image.src = fallbackImageUrl;
  }
</script>

{#if imageUrl}
  <div
    class={`${className} ${surfaceClassName} relative overflow-hidden border border-neutral-200`}
    style:view-transition-name={transitionName}
  >
    <img
      src={imageUrl}
      alt={title}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      width="1600"
      height="900"
      sizes={sizes}
      onerror={handleImageError}
      class={`absolute h-full w-full object-cover ${imageClassName}`.trim()}
    />
  </div>
{:else}
  <div class={`${className} ${surfaceClassName} flex min-h-[320px] flex-col items-center justify-center gap-3 border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-700`} style:view-transition-name={transitionName}>
    <span class="text-[11px] uppercase tracking-[0.12rem] text-[#c3002f]">{bannerKey}</span>
    <strong class="text-[20px] uppercase tracking-[0.08rem] text-neutral-950">{title}</strong>
    <p class="max-w-[34ch] text-[14px] leading-[1.6]">{fallbackLabel}</p>
  </div>
{/if}
