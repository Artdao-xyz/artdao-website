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
        console.log('submitting', submitting);
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
		console.log(data);
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
    var input;
        var submit;

	onMount(() => {
		const styleStore = indexStyleStore.subscribe((value) => {
			index = value;
		});

        // document.addEventListener("DOMContentLoaded", function() {

        onfocus = () => {
            console.log('focus');
            if (input.value.trim().length > 0) {
                submit.style.visibility = "visible";
                }
            };

        onkeyup = ()  => {

            if (input.value.trim().length > 0) {
                submit.style.visibility = "visible";
            } else {
                submit.style.visibility = "hidden";
            }
        };
        // });

		return styleStore;
	});




</script>


<div class="flex flex-col lp:flex-row gap-2 lp:gap-0 items-center w-full justify-start">

    <form
    in:fade={{ delay: 50, duration: 150 }}
    out:fade={{ delay: 50, duration: 50 }}
    on:submit|preventDefault={handleSubmit}
    method="POST"
    action="/api/subscribe"
    id="subscribeForm"
    class="text-primary w-screen lp:w-auto flex flex-col lp:flex-row items-center justify-center gap-2"
>
    <label for="email" class="hidden self-start font-medium text-xs lp:text-sm my-auto tracking-wider"
        ></label
    >
    <input
        bind:this={input}
        type="email"
        name="EMAIL"
        class="peer inline-block w-[90%] lp:w-full invalid bg-transparent font-normal text-base outline-none leading-snug tracking-wide placeholder:opacity-85 placeholder:font-light placeholder:invert placeholder:tracking-wide border-primary border-b-[1px]"
        required
        value=""
        placeholder="Enter email to subscribe"
    />
    <button bind:this={submit}
    type="submit" class="outline-none rounded-lg shadow-custom py-2 px-3 text-sm font-medium flex-none invisible leading-snug tracking-wide"
        >submit</button
    >
    <div aria-hidden="true" style="position: absolute; left: -5000px;">
        <!-- /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ -->
        <input type="text" name="b_d150dd71762335c56d7e5811c_6f099dd01d" tabindex="-1" value="" />
    </div>
    </form>
  
    <div
            in:fade={{ delay: 50, duration: 150 }}
            out:fade={{ delay: 50, duration: 50 }}
            class="text-primary normal-case font-medium italic flex items-center lp:gap-4 rounded-lg"
        >   
            {#if submitting}
                <div
                    class="text-primary text-center italic flex items-center justify-start gap-4 4"
                >
                    <p class="text-xs lp:text-sm mx-auto">🔨 submitting...</p>
                </div>
            {:else if success}
                <p class="text-xs lp:text-sm tracking-wider">Thank you for subscribing!</p>
            {:else if memberExists}
                <p class="text-xs lp:text-sm tracking-wider">You're already subscribed!</p>
            {:else if error}
                <p class="text-xs lp:text-sm tracking-wider">
                    Something went wrong, please try again.
                </p>
            {/if}
    </div>
</div>

<!-- <style>
input::placeholder {
    opacity: 0.75;

    filter: invert(1);
}
</style> -->