<script>
	import { onMount } from 'svelte';
	import { estilos } from '$lib/config.js';
	import { indexStyleStore } from '$lib/store.js';

	let index = 0;

	const updateMatcap = (_) => {
		index++;
		index >= estilos.length ? (index = 0) : null;
		indexStyleStore.set(index);
	};

	onMount(() => {
		const unsubscribe = indexStyleStore.subscribe((value) => {
			index = value;
		});

		return unsubscribe;
	});
</script>

<div class="hidden lp:col-span-2 flex-none lp:flex lp:items-center justify-end lp:gap-6">
	<div class="flex items-center justify-between gap-6">
        <a href={'https://discord.gg/NTUZRU3ZNE'}
        target="_blank"
        ><img
            loading="lazy"
            src={`/discord-${estilos[index].primary_media}.svg`}
            alt="Discord Logo"
        /></a
    >
		<a href={'https://twitter.com/Artdao_xyz'} target="_blank"
			><img
				loading="lazy"
				class=""
				src={`/x-${estilos[index].primary_media}.svg`}
				alt="X Logo"
			/></a
		>
		<a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"
			><img
				loading="lazy"
				src={`/instagram-${estilos[index].primary_media}.svg`}
				alt="Instagram Logo"
			/></a
		>
	</div>
	<div class="flex items-center">
		<button on:click={updateMatcap}>
			<img
				loading="lazy"
				class="border-primary border-solid border-[1px] p-0.5 rounded-full"
				src={`/matcap/material-${index}.png`}
				alt="Material"
			/>
		</button>
	</div>
</div>
