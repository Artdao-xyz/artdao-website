<script>
	import { onMount } from 'svelte';
	import { indexSectionStore, isOpenStore } from '$lib/store.js';
	import TextScramble from '$lib/utils/TextScramble.js';

	let section, h1;
	let content = '';
	let isOpen = false;

	const handleFooterClick = () => {
		isOpen = false;
	};

	$: if (h1) {
		if (section == 0) {
			content = 'building for\na new age\nof culture';
			new TextScramble(h1, content);
		} else if (section == 1) {
			content = 'Bringing\n visionary\nart to life';
			new TextScramble(h1, content);
		} else if (section == 2) {
			content = 'Bridging\nthe global &\nHyperlocal';
			new TextScramble(h1, content);
		} else if (section == 3) {
			content = 'Artist driven\ndesign';
			new TextScramble(h1, content);
		}
	}

	onMount(() => {
		indexSectionStore.subscribe((value) => {
			section = value;
		});

		isOpenStore.subscribe((value) => {
			isOpen = value;
		});

		content = 'building for\n a new age\n of culture';
		new TextScramble(h1, content);

	})
</script>

<button on:click={handleFooterClick} class="cursor-default">
    <main >
		<section bind:this={section} class="w-full h-[400vh] p-2 lp:p-5 flex justify-center lp:justify-start">
			<!-- svelte-ignore a11y-missing-content -->
			<h1
				bind:this={h1}
				class="fixed lp:top-1/2 lp:-translate-y-1/2 w-5/6 h-fit lp:ml-16 font-neue-power inline-block text-5xl text-left font-medium tb:text-3xl lp:text-8xl dp:text-9xl uppercase leading-10 tracking-wider whitespace-pre-line"
			></h1>
		</section>
	</main></button
>
