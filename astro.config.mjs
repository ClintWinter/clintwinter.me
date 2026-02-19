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
      theme: 'gruvbox-light-hard',
      transformers: [
        transformerNotationDiff({ matchAlgorithm: 'v1' }),
        transformerNotationHighlight({ matchAlgorithm: 'v1' }),
      ]
    }
    // extendDefaultPlugins: true
  },
});
