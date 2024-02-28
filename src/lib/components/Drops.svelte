<script>
    export let isOpen;
	
    import { fade } from 'svelte/transition';
    import Drop from './Drop.svelte';
    import { onMount } from 'svelte';
    import { indexStyleStore } from '$lib/store.js';

    let index = 0;
    let pickedDrop = '0';

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        return unsubscribe;
    });

    let drops = [
        {
            banner: '/drops/banner-psipsikoko.png',
            banner_mobile: '/drops/banner-psipsikoko-mobile.png',
            name: "Psipsikoko",
            artists: "Frenetik Void & Julian Brangold",
            hammer: "/drops/hammer-psipsikoko.png"
        },
        {
            banner: '/drops/banner-hyperescapismo.png',
            banner_mobile: '/drops/banner-hyperescapismo-mobile.png',
            name: "Hyperescapismo",
            artists: "Hyperescapismo",
            hammer: "/drops/hammer-hyperescapismo.png"
        }
    ]

    const handleSizeChange = (event) => {
        pickedDrop = event.target.value;
    }

</script>

<!-- if is footer and section is 1 -->
{#if isOpen }

    <!-- {#if section = 1} -->
    <div class="overflow-y-hidden h-dvh lp:flex lp:flex-col lp:justify-center lp:mt-12"
        in:fade={{ delay: 50, duration: 150 }}
        out:fade={{ delay: 50, duration: 50 }} >

        <div class="text-sm leading-none tracking-wide my-8 flex gap-3">
            <input type="radio" id="drop_0" value="0" bind:group={pickedDrop} on:change={handleSizeChange} class="hidden peer/0"/>
            <label for="drop_0" class="inline-block cursor-pointer bg-background text-primary px-3.5 py-2 rounded-sm shadow peer-checked/0:bg-primary peer-checked/0:text-secondary border-primary border-2">#000</label>
          
            <input type="radio" id="drop_1" value="1" bind:group={pickedDrop} on:change={handleSizeChange} class="hidden peer/1"/>
            <label for="drop_1" class="inline-block cursor-pointer bg-background text-primary px-3.5 py-2 rounded-sm shadow peer-checked/1:bg-primary peer-checked/1:text-secondary border-primary border-2">#001</label>
          
            <!-- <input type="radio" id="drop_2" value="2" bind:group={pickedDrop} on:change={handleSizeChange} class="hidden peer/2"/>
            <label for="drop_2" class="inline-block cursor-pointer bg-background text-primary px-3.5 py-2 rounded-sm shadow peer-checked/2:bg-primary peer-checked/2:text-secondary border-primary border-2">#002</label> -->
        </div>

        {#each drops as { banner, banner_mobile, name, artists, hammer }, index (index)}
            {#if index == pickedDrop}
                <Drop {banner} {banner_mobile} {name} {artists} {hammer} indexDrop={index}/>
            {/if}
        {/each}
    </div>
{/if}
<!-- {/if} -->