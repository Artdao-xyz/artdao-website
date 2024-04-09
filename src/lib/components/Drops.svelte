<script>
	import { fade } from 'svelte/transition';
	import Drop from './Drop.svelte';
	import { onMount } from 'svelte';
	import { indexStyleStore } from '$lib/store.js';
    import Subscribe from './Subscribe.svelte';
    import Contact from './Contact.svelte';

	let index = 0;
	let pickedDrop = '0';

	onMount(() => {
		const unsubscribe = indexStyleStore.subscribe((value) => {
			index = value;
		});

		return unsubscribe;
	});

	let drops = [
		{
			banner: '/drops/banner-psipsikoko-comingsoon.png',
			banner_mobile: '/drops/banner-psipsikoko-mobile.png',
			name: 'Psipsikoko',
			artists: 'Frenetik Void & Julian Brangold',
			description:
				'"PsiPsiKoko" is a fictional universe conceived by artists Julian Brangold and Frenetik Void. Born from a subversive approach to AI technology combined with mainstream content creation tools, this project serves as a unique reflection of our current digital landscape. It draws inspiration from the vast array of uncanny user-generated content that saturates the internet.',
			hammer: '/drops/hammer-psipsikoko.png'
		}
		// {
		//     banner: '/drops/banner-hyperescapismo.png',
		//     banner_mobile: '/drops/banner-hyperescapismo-mobile.png',
		//     name: "Hyperescapismo",
		//     description:"",
		//     artists: "Hyperescapismo",
		//     hammer: "/drops/hammer-hyperescapismo.png"
		// }
	];

	const handleDropChange = (event) => {
		pickedDrop = event.target.value;
	};
</script>

<div
	class="h-full flex flex-col justify-center lp:justify-between overflow-y-hidden z-20"
	in:fade={{ delay: 100, duration: 150 }}
	out:fade={{ delay: 100, duration: 25 }}
>

	<div class="lp:mx-20 flex flex-col justify-between gap-8 lp:gap-2">
		<div class="text-sm leading-none tracking-wide flex gap-3">
			<input
				type="radio"
				id="drop_0"
				value="0"
				bind:group={pickedDrop}
				on:change={handleDropChange}
				class="hidden peer/0"
			/>
			<label
				for="drop_0"
				class="inline-block cursor-pointer bg-background text-primary font-neue-power font-semibold p-1 leading-none tracking-wide rounded-sm shadow peer-checked/0:bg-primary peer-checked/0:text-secondary border-primary border-2"
				>#000</label
			>
			<!--           
				<input type="radio" id="drop_1" value="1" bind:group={pickedDrop} on:change={handleDropChange} class="hidden peer/1"/>
				<label for="drop_1" class="inline-block cursor-pointer bg-background text-primary px-3.5 py-2 rounded-sm shadow peer-checked/1:bg-primary peer-checked/1:text-secondary border-primary border-2">#001</label> -->
	
			<!-- <input type="radio" id="drop_2" value="2" bind:group={pickedDrop} on:change={handleDropChange} class="hidden peer/2"/>
				<label for="drop_2" class="inline-block cursor-pointer bg-background text-primary px-3.5 py-2 rounded-sm shadow peer-checked/2:bg-primary peer-checked/2:text-secondary border-primary border-2">#002</label> -->
		</div>
        {#each drops as { banner, banner_mobile, name, artists, description, hammer }, index (index)}
            {#if index == pickedDrop}
                <Drop {banner} {banner_mobile} {name} {artists} {description} {hammer} indexDrop={index} />
            {/if}
        {/each}
    </div>


	<div class="hidden lp:flex items-center justify-between">
		<Subscribe />
		<Contact />
	</div>
</div>

<!-- {/if} -->
