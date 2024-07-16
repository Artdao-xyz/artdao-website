<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { estilos } from '$lib/utils/config.js';
	import { indexStyleStore, isOpen } from '$lib/store.js';
	import Event from './Event.svelte';
    import Subscribe from './Subscribe.svelte';
    import Contact from './Contact.svelte';
    
	let selectedEvent = null;

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
		},
		{
			banner: [
				'/events/rave/rave-1.png',
				'/events/rave/rave-2.png',
				'/events/rave/rave-3.png',
				'/events/rave/rave-4.png'
			],
			what: 'Rave',
			where: 'Lisbon',
			info: 'Exhibition/Party',
			date:'MAY 5th /2024',
			address: 'HIGHER GROUND, LISBON'
		},
		{
			banner: [
				'/events/artifice/artifice-1.png',
				'/events/artifice/artifice-2.png',
				'/events/artifice/artifice-3.png',
				'/events/artifice/artifice-4.png'
			],
			what: 'Artifice',
			where: 'Lisbon',
			info: 'Exhibition/Party',
			date:'MAY 28th - 30th /2024',
			address: 'RnA Studio, LISBON'
		}
	];

	let index = 0;
	let isLisboaOpen = false;
	let isBuenosAiresOpen = false;
	let isParisOpen = false;
	let isBotogaOpen = false;
	let isDenverOpen = false;
    let isSaoPauloOpen = false;

	$: if ($isOpen) {
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
	<button
	in:fade={{ delay: 100, duration: 150 }}
	out:fade={{ delay: 100, duration: 25 }}
		on:click={closeEvent}
		class="cursor-default overscroll-y-contain h-fit flex-grow overflow-y-hidden"
		
		><img
			
			class="fixed lp:relative top-1/2 lp:top-0 -translate-y-1/2 lp:-translate-y-0 left-0 scale-[225%] lp:scale-100 object-contain mx-auto lp:h-full -z-10"
			src={`/events/map-${estilos[$indexStyleStore].primary_media}.png`}
			alt="Map events"
		/></button
	>

	<div class="h-[80%] lp:h-auto w-fit mx-auto flex flex-col justify-center items-star gap-8">
		<button
			
			class="relative lp:absolute bg-primary text-secondary lp:left-[18%] lp:top-[37%] sp:top-[35%] sp:left-[18%] dp:left-[19%] dp:top-[33%] bg:top-[35%] bg:left-[20%] 2k:top-[38%] 2k:left-[20%] px-3 py-1 rounded-sm shadow-md gap-3 text-left"
		>
			<button on:click={openDenver} >
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Denver</p>
			</button>
			<div class={`${isDenverOpen ? 'block w-44' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 4)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">ETH Denver</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
			</div>
		</button>

		<button
			
			class="relative lp:absolute bg-primary text-secondary lp:left-[30%] lp:top-[65%] sp:top-[65%] sp:left-[30%]  bg:top-[60%] bg:left-[30%] 2k:left-[30%] px-3 py-1.5 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide text-left"
		>
			<button on:click={openBuenosAires} >
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Buenos Aires</p>
			</button>
			<div class={`${isBuenosAiresOpen ? 'block w-44' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 3)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Cero Uno</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
				<hr class="border-secondary" />
				<button
					on:click={pickEvent.bind(null, 0)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Psipsikoko</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
			</div>
		</button>

		<button
		
		class="relative lp:absolute bg-primary text-secondary lp:left-[32%] lp:top-[57%] sp:top-[56%] dp:top-[57%] dp:left-[32%] bg:top-[54%] bg:left-[32%] 2k:top-[54%] 2k:left-[32%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide text-left"
	>
		<button on:click={openSaoPaulo} >
			<p class="normal-case text-xl font-medium font-neue-power tracking-wide">São Paulo</p>
		</button>
		<div class={`${isSaoPauloOpen ? 'block w-44' : 'hidden'} h-full`}>
			<hr class="border-secondary mt-2" />
			<button
				on:click={pickEvent.bind(null, 7)}
				
				class="flex justify-between items-center py-2 w-full"
			>
				<p class="text-sm font-normal tracking-wide">O.R.B</p>
				<img
					
					src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
					alt="pick event"
				/>
			</button>
		</div>
		</button>

		<button
			
			class="relative lp:absolute bg-primary text-secondary lp:left-[28%] lp:top-[49%] sp:left-[27%] sp:top-[48%] dp:left-[27%] dp:top-[48%] bg:top-[48%] bg:left-[28%] 2k:top-[48%] 2k:left-[28%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide text-left"
		>
			<button on:click={openBogota} >
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Bogotá</p>
			</button>
			<div class={`${isBotogaOpen ? 'block w-44' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 5)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">DEVCON</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
			</div>
		</button>

		<button
			
			class="relative lp:absolute bg-primary text-secondary lp:left-[40%] lp:top-[37%] sp:top-[33%] dp:top-[33%] dp:left-[40%] bg:top-[33%] bg:left-[42%] 2k:top-[35%] 2k:left-[40%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide text-left"
		>
			<button on:click={openLisboa} >
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Lisbon</p>
			</button>
			<div class={`${isLisboaOpen ? 'block w-44' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 2)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Intertwined</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
				<hr class="border-secondary" />
				<button
					on:click={pickEvent.bind(null, 8)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Underworld</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
				<hr class="border-secondary" />
				<button
					on:click={pickEvent.bind(null, 9)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Rave</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
				<hr class="border-secondary" />
				<button
					on:click={pickEvent.bind(null, 10)}
					
					class="flex w-full justify-between items-center py-2"
				>
					<p class="text-sm font-normal tracking-wide">Artifice</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
			</div>
		</button>

		<button
			
			class="relative lp:absolute bg-primary text-secondary lp:left-[45%] lp:top-[30%] sp:top-[28%] dp:top-[27%] dp:left-[45%] bg:top-[27%] bg:left-[45%] 2k:top-[32%] 2k:left-[47%] px-3 py-1 rounded-sm shadow-md gap-3 normal-case text-xl font-medium font-neue-power tracking-wide text-left"
		>
			<button on:click={openParis} >
				<p class="normal-case text-xl font-medium font-neue-power tracking-wide">Paris</p>
			</button>
			<div class={`${isParisOpen ? 'block w-44' : 'hidden'} h-full`}>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 1)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">Non Places</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
				<hr class="border-secondary mt-2" />
				<button
					on:click={pickEvent.bind(null, 6)}
					
					class="flex justify-between items-center py-2 w-full"
				>
					<p class="text-sm font-normal tracking-wide">NFT Paris</p>
					<img
						
						src={`/events/events-pick-${estilos[$indexStyleStore].secondary_media}.svg`}
						alt="pick event"
					/>
				</button>
			</div>
		</button>
		
	</div>

	{#each events as { banner, what, where, info, date, address }, index}
		{#if index === selectedEvent}
			<Event on:closeEvent={closeEvent} {banner} {what} {where} {info} {date} {address} />
		{/if}
	{/each}

    <div class="hidden lp:flex items-center justify-between">
        <Subscribe />
        <Contact />
    </div>
</div>
