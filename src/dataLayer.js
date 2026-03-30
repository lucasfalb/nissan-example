export function pushEvent(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });

  if (import.meta.env.DEV) {
    console.debug('[DataLayer]', event, data);
  }
}
