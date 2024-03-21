<script>
	import '/src/style.css';
	import { onMount } from 'svelte';

	import * as THREE from 'three';
	import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

	import { estilos } from '$lib/config.js';
	import MetaSymbol from '$lib/MetaSymbol.js';
	import TextScramble from '$lib/TextScramble.js';

	import Header from '$lib/components/Header.svelte';
	import Live from '$lib/components/Live.svelte';
	import Main from '$lib/components/Main.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Events from '$lib/components/Events.svelte';
	import Drops from '$lib/components/Drops.svelte';
	import Studio from '$lib/components/Studio.svelte';
	import Mission from '$lib/components/Mission.svelte';
	import Contact from '$lib/components/Contact.svelte';

	import { indexSectionStore, indexStyleStore, isOpenStore } from '$lib/store.js';
	import Control from '../lib/components/Control.svelte';

	let canvas, footer, subheader, arrow;
	let index = 0;
	let progress = 0;
    let currentSection;

	let loaded = false;
	let isOpen = false;
	let metaSymbol = null;
	let textures = [];
	let content = '';
	let themes = ['', 'gum', 'dark'];

	// let live_sticker = '/live/live-psipsikoko-hammer.png';
	// let live_banner = '/live/live-psipsikoko-banner.png';
	let live_sticker = '/live/live-orb-sticker.png';
	let live_banner = '/live/live-orb-banner.png';
	let live_assets = [live_sticker, live_banner];

	const scene = new THREE.Scene();
	const manager = new THREE.LoadingManager();
	const textureLoader = new THREE.TextureLoader(manager);

	onMount(() => {
		/* SETTINGS */
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		/* LOADERS */
		manager.onStart = (url, itemsLoaded, itemsTotal) => {};
		manager.onProgress = (url, itemsLoaded, itemsTotal) => {
			progress = Math.round((itemsLoaded / itemsTotal) * 100);
		};
		manager.onLoad = (e) => {
			loaded = true;
			metaSymbol = new MetaSymbol(textures);
			scene.add(metaSymbol.getMesh());
		};
		estilos.map((estilo) => {
			textures.push(textureLoader.load(`/matcap/${estilo.texture_name}`));
		});

		/* SCENE */
		const camera = new THREE.PerspectiveCamera(35.0, sizes.width / sizes.height, 0.001, 1000.0);
		if (sizes.width < 1025) {
			camera.position.y = 15;
			camera.position.z = 300;
		} else {
			camera.position.z = 200;
		}

		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
			premultipliedAlpha: false
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(sizes.width, sizes.height);
		const renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
			samples: 4,
			type: THREE.HalfFloatType
		});
		const renderPass = new RenderPass(scene, camera);
		const composer = new EffectComposer(renderer, renderTarget);
		composer.addPass(renderPass);

		/* ANIMATION */
		const animate = () => {
			requestAnimationFrame(animate);

			loaded ? metaSymbol.update() : null;
			composer.render();
		};
		animate();

		/* RESIZE */

		onresize = (e) => {
			// Update sizes

			if (window.innerWidth !== sizes.width) {
				sizes.width = window.innerWidth;
				sizes.height = window.innerHeight;

				// Adjust camera position based on viewport size
				if (sizes.width < 1025) {
					camera.position.y = 15;
					camera.position.z = 300;
				} else {
					camera.position.y = 0;
					camera.position.z = 200;
				}

				// Update camera
				camera.aspect = sizes.width / sizes.height;
				camera.updateProjectionMatrix();

				// Update renderer
				renderer.setSize(sizes.width, sizes.height);
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			}
		};



		/* STORES */
		indexStyleStore.subscribe((value) => {
			if (loaded) {
				index = value;
				metaSymbol.changeTexture(index);
				document.body.classList = themes[index];
			}
		});

		isOpenStore.subscribe((value) => {
			isOpen = value;
		});

		indexSectionStore.subscribe(value => {
                currentSection = value;
        })

		return () => {
			metaSymbol.dispose();
			renderPass.dispose();
			renderTarget.dispose();
		};
	});

	const openFooter = (_) => {
		isOpen = !isOpen;
		isOpenStore.set(isOpen);
		document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
		footer.style.overflowY = isOpen ? 'auto' : 'hidden';
	};

	$: if (subheader) {
		if (currentSection == 0) {
			content = 'artists helping artists';
			new TextScramble(subheader, content);
		} else if (currentSection == 1) {
			content = 'artists driven drops on fuel';
			new TextScramble(subheader, content);
		} else if (currentSection == 2) {
			content = 'immersive art experiences';
			new TextScramble(subheader, content);
		} else if (currentSection == 3) {
			content = 'between art and branding';
			new TextScramble(subheader, content);
		}
	}
</script>

<canvas bind:this={canvas} class="bg-transparent fixed top-0 left-0 z-10"></canvas>

<div class="bg-background">

{#if loaded}

    {#if !isOpen}
        <Header />
    {/if}

	<div class="text-primary font-clash-display font-normal uppercase lp:mx-10 dp:max-w-[1440px] dp:mx-auto">
		<Live source={live_assets}/>
		<Main />

		<!-- <button class="fixed left-1/2 transform -translate-x-1/2 top-3/4 lp:hidden" on:click={updateMatcap}>
            <img loading="lazy" bind:this={material} class="p-0.5 border-[1px] rounded-full" src={`/material-${index}.png`} alt="Material">
        </button> -->
    </div>

	<footer
		bind:this={footer}
		class={`bg-background transition-height duration-100 ease-in-out flex flex-col w-full lp:w-[95%] dp:max-w-[1440px] lp:mx-auto my-auto -translate-x-1/2 mx-auto font-clash-display font-normal z-20 fixed lp:px-8 bottom-0 left-1/2 shadow-custom  lp:rounded-t-2xl ${isOpen ? "py-6 h-dvh lp:h-[95%] bottom-1/2 translate-y-1/2 lp:rounded-2xl" : "pt-5 lp:pt-8 h-[10%]"}`}
	>

		<div class="grid grid-cols-5 gap-4 items-center justify-between">

            <!-- MOBILE -->
            <div class="lp:hidden invisible col-span-1">
            </div>
            <a on:click={openFooter} href={'#'} 
            class="lp:hidden col-span-3">
                <img
                loading="lazy"
                bind:this={arrow}
                class="mx-auto py-1 px-6 rounded-3xl"
                src={`/arrow-${isOpen}-${estilos[index].primary_media}.svg`}
                alt="hyperlink"
                />
            </a>
            {#if isOpen}
                <div class="lp:hidden col-span-1 z-30">
                    <Control />
                </div>
            {/if}

            <!-- DESKTOP -->

			<a
				class="self-start text-primary text-sm lp:text-xl mx-auto lp:mx-0 text-center lp:text-left tracking-wider leading-5 mt-6 lp:mt-0 mb-2 lp:mb-0 col-span-full lp:col-span-2 text-nowrap {isOpen
					? ''
					: 'hidden lp:block'}"
				on:click={openFooter}
				href={'#'}><p bind:this={subheader}>{content}</p></a
			>
			<a on:click={openFooter} href={'#'} class="hidden col-span-1 lp:inline-flex items-center self-start"
				><img
					loading="lazy"
					bind:this={arrow}
					class="mx-auto py-1 px-6 rounded-3xl"
					src={`/arrow-${isOpen}-${estilos[index].primary_media}.svg`}
					alt="hyperlink"
				/></a
			>

            <!-- <div class="flex items-center lp:hidden">
                <a on:click={openFooter} href={'#'} class="">
                    <img
                        loading="lazy"
                        bind:this={arrow}
                        class="mx-auto py-1 px-6 rounded-3xl"
                        src={`/arrow-${isOpen}-${estilos[index].primary_media}.svg`}
                        alt="hyperlink"
                    />
                </a>
                <Control />
                </div> -->
            {#if !isOpen}
                <div class="hidden lp:grid lp:col-span-2 z-20">
                    <Contact />
                </div>
            {:else}
                <div class="hidden lp:grid lp:col-span-2 z-20">
                    <Control />
                </div>
            {/if}






            
		</div>

		{#if currentSection == 0 && isOpen}
			<Mission />
		{:else if currentSection == 1 && isOpen}
			<Drops />
		{:else if currentSection == 2 && isOpen}
			<Events />
		{:else if currentSection == 3 && isOpen}
			<Studio />
		{/if}
	</footer>

{/if}

</div>

<Loading {progress} />
