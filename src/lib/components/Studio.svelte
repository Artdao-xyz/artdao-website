<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { indexStyleStore } from '$lib/store.js';
    import { estilos } from '$lib/config.js';
	import Project from './Project.svelte';

    let index = 0;

    let projects = [
        {
            banner: '/studio/xyk.png',
            banner_mobile: '/studio/xyk-mobile.png',
            logo: '/studio/xyk-logo.png',
            who: "xyk",
            what: "group",
            info: "Branding Identity/web",
            date: "2023",
            link: "http://www.artdao.xyz"
        },
        {
            banner: '/studio/lychee.png',
            banner_mobile: '/studio/lychee-mobile.png',
            logo: '/studio/lychee-logo.png',
            who: "lychee",
            what: "protocol",
            info: "Branding Identity/web",
            date: "2023",
            link: "http://www.artdao.xyz"
        },
        {
            banner: '/studio/nonplaces.png',
            banner_mobile: '/studio/nonplaces-mobile.png',
            logo: '/studio/nonplaces-logo.png',
            who: "non\\places",
            what: "exhibition",
            info: "Event branding/Physical Graphics",
            date: "2023",
            link: "http://www.artdao.xyz"
        },
        {
            banner: '/studio/tosta.png',
            banner_mobile: '/studio/tosta-mobile.png',
            logo: '/studio/tosta-logo.png',
            who: "tosta",
            what: "music",
            info: "logo design",
            date: "2024",
            link: "http://www.artdao.xyz"
        },
    ]

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        return unsubscribe;
    });
    
    let selectedEvent = null;
    const pickEvent = (event) => {
        selectedEvent = event;
    }

    const closeEvent = () => {
        selectedEvent = null;
    }

</script>


    <div 
        in:fade={{ delay: 50, duration: 150 }}
        out:fade={{ delay: 50, duration: 50 }}     
        class="flex w-[80%] text-primary flex-col gap-16 h-full items-center justify-start mx-auto">

        <div class="hidden lp:block">
            <h1 class="font-neue-power text-8xl font-medium capitalize tracking-wide text-center lp:mt-28">Artdao Studio</h1>
            <p class="text-center w-2/3 text-xl font-semibold uppercase tracking-wide my-11 mx-auto">
                We bring together teams of world leading artists to develop original brand identities across fields of 3d, graphic design, and web development. 
                <br>
                <br>
                Balancing asset creation, style and composition to centre affective methods of communication
                </p>

                <a href="mailto:hello@artdao.xyz" class="flex items-center justify-center gap-2">
                    <div class="text-primary text-base font-medium underline">get in touch</div>
                    <img loading="lazy" src={`/link-arrow-${estilos[index].primary_media}.svg`} alt="Link Arrow">
                </a>
                <hr class="hidden lp:block border-primary my-11">
        </div>
        <div class="flex flex-col lp:flex-row gap-16 w-full h-fit items-center lp:items-end justify-center lp:justify-start lp:-mt-32">
        
            <a on:click={()=>pickEvent(0)} href={"#"} class="group flex flex-col justify-center items-center">
                <a href={"#"} class="lp:invisible group-hover:visible z-10">
                    <img loading="lazy" class="lp:-mb-8" src={projects[0].logo} alt="">
                </a>
                <a href={"#"}>
                    <h1 class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap">xyk Group</h1>
                </a>
            </a>

            <a on:click={()=>pickEvent(1)} href={"#"} class="group flex flex-col justify-center items-center">
                <a href={"#"} class="lp:invisible group-hover:visible z-10">
                    <img loading="lazy" class="lp:-mb-2" src={projects[1].logo} alt="">
                </a>
                <a href={"#"}>
                    <h1 class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap">Lychee Protocol</h1>
                </a>
            </a>

            <a on:click={()=>pickEvent(2)} href={"#"} class="group flex flex-col justify-center items-center">
                <a href={"#"} class="lp:invisible group-hover:visible z-10">
                    <img loading="lazy" class="lp:-mb-10" src={projects[2].logo} alt="">
                </a>
                <a href={"#"}>
                    <h1 class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking- normal-case text-nowrap">Non\Places Exhibition</h1>
                </a>
            </a>

            <a on:click={()=>pickEvent(3)} href={"#"} class="group flex flex-col justify-center items-center">
                <a href={"#"} class="lp:invisible group-hover:visible z-10">
                    <img loading="lazy" class="lp:-mb-4" src={projects[3].logo} alt="">
                </a>
                <a href={"#"}>
                    <h1 class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap">Tosta</h1>
                </a>
            </a>
        </div>
        

        {#each projects as { banner, banner_mobile, who, what, info, date, link }, index (index)}
            {#if index === selectedEvent}
                <Project on:closeEvent={closeEvent} {banner} {banner_mobile} {who} {what} {info} {date} {link}/>
            {/if}
        {/each}

        <a href="mailto:hello@artdao.xyz" class="flex lp:hidden items-center justify-center gap-2">
            <p class="mb-8 text-primary text-base font-medium underline">get in touch</p>
            <img class="mb-8" loading="lazy" src={`/link-arrow-${estilos[index].primary_media}.svg`} alt="Link Arrow">
        </a>
    </div>
    