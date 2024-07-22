const app = {
	LEVITATION_AMP: 2.0,
	LEVITATION_VEL: 0.4,
	ROT_Y_AMP: 20.0,
	ROT_Y_VEL: 0.5
};

const estilos = [
	{
		name: '0',
		texture_name: 'matcap-black.png',
		primary_media: 'black',
		secondary_media: 'white'
	},
	{
		name: '1',
		texture_name: 'matcap-gum.png',
		primary_media: 'mustard',
		secondary_media: 'black'
	},
	{
		name: '2',
		texture_name: 'matcap-blue.png',
		primary_media: 'white',
		secondary_media: 'black'
	}
];

export { app, estilos };
