<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import { estilos } from '$lib/config.js';
    import { indexStyleStore } from '$lib/store.js';
    // import { env } from '$env/dynamic/public';
    // import { PUBLIC_API_ENDPOINT } from '$env/static/public';
    
    let index = 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: JSON.stringify({
                email: formData.get('EMAIL')
            }),
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    };

    onMount(() => {
        const styleStore = indexStyleStore.subscribe(value => {
            index = value;
        });

        return styleStore;
    });

</script>

<form on:submit|preventDefault={handleSubmit} method="POST" action="/api/subscribe" id="subscribeForm" class="bg-primary text-secondary flex items-center justify-between gap-4 p-4 rounded-lg mt-8 lp:mt-24">
    <label for="email" class="self-start font-medium text-xs lp:text-sm my-auto tracking-wider">Subscribe</label>
    <input type="email" name="EMAIL" class="invalid bg-transparent font-normal flex-grow text-xs lp:text-base border-secondary border-b-[1px] outline-none" required value="">
    <button type="submit" class="outline-none flex-none"><img src={`/arrow-subscribe-${estilos[index].secondary_media}.svg`} alt="Subscribe"></button>
    <div aria-hidden="true" style="position: absolute; left: -5000px;">
        <!-- /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */ -->
        <input type="text" name="b_d150dd71762335c56d7e5811c_6f099dd01d" tabindex="-1" value="">
    </div>
</form>