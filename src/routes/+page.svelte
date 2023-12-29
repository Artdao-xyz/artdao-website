<script>
    import '/src/style.css';
    import * as THREE from 'three';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onDestroy, onMount } from 'svelte';
    import * as config from '$lib/config.js';
    import MetaSymbol from '$lib/MetaSymbol.js';
	import Header from './Header.svelte';
	import Live from './Live.svelte';
    import Main from './Main.svelte';
	import Loading from './Loading.svelte';
    import Events from './Events.svelte';
    import section from '$lib/section.js'
    import Drop from './Drop.svelte';
    import Drops from './Drops.svelte';
    import Studio from './Studio.svelte';
	import Contact from './Contact.svelte';
	import Mission from './Mission.svelte';
    import { fade } from 'svelte/transition';

    let canvas, footer;
    let index = 0;
    let progress = 0;
    let loaded = false;
    let metaSymbol = null;
    let textures = [];
    
    let live_sticker = '/goat-psipsi.png';
    let live_banner = '/banner-psipsikoko.png';
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
        const camera = new THREE.PerspectiveCamera(30.0, sizes.width / sizes.height, 0.001, 1000.0);
        camera.position.set(0.0, 0.0, 200.0);
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

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        };

        onscroll = (e) => {
            console.log('scrolling')
            const scrollY = window.scrollY
            newSection = Math.round(scrollY / sizes.height)
            if (newSection != currentSection) {
                currentSection = newSection
                }
        };    
    })

    onDestroy(() => {})

    const setSection = (index) => {
        newSection = index;
        window.scrollTo(0, newSection *  window.innerHeight)
    }
    
    const handleMatcapUpdated = (e) => {
        index = e.detail.matcap;
        metaSymbol.changeTexture(index)        
        console.log(index)
        return index
    };

    let isFooter = false;
    const handleFooterUpdated = (e) => {
       isFooter = e.detail.isFooter;
    };
</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 z-[-10]"></canvas>
<div class='font-clash-display font-normal uppercase max-w-[1440px] w-screen m-auto'>
    
    {#if loaded}

        <Header currentSection={currentSection} setSection={setSection} matcapIndex={index} />

        <Live source={live_assets} />
        <Main section={currentSection} />

        <footer bind:this={footer} class={isFooter ? "transition-height duration-1000 ease-in-out sticky py-9 px-20 bottom-0 left-0 h-[85vh] border-solid border-b-0 border-[1px] border-black rounded-t-lg" : "transition-height duration-1000 ease-in-out sticky py-9 px-20 bottom-0 left-0 h-[10vh] truncate border-solid border-b-0 border-[1px] border-black rounded-t-lg" }>
            {#if currentSection == 0}
                <Mission  on:footerUpdate={handleFooterUpdated} on:matcapUpdate={handleMatcapUpdated} index={index} isFooter={isFooter}/>
            {:else if currentSection == 1}
                <Drops on:footerUpdate={handleFooterUpdated} on:matcapUpdate={handleMatcapUpdated} index={index} isFooter={isFooter}/>
            {:else if currentSection == 2}
                <Events on:footerUpdate={handleFooterUpdated} on:matcapUpdate={handleMatcapUpdated} index={index}/>
            {:else if currentSection == 3}
                <Studio on:footerUpdate={handleFooterUpdated} on:matcapUpdate={handleMatcapUpdated} index={index}/>
            {/if}
        </footer>

    {/if}

</div>

<Loading progress={progress}/>
