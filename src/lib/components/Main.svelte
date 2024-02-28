<script>
    export let isOpen;
    
    import { onMount } from 'svelte';
    import { indexSectionStore } from '$lib/store.js'
    import TextScramble from '$lib/TextScramble.js';

    let section, h1;
    let content = '';
    
    const handleFooterClick = () => {
        isOpen = false;
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

    onMount(() => {
        
        indexSectionStore.subscribe(value => {
            section = value
        })

        content = 'A new age\nof culture';
        new TextScramble(h1, content);
    })

  </script>

<a on:click={handleFooterClick} class='cursor-default' href={"#"}><main>
    <section bind:this={section} class="h-[400vh] p-5 flex justify-center lp:justify-start" >
        <h1 bind:this={h1} class="fixed w-fit h-fit mt-16 tb:mt-28 lp:mt-0 lp:ml-16 font-neue-power inline-block text-2xl text-center lp:text-left tb:text-3xl dp:text-4xl font-bold tracking-wider whitespace-pre-line"> </h1>
    </section>
</main></a>