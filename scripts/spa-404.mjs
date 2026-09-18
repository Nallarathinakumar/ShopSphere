// Creates dist/404.html as a copy of dist/index.html.
// GitHub Pages serves 404.html for unknown paths, which makes
// browser-history routing work on Pages. Not required in hash mode.
import { copyFileSync, existsSync } from "node:fs";

const src = "dist/index.html";
const dest = "dist/404.html";

if (!existsSync(src)) {
  console.error("dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

copyFileSync(src, dest);
console.log("Created dist/404.html for SPA fallback.");
