<script>
	export let banner;
	export let banner_mobile;
	export let who;
	export let what;
	export let info;
	export let date;
	export let link;

	import { onMount, createEventDispatcher } from 'svelte';
	import { estilos } from '$lib/utils/config.js';
	import { indexStyleStore } from '$lib/store.js';

	const dispatch = createEventDispatcher();

	let index = 0;

	onMount(() => {
		const unsubscribe = indexStyleStore.subscribe((value) => {
			index = value;
		});

		return unsubscribe;
	});

	const closeEvent = () => {
		dispatch('closeEvent');
	};
</script>

<div
	class="fixed h-[80%] w-[95%] tb:w-1/2 tb:h-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-secondary lp:flex flex flex-col justify-between lp:mx-auto lp:rounded-md tracking-wider z-30 uppercase"
>
	<div class="flex justify-between p-6">
		<div class="flex items-center gap-2">
			<h1 class="text-2xl font-semibold">{who}</h1>
			<p class="text-xs font-semibold">{what}</p>
		</div>
		<button on:click={closeEvent}
			><img
				
				src={`/events/close-${estilos[index].secondary_media}.svg`}
				alt="Close"
			/></button
		>
	</div>
	<div class="w-full lp:w-full h-fit">
		<img
			
			class="hidden lp:block h-full w-full object-cover"
			src={banner}
			alt="Drop"
		/>
		<img
			
			class="lp:hidden h-full w-full object-cover"
			src={banner_mobile}
			alt="Drop"
		/>
	</div>

	<div class="text-sm tb:text-xl lp:text-sm uppercase px-6 py-4 lp:py-6 flex flex-col gap-2">
		<p class="font-semibold">{info}</p>
		<p class="text-sm">{date}</p>
		{#if link != "-"}
			<a href={link} target="_blank" class="underline flex items-center gap-2 underline-offset-2"
				>{who} website
				<img  src={`/link-arrow-${estilos[index].secondary_media}.svg`} alt="link" /></a
			>
		{:else}
			<p class="font-semibold">-</p>
		{/if}
	</div>
		
</div>
