let activeTransitionCount = 0;

export function supportsViewTransitions() {
  return (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function"
  );
}

export function isViewTransitionRunning() {
  return activeTransitionCount > 0;
}

export function startViewTransition(update, hooks = {}) {
  const { beforeTransition, afterTransition } = hooks;

  if (!supportsViewTransitions()) {
    beforeTransition?.();
    update();
    afterTransition?.();
    return Promise.resolve();
  }

  beforeTransition?.();
  activeTransitionCount += 1;

  const transition = document.startViewTransition(() => {
    update();
  });

  return transition.finished.finally(() => {
    activeTransitionCount = Math.max(0, activeTransitionCount - 1);
    afterTransition?.();
  });
}
