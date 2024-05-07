const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['IBM Plex Sans Condensed', ...defaultTheme.fontFamily.sans],
                'serif': ['Spectral', ...defaultTheme.fontFamily.serif],
                'mono': ['Iosevka', ...defaultTheme.fontFamily.mono],
                'laravel': ['Mulish Variable', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
