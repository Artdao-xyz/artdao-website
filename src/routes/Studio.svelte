<script>
    import * as config from '$lib/config.js';
    import Contact from './Contact.svelte';
    import { createEventDispatcher } from 'svelte';

    export let index;
    
    let isFooter = false;
    let arrow = false;

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
        <p class="text-xl font-medium tracking-wider leading-5">Between art and branding</p>
        <a on:click={handleFooterUpdated} href={'#'} class='bg-black w-fit py-1 px-6 rounded-3xl'><img bind:this={arrow} src="/arrow-up.svg" alt="hyperlink"></a>
    </div>
    <Contact on:matcapUpdate={handleMatcapUpdated} />
</div>
