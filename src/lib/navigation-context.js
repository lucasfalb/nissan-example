let pendingNavigationContext = null;

export function setNavigationContext(context) {
  pendingNavigationContext = context;
}

export function peekNavigationContext() {
  return pendingNavigationContext;
}

export function consumeNavigationContext() {
  const context = pendingNavigationContext;
  pendingNavigationContext = null;
  return context;
}
