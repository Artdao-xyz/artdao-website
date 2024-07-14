import * as THREE from 'three';
import { estilos } from '$lib/utils/config.js';
import { progress } from '$lib/store.js'

let images = [];
let textures = [];
const textureLoader = new THREE.TextureLoader();

const preloadAssets = async (urls) => {
    let loadedAssets = 0;
    let nAssets = estilos.length + urls.length;

    estilos.map((estilo) => {
        textures.push(textureLoader.load(`/matcap/${estilo.texture_name}`));
        loadedAssets++;
        progress.set((loadedAssets / nAssets) * 100);
    });


    const promises = urls.map((url) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
            loadedAssets++;
            progress.set((loadedAssets / nAssets) * 100);
        };
        img.onerror = reject;
    }));

    images = await Promise.all(promises);

    const assets = {
        images : images,
        textures : textures,
    }

    console.log(assets)

    return assets;
}

export default preloadAssets;