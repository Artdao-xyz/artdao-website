<script>
    import { createEventDispatcher } from 'svelte';
    import * as config from '$lib/config.js';
    
    const dispatch = createEventDispatcher();
    export let index;

    let footer, material;

    $:if (footer) {
        footer.style.backgroundColor = config.default.estilos[index].color;
    }

    $:if (material) {
        material.style.borderColor = config.default.estilos[index].icon;
    }

    const updateMatcap = _ => {
        index++;
        index >= config.default.estilos.length ? index = 0 : null;
    }

    const handleButtonClick = () => {
        updateMatcap();
        const matcap = index;
        dispatch('matcapUpdate', { matcap });
    };
</script>

<div bind:this={footer} class="hidden lp:col-span-2 flex-none lp:flex lp:items-center justify-end lp:gap-6">
    <div class="flex items-center justify-between gap-6">
        <a href={'https://twitter.com/Artdao_xyz'} target="_blank"><img class="" src={`/x-${config.default.estilos[index].icon}.svg`} alt="X Logo"></a> 
        <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"><img src={`/instagram-${config.default.estilos[index].icon}.svg`} alt="Instagram Logo"></a> 
        <a href={'#'} class='text-base underline font-medium flex gap-2'>Join our Discord<img src={`/link-arrow-${config.default.estilos[index].icon}.svg`} alt="Link Arrow"></a>
    </div>
    <div class="flex items-center">
        <button on:click={handleButtonClick}>
            <img bind:this={material} class="p-0.5 border-solid border-[1px] rounded-full" src="/material.png" alt="Material">
        </button>
    </div>
</div>
