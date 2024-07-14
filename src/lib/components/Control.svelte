<script>
	import { estilos } from '$lib/utils/config.js';
	import { onMount } from 'svelte';
	import { indexSectionStore, indexStyleStore, isOpenStore } from '$lib/store.js';
	import { Menu, Close } from 'svelte-ionicons';
	import iosInnerHeight from '$lib/utils/iosInnerHeight.js';
    import Subscribe from './Subscribe.svelte';

	let index = 0;
	let section = 0 ;
	let isOpen = false;
	let header, hamburguer_menu;
	let menu = false;
	let height = iosInnerHeight() || window.innerHeight;

	const hideMenu = () => {
		const navLinks = document.querySelector('.nav-links');
		navLinks.classList.remove('top-[0%]');
		navLinks.classList.remove('opacity-100');
		menu = false;
	};

	const showMenu = () => {
        
		const navLinks = document.querySelector('.nav-links');
		navLinks.classList.add('top-[0%]');
		navLinks.classList.add('opacity-100');

		menu = true;
	};

	const setSection = (_section) => {
        // console.log('setSection', _section);
        currentSection = _section;

        if (isOpen) {
            document.body.style.overflow = 'auto';
            window.scrollTo(0, _section * height);

            setTimeout(() => {
                document.body.style.overflow = 'hidden';
            }, 750);
        }else{
            window.scrollTo(0, _section * height);
        }
        hideMenu();
	};

    let currentSection = 0;
    let newSection = 0;

	onMount(() => {

        const sizes = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        
        onscroll = (e) => {
			const scrollY = window.scrollY;
			newSection = Math.min(3, Math.round(scrollY / sizes.height));
			// if (!isOpen) {
				if (newSection != currentSection) {
                    currentSection = newSection;
                    indexSectionStore.set(currentSection);
				}
			// }
		};

		indexStyleStore.subscribe((value) => {
			index = value;
		});

		indexSectionStore.subscribe((value) => {
            section = value;            
		});

		isOpenStore.subscribe((value) => {
            isOpen = value;
			if (value) {
				// hideMenu();
			}
		});
	});

</script>

<div
    bind:this={hamburguer_menu}
    class="nav-links duration-1000 text-primary text-sm lp:duration-0 lp:static absolute lp:block lp:min-h-fit h-screen left-0 top-[-2200%] lp:h-auto w-screen lp:w-auto 
    bg-background opacity-0 lp:opacity-100 flex flex-col lp:flex-row justify-center lp:justify-end items-center font-semibold uppercase tracking-wide"
>
    <ul class="flex flex-grow lp:flex-row flex-col justify-center lp:justify-end items-center gap-8 lp:gap-4">
        <li>
            <button
                on:click={setSection.bind(null, 0)}
                class={`uppercase flex gap-4 lp:gap-0 lp:flex-col items-center justify-between ${section == 0
                    ? ''
                    :'opacity-30'}`}
                ><img
                    
                    class=" lp:lp:mb-2"
                    src={`/s1_${estilos[index].primary_media}.png`}
                    alt="Section 1"
                /><span class={section == 0 ? '' : 'lp:invisible'}>Mission</span></button
            >
        </li>
        <li>
            <button
                on:click={setSection.bind(null, 1)}
                class={`uppercase flex gap-4 lp:gap-0 lp:flex-col items-center justify-between ${section == 1
                    ? ''
                    :'opacity-30'}`}
                ><img
                    
                    class=" lp:mb-2"
                    src={`/s2_${estilos[index].primary_media}.png`}
                    alt="Section 2"
                /><span class={section == 1 ? '' : 'lp:invisible'}>drops</span></button
            >
        </li>
        <li>
            <button
                on:click={setSection.bind(null, 2)}
                class={`uppercase flex gap-4 lp:gap-0 lp:flex-col items-center justify-between ${section == 2
                    ? ''
                    :'opacity-30'}`}
                ><img
                    
                    class=" lp:mb-2"
                    src={`/s3_${estilos[index].primary_media}.png`}
                    alt="Section 3"
                /><span class={section == 2 ? '' : 'lp:invisible'}>Events</span></button
            >
        </li>
        <li>
            <button
                on:click={setSection.bind(null, 3)}
                class={`uppercase flex gap-4 lp:gap-0 lp:flex-col items-center justify-between ${section == 3
                    ? ''
                    :'opacity-30'}`}
                ><img
                    
                    class=" lp:mb-2"
                    src={`/s4_${estilos[index].primary_media}.png`}
                    alt="Section 5"
                /><span class={section == 3 ? '' : 'lp:invisible'}>Studio</span></button
            >
        </li>
    </ul>

    <div class="h-1/3 flex flex-col justify-around">
        <div class="lp:hidden">
            <Subscribe />
        </div>
            <div class="flex items-center justify-center gap-4 lp:hidden">
                <a href={'https://discord.com/invite/BV2ZNCSa'}
                target="_blank"
                ><img
                    
                    src={`/discord-${estilos[index].primary_media}.svg`}
                    alt="Discord Logo"
                /></a
            >
            <a href={'https://twitter.com/Artdao_xyz'} target="_blank"
                ><img  src={`/x-${estilos[index].primary_media}.svg`} alt="X Logo" /></a
            >
            <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"
                ><img
                    
                    src={`/instagram-${estilos[index].primary_media}.svg`}
                    alt="Instagram Logo"
                /></a
            >
        </div>
    </div>


</div>
<div class="flex items-center gap-6 lp:hidden">
    {#if menu}
        <Close on:click={hideMenu} size="30" class="cursor-pointer outline-none z-20" />
    {:else}
        <Menu on:click={showMenu} size="30" class="cursor-pointer outline-none z-20" />
    {/if}
</div>
