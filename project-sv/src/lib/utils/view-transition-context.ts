type NavigationSource = 'card' | 'link' | 'history' | 'programmatic';

type NavigationContext = {
  from: string | null;
  to: string;
  source: NavigationSource;
  transitionKey: string | null;
};

let pendingNavigationContext: NavigationContext | null = null;

function normalizePath(pathname: string) {
  if (pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function toTransitionToken(value: string | null | undefined) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function setPendingNavigationContext(context: {
  from?: string | null;
  to: string;
  source: NavigationSource;
  transitionKey?: string | null;
}) {
  pendingNavigationContext = {
    from: context.from ?? null,
    to: normalizePath(context.to),
    source: context.source,
    transitionKey: context.transitionKey ? toTransitionToken(context.transitionKey) : null
  };
}

export function consumePendingNavigationContext() {
  const context = pendingNavigationContext;
  pendingNavigationContext = null;
  return context;
}

export function peekPendingNavigationContext() {
  return pendingNavigationContext;
}

export function normalizeTransitionPath(pathname: string) {
  return normalizePath(pathname);
}
