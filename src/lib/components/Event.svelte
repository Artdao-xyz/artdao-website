<script>
    export let banner;
    export let what;
    export let where;
    export let info;
    export let address;

    import { onMount, createEventDispatcher  } from 'svelte';
    import { estilos } from '$lib/config.js';
    import { indexStyleStore } from '$lib/store.js';
    
    const dispatch = createEventDispatcher();

    let index = 0;
    let bannerIndex = 0;

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        return unsubscribe;
    });

    const pickBanner = (direction) => {
        bannerIndex += direction;
        if (bannerIndex < 0) {
            bannerIndex = banner.length - 1;
        } else if (bannerIndex >= banner.length) {
            bannerIndex = 0;
        }
    }

    const closeEvent = () =>{
        dispatch('closeEvent');
    }

</script>

    <!-- <a class="fixed h-fit w-fit left-0 bottom-0 lp:absolute lp:left-1/2 lp:top-1/2 lp:-translate-x-1/2 lp:-translate-y-1/2 inline-block mx-auto" href={"#"}> -->

    <div class="fixed left-0 bottom-0 h-fit w-fit lp:left-1/2 lp:top-1/2 lp:-translate-x-1/2 lp:-translate-y-1/2 mx-auto bg-primary text-secondary flex flex-col lp:rounded-md tracking-wider">
        <div class="flex justify-between p-6">
            <div class="flex items-center gap-2">
                <h1 class="text-2xl font-semibold">{what}</h1>
                <p class="text-xs font-semibold">{where}</p>
            </div>
            <button on:click={closeEvent}><img loading="lazy" src={`/events/close-${estilos[index].secondary_media}.svg`} alt="Close"></button>
        </div>
        <div class="w-screen lp:w-full h-full">
            <img loading="lazy" class="h-82 lp:h-full w-full lp:w-full object-cover" src={banner[bannerIndex]} alt="Drop">
            <div class="flex items-center justify-between">
                <button on:click={() => pickBanner(-1)}><img loading="lazy" src={`/events/left-arrow-${estilos[index].secondary_media}.svg`} alt="left arrow"></button>
                <button on:click={() => pickBanner(1)}><img loading="lazy" src={`/events/right-arrow-${estilos[index].secondary_media}.svg`} alt="right arrow"></button>
            </div>
        </div>
        
        <div class="w-3/4 text-sm tb:text-xl lp:text-sm uppercase px-6 py-4 lp:py-10 flex flex-col gap-4">
            <p class="font-semibold">{info}</p>
            <p class="text-xs">{address}</p>
        </div>
    </div>
<!-- </a> -->