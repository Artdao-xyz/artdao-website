<script>
    import { onDestroy, onMount } from 'svelte'
    import * as THREE from 'three';
    import '/src/style.css'
    import * as config from '../lib/config.js'
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    import MetaSymbol from './metaSymbol.js'
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    let canvas, header, footer;
    let index = 0;
    let loaded = false;
    let metaSymbol = null;
    let textures = [];
    let progress_bar;
    let progress_bar_container;

    let isMoreInfo = false;
    let arrow;

    let body;

    let currentSection = 0;
    let newSection = 0;
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

        header.style.backgroundColor = config.default.estilos[index].color;
        footer.style.backgroundColor = config.default.estilos[index].color;
        canvas.style.backgroundColor = config.default.estilos[index].color;

        /* LOADERS */
        manager.onStart = (url, itemsLoaded, itemsTotal) => {
            body = document.querySelector('body');
        }
        manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            progress_bar.value = itemsLoaded / itemsTotal * 100;
        }
        manager.onLoad = (e) => {
            loaded = true;
            metaSymbol = new MetaSymbol(textures)
            scene.add(metaSymbol.getMesh());
            progress_bar_container.style.display = 'none';
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
        //add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.enableZoom = false;
        controls.update();


        /* ANIMATION */
        const animate = () => { 
            requestAnimationFrame(animate)
            
            loaded ? metaSymbol.update() : null;

            controls.update();
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
    const moreInfo = (index) => {
        currentSection = index;
        if (isMoreInfo) {
            isMoreInfo = false;
            arrow.src = '/arrow-up.svg';
        } else {
            isMoreInfo = true;
            arrow.src = '/arrow-down.svg';
        }
    }
    
    const updateMatcap = _ => {

        index++;
        index >= config.default.estilos.length ? index = 0 : null;

        header.style.backgroundColor = config.default.estilos[index].color;
        footer.style.backgroundColor = config.default.estilos[index].color;
        canvas.style.backgroundColor = config.default.estilos[index].color;
        metaSymbol.changeTexture(index, scene)        
    }

</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 z-[-10]"></canvas>
<div class='font-clash-display font-normal uppercase max-w-[1440px] w-screen m-auto'>

    <header bind:this={header} class="sticky top-0 left-0 flex justify-between items-center p-6">
        <div class="left-head">
            <a href={'#'}><img src="/artdao-logo.svg" alt="Artdao Logo"></a>
        </div>
        <nav>
            <ul class="font-semibold m-0 flex justify-between items-center gap-5 p-0">
                <li><a on:click={() => setSection(0)} class="{currentSection == 0 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s2.svg" alt="Section 1"><span class="{currentSection == 0 ? 'invert' : 'invisible'}">Mission</span></a></li> 
                <li><a on:click={() => setSection(1)} class="{currentSection == 1 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s2.svg" alt="Section 2"><span class="{currentSection == 1 ? 'invert' : 'invisible'}">drops</span></a></li>
                <li><a on:click={() => setSection(2)} class="{currentSection == 2 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s3.svg" alt="Section 3"><span class="{currentSection == 2 ? 'invert' : 'invisible'}">Events</span></a></li>
                <li><a on:click={() => setSection(3)} class="{currentSection == 3 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s4.svg" alt="Section 4"><span class="{currentSection == 3 ? 'invert' : 'invisible'}">Research</span></a></li>
                <li><a on:click={() => setSection(4)} class="{currentSection == 4 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s5.svg" alt="Section 5"><span class="{currentSection == 4 ? 'invert' : 'invisible'}">Studio</span></a></li>
            </ul>
        </nav>
    </header>
    
    {#if loaded}

    <main class="">
        <section class="min-h-[100vh] p-5">
            <h1 class="font-neue-power text-5xl font-medium tracking-wider mt-24">A laboratory<br>for emergent<br>culture</h1>
        </section>
        <section  class="min-h-[100vh] p-5">
            <h1 class="font-neue-power text-5xl font-medium tracking-wider mt-24">Bridging the<br>physical &<br>digital</h1>
        </section>
        <section class="min-h-[100vh] p-5">
            <h1 class="font-neue-power text-5xl font-medium tracking-wider mt-24">Embracing<br>new kinds of<br>art</h1>
        </section>
        <section class="min-h-[100vh] p-5">
            <h1 class="font-neue-power text-5xl font-medium tracking-wider mt-24">Research</h1>
        </section>
        <section class="min-h-[100vh] p-5">
            <h1 class="font-neue-power text-5xl font-medium tracking-wider mt-24">Studio</h1>
        </section>
    </main>

    {/if}
    <footer bind:this={footer} class={isMoreInfo ? "transition-height duration-1000 ease-in-out sticky p-9 bottom-0 left-0 h-[90vh] border-solid border-b-0 border-[1px] border-black rounded-t-lg" : "transition-height duration-1000 ease-in-out sticky p-9 bottom-0 left-0 h-[10vh] truncate border-solid border-b-0 border-[1px] border-black rounded-t-lg" }>
        
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-3">
                <p class="text-[24px] font-medium tracking-wider">By artists for artists</p>
                <a on:click={() => moreInfo(currentSection)} href={'#'} class='bg-black w-fit py-1 px-6 rounded-3xl'><img bind:this={arrow} src="/arrow-up.svg" alt="hyperlink"></a>
            </div>
            <div class="flex justify-between items-center gap-6">
                <button class="" on:click={()=> updateMatcap() }><img class="p-0.5 border-solid border-[1px] border-black rounded-full" src="/material.png" alt="Material"></button>
                <a href={'https://twitter.com/Artdao_xyz'} target="_blank"><img class="" src="/x.svg" alt="X Logo"></a> 
                <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"><img src="/instagram.svg" alt="Instagram Logo"></a> 
                <a href={'#'} class='text-base underline font-medium flex gap-2'>Join our Discord<img src="/link-arrow.svg" alt="Link Arrow"></a>
            </div>
        </div>

        <div class="{isMoreInfo ? "transition-opacity opacity-100" : "transition-opacity opacity-0"}">
            <div class="{currentSection == 0 ? "" : "hidden"}">
                <h1 class="font-neue-power text-[54px] font-semibold tracking-wider mt-36">Mission</h1>
                <hr class="border-black	my-9 w-3/6	">
                <p class="text-2xl normal-case leading-7 ">We believe in a world where artists are involved in the distribution of culture.
                    Bridging the hyperlocal and global to form networked collectives 
                    incubation/development of emergent artistry as it manifests across domains of digital art, experiential experiences and tangible objects
                    have we can utilise new forms of self-sovereign technologies, put them in service of “art”.</p>
            </div>
            
            <div class="{currentSection == 1 ? "" : "hidden"}">
                <h1 class="font-neue-power text-[54px] font-semibold tracking-wider mt-36">Drops</h1>
                <hr class="border-black	my-9 w-3/6	">
                <p class="text-2xl normal-case leading-7 ">Drops are where artdao delves deep into developing artistic projects in ways that no one else can. Working closely with artists over the course of 3-6 months to develop their own ideas into a stand-alone drop, online experience and physical exhibition.  </p>
            </div>

            <div class="{currentSection == 2 ? "" : "hidden"}">
                <h1 class="font-neue-power text-[54px] font-semibold tracking-wider mt-36">Embracing the future</h1>
                <hr class="border-black	my-9 w-3/6	">
                <p class="text-2xl normal-case leading-7 ">We believe in a world where artists are involved in the distribution of culture. 
                    Bridging the hyperlocal and global to form networked collectives incubation/development of emergent artistry as it manifests across domains of digital art, experiential experiences and tangible objects have we can utilise new forms of self-sovereign technologies, put them in service of “art”.
                </p>
            </div>

            <div class="{currentSection == 3 ? "" : "hidden"}">
                <h1 class="font-neue-power text-[54px] font-semibold tracking-wider mt-36">Research</h1>
                <hr class="border-black	my-9 w-3/6	">
                <p class="text-2xl normal-case leading-7 ">Exhibitions are how we connect with the physical world and the collective experience of art. Working closely with those in the local scene to produce immersive experiences which bring together new audiences at the intersection of digital art, contemporary culture and self-sovereign technologies</p>
            </div>

            <div class="{currentSection == 4 ? "" : "hidden"}">
                <h1 class="font-neue-power text-[54px] font-semibold tracking-wider mt-36">Studio</h1>
                <hr class="border-black	my-9 w-3/6	">
                <p class="text-2xl normal-case leading-7 ">Aesthetic resonances cut to the heart of cultural communication. a force of gravity upon the collective unconscious that pulls together ideas, energy and capital as new forms of human organisation. We work with the worlds leading digital artists. Balancing asset creation, style and composition to develop original brand identities that cut through the noise. Harness the mimetic powers of digital culture to drive your project forward. The Studio is where we direct artistic talent into the creation of identities for brands and projects. Involving a deep understanding of artistic expression in how we construct their affective communication.</p>
            </div>
        </div>

    </footer>
    <!-- <div class="card">
        <div class="card text">
            <p>Soon</p>
            <img src="/live.svg" alt="Live">
        </div>
        <div>
            <img src="" alt="">
        </div>
    </div> -->

</div>

<div class="bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col justify-center items-center" bind:this={progress_bar_container}>
    <label class="text-white text-4xl h-[5%]" for="{progress_bar}">Loading...</label>
    <progress class="w-1/3 h-[2%] mt-[0.5%]" bind:this={progress_bar} value="0" max="100"></progress>
</div>

<style>

</style>
