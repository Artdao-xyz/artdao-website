<script>
    export let banner;
    export let banner_mobile;
    export let name;
    export let artists;
    export let description;
    export let hammer;
    export let indexDrop;

    import { onMount } from 'svelte';
    import { indexStyleStore } from '$lib/store.js';

    let index = 0;

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        return unsubscribe;
    });


</script>

<a class="cursor-default" href={"#"}>
    <div class="text-secondary flex flex-col">
        <img class="hidden lp:block rounded-t-md" src={banner} alt="Drop">
        <img class="lp:hidden rounded-t-md" src={banner_mobile} alt="Drop">
    
        <div class="bg-primary w-full p-5 flex items-center justify-between gap-1 rounded-b-md">
            <div class="flex flex-col w-2/3 lp:w-1/6 gap-2">
                <div class="flex gap-2 items-center">
                    <p class="text-xl font-semibold lp:text-2xl uppercase">{name}</p>
                    <p class="text-xs">#00{indexDrop}</p>
                </div>
                <p class="text-sm lp:text-base font-medium leading-none tracking-wide">{artists}</p>
            </div>
            <p class="hidden lp:block text-base font-normal leading-none tracking-wider normal-case lp:w-1/2">{description}</p>
            <div class="">
                <img class="ml-auto mr-0" src={hammer} alt="Hammer">
            </div>
        </div>
    </div>
</a>