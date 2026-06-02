/**
 * Post-build script: generates dist/client/index.html for GitHub Pages static hosting.
 * Scans dist/client/assets/ for hashed JS/CSS files and injects them into a shell HTML.
 */

import { readdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const base = "/Procston-Coming-soon/";
const assetsDir = join(process.cwd(), "dist", "client", "assets");
const outFile = join(process.cwd(), "dist", "client", "index.html");

if (!existsSync(assetsDir)) {
  console.error("dist/client/assets not found — run `npm run build` first.");
  process.exit(1);
}

const files = readdirSync(assetsDir);

// Pick CSS files (all of them)
const cssFiles = files.filter((f) => f.endsWith(".css"));

// Pick the largest JS file as the main entry (TanStack Start's client bundle)
const jsFiles = files.filter((f) => f.endsWith(".js"));
const { statSync } = await import("fs");
const mainJs = jsFiles
  .map((f) => ({ name: f, size: statSync(join(assetsDir, f)).size }))
  .sort((a, b) => b.size - a.size)[0]?.name;

if (!mainJs) {
  console.error("No JS entry found in dist/client/assets.");
  process.exit(1);
}

const cssLinks = cssFiles
  .map((f) => `  <link rel="stylesheet" href="${base}assets/${f}" />`)
  .join("\n");

// Minimal TSR bootstrap: tells TanStack Start's hydrate() that there's no
// server-dehydrated state, so the router falls through to CSR.
const tsrBootstrap = `<script>window.$_TSR={buffer:[],h:function(){},router:{matches:[],manifest:undefined,dehydratedData:undefined}};<\/script>`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Procston — Next-Generation EPC Procurement Platform</title>
    <base href="${base}" />
${cssLinks}
    ${tsrBootstrap}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${base}assets/${mainJs}"></script>
  </body>
</html>
`;

writeFileSync(outFile, html, "utf-8");

// Also write 404.html for SPA client-side routing fallback
writeFileSync(join(process.cwd(), "dist", "client", "404.html"), html, "utf-8");

console.log(`✓ Generated index.html → ${base}assets/${mainJs}`);
console.log(`✓ Generated 404.html (SPA fallback)`);
