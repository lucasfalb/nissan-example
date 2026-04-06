import { dev } from '$app/environment';

type TrackingPayload = Record<string, unknown>;
type LinkTrackingPayload = {
  page: string;
  destination: string;
  title: string;
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
  event,
  page,
  destination,
  title,
}: LinkTrackingPayload & { event: string }) {
  pushEvent(event, {
    page,
    destination,
    title,
  });
}
