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
		isLive ? (isLive = false) : (isLive = true);
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
	class="hidden transition-all duration-300 ease-in-out fixed lp:flex h-[100px] w-[500px] top-1/4 bg-black rounded-l-2xl shadow-xl z-10 items-center {isLive
		? 'right-[0px]'
		: 'right-[-380px]'}"
>
	<div class="h-full w-[120px] relative -top-6">
		<a class="h-full" on:mouseenter={openLive} href={'#'}
			><img loading="lazy" class="h-full mx-auto" src={source[0]} alt="Banner" /></a
		>

		<div class="h-fit w-full flex justify-center items-center gap-2">
			<img loading="lazy" class="h-full" src={'/drops/coming-soon.svg'} alt="Drop coming soon" />
			<p
				class=" text-white justify-center text-[9px] text-center font-semibold uppercase tracking-wider"
			>
				{`${countdown.weeks}w ${countdown.days}d ${countdown.hours}h`}
			</p>
		</div>
	</div>

	<div class="h-full w-[380px]">
		<a on:mouseleave={openLive} href="https://www.psipsikoko.com/" target="_blank"
			><img loading="lazy" src={source[1]} alt="Banner Psisikoko" /></a
		>
	</div>
</div>

<!-- MOBILE -->
<div
	class="bg-black fixed left-0 top-20 w-screen h-[12vw] tb:h-[10vw] flex items-center justify-between lp:hidden"
>
	<div class="w-full h-full flex items-center justify-center gap-4 tb:gap-8">
		<img
			loading="lazy"
			class="h-fit scale-150 tb:scale-[400%]"
			src={'/drops/coming-soon.svg'}
			alt=""
		/>
		<p class="text-white text-sm tb:text-lg font-semibold uppercase tracking-wider">
			{`${countdown.weeks}w ${countdown.days}d ${countdown.hours}h`}
		</p>
	</div>
	<div class="w-full h-full">
		<a class="w-full h-full" href="https://www.psipsikoko.com/" target="_blank"
			><img
				loading="lazy"
				class="w-full h-full object-cover object-right"
				src={source[1]}
				alt="Banner Psisikoko"
			/></a
		>
	</div>
</div>
