const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Playfair Display', 'serif'],
                'body': ['Crimson Pro', 'serif'],
                'laravel': ['Mulish Variable', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                parchment: '#F5F0E8',
                brown:     '#3D2B1F',
                burgundy:  '#6B2D3E',
                gold:      'rgb(155, 121, 64)',
                teal:      '#2D5F5D',
                muted:     '#8B7D6B',
                tan:       '#D4C5A9',
            },
            letterSpacing: {
                section: '0.2em',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
