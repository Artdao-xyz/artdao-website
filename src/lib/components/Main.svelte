<script>
	import { indexSectionStore, isOpen } from '$lib/store.js';
	import TextScramble from '$lib/utils/TextScramble.js';

	let h1;
	let content = [
		'Building for\na new age\nof culture',
		'Bringing\n visionary\nart to life',
		'Bridging\nthe global &\nHyperlocal',
		'Artist driven\ndesign'
	];

	const handleFooterClick = () => {
		isOpen.set(false);
	};

	$: if (h1) {
		new TextScramble(h1, content[$indexSectionStore]);
	}

</script>

<button on:click={handleFooterClick} class="cursor-default">
    <main >
		<section class="w-full h-[400vh] p-2 lp:p-5 flex justify-center lp:justify-start">
			<!-- svelte-ignore a11y-missing-content -->
			<h1
				bind:this={h1}
				class="fixed  left-4 lp:top-1/2 lp:-translate-y-1/2 w-5/6 h-fit lp:ml-16 font-neue-power inline-block text-5xl text-left font-medium tb:text-3xl lp:text-8xl dp:text-9xl uppercase leading-10 tracking-wider lp:whitespace-pre-line lp:truncate"
			></h1>
		</section>
	</main></button
>
