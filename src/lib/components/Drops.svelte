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

{/if}
<!-- {/if} -->