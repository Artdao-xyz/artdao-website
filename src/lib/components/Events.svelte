<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { estilos } from '$lib/config.js';
	import { indexStyleStore, isOpenStore } from '$lib/store.js';
	import Event from './Event.svelte';
    import Subscribe from './Subscribe.svelte';
    import Contact from './Contact.svelte';
    
	let selectedEvent = null;
	let isOpen = false;

	let events = [
		{
			banner: [
				'/events/psipsikoko/psipsikoko-1.png',
				'/events/psipsikoko/psipsikoko-2.png',
				'/events/psipsikoko/psipsikoko-3.png'
			],
			what: 'Psipsikoko',
			where: 'Buenos Aires',
			info: 'Exhibition',
			date: 'OCTOBER 26th-27th/2023',
			address: 'AURA FABRICA, BUENOS AIRES'
		},
		{
			banner: [
				'/events/non-places/nonplaces-1.png',
				'/events/non-places/nonplaces-2.png',
				'/events/non-places/nonplaces-3.png'
			],
			what: 'Non\\Places',
			where: 'Paris',
			info: 'Exhibition/Party',
			date: 'JULY 18th-20th/2023',
			address: '31 RUE HENRI CHEVREU, PARIS'
		},
		{
			banner: [
				'/events/intertwined/intertwined-1.png',
				'/events/intertwined/intertwined-2.png',
				'/events/intertwined/intertwined-3.png'
			],
			what: 'Intertwined',
			where: 'NFC Lisbon',
			info: 'Exhibition/Talks/After Party',
			date: 'JUNE 6th-8th/2023',
			address: 'Armazém souL, lisbon'
		},
		{
			banner: [
				'/events/cerouno/cerouno-1.png',
				'/events/cerouno/cerouno-2.png',
				'/events/cerouno/cerouno-3.png',
				'/events/cerouno/cerouno-4.png'
			],
			what: 'Cero uno',
			where: 'Buenos Aires',
			info: 'exhibition/talks/After Party',
			date:'MARCH 31th/2023',
			address: 'ARTLAB, BUENOS AIRES'
		},
		{
			banner: [
				'/events/eth-denver/eth-denver-1.png',
				'/events/eth-denver/eth-denver-2.png',
				'/events/eth-denver/eth-denver-3.png'
			],
			what: 'ETH Denver',
			where: 'Denver',
			info: 'Exhibition',
			date:'MARCH 2th-6th/2023',
			address: 'DENVER, COLORADO'
		},
		{
			banner: [
				'/events/devcon/devcon-1.png',
				'/events/devcon/devcon-2.png',
				'/events/devcon/devcon-3.png'
			],
			what: 'DEVCON',
			where: 'Bogotá',
			info: 'exhibition/mural/talks',
			date:'OCTOBER 11th-14th/2022',
			address: 'BOGOTÁ, COlOMBIA'
		},
		{
			banner: [
				'/events/nft-paris/nft-paris-1.jpg',
				'/events/nft-paris/nft-paris-2.jpg'
			],
			what: 'NFT Paris',
			where: 'Paris',
			info: 'Lukas Truniger Showcase',
			date: 'FEBRUARY 23rd/2023 101',
			address: 'Rue Réaumur, Paris'
		},
		{
			banner: [
				'/events/orb/orb-1.png',
				'/events/orb/orb-2.png',
				'/events/orb/orb-3.png',
				'/events/orb/orb-4.png'
			],
			what: 'O.R.B',
			where: 'São Paulo',
			info: 'Exhibition',
			date:'MARCH 23rd-APRIL 6th /2024',
			address: 'CAROÇO, SÃO PABLO,'
		},
		{
			banner: [
				'/events/underworld/underworld-1.png',
				'/events/underworld/underworld-2.png',
				'/events/underworld/underworld-3.png',
				'/events/underworld/underworld-4.png'
			],
			what: 'Underworld',
			where: 'Lisbon',
			info: 'Exhibition/Party',
			date:'NOV 10th-16th/2023',
			address: 'ARROZ ESTUDIOS, LISBON'
		}
	];

	let index = 0;
	let isLisboaOpen = false;
	let isBuenosAiresOpen = false;
	let isParisOpen = false;
	let isBotogaOpen = false;
	let isDenverOpen = false;
    let isSaoPauloOpen = false;

	onMount(() => {
		indexStyleStore.subscribe((value) => {
			index = value;
		});

		isOpenStore.subscribe((value) => {
			isOpen = value;
		});
	});

	$: if (!isOpen) {
		isLisboaOpen = false;
		isBuenosAiresOpen = false;
		isParisOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
        isSaoPauloOpen = false;
	}

	const openLisboa = () => {
		isLisboaOpen = isLisboaOpen ? false : true;
		isBuenosAiresOpen = false;
		isParisOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
		isSaoPauloOpen = false;

	};
	const openBuenosAires = () => {
		isBuenosAiresOpen = isBuenosAiresOpen ? false : true;
		isLisboaOpen = false;
		isParisOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
		isSaoPauloOpen = false;
	};
	const openParis = () => {
		isParisOpen = isParisOpen ? false : true;
		isBuenosAiresOpen = false;
		isLisboaOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
		isSaoPauloOpen = false;
	};

	const openBogota = () => {
		isBotogaOpen = isBotogaOpen ? false : true;
		isBuenosAiresOpen = false;
		isLisboaOpen = false;
		isParisOpen = false;
		isDenverOpen = false;
		isSaoPauloOpen = false;
	};

	const openDenver = () => {
		isDenverOpen = isDenverOpen ? false : true;
		isBuenosAiresOpen = false;
		isLisboaOpen = false;
		isParisOpen = false;
		isBotogaOpen = false;
		isSaoPauloOpen = false;
	};

    const openSaoPaulo = () => {
        isSaoPauloOpen = isSaoPauloOpen ? false : true;
        isBuenosAiresOpen = false;
        isLisboaOpen = false;
        isParisOpen = false;
        isBotogaOpen = false;
        isDenverOpen = false;
    };

	const pickEvent = (event) => {
		selectedEvent = event;
		isParisOpen = false;
		isBuenosAiresOpen = false;
		isLisboaOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
		isSaoPauloOpen = false;
	};

	const closeEvent = () => {
		selectedEvent = null;
		isParisOpen = false;
		isBuenosAiresOpen = false;
		isLisboaOpen = false;
		isBotogaOpen = false;
		isDenverOpen = false;
        isSaoPauloOpen = false;
	};
</script>

<div class="h-full lp:flex lp:flex-col lp:justify-center">
	<a
	in:fade={{ delay: 100, duration: 150 }}
	out:fade={{ delay: 100, duration: 25 }}
		on:click={closeEvent}
		class="cursor-default overscroll-y-contain h-fit flex-grow overflow-y-hidden"
		href={'#'}
		><img
			loading="lazy"
			class="fixed lp:relative top-1/2 lp:top-0 -translate-y-1/2 lp:-translate-y-0 left-0 scale-[225%] lp:scale-100 object-contain mx-auto lp:h-full -z-10"
			src={`/events/map-${estilos[index].primary_media}.png`}
			alt="Map events"
		/></a
	>

	<div class="h-[80%] lp:h-auto w-fit mx-auto flex flex-col justify-center items-center gap-8">
		<a
			href={'#'}
			class="relative lp:absolute bg-primary text-secondary lp:left-[18%] lp:top-[37%] sp:top-[35%] sp:left-[18%] dp:left-[19%] dp:top-[33%] bg:top-[35%] bg:left-[20%] 2k:top-[38%] 2k:left-[20%] px-3 py-1 rounded-sm shadow-md gap-3"
		>
			<a on:click={openDenver} href={'#'}>
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Denver</p>
			</a>
			<div class={`${isDenverOpen ? 'block' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(4)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">ETH Denver</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
			</div>
		</a>

		<a
			href={'#'}
			class="relative lp:absolute bg-primary text-secondary lp:left-[30%] lp:top-[65%] sp:top-[65%] sp:left-[30%]  bg:top-[60%] bg:left-[30%] 2k:left-[30%] px-3 py-1.5 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide"
		>
			<a on:click={openBuenosAires} href={'#'}>
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Buenos Aires</p>
			</a>
			<div class={`${isBuenosAiresOpen ? 'block' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(3)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">Cero Uno</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
				<hr class="border-secondary" />
				<a
					on:click={() => pickEvent(0)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">Psipsikoko</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
			</div>
		</a>

		<a
		href={'#'}
		class="relative lp:absolute bg-primary text-secondary lp:left-[32%] lp:top-[57%] sp:top-[56%] dp:top-[57%] dp:left-[32%] bg:top-[54%] bg:left-[32%] 2k:top-[54%] 2k:left-[32%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide"
	>
		<a on:click={openSaoPaulo} href={'#'}>
			<p class="normal-case text-xl font-medium font-neue-power tracking-wide">São Paulo</p>
		</a>
		<div class={`${isSaoPauloOpen ? 'block' : 'hidden'} h-full`}>
			<hr class="border-secondary mt-2" />
			<a
				on:click={() => pickEvent(7)}
				href={'#'}
				class="flex justify-between items-center py-2 gap-36"
			>
				<p class="text-sm font-normal tracking-wide">O.R.B</p>
				<img
					loading="lazy"
					src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
					alt="pick event"
				/>
			</a>
		</div>
	</a>

		<a
			href={'#'}
			class="relative lp:absolute bg-primary text-secondary lp:left-[28%] lp:top-[49%] sp:left-[27%] sp:top-[48%] dp:left-[27%] dp:top-[48%] bg:top-[48%] bg:left-[28%] 2k:top-[48%] 2k:left-[28%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide"
		>
			<a on:click={openBogota} href={'#'}>
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Bogotá</p>
			</a>
			<div class={`${isBotogaOpen ? 'block' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(5)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">DEVCON</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
			</div>
		</a>

		<a
			href={'#'}
			class="relative lp:absolute bg-primary text-secondary lp:left-[40%] lp:top-[37%] sp:top-[33%] dp:top-[33%] dp:left-[40%] bg:top-[33%] bg:left-[42%] 2k:top-[41%] 2k:left-[41%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide"
		>
			<a on:click={openLisboa} href={'#'}>
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Lisbon</p>
			</a>
			<div class={`${isLisboaOpen ? 'block' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(2)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">Intertwined</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
				<hr class="border-secondary" />
				<a
					on:click={() => pickEvent(8)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">Underworld</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
			</div>
		</a>

		<a
			href={'#'}
			class="relative lp:absolute bg-primary text-secondary lp:left-[45%] lp:top-[30%] sp:top-[28%] dp:top-[27%] dp:left-[45%] bg:top-[27%] bg:left-[45%] 2k:top-[38%] 2k:left-[45%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide"
		>
			<a on:click={openParis} href={'#'}>
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Paris</p>
			</a>
			<div class={`${isParisOpen ? 'block' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(1)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">Non Places</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
				<hr class="border-secondary mt-2" />
				<a
					on:click={() => pickEvent(6)}
					href={'#'}
					class="flex justify-between items-center py-2 gap-36"
				>
					<p class="text-sm font-normal tracking-wide">NFT Paris</p>
					<img
						loading="lazy"
						src={`/events/events-pick-${estilos[index].secondary_media}.svg`}
						alt="pick event"
					/>
				</a>
			</div>
		</a>
		
	</div>

	{#each events as { banner, what, where, info, date, address }, index (index)}
		{#if index === selectedEvent}
			<Event on:closeEvent={closeEvent} {banner} {what} {where} {info} {date} {address} />
		{/if}
	{/each}

    <div class="hidden lp:flex items-center justify-between">
        <Subscribe />
        <Contact />
    </div>
</div>
