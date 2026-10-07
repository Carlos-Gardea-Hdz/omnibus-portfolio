import { flushSync } from "react-dom";

// flushSync makes React commit inside the callback so the browser snapshots the
// new theme, not the old one.
export function withViewTransition(update: () => void): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}
