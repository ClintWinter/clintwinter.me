import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import torchlight from 'remark-torchlight';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],

    markdown: {
        remarkPlugins: [
            [torchlight, { config: { theme: 'github-dark' }}],
        ],
        extendDefaultPlugins: true,
    },
});
