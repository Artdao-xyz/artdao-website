<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
	import MetaSymbol from '$lib/assets/MetaSymbol.js';
	import { indexStyleStore } from '$lib/store.js';

    export let textures;

	let canvas = null;
    let metaSymbol = null;
    let themes = ['', 'gum', 'dark'];

    const scene = new THREE.Scene();

	onMount(() => {

		/* SETTINGS */
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

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

        metaSymbol = new MetaSymbol(textures);
        scene.add(metaSymbol.getMesh());

		/* ANIMATION */
		const animate = () => {
			requestAnimationFrame(animate);
			metaSymbol.update();
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

		return () => {
			metaSymbol.dispose();
			renderPass.dispose();
			renderTarget.dispose();
		};
	});

    $: {
        if (metaSymbol)   {    
            metaSymbol.changeTexture($indexStyleStore);
            document.body.className = themes[$indexStyleStore];
        }
    }
</script>

<canvas bind:this={canvas} class="bg-transparent fixed top-0 left-0 z-10"></canvas>