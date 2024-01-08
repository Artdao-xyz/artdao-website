<script>
        import { fade } from 'svelte/transition';

    export let section;

  </script>

<main>
    <section class="min-h-[100vh] p-5 flex justify-center lp:justify-start" >
            {#if section == 0}
                <h1 class="fixed mt-16 lp:mt-0 font-neue-power inline-block text-3xl text-center lp:text-left lp:text-5xl font-bold tracking-wider whitespace-pre-line"><span in:fade={{ delay: 450, duration: 2000 }} out:fade={{ delay: 250, duration: 150 }}>A new age<br>of culture</span></h1>
            {/if}
    </section>
    <section class="min-h-[100vh] p-5 flex justify-center lp:justify-start">
            {#if section == 1}
            <h1 class="fixed mt-24 top-[10%] lp:top-[4%] font-neue-power block text-3xl text-center lp:text-left lp:text-5xl font-bold tracking-wider  whitespace-pre-line"><span in:fade={{ delay: 450, duration: 2000 }} out:fade={{ delay: 250, duration: 150 }}>Bringing visionary<br>art to life</span></h1>
            {/if}
    </section>
    <section class="min-h-[100vh] p-5 flex justify-center lp:justify-start">
            {#if section == 2}
            <h1 class="fixed mt-24 top-[10%] lp:top-[4%] font-neue-power block text-3xl text-center lp:text-left lp:text-5xl font-bold tracking-wider whitespace-pre-line"><span in:fade={{ delay: 450, duration: 2000 }} out:fade={{ delay: 250, duration: 150 }}>Between the global<br>& Hyperlocal</span></h1>
            {/if}
    </section>
    <section class="min-h-[100vh] p-5 flex justify-center lp:justify-start">
            {#if section == 3}
            <h1 class="fixed mt-24 top-[10%] lp:top-[4%] font-neue-power block text-3xl text-center lp:text-left lp:text-5xl font-bold tracking-wider whitespace-pre-line"><span in:fade={{ delay: 450, duration: 2000 }} out:fade={{ delay: 250, duration: 150 }}>Artist driven<br>design</span></h1>
            {/if}
    </section>
      
</main>
