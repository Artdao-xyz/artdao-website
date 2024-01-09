<script>
    import * as config from '$lib/config.js';
    import { Menu, Close } from 'svelte-ionicons';

    export let currentSection;
    export let setSection
    export let matcapIndex

    let header, hamburguer_menu
    let menu = false;
    $:if (header) {
        header.style.backgroundColor = config.default.estilos[matcapIndex].color;
    }
    $:if (hamburguer_menu) {
        hamburguer_menu.style.backgroundColor = config.default.estilos[matcapIndex].color;
    }
    
    const hideMenu = () => {
        const navLinks = document.querySelector('.nav-links')
        menu ? menu = false : menu = true
        navLinks.classList.toggle('top-[0%]')
        navLinks.classList.toggle('opacity-100')
    }
    
</script>

<header bind:this={header} class="text-{config.default.estilos[matcapIndex].fontColor} font-clash-display uppercase font-bold tracking-wide sticky top-0 left-0 w-screen p-4 lp:p-6 z-10 dp:max-w-[1440px] dp:mx-auto">
    <nav class="flex justify-between items-center w-mx-auto  ">
        <div>
            <a href='/'><img src={`/artdao-logo-${config.default.estilos[matcapIndex].logo}.svg`} alt="Artdao Logo"></a>
        </div>
        <div bind:this={hamburguer_menu}
            class="nav-links opacity-0 lp:opacity-100 duration-1000 lp:duration-0 lp:static absolute lp:min-h-fit h-screen left-0 top-[-2200%] lp:h-auto lp:w-auto justify-center  w-full flex items-center px-5 ">
            <ul class="flex lp:flex-row flex-col  lp:items-center lp:gap-[4vw] gap-8 ">
                <li><a on:click={() => setSection(0)} class="{currentSection == 0 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:lp:mb-2" src={`/s1_${config.default.estilos[matcapIndex].icon}.png`} alt="Section 1"><span class="{currentSection == 0 ? '' : 'lp:invisible'}">Mission</span></a></li>        
            
                <li><a on:click={() => setSection(1)} class="{currentSection == 1 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col  gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s2_${config.default.estilos[matcapIndex].icon}.png`} alt="Section 2"><span class="{currentSection == 1 ? '' : 'lp:invisible'}">drops</span></a></li>
                <li><a on:click={() => setSection(2)} class="{currentSection == 2 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s3_${config.default.estilos[matcapIndex].icon}.png`} alt="Section 3"><span class="{currentSection == 2 ? '' : 'lp:invisible'}">Events</span></a></li>
                <li><a on:click={() => setSection(3)} class="{currentSection == 3 ? 'flex lp:flex-col gap-4 lp:gap-0 items-center justify-between' : 'opacity-30 flex lp:flex-col gap-4 lp:gap-0 items-center justify-between'}" href={"#"}><img class=" lp:mb-2" src={`/s4_${config.default.estilos[matcapIndex].icon}.png`} alt="Section 5"><span class="{currentSection == 3 ? '' : 'lp:invisible'}">Studio</span></a></li>
                <div class="flex mt-24 items-center justify-between gap-2 lp:hidden">
                    <a href={'https://twitter.com/Artdao_xyz'} target="_blank"><img src={`/x-${config.default.estilos[matcapIndex].logo}.svg`} alt="X Logo"></a> 
                    <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"><img src={`/instagram-${config.default.estilos[matcapIndex].logo}.svg`} alt="Instagram Logo"></a> 
                    <a href={'#'}><img src="/discord.svg" alt="Discord Logo"></a>

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