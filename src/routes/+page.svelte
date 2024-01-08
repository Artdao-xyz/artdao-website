<script>
    import '/src/style.css';    
    import { fade } from 'svelte/transition';
    import { onDestroy, onMount } from 'svelte';

    import * as THREE from 'three';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    
    import * as config from '$lib/config.js';
    import MetaSymbol from '$lib/MetaSymbol.js';
	
    import Header from '$lib/components/Header.svelte';
	import Live from '$lib/components/Live.svelte';
    import Main from '$lib/components/Main.svelte';
	import Loading from '$lib/components/Loading.svelte';
    import Events from '$lib/components/Events.svelte';
    import Drops from '$lib/components/Drops.svelte';
    import Studio from '$lib/components/Studio.svelte';
	import Mission from '$lib/components/Mission.svelte';
    import Contact from '$lib/components/Contact.svelte';

    let canvas, footer;
    let index = 0;
    let progress = 0;
    let loaded = false;
    let metaSymbol = null;
    let textures = [];
    
    let live_sticker = '/goat-psipsi.png';
    let live_banner = '/drop-psipsikoko_main.png';
    let live_assets = [live_sticker, live_banner]

    $: currentSection = 0;
    $: newSection = 0;

    $: if (canvas) {
        canvas.style.backgroundColor = config.default.estilos[index].color;
    }

    $: if (footer) {
        footer.style.backgroundColor = config.default.estilos[index].color;
    }

    const scene = new THREE.Scene();
    const manager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader(manager);

    onMount (() => {
        console.log('mounted')

        setSection(0);

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
        config.default.estilos.map((estilo)=>{
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
        };

        onscroll = (e) => {
            const scrollY = window.scrollY
            newSection = Math.round(scrollY / sizes.height)
            if (newSection != currentSection) {
                currentSection = newSection
                }
        };    

        return () => {
            renderPass.dispose();
            renderTarget.dispose();
            metaSymbol.dispose();
            canvas.remove();
            canvas = null;

        }
    })

    const setSection = (index) => {
        newSection = index;
        window.scrollTo(0, newSection *  window.innerHeight)
    }
    
    const handleMatcapUpdated = (e) => {
        index = e.detail.matcap;
        metaSymbol.changeTexture(index)        
        return index
    };

    let isFooter = false;
    let arrow = true;
    const openFooter = _ => {
        if (isFooter) {
            console.log(isFooter)
            isFooter = false;
        } else {
            console.log(isFooter)
            isFooter = true;
        }
    }

    const updateMatcap = _ => {
        index++;
        index >= config.default.estilos.length ? index = 0 : null;
        metaSymbol.changeTexture(index)        
    }

</script>
<!-- bg-black tb:bg-purple-500 lp:bg-green-600 dp:bg-blue-600  -->
<canvas bind:this={canvas} class="fixed top-0 left-0 z-[-10]"></canvas>
{#if loaded}
    <Header currentSection={currentSection} setSection={setSection} matcapIndex={index} />
    
    <div class='text-{config.default.estilos[index].fontColor} font-clash-display font-normal uppercase mx-5 lp:mx-10 dp:max-w-[1440px] dp:mx-auto'>
    
        <Live source={live_assets}/>
        <Main section={currentSection}/>

        <button class="fixed left-1/2 transform -translate-x-1/2 top-3/4 lp:hidden" on:click={updateMatcap}>
            <img class="p-0.5 border-solid border-[1px] border-{config.default.estilos[index].icon} rounded-full" src="/material.png" alt="Material">
        </button>

        <footer bind:this={footer} class="overflow-y-auto
        lp:overflow-y-visible border-{config.default.estilos[index].icon} transition-height duration-1000 ease-in-out sticky px-8 lp:px-24 bottom-0 left-0 border-b-0 border-[1px] rounded-t-lg { isFooter ? "py-6 h-[75vh] lp:h-[85vh]" : "pt-6 h-[7.5vh]"}">
            <a on:click={openFooter} href={'#'} class="flex items-center lp:hidden"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>

            {#if currentSection == 0}

                <div class="lp:flex lp:items-center lp:justify-between" in:fade={{ delay: 450, duration: 750 }} out:fade={{ delay: 250, duration: 150 }} >
                    <p class="text-sm lp:text-xl text-center font-medium tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 {isFooter ? "" : "hidden lp:block" }">By artists for artists</p>
                    <a on:click={openFooter} href={'#'} class="hidden lp:flex items-center"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>
                    <Contact on:matcapUpdate={handleMatcapUpdated} index={index}/>
                </div>
                <!-- {#if isFooter} -->
                    <Mission isFooter={isFooter}/>
                <!-- {/if} -->
            {:else if currentSection == 1}
            
                <div class="lp:flex lp:items-center lp:justify-between" in:fade={{ delay: 450, duration: 750 }} out:fade={{ delay: 250, duration: 150 }} >
                    <p class="text-sm lp:text-xl text-center font-medium tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 {isFooter ? "" : "hidden lp:block" }">Artists drive drops on fuel</p>
                    <a on:click={openFooter} href={'#'} class="hidden lp:flex items-center"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>
                    <Contact on:matcapUpdate={handleMatcapUpdated} index={index}/>
                </div>
                <!-- {#if isFooter} -->
                    <Drops isFooter={isFooter}/>
                <!-- {/if} -->
            {:else if currentSection == 2}
            
                <div class="lp:flex lp:items-center lp:justify-between" in:fade={{ delay: 450, duration: 750 }} out:fade={{ delay: 250, duration: 150 }} >
                    <p class="text-sm lp:text-xl text-center font-medium tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 {isFooter ? "" : "hidden lp:block" }">Immersive global experiences</p>
                    <a on:click={openFooter} href={'#'} class="hidden lp:flex items-center"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>
                    <Contact on:matcapUpdate={handleMatcapUpdated} index={index}/>
                </div>
                <!-- {#if isFooter} -->
                    <Events isFooter={isFooter}/>
                <!-- {/if} -->
                
            {:else if currentSection == 3}
            
                <div class="h-fit lp:flex lp:items-center lp:justify-between" in:fade={{ delay: 450, duration: 750 }} out:fade={{ delay: 250, duration: 150 }} >
                    <p class="text-sm lp:text-xl text-center font-medium tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 {isFooter ? "" : "hidden lp:block" } ">Between art and branding</p>
                    <a on:click={openFooter} href={'#'} class="hidden  lp:flex items-center"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>
                    <Contact on:matcapUpdate={handleMatcapUpdated} index={index}/>
                </div>
                <!-- {#if isFooter} -->
                    <Studio isFooter={isFooter}/>
                <!-- {/if} -->
            {/if}
        </footer>
    </div>
{/if}


<Loading progress={progress}/>
