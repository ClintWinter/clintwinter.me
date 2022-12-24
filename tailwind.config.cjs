const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            fontFamily: {
                'sans': ['cabin', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                nord: {
                    n: {
                        '900': '#2E3440',
                        '800': '#3B4252',
                        '700': '#434C5E',
                        '600': '#4C566A',
                    },
                    s: {
                        '300': '#D8DEE9',
                        '200': '#E5E9F0',
                        '100': '#ECEFF4',
                    },
                    f: {
                        green: '#8FBCBB',
                        teal: '#88C0D0',
                        gray: '#81A1C1',
                        slate: '#5E81AC',
                    },
                    a: {
                        red: '#BF616A',
                        orange: '#D08770',
                        yellow: '#EBCB8B',
                        green: '#A3BE8C',
                        purple: '#B48EAD',
                    }
                },
            },
        },
	},
	plugins: [],
}
