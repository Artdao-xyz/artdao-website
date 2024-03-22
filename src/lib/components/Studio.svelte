<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { indexStyleStore } from '$lib/store.js';
	import { estilos } from '$lib/config.js';
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
			info: 'Branding Identity/web',
			date: '2023',
			link: 'http://www.artdao.xyz'
		},
		{
			banner: '/studio/lychee.png',
			banner_mobile: '/studio/lychee-mobile.png',
			logo: '/studio/lychee-logo.png',
			who: 'lychee',
			what: 'protocol',
			info: 'Branding Identity/web',
			date: '2023',
			link: 'http://www.artdao.xyz'
		},
		{
			banner: '/studio/nonplaces.png',
			banner_mobile: '/studio/nonplaces-mobile.png',
			logo: '/studio/nonplaces-logo.png',
			who: 'non\\places',
			what: 'exhibition',
			info: 'Event branding/Physical Graphics',
			date: '2023',
			link: 'http://www.artdao.xyz'
		},
		{
			banner: '/studio/tosta.png',
			banner_mobile: '/studio/tosta-mobile.png',
			logo: '/studio/tosta-logo.png',
			who: 'tosta',
			what: 'music',
			info: 'logo design',
			date: '2024',
			link: 'http://www.artdao.xyz'
		},
		{
			banner: '/studio/soar.png',
			banner_mobile: '/studio/soar-mobile.png',
			logo: '/studio/soar-logo.png',
			who: 'SOAR',
			what: 'finance',
			info: 'identity & web/app design',
			date: '2024',
			link: '-'
		},
		{
			banner: '/studio/arcade.png',
			banner_mobile: '/studio/arcade-mobile.png',
			logo: '/studio/arcade-logo.png',
			who: 'arcade',
			what: 'finance',
			info: 'identity + game assets + web design',
			date: '2024',
			link: '-'
		}
	];

	onMount(() => {
		const unsubscribe = indexStyleStore.subscribe((value) => {
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
            <h1 class="font-neue-power text-6xl lp:text-8xl font-medium capitalize tracking-wide mt-4">
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
                    loading="lazy"
                    src={`/link-arrow-${estilos[index].primary_media}.svg`}
                    alt="Link Arrow"
                    />
                </a>
            </div>
            <hr class="border-primary my-4" />
        </div>

	<div class="flex flex-col lp:flex-row gap-6 lp:gap-2 w-5/6 h-fit items-start lp:items-end justify-center lp:justify-between mb-4 lp:mb-0 lp:-mt-12"
	>
		<a
			on:click={() => pickEvent(0)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" class="lp:-mb-8" src={projects[0].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
				>xyk</h1>
			</a>
		</a>

		<a
			on:click={() => pickEvent(1)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" class="lp:-mb-2" src={projects[1].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
				>Lychee</h1>
			</a>
		</a>

		<a
			on:click={() => pickEvent(2)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" class="lp:-mb-10" src={projects[2].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking- normal-case text-nowrap"
				>Non\Places</h1>
			</a>
		</a>

		<a
			on:click={() => pickEvent(3)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" src={projects[3].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
				>
					Tosta
				</h1>
			</a>
		</a>
		<a
			on:click={() => pickEvent(4)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" class="" src={projects[4].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
				>
                    SoarFi
				</h1>
			</a>
		</a>
		<a
			on:click={() => pickEvent(5)}
			href={'#'}
			class="group flex flex-col justify-center items-center"
		>
			<a href={'#'} class="hidden lp:block lp:invisible group-hover:visible z-10">
				<img loading="lazy" class="" src={projects[5].logo} alt="" />
			</a>
			<a href={'#'}>
				<h1
					class="bg-primary text-secondary py-1 px-3 rounded-sm shadow-md tracking-wider normal-case text-nowrap"
				>
                    ArcadeFi
				</h1>
			</a>
		</a>
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
