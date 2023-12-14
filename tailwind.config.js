/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
            'clash-display': ['Clash Display', 'sans-serif'],
            'neue-power': ['Neue Power Variable', 'sans-serif']
          },
      },
    },
    plugins: []
  };