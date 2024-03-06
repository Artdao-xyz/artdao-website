<script>
    export let isOpen = false;
    
    import { onMount } from 'svelte';
    import { indexStyleStore } from '$lib/store.js';
    import { fade } from 'svelte/transition';
    import Subscribe from './Subscribe.svelte';
    
    let index = 0;

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        return unsubscribe;
    });

</script>

    
    <div in:fade={{ delay: 50, duration: 150 }}
        out:fade={{ delay: 50, duration: 50 }} class="text-primary h-full font-semibold tb:mt-32 lp:my-auto lp:w-1/2 text-center lp:mx-auto lp:flex flex-col justify-center leading-6 uppercase tracking-[0.1px]">
        <br>
        <p>
            We experiment with new forms of self-sovereign technologies and the affective force of artistic originality as they coalesce within modern cities and disperse across global networks of communication.
        </p>
        <br>
        <p>
            To develop symbiotic systems in which the creation and distribution of culture come together within new structures of organisation and ownership. 
        </p>
        <br>
        <p>
            Bridging the global and hyperlocal to create new mechanisms for the discovery, curation and proliferation of emergent artistry as it materialises across new terrains.
        </p>

        <Subscribe/>
    </div>



