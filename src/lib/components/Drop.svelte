<script>
	export let banner;
	export let banner_mobile;
	export let name;
	export let artists;
	export let description;
	export let hammer;
	export let indexDrop;

	import { onMount } from 'svelte';
	import { indexStyle } from '$lib/store.js';

	let index = 0;

	onMount(() => {
		const unsubscribe = indexStyle.subscribe((value) => {
			index = value;
		});

		return unsubscribe;
	});
</script>

<div class="text-secondary flex flex-col z-30">
		<img  class="hidden lp:block rounded-t-md w-full object-contain w-full h-auto object-cover" src={banner} alt="Drop" />
		<img  class="lp:hidden rounded-t-md" src={banner_mobile} alt="Drop" />

		<div class="font-clash-display bg-primary px-2 py-1 lp:p-4 flex items-center justify-between gap-12 rounded-b-md">
			<div class="flex flex-col w-2/3 lp:w-1/6 gap-3">
				<div class="flex gap-2 items-center">
					<p class="text-base font-semibold lp:text-lg uppercase">{name}</p>
					<p class="text-xs">#00{indexDrop}</p>
				</div>
				<p class="text-xs font-medium leading-tight tracking-wide uppercase">{artists}</p>
			</div>
			<p
				class="hidden lp:block text-sm font-normal leading-none tracking-wider normal-case "
			>
				{description}
			</p>
			<div class="w-2/3 lp:w-1/6">
				<img  class="ml-auto mr-0" src={hammer} alt="Hammer" />
			</div>
		</div>
</div>
