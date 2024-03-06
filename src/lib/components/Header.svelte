<script>
    import { estilos } from '$lib/config.js';
    import { onMount } from 'svelte';
    import { indexSectionStore, indexStyleStore } from '$lib/store.js';
    import { Menu, Close } from 'svelte-ionicons';
    // const heightFunction = require('ios-inner-height');
    import iosInnerHeight from '$lib/iosInnerHeight.js';

    let index = 0;
    let section

    // console.log(iosInnerHeight())
    
    let header, hamburguer_menu
    let menu = false;
    let height = iosInnerHeight() || window.innerHeight;

    const hideMenu = () => {
        const navLinks = document.querySelector('.nav-links')
        menu ? menu = false : menu = true
        navLinks.classList.toggle('top-[0%]')
        navLinks.classList.toggle('opacity-100')
    }
    const setSection = (_section) => {
        let section = _section;
        window.scrollTo(0, section * height)
    }

    onMount(() => {
        const unsubscribe = indexStyleStore.subscribe(value => {
            index = value;
        });

        indexSectionStore.subscribe(value => {
            section = value
        })

        return unsubscribe;
    });
    
</script>

<header bind:this={header} class=" bg-background text-primary font-clash-display uppercase font-semibold tracking-wide sticky top-0 left-0 max-w-screen p-4 lp:pt-6 lp:pb-0 z-30 dp:max-w-[1440px] dp:mx-auto">
    <nav class="flex justify-between items-center w-mx-auto">
        <div class="lp:self-start">
            <a href='/'><img src={`/artdao-logo-${estilos[index].primary_media}.svg`} alt="Artdao Logo"></a>
        </div>
        <div bind:this={hamburguer_menu}
            class="bg-background nav-links opacity-0 lp:opacity-100 duration-1000 lp:duration-0 lp:static absolute lp:min-h-fit h-dvh left-0 top-[-2200%] lp:h-auto lp:w-auto justify-center  w-full flex items-center px-5 ">
            <ul class="flex lp:flex-row flex-col  lp:items-center gap-8 ">
                <li><a on:click={() => setSection(0)} class="{section == 0 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:lp:mb-2" src={`/s1_${estilos[index].primary_media}.png`} alt="Section 1"><span class="{section == 0 ? '' : 'lp:invisible'}">Mission</span></a></li>        
            
                <li><a on:click={() => setSection(1)} class="{section == 1 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col  gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s2_${estilos[index].primary_media}.png`} alt="Section 2"><span class="{section == 1 ? '' : 'lp:invisible'}">drops</span></a></li>
                <li><a on:click={() => setSection(2)} class="{section == 2 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s3_${estilos[index].primary_media}.png`} alt="Section 3"><span class="{section == 2 ? '' : 'lp:invisible'}">Events</span></a></li>
                <li><a on:click={() => setSection(3)} class="{section == 3 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s4_${estilos[index].primary_media}.png`} alt="Section 5"><span class="{section == 3 ? '' : 'lp:invisible'}">Studio</span></a></li>
                <div class="flex mt-24 items-center justify-between gap-2 lp:hidden">
                    <a href={'https://twitter.com/Artdao_xyz'} target="_blank"><img src={`/x-${estilos[index].primary_media}.svg`} alt="X Logo"></a> 
                    <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"><img src={`/instagram-${estilos[index].primary_media}.svg`} alt="Instagram Logo"></a> 
                    <a href={'#'}><img src={`/discord-${estilos[index].primary_media}.svg`} alt="Discord Logo"></a>

                </div>    
            </ul>
        </div>
        <div class="flex items-center gap-6 lp:hidden">
            {#if menu}
                <Close on:click={hideMenu} size="40" class="cursor-pointer outline-none z-20"/>
            {:else}
                <Menu on:click={hideMenu} size="40" class="cursor-pointer outline-none z-20"/>
            {/if}
        </div>
    </nav>
</header>