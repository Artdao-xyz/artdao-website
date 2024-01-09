<script>
    import '/src/style.css';    
    import { fade } from 'svelte/transition';
    import { onDestroy, onMount } from 'svelte';
    
    import * as THREE from 'three';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    
    import * as config from '$lib/config.js';
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

    let canvas, footer, material;
    let index = 0;
    let progress = 0;
    let loaded = false;
    let metaSymbol = null;
    let textures = [];
    let content = '';
    let subheader;

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
        footer.style.borderColor = config.default.estilos[index].icon;
    }

    $:if (material) {
        material.style.borderColor = config.default.estilos[index].icon;
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
            newSection = Math.min(3, Math.round(scrollY / sizes.height));
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
            isFooter = false;
        } else {
            isFooter = true;
        }
    }

    const handleFooterUpdated = (e) => {
        isFooter = e.detail.isFooter;
    };

    const updateMatcap = _ => {
        index++;
        index >= config.default.estilos.length ? index = 0 : null;
        metaSymbol.changeTexture(index)        
    }

    $: if (subheader) {
        if (currentSection == 0) {
            //set the content paragraph
            content = 'By artits for artists'
            new TextScramble(subheader, content);

        } else if (currentSection == 1) {
            //set the content paragraph
            content = 'Artists driven drops on Fuel'
            new TextScramble(subheader, content);


        } else if (currentSection == 2) {
            //set the content paragraph
            content = 'Immersive global experiences'
            new TextScramble(subheader, content);


        } else if (currentSection == 3) {
            //set the content paragraph
            content = 'Between art and branding'
            new TextScramble(subheader, content);
        }
    }

</script>
<!-- bg-black tb:bg-purple-500 lp:bg-green-600 dp:bg-blue-600  -->
<canvas bind:this={canvas} class="fixed top-0 left-0 z-[-20]"></canvas>
{#if loaded}
    <Header currentSection={currentSection} setSection={setSection} matcapIndex={index} />
    
    <div class='text-{config.default.estilos[index].fontColor} font-clash-display font-normal uppercase mx-5 lp:mx-10 dp:max-w-[1440px] dp:mx-auto'>
    
        <Live source={live_assets}/>
        <Main on:footerUpdate={handleFooterUpdated} section={currentSection} isFooter={isFooter}/>

        <button class="fixed left-1/2 transform -translate-x-1/2 top-3/4 lp:hidden" on:click={updateMatcap}>
            <img bind:this={material} class="p-0.5 border-solid border-[1px] border-{config.default.estilos[index].icon} rounded-full" src="/material.png" alt="Material">
        </button>


        <a on:click={openFooter} href={"#"}><footer bind:this={footer} class={`transition-height duration-1000 ease-in-out sticky px-8 lp:px-24 bottom-0 left-0 border-b-0 border-[1px] rounded-t-lg ${isFooter ? "overflow-y-auto py-6 [70vh] lp:h-[80vh]" : "overflow-y-none pt-6 h-[7.5vh]"}`}>
            <a href={'#'} class="flex items-center lp:hidden"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink"></a>

            
            <div class="grid grid-cols-5 gap-4 items-center justify-between">
                <p bind:this={subheader} class="text-sm lp:text-xl mx-auto lp:mx-0 text-center lp:text-left font-medium tracking-wider leading-5 mt-12 lp:mt-0 mb-6 lp:mb-0 col-span-full lp:col-span-2 {isFooter ? '' : 'hidden lp:block'}">{content}</p>
                <a href={'#'} class="hidden col-span-1 lp:inline-flex items-center"><img bind:this={arrow} class="mx-auto bg-black py-1 px-6 rounded-3xl" src={`/arrow-${isFooter}.svg`} alt="hyperlink" /></a>
                <Contact on:matcapUpdate={handleMatcapUpdated} index={index} />
            </div>
            
            {#if currentSection == 0}
                <Mission isFooter={isFooter}/>
            {:else if currentSection == 1}
                <Drops isFooter={isFooter}/>
            {:else if currentSection == 2}
                <Events isFooter={isFooter}/>
            {:else}
                <Studio isFooter={isFooter}/>
            {/if}

        </footer></a>
    </div>
{/if}


<Loading progress={progress}/>
