<script>
    import '/src/style.css' ;    
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

    import { indexSectionStore, indexStyleStore } from '$lib/store.js';
	import Subscribe from '../lib/components/Subscribe.svelte';

    let canvas, footer, subheader, arrow;
    let index = 0;
    let progress = 0;
    let currentSection = 0;
    let newSection = 0;

    let loaded = false;
    let isOpen = false;

    let metaSymbol = null;
    let textures = [];
    let content = '';
    let themes = ['', 'gum', 'dark'];

    let live_sticker = '/live/live-psipsikoko-hammer.png';
    let live_banner = '/live/live-psipsikoko-banner.png';
    let live_assets = [live_sticker, live_banner]

    const scene = new THREE.Scene();
    const manager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader(manager);
    
    // export let form 
    // $: console.log(form)
    onMount (() => {
        
        /* SETTINGS */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        /* LOADERS */
        manager.onStart = (url, itemsLoaded, itemsTotal) => {
        }
        manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            progress = Math.round(itemsLoaded / itemsTotal * 100);
        }
        manager.onLoad = (e) => {
            loaded = true;
            metaSymbol = new MetaSymbol(textures)
            scene.add(metaSymbol.getMesh());
        }
        estilos.map((estilo)=>{
            textures.push(textureLoader.load(`/matcap/${estilo.texture_name}`))
        })

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
        const renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, { samples: 4, type: THREE.HalfFloatType });
        const renderPass = new RenderPass(scene, camera);
        const composer = new EffectComposer(renderer, renderTarget);
        composer.addPass(renderPass);


        /* ANIMATION */
        const animate = () => { 
            requestAnimationFrame(animate)
            
            loaded ? metaSymbol.update() : null;
            composer.render()
        };
        animate();

        /* RESIZE */

        onresize = (e) => {
            // Update sizes

            if (window.innerWidth !== sizes.width) {

                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                // Adjust camera position based on viewport size
                if (sizes.width < 1025) {
                    camera.position.y = 15;
                    camera.position.z = 300;
                } else {
                    camera.position.y = 0;
                    camera.position.z = 200;
                }

                // Update camera
                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

                // Update renderer
                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            }
           
        };

        onscroll = (e) => {
            const scrollY = window.scrollY
            newSection = Math.min(3, Math.round(scrollY / sizes.height));
            if (!isOpen) {
                if (newSection != currentSection) {
                    currentSection = newSection;
                    indexSectionStore.set(currentSection);
                }
            }
        };    
        
        /* STORES */
        indexStyleStore.subscribe(value => {
            if (loaded) {
                index = value;
                metaSymbol.changeTexture(index) ;
                document.body.classList = themes[index]; 
            }
        });

        // indexSectionStore.subscribe(value => {})

        return () => {
            metaSymbol.dispose();
            renderPass.dispose();
            renderTarget.dispose();
        }
    })

    const openFooter = _ => {
        if (isOpen) {
            document.body.style.overflowY = 'auto';
            isOpen = false;
            
        } else {
            document.body.style.overflowY = 'hidden';
            isOpen = true;
        }
    }

    $: if (subheader) {
        if (currentSection == 0) {
            content = 'By artists for artists'
            new TextScramble(subheader, content);

        } else if (currentSection == 1) {
            content = 'Artists driven drops on Fuel'
            new TextScramble(subheader, content);


        } else if (currentSection == 2) {
            content = 'Immersive global experiences'
            new TextScramble(subheader, content);


        } else if (currentSection == 3) {
            content = 'Between art and branding'
            new TextScramble(subheader, content);
        }
    }

</script>
<canvas bind:this={canvas} class="bg-background fixed top-0 left-0 z-[-20]"></canvas>

<!-- <svelte:body clas /> -->

{#if loaded}
    <Header/>
    
    <div class="text-primary font-clash-display font-normal uppercase mx-0 lp:mx-10 dp:max-w-[1440px] dp:mx-auto">
    
        <!-- <Live source={live_assets}/> -->
        <Main {isOpen}/>

        <!-- <button class="fixed left-1/2 transform -translate-x-1/2 top-3/4 lp:hidden" on:click={updateMatcap}>
            <img bind:this={material} class="p-0.5 border-[1px] rounded-full" src={`/material-${index}.png`} alt="Material">
        </button> -->


    </div>
    <footer bind:this={footer} class={`bg-background border-primary transition-height z-30 duration-100 ease-in-out font-clash-display font-normal uppercase sticky px-8 lp:px-24 bottom-0 left-0 border-b-0 border-t-[1px] ${isOpen ? `overflow-y-auto py-6 h-dvh` : "overflow-y-none pt-5 lp:pt-8 h-[65px] tb:h-[75px] lp:h-[100px]"}`}>
         
     <a on:click={openFooter} href={'#'} class="flex items-center lp:hidden"><img bind:this={arrow} class="mx-auto bg-primary py-1 px-6 rounded-3xl" src={`/arrow-${isOpen}-${estilos[index].secondary_media}.svg`} alt="hyperlink"></a>

         
         <div class="grid grid-cols-5 gap-4 items-center justify-between">
             <a class="text-primary text-sm lp:text-lg mx-auto lp:mx-0 text-center lp:text-left font-semibold tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 col-span-full lp:col-span-2 {isOpen ? '' : 'hidden lp:block'}" on:click={openFooter} href={"#"}><p bind:this={subheader}>{content}</p></a>
             <a on:click={openFooter} href={'#'} class="hidden col-span-1 lp:inline-flex items-center"><img bind:this={arrow} class="mx-auto bg-primary py-1 px-6 rounded-3xl" src={`/arrow-${isOpen}-${estilos[index].secondary_media}.svg`} alt="hyperlink" /></a>
             <Contact/>
         </div>
         
         {#if currentSection == 0}
             <Mission {isOpen}/>
         {:else if currentSection == 1}
             <Drops {isOpen}/>
         {:else if currentSection == 2}
             <Events {isOpen}/>
         {:else}
             <Studio {isOpen}/>
         {/if}

     </footer>
{/if}

<Loading {progress}/>