import { cp, mkdir, rm } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const entries = [
  "index.html",
  "styles.css",
  "script.js",
  "_headers",
  ".nojekyll",
  "assets"
];

for (const entry of entries) {
  await cp(new URL(entry, root), new URL(entry, dist), { recursive: true });
}
