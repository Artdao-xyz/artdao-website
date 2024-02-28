<script>
    export let banner;
    export let banner_mobile;
    export let name;
    export let artists;
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

<a href={"#"}>
    <div class="text-secondary flex flex-col">
        <img class="hidden lp:block rounded-t-md" src={banner} alt="Drop">
        <img class="lp:hidden rounded-t-md" src={banner_mobile} alt="Drop">
    
        <div class="bg-primary w-full p-5 flex items-center justify-between gap-1 rounded-b-md">
            <div class="flex flex-col w-2/3 lp:w-1/5 gap-2">
                <div class="flex gap-2 items-center">
                    <p class="text-xl lp:text-2xl uppercase clas font-medium">{name}</p>
                    <p class="text-xs">#00{indexDrop}</p>
                </div>
                <p class="text-sm">{artists}</p>
            </div>
            <p class="hidden lp:block text-xs font-normal tracking-wider normal-case lp:w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Maecenas vitae mattis tellus.
            </p>
            <div class="">
                <img class="ml-auto mr-0" src={hammer} alt="Hammer">
            </div>
        </div>
    </div>
</a>