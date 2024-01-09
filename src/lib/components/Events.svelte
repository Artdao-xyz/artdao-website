<script>
	import Event from './Event.svelte';
    
    import { fade } from 'svelte/transition';
    
    export let isFooter;

    let event1 = {
        banner: '/event-psipsikoko.png',
        what: "Psipsikoko",
        where: "Buenos Aires"
    }
    let event2 = {
        banner: '/event-nonplaces.png',
        what: "Non\\Places",
        where: "Paris"
    }
    let event3 = {
        banner: '/event-intertwined.png',
        what: "Intertwined",
        where: "NFC Lisbon"
    }
    let event4 = {
        banner: '/event-cerouno.png',
        what: "Cero uno",
        where: "Buenos Aires"
    }
    let event5 = {
        banner: '/event-artifact.png',
        what: "Artdao x Artifact",
        where: "ETH Denver"
    }
    let event6 = {
        banner: '/event-underworld.png',
        what: "underworld",
        where: "Lisbon"
    }

</script>

{#if isFooter}
    <div class="h-full lp:flex lp:flex-col lp:justify-center mb-6"
        in:fade={{ delay: 450, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }}>
        
        <div class="h-full grid grid-cols-1 lp:grid-cols-3 gap-4">
            <Event banner={event6.banner} what={event6.what} where={event6.where}/>
            <Event banner={event5.banner} what={event5.what} where={event5.where}/>
            <Event banner={event4.banner} what={event4.what} where={event4.where}/>
            <Event banner={event3.banner} what={event3.what} where={event3.where}/>
            <Event banner={event2.banner} what={event2.what} where={event2.where}/>
            <Event banner={event1.banner} what={event1.what} where={event1.where}/>
            
        </div>
    </div>
{/if}

