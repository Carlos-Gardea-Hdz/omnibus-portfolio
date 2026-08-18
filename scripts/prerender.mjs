/**
 * Static prerender step — runs after the client build (see "build" in package.json).
 *
 * 1. Builds the SSR bundle (src/entry-server.tsx -> dist-ssr/, never deployed).
 * 2. Renders the app to an HTML string with react-dom/server.
 * 3. Injects that HTML into <div id="root"> of dist/index.html, so crawlers and
 *    link scrapers (LinkedIn, WhatsApp, search bots without JS) see the real
 *    page content instead of an empty shell.
 *
 * Deliberate decision — src/main.tsx keeps createRoot (render-and-replace)
 * instead of migrating to hydrateRoot: server output is always light/English
 * while the client detects theme and language per visitor, so hydration
 * mismatches are guaranteed for some visitors, and without hydration test
 * coverage a silent mismatch is worse than replacing the prerendered tree.
 * The goal of this step is SEO/scraper visibility, not hydration speed.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { build } from 'vite';

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const ssrOutDir = resolve(rootDir, 'dist-ssr');
const indexPath = resolve(rootDir, 'dist', 'index.html');

// 1. Build the SSR bundle, kept outside dist/ so deploys never ship it.
// publicDir is disabled: the SSR bundle only needs entry-server.js, not a
// copy of the static assets the client build already emits into dist/.
await build({
  root: rootDir,
  logLevel: 'warn',
  publicDir: false,
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
  },
});

// 2. Render the app to static markup.
const { render } = await import(
  pathToFileURL(resolve(ssrOutDir, 'entry-server.js')).href
);
let appHtml = render();
if (!appHtml || !appHtml.includes('<')) {
  throw new Error('Prerender produced empty output.');
}

// Neutralize baked-in animation initial states. Motion components render
// their pre-animation styles (opacity:0 + a translate/scale) into the static
// markup, which makes the prerendered page invisible without JS and delays
// LCP until hydration animates everything in. Stripping them keeps the
// content visible from first paint; when React mounts it replaces the tree
// and the entry animations still run.
appHtml = appHtml.replace(/style="([^"]*)"/g, (full, style) => {
  if (!/opacity:\s*0(?:[;"]|$)/.test(style + ';')) return full;
  const cleaned = style
    .split(';')
    .map((s) => s.trim())
    .filter(
      (s) =>
        s &&
        !/^opacity:\s*0$/.test(s) &&
        !/^transform:.*(translate|scale)/.test(s)
    )
    .join(';');
  return cleaned ? `style="${cleaned}"` : '';
});

// 3. Inject the markup into the client build's index.html.
const marker = '<div id="root"></div>';
const template = await readFile(indexPath, 'utf8');
const occurrences = template.split(marker).length - 1;
if (occurrences !== 1) {
  throw new Error(
    `Expected exactly one "${marker}" in dist/index.html, found ${occurrences}. ` +
      'Run a fresh "vite build" first — prerendering twice would duplicate markup.'
  );
}
// Replacer function so "$" sequences in the markup are never treated as
// String.replace substitution patterns.
const html = template.replace(marker, () => `<div id="root">${appHtml}</div>`);
await writeFile(indexPath, html, 'utf8');

console.log(
  `Prerendered dist/index.html (+${(appHtml.length / 1024).toFixed(1)} kB of static markup).`
);
