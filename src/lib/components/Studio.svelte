<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { indexStyle } from '$lib/store.js';
	import { estilos } from '$lib/utils/config.js';
	import Project from './Project.svelte';
    import Subscribe from './Subscribe.svelte';
    import Contact from './Contact.svelte';
    
	let index = 0;

	let projects = [
		{
			banner: '/studio/xyk.png',
			banner_mobile: '/studio/xyk-mobile.png',
			logo: '/studio/xyk-logo.png',
			who: 'xyk',
			what: 'group',
			info: 'Identity/web',
			date: '2023',
			link: 'https://xykgroup.com'
		},
		{
			banner: '/studio/lychee.png',
			banner_mobile: '/studio/lychee-mobile.png',
			logo: '/studio/lychee-logo.png',
			who: 'Lychee',
			what: 'protocol',
			info: 'Identity/web/Dapp',
			date: '2023',
			link: '-'
		},
		{
			banner: '/studio/nonplaces.png',
			banner_mobile: '/studio/nonplaces-mobile.png',
			logo: '/studio/nonplaces-logo.png',
			who: 'Non\\Places',
			what: 'exhibition',
			info: 'Identity/Web',
			date: '2023',
			link: '-'
		},
		{
			banner: '/studio/tosta.png',
			banner_mobile: '/studio/tosta-mobile.png',
			logo: '/studio/tosta-logo.png',
			who: 'Tosta',
			what: 'music',
			info: 'logo',
			date: '2024',
			link: '-'
		},
		{
			banner: '/studio/soar.png',
			banner_mobile: '/studio/soar-mobile.png',
			logo: '/studio/soar-logo.png',
			who: 'SoarFi',
			what: 'finance',
			info: 'identity/web/dapp',
			date: '2024',
			link: '-'
		},
		{
			banner: '/studio/arcade.png',
			banner_mobile: '/studio/arcade-mobile.png',
			logo: '/studio/arcade-logo.png',
			who: 'ArcadeFi',
			what: 'finance',
			info: 'identity/game design/web',
			date: '2024',
			link: '-'
		},
		{
			banner: '/studio/quarry.png',
			banner_mobile: '/studio/quarry-mobile.png',
			logo: '/studio/quarry-logo.png',
			who: 'Quarry',
			what: 'app',
			info: 'dapp',
			date: '2024',
			link: '-'
		},
		{
			banner: '/studio/srchers.png',
			banner_mobile: '/studio/srchers-mobile.png',
			logo: '/studio/srchers-logo.svg',
			who: 'SRCHERS',
			what: 'fashionweb',
			info: 'web',
			date: '2024',
			link: 'srchers.com'
		}
	];

	onMount(() => {
		const unsubscribe = indexStyle.subscribe((value) => {
			index = value;
		});

		return unsubscribe;
	});

    let studio;

	let selectedEvent = null;
	const pickEvent = (event) => {
		selectedEvent = event;
        studio.style.overflowY = 'hidden';
	};

	const closeEvent = () => {
		selectedEvent = null;
        studio.style.overflowY = 'auto';
	};
</script>

<div bind:this={studio}
    in:fade={{ delay: 100, duration: 150 }}
    out:fade={{ delay: 100, duration: 25 }}
	class="flex text-primary flex-col h-full items-center justify-between mx-auto"
>
    <div class="flex flex-col justify-center flex-grow items-center">
        <div class="block w-5/6">
            <h1 class="font-neue-power text-6xl lp:text-8xl font-medium capitalize tracking-wide mt-2 lp:mt-0">
                Artdao Studio
            </h1>
            <p class="lp:w-2/3 text-lg lp:text-2xl font-light normal-case tracking-wide leading-snug my-8">
                We bring together teams of world leading artists to develop original brand identities across
                fields of 3d, graphic design, and web development.
                <br />
                <br />
                Balancing asset creation, style and composition to centre affective methods of communication.
            </p>
            <div class="flex justify-between items-center">
                <p class="text-primary font-semibold text-lg lp:text-xl uppercase">our works</p>
                <a href="mailto:hello@artdao.xyz" class="flex items-center gap-2">
                    <div class="text-primary text-base font-medium underline uppercase">get in touch</div>
                    <img
                    
                    src={`/link-arrow-${estilos[index].primary_media}.svg`}
                    alt="Link Arrow"
                    />
                </a>
            </div>
            <hr class="border-primary my-4" />
			
		<div class="flex flex-col lp:flex-row flex-wrap gap-6 lp:gap-6 h-fit w-full items-start lp:items-end justify-center lp:justify-normal mb-4 lp:mb-4">

		{#each projects as { who, logo }, index}
			<button on:click={pickEvent.bind(null, index)}
			class="group flex flex-col justify-center items-center">
			<div class="w-fit relative">
				<button class="hidden lp:block lp:invisible group-hover:visible z-10 mx-auto w-full">
					<img  class="absolute -top-5 -translate-y-1/2 left-1/2 -translate-x-1/2 w-fit object-cover" src={logo} alt="" />
				</button>
				<button class="w-fit">
					<h1
						class="text-xl text-center bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
					>{who}</h1>
				</button>
			</div>
			</button>
		{/each}
	
		</div>
    </div>

    </div>
    <div class="hidden w-full lp:flex items-center justify-between">
        <Subscribe />
        <Contact />
    </div>

	{#each projects as { banner, banner_mobile, who, what, info, date, link }, index (index)}
		{#if index === selectedEvent}
			<Project
				on:closeEvent={closeEvent}
				{banner}
				{banner_mobile}
				{who}
				{what}
				{info}
				{date}
				{link}
			/>
		{/if}
	{/each}
</div>
