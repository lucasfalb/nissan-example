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

function scheduleDeferredScript(start: () => void) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const scheduleStart = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        start();
      }, { timeout: 2000 });
      return;
    }

    setTimeout(start, 1200);
  };

  if (document.readyState === 'complete') {
    scheduleStart();
    return;
  }

  window.addEventListener('load', scheduleStart, { once: true });
}

export function initCookieScript(src: string | undefined) {
  if (!src || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (document.querySelector(`script[data-cookie-script="${src}"]`)) {
    return;
  }

  const start = () => {
    if (document.querySelector(`script[data-cookie-script="${src}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.dataset.cookieScript = src;
    script.src = src;
    document.head.appendChild(script);
  };

  scheduleDeferredScript(start);
}
