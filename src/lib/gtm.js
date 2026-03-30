export function initGoogleTagManager(gtmId) {
  if (!gtmId || typeof document === "undefined") {
    return;
  }

  if (document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  script.dataset.gtmId = gtmId;
  document.head.appendChild(script);
}
