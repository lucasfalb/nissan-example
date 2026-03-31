export function initGoogleTagManager(gtmId: string | undefined) {
  if (!gtmId || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.dataset.gtmId = gtmId;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}
