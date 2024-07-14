<script>
	import '/src/style.css';

	import { estilos } from '$lib/utils/config.js';
	import TextScramble from '$lib/utils/TextScramble.js';

	import Header from '$lib/components/Header.svelte';
	import Live from '$lib/components/Live.svelte';
	import Main from '$lib/components/Main.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Events from '$lib/components/Events.svelte';
	import Drops from '$lib/components/Drops.svelte';
	import Studio from '$lib/components/Studio.svelte';
	import Mission from '$lib/components/Mission.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Control from '$lib/components/Control.svelte';
	import Metaball from '$lib/components/Metaball.svelte';

	import { indexSectionStore, isOpenStore } from '$lib/store.js';
	import images from '$lib/assets/images.js'
	import preloadAssets from '$lib/utils/loader.js';


	const preloadPromise = preloadAssets(images)

	let footer, subheader, arrow;
	let index = 0;

	// let live_sticker = '/live/live-psipsikoko-hammer.png';
	// let live_banner = '/live/live-psipsikoko-banner.png';
	let live_sticker = '/live/live-orb-sticker.png';
	let live_banner = '/live/live-orb-banner.png';
	let live_assets = [live_sticker, live_banner];

	const openFooter = (_) => {
		$isOpenStore = !$isOpenStore;
		isOpenStore.set($isOpenStore);
		document.body.style.overflowY = $isOpenStore ? 'hidden' : 'auto';
		footer.style.overflowY = $isOpenStore ? 'auto' : 'hidden';
	};

	const content = [
		'artists helping artists',
		'artists driven drops on fuel',
		'immersive art experiences',
		'between art and branding'
	]

	$: if (subheader) {
			new TextScramble(subheader, content[$indexSectionStore]);
	}
</script>

{#await preloadPromise}
	<Loading/>
{:then assets}
	<Metaball textures={assets.textures}/>

	<div class="bg-background">
			{#if !$isOpenStore}
				<Header />
			{/if}
		
			<div class="text-primary font-clash-display font-normal uppercase lp:mx-10 dp:max-w-[1440px] dp:mx-auto">
				<!-- <Live source={live_assets}/> -->
				<Main/>
			</div>
		
			<footer
				bind:this={footer}
				class={`bg-background transition-height duration-100 ease-in-out flex flex-col w-full lp:w-[95%] dp:max-w-[1440px] lp:mx-auto my-auto -translate-x-1/2 mx-auto font-clash-display font-normal z-20 fixed lp:px-6 bottom-0 left-1/2 shadow-custom  lp:rounded-t-2xl ${$isOpenStore ? "p-4 h-dvh lp:h-[97%] bottom-1/2 translate-y-1/2 lp:rounded-2xl" : "pt-5 pb-0 lp:pt-8 h-[10%]"}`}
			>
		
				<div class="grid grid-cols-5 gap-4 items-center justify-between">
		
					<!-- MOBILE -->
					<div class="lp:hidden invisible col-span-1">
					</div>
					<button on:click={openFooter}
					class="lp:hidden col-span-3">
						<img
						
						bind:this={arrow}
						class="mx-auto py-1 px-6 rounded-3xl"
						src={`/arrow-${$isOpenStore}-${estilos[index].primary_media}.svg`}
						alt="hyperlink"
						/>
				</button>
					{#if $isOpenStore}
						<div class="lp:hidden col-span-1 z-30">
							<Control />
						</div>
					{/if}
		
					<!-- DESKTOP -->
					<button
						class="self-start text-primary text-lg lp:text-xl mx-auto lp:mx-0 text-center lp:text-left tracking-wider leading-5 mt-4 lp:mt-0 mb-2 lp:mb-0 col-span-full lp:col-span-2 text-nowrap {$isOpenStore
							? ''
							: 'hidden lp:block'}"
						on:click={openFooter}
						><p bind:this={subheader}>{content}</p></button
					>
					<button on:click={openFooter} class="hidden col-span-1 lp:inline-flex items-center self-start"
						><img
							
							bind:this={arrow}
							class="mx-auto py-1 px-6 rounded-3xl"
							src={`/arrow-${$isOpenStore}-${estilos[index].primary_media}.svg`}
							alt="hyperlink"
						/></button
					>
					{#if $isOpenStore}
						<div class="hidden lp:grid lp:col-span-2 z-20">
							<Control />
						</div>
					{:else}
						<div class="hidden lp:grid lp:col-span-2 z-20">
							<Contact />
						</div>
					{/if}
				</div>
		
				{#if $indexSectionStore == 0 && $isOpenStore}
					<Mission />
				{:else if $indexSectionStore == 1 && $isOpenStore}
					<Drops/>
				{:else if $indexSectionStore == 2 && $isOpenStore}
					<Events />
				{:else if $indexSectionStore == 3 && $isOpenStore}
					<Studio />
				{/if}
			</footer>
		
		</div>
{:catch error}
	<div>there was an error: {error}</div>
{/await}



