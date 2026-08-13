import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://small-text-gen.com",
  trailingSlash: "never",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
