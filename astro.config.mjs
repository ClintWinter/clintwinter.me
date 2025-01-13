import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import alpine from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: 'https://clintwinter.me',
  integrations: [tailwind(), alpine()],
  markdown: {
    shikiConfig: {
      // theme: 'nord',
      themes: {
        dark: 'github-dark-default',
        light: 'github-light'
      },
      transformers: [transformerNotationDiff(), transformerNotationHighlight()]
    }
    // extendDefaultPlugins: true
  },
});
