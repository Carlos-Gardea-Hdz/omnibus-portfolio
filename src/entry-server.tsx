import { renderToString } from 'react-dom/server';
import App from './app/App';

/**
 * Server entry for the static prerender step (scripts/prerender.mjs).
 *
 * Renders the full App tree to an HTML string so dist/index.html ships real
 * content (headings, sections, links) for crawlers and link scrapers that do
 * not execute JavaScript.
 *
 * No browser-only setup is mounted here: App owns its own providers, and the
 * theme/language hooks already fail closed when browser APIs are absent —
 * localStorage access throws in Node, their try/catch catches it, and they
 * fall back deterministically to light theme / English. Global styles are
 * imported by src/main.tsx only, so this entry stays CSS-free.
 */
export function render(): string {
  return renderToString(<App />);
}
