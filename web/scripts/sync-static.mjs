// Copies the legacy static site (videos, posters, standalone demos and tools)
// from the repo root into web/public so they keep their existing URLs, e.g.
// /assets/trace.mp4, /cat-preview/, /inovetix-reel/. The copies are gitignored;
// the repo root stays the single source of truth for these files.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(web, "..");
const pub = join(web, "public");

const ENTRIES = [
  ["assets", "assets"],
  ["cat-preview", "cat-preview"],
  ["zeiziq-bird", "zeiziq-bird"],
  ["countly-preview", "countly-preview"],
  ["aria-preview", "aria-preview"],
  ["inovetix-reel", "inovetix-reel"],
  ["tavana-lottie-testbench", "tavana-lottie-testbench"],
  ["motiondesk.html", "motiondesk.html"],
  ["admin.html", "admin.html"],
  ["data.json", "data.json"],
  // Earlier versions of the site stay reachable
  ["classic.html", "classic.html"],
  ["index.html", "dark.html"],
];

mkdirSync(pub, { recursive: true });
for (const [from, to] of ENTRIES) {
  const src = join(root, from);
  const dest = join(pub, to);
  if (!existsSync(src)) {
    console.warn(`[sync-static] missing ${from}, skipped`);
    continue;
  }
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
}
// Self-host the Rive runtime so animations don't depend on unpkg/jsdelivr.
mkdirSync(join(pub, "rive"), { recursive: true });
for (const f of ["rive.wasm", "rive_fallback.wasm"]) {
  cpSync(join(web, "node_modules/@rive-app/canvas", f), join(pub, "rive", f));
}
// GitHub Pages: never run Jekyll over the export (it would drop /_next).
writeFileSync(join(pub, ".nojekyll"), "");
console.log(`[sync-static] copied ${ENTRIES.length} entries into public/`);
