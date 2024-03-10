/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			tb: '640px', // @media (min-width: 640px)
			lp: '1024px', // @media (min-width: 1025px)
			sp: '1280px', // @media (min-width: 1025px)
			dp: '1440px', // @media (min-width: 1441px)
			bg: '1680px', // @media (min-width: 1441px)
			'2k': '1920px' // @media (min-width: 1441px)
		},
		extend: {
			fontFamily: {
				'clash-display':
					"ClashDisplay, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
				'neue-power':
					"NeuePowerVariable, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
			},
			transitionDuration: {
				2000: '2000ms'
			},
			transitionProperty: {
				height: 'height'
			},
			colors: {
				mustard: '#DBFF00',
				purple: '#8B9EFF',
				'dark-grey': '#646262'
			}
		}
	},
	plugins: [
		require('tailwindcss-themer')({
			defaultTheme: {
				extend: {
					colors: {
						primary: 'black',
						secondary: 'white',
						background: 'white'
					}
				}
			},
			themes: [
				{
					name: 'gum',
					extend: {
						colors: {
							primary: '#DBFF00',
							secondary: 'black',
							background: '#8B9EFF'
						}
					}
				},
				{
					name: 'dark',
					extend: {
						colors: {
							primary: 'white',
							secondary: 'black',
							background: 'black'
						}
					}
				}
			]
		})
		// ...
	]
};
