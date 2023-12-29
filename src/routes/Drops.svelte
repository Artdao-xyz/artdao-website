<script>
    import * as config from '$lib/config.js';
    import Contact from './Contact.svelte';
    import { createEventDispatcher } from 'svelte';
	import Drop from './Drop.svelte';
    import { fade } from 'svelte/transition';

    console.log(fade);

    export let index;
    
    export let isFooter;

    let arrow = false;

    let drop1_banner = '/drop-psipsikoko.png';
    let drop1_name = "Psipsikoko"

    const dispatch = createEventDispatcher();

    const openFooter = _ => {
        if (isFooter) {
            isFooter = false;
            arrow.src = '/arrow-up.svg';
        } else {
            isFooter = true;
            arrow.src = '/arrow-down.svg';
        }
    }

    const updateMatcap = _ => {
        index++;
        index >= config.default.estilos.length ? index = 0 : null;
    }

    const handleMatcapUpdated = () => {
        updateMatcap();
        const matcap = index;
        dispatch('matcapUpdate', { matcap });
    };
    
    const handleFooterUpdated = () => {
        openFooter();
        dispatch('footerUpdate', { isFooter });
    };
</script>

<div class="flex justify-between items-center">
    <div class="flex justify-start items-center gap-3">
        <p class="text-xl font-medium tracking-wider leading-5">Artist driven drops on fuel</p>
        <a on:click={handleFooterUpdated} href={'#'} class='bg-black w-fit py-1 px-6 rounded-3xl'><img bind:this={arrow} src="/arrow-up.svg" alt="hyperlink"></a>
    </div>
    <Contact on:matcapUpdate={handleMatcapUpdated} />
</div>

{#if isFooter}
    <div class="h-full flex flex-col justify-center"
        in:fade={{ delay: 250, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }}>
        
        <div class="flex items-center gap-8 ">
            <Drop banner={drop1_banner} name={drop1_name} />
            <Drop banner={drop1_banner} name={drop1_name} />
            <Drop banner={drop1_banner} name={drop1_name} />
        </div>
    </div>
{/if}

