const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'display': ['IBM Plex Sans', ...defaultTheme.fontFamily.serif],
                'sans': ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
                'serif': ['Spectral', ...defaultTheme.fontFamily.serif],
                'mono': ['Iosevka', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
