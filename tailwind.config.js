/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            'tb': '640px',
            // => @media (min-width: 640px) { ... }
        
            'lp': '1025px',
            // => @media (min-width: 1024px) { ... }
        
            'dp': '1441px',
            // => @media (min-width: 1280px) { ... }
            },
        extend: {
            fontFamily: {
            'clash-display': ['Clash Display', 'sans-serif'],
            'neue-power': ['Neue Power Variable', 'sans-serif']
            },
            transitionDuration: {
                '2000': '2000ms',
            },
            transitionProperty: {
                'height': 'height',
            },
            colors: {
                'mustard': '#DBFF00'
            }
        },    
    },
    plugins: []
  };