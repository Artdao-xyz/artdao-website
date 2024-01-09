<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import * as config from '$lib/config.js';

    export let isFooter = false;
    export let index;
    
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

    const handleFooterUpdated = () => {
        openFooter();
        dispatch('footerUpdate', { isFooter });
    };

</script>

{#if isFooter}      
    <div in:fade={{ delay: 250, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }} class="text-{config.default.estilos[index].logo} h-full flex justify-start items-center leading-10 normal-case tracking-[1px]">
        <div class="lp:w-1/2">
            <p class="mb-8">
                We experiment with new forms of self-sovereign technologies and the affective force of artistic originality as they coalesce within modern cities and disperse across global networks of communication.
            </p>
            <p class="mb-8">
                Developing symbiotic systems in which the creation and distribution of culture come together within new structures of organisation and ownership. 
            </p>
            <p>
                Bridging the hyperlocal and global to create new mechanisms for the discovery, curation and proliferation of emergent artistry as it materialises across new terrains.
            </p>
        </div>
    </div>
{/if}