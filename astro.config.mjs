import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://pattern.zackdk.com/",
  integrations: [
  // Enable Preact to support Preact JSX components.
  vue(), tailwind(), mdx(), react()]
});