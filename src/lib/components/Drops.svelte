<script>
	import Drop from './Drop.svelte';
    import Psipsikoko from './Psipsikoko.svelte';

    import { fade } from 'svelte/transition';
    export let isFooter;

    let drop1_banner_main = '/drop-psipsikoko_main.png';
    let drop1_banner = '/drop-psipsikoko.png';

    let drop1_name = "Psipsikoko"

</script>

<!-- if is footer and section is 1 -->
{#if isFooter }

    <!-- {#if section = 1} -->
    <div class="overflow-y-auto h-full lp:flex lp:flex-col lp:justify-center"
        in:fade={{ delay: 450, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }}>
        
        <div class="flex items-center justify-center gap-8 ">
            <Drop banner={drop1_banner} name={drop1_name} />
            <Psipsikoko banner={drop1_banner_main} name={drop1_name}/>
        </div>
    </div>
{/if}
<!-- {/if} -->