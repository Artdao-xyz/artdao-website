<script>
	import Event from './Event.svelte';
    
    import { fade } from 'svelte/transition';
    
    export let isFooter;

    let studio1 = {
        banner: '/studio-xky.png',
        what: "xky",
        where: "Rebrand and Website Design"
    }
    let studio2 = {
        banner: '/studio-lychee.png',
        what: "Lychee",
        where: "Rebrand and Website Design"
    }
    let studio3 = {
        banner: '/studio-atelier-ephemere.png',
        what: "Atelier ephemere",
        where: "Exhibition Identity"
    }
</script>

{#if isFooter}
    <div class="h-full lp:flex lp:flex-col lp:justify-center"
        in:fade={{ delay: 450, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }}>
        
        <div class="grid grid-cols-1 lp:grid-cols-3 gap-4">
            <Event banner={studio1.banner} what={studio1.what} where={studio1.where}/>
            <Event banner={studio2.banner} what={studio2.what} where={studio2.where}/>
            <Event banner={studio3.banner} what={studio3.what} where={studio3.where}/>           
        </div>
    </div>
{/if}
