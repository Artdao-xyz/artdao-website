<script>
	import { estilos } from '$lib/utils/config.js';
	import { onMount } from 'svelte';
	import { indexSectionStore, indexStyleStore, isOpenStore } from '$lib/store.js';
	import { Menu, Close } from 'svelte-ionicons';
	import iosInnerHeight from '$lib/utils/iosInnerHeight.js';
	import Control from './Control.svelte';

	let index = 0;
	let header;

	onMount(() => {
		indexStyleStore.subscribe((value) => {
			index = value;
		});
	});
</script>

<header
	bind:this={header}
	class="bg-background text-primary font-clash-display sticky top-0 left-0 max-w-screen p-4 lp:pt-6 lp:px-14 lp:pb-0 z-30 dp:max-w-[1440px] dp:mx-auto"
>
	<nav class="flex justify-between items-center mx-auto">
		<div class="lp:self-start">
			<a href="/"
				><img
					loading="lazy"
					src={`/artdao-logo-${estilos[index].primary_media}.svg`}
					alt="Artdao Logo"
				/></a
			>
		</div>
        <Control />
	</nav>
</header>
