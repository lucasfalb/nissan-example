type TrackingPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function pushEvent(event: string, data: TrackingPayload = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });

  if (import.meta.env.DEV) {
    console.debug('[DataLayer]', event, data);
  }
}
