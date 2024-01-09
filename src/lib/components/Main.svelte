<script>
    import { createEventDispatcher } from 'svelte';
    import TextScramble from '$lib/TextScramble.js';

    export let section;
    export let isFooter;

    let content = '';
    let h1;

    const dispatch = createEventDispatcher();
    
    const handleFooterClick = () => {
        isFooter = false;
        dispatch('footerUpdate', { isFooter });
    }

    $: if (h1) {    
        if (section == 0) {
            content = 'A new age\nof culture';
            new TextScramble(h1, content);
        } else if (section == 1) {
            content = 'Bringing visionary\nart to life';
            new TextScramble(h1, content);
        } else if (section == 2) {
            content = 'Between the global\n& Hyperlocal';
            new TextScramble(h1, content);
        } else if (section == 3) {
            content = 'Artist driven\ndesign';
            new TextScramble(h1, content);
        }
    }

  </script>

<a on:click={handleFooterClick} class='cursor-default' href={"#"}><main>
    <section class="h-[400vh] p-5 flex justify-center lp:justify-start" >
        <h1 bind:this={h1} class="fixed w-fit h-fit mt-16 lp:mt-0 font-neue-power inline-block text-2xl text-center lp:text-left lp:text-5xl font-bold tracking-wider whitespace-pre-line"> </h1>
    </section>
</main></a>