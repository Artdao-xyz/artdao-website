<script>
	import { onMount } from 'svelte';
	import { indexStyle } from '$lib/store.js';
	import { fade } from 'svelte/transition';
	import Subscribe from './Subscribe.svelte';
	import Contact from './Contact.svelte';
</script>

<div 
    in:fade={{ delay: 100, duration: 150 }}
    out:fade={{ delay: 100, duration: 25 }}
    
    class="lp:w-full h-full text-primary text-base lp:text-2xl font-normal lp:font-light tracking-wide lp:mx-auto flex flex-col items-center justify-center flex-grow">

    <div class="lp:w-2/3 dp:w-1/2 px-4 lp:p-0 flex-grow flex flex-col justify-center">
        <div class="lp:flex items-center justify-between flex-grow">
        <p class="">
            We experiment with new forms of self-sovereign technologies and the affective force of artistic
            originality as they coalesce within modern cities and disperse across global networks of
            communication.
        </p>
        <img class="hidden lp:block w-1/6" src="/mission/symbol1.png" alt="">
        </div>
        <div class="lp:flex items-center justify-between flex-grow">
            <img class="hidden lp:block w-1/6" src="/mission/symbol2.png" alt="">
            <p class="">
                To develop symbiotic systems in which the creation and distribution of culture come together
                within new structures of organisation and ownership.
            </p>
        </div>
        <div class="lp:flex items-center justify-between flex-grow">
        <p class="">
            Bridging the global and hyperlocal to create new mechanisms for the discovery, curation and
            proliferation of emergent artistry as it materialises across new terrains.
        </p>
            <img class="hidden lp:block w-1/6" src="/mission/symbol3.png" alt="">
        </div>
    </div>

    <div class="hidden w-full lp:flex items-end flex-shrink justify-between">
        <Subscribe />
        <Contact />
    </div>

    <div class=" flex lp:hidden items-center justify-between">
        <div class="w-fit">
        <img class="scale-75" src="/mission/symbol1.png" alt="">
        </div>
        <div class="w-fit">
        <img class="scale-75" src="/mission/symbol2.png" alt="">
        </div>
        <div class="w-fit">
        <img class="scale-75" src="/mission/symbol3.png" alt="">
        </div>
    </div>
</div>
    

