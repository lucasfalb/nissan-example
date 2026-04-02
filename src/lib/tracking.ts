import { dev } from '$app/environment';

type TrackingPayload = Record<string, unknown>;
type LinkTrackingPayload = {
  page: string;
  destination: string;
  title: string;
  position?: number | null;
};

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

  if (dev) {
    console.debug('[DataLayer]', event, data);
  }
}

export function pushLinkEvent({
  page,
  destination,
  title,
  position = null,
}: LinkTrackingPayload) {
  pushEvent('link', {
    page,
    destination,
    title,
    position,
  });
}
