<script>
	export let source;

	import { onMount } from 'svelte';

	let isLive = false;
	let state = 'coming';

	let countdown = {
		weeks: 0,
		days: 0,
		hours: 0
	};

	const openLive = (_) => {
		isLive = !isLive;
	};

	const finalDate = new Date('2024-01-17T00:00:00');

	function updateCountdown() {
		const now = new Date();
		const timeDifference = finalDate - now;

		if (timeDifference > 0) {
			countdown.weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
			countdown.days = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
			);
			countdown.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		} else {
			countdown.weeks = 0;
			countdown.days = 0;
			countdown.hours = 0;
		}
	}

	onMount(() => {
		updateCountdown();
		const intervalId = setInterval(updateCountdown, 3600000);
		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div
	class="transition-all duration-300 ease-in-out fixed scale-75 lp:scale-100 flex h-[100px] w-[500px] top-1/4 bg-black rounded-l-2xl shadow-xl z-50 items-center {isLive
		? 'right-[-65px] lp:right-[0px]'
		: 'right-[-350px] lp:right-[-380px]'}"
>
	<div class="h-full w-[120px] relative -top-6">
		<button class="h-full" on:click={openLive} on:mouseenter={openLive}
			><img  class="h-full mx-auto" src={source[0]} alt="Banner" /></button
		>

		<div class="h-fit w-full flex justify-center items-center gap-2">
			<img  class="h-full" src={'/live/live.svg'} alt="Drop coming soon" />
			<p
				class=" text-white justify-center text-[9px] text-center font-semibold uppercase tracking-wider"
			>O.R.B  @  ZORA
			</p>
			<!-- <p
				class=" text-white justify-center text-[9px] text-center font-semibold uppercase tracking-wider"
			>
				{`${countdown.weeks}w ${countdown.days}d ${countdown.hours}h`}
			</p> -->
		</div>
	</div>

	<div class="h-full w-[380px]">
		<a on:mouseleave={openLive} href="https://zora.co/collect/zora:0x6cfd003dade0b1c3f3620705082f341611f08655" target="_blank"
			><img  src={source[1]} alt="Banner Psisikoko" /></a
		>
	</div>
</div>