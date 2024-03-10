<script>
	import { onMount } from 'svelte';
	import { estilos } from '$lib/config.js';
	import { indexStyleStore } from '$lib/store.js';
	import { fade } from 'svelte/transition';

	let index = 0;
	let submitting = false;
	let success = false;
	let error = false;
	let memberExists = false;

	const handleSubmit = async (event) => {
		submitting = true;
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const response = await fetch(form.action, {
			method: form.method,
			body: JSON.stringify({
				email: formData.get('EMAIL')
			}),
			headers: {
				Accept: 'application/json'
			}
		});
		const data = await response.json();
		// @dev has shape { success : true }
		// console.log(data);
		if (data.success) {
			success = true;
		} else {
			const errorType = JSON.parse(data.error);
			const errorTitle = errorType.title;
			console.error(errorTitle);
			if (errorTitle === 'Member Exists') {
				memberExists = true;
			} else {
				error = true;
			}
		}
		submitting = false;
		console.log(submitting);
		setTimeout(() => {
			success = false;
			memberExists = false;
			error = false;
		}, 4000);
	};

	onMount(() => {
		const styleStore = indexStyleStore.subscribe((value) => {
			index = value;
		});

		return styleStore;
	});
</script>

{#if submitting}
	<div
		class="bg-primary font-medium text-center italic text-secondary flex items-center justify-between gap-4 p-4 rounded-lg mt-8 lp:mt-24"
	>
		<p class="text-xs lp:text-sm mx-auto">🔨 submitting...</p>
	</div>
{:else}
	<form
		on:submit|preventDefault={handleSubmit}
		method="POST"
		action="/api/subscribe"
		id="subscribeForm"
		class="bg-primary text-secondary flex items-center justify-between gap-4 p-4 rounded-lg mt-8 lp:mt-24"
	>
		<label for="email" class="self-start font-medium text-xs lp:text-sm my-auto tracking-wider"
			>Subscribe</label
		>
		<input
			type="email"
			name="EMAIL"
			class="invalid w-1/2 bg-transparent font-normal flex-grow text-base border-secondary border-b-[1px] outline-none"
			required
			value=""
		/>
		<button type="submit" class="outline-none flex-none"
			><img
				loading="lazy"
				src={`/arrow-subscribe-${estilos[index].secondary_media}.svg`}
				alt="Subscribe"
			/></button
		>
		<div aria-hidden="true" style="position: absolute; left: -5000px;">
			<!-- /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ -->
			<input type="text" name="b_d150dd71762335c56d7e5811c_6f099dd01d" tabindex="-1" value="" />
		</div>
	</form>
{/if}

<div
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ delay: 50, duration: 50 }}
	class="text-primary mx-auto italic flex items-center lp:gap-4 p-4 rounded-lg lp:mt-6"
>
	{#if success}
		<p class="font-medium mx-auto text-xs lp:text-sm tracking-wider">Thank you for subscribing!</p>
		<img loading="lazy" src="/artdao-hammer.svg" alt="subscribed" />
	{:else if memberExists}
		<p class="font-medium mx-auto text-xs lp:text-sm tracking-wider">You're already subscribed!</p>
		<img loading="lazy" src="/artdao-hammer.svg" alt="subscribed" />
	{:else if error}
		<p class="font-medium mx-auto text-xs lp:text-sm tracking-wider">
			Something went wrong, please try again.
		</p>
		<img loading="lazy" src="/artdao-hammer.svg" alt="subscribed" />
	{/if}
</div>
