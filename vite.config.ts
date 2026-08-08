import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

// Relative base so assets work on GitHub Pages project URL:
// https://USERNAME.github.io/REPO_NAME/
export default defineConfig({
  base: "./",
  plugins: [injectHTML()],
});
