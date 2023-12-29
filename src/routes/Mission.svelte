<script>
    import * as config from '$lib/config.js';
    import Contact from './Contact.svelte';
    import { createEventDispatcher } from 'svelte';

    export let index;
    
    export let isFooter = false;
    let arrow = false;
    const dispatch = createEventDispatcher();

    const openFooter = _ => {
        if (isFooter) {
            isFooter = false;
            arrow.src = '/arrow-up.svg';
        } else {
            isFooter = true;
            arrow.src = '/arrow-down.svg';
        }
    }

    const updateMatcap = _ => {
        index++;
        index >= config.default.estilos.length ? index = 0 : null;
    }

    const handleMatcapUpdated = () => {
        updateMatcap();
        const matcap = index;
        dispatch('matcapUpdate', { matcap });
    };

    const handleFooterUpdated = () => {
        openFooter();
        dispatch('footerUpdate', { isFooter });
    };
</script>


<div class="flex justify-between items-center">
    <div class="flex justify-start items-center gap-3">
        <p class="text-xl font-medium tracking-wider leading-5	">By artists for artists</p>
        <a on:click={handleFooterUpdated} href={'#'} class='bg-black w-fit py-1 px-6 rounded-3xl'><img bind:this={arrow} src="/arrow-up.svg" alt="hyperlink"></a>
    </div>
    <Contact on:matcapUpdate={handleMatcapUpdated} />
</div>

<div class="h-full flex flex-col justify-center leading-10 py-16">    
    <div class="flex text-2xl normal-case leading-10 justify-between items-center gap-10 mt-12 ">
        <div class="w-1/2 self-start border-r-2 pr-8 border-slate-500">
            <p class="mb-8">
                We believe the development of digital technologies opens a path to new relationships between ourselves and the world around us.
            </p>
            <p class="">
                By making tangible the provenance and ownership of digital assets at a time of rapid technological transformation, new opportunities emerge for those able to construct worlds of feeling from software, pixels and code.
                No longer bound by geographical confines, a new commons opens into which new talent and aesthetic resonances emerge.
            </p>
        </div>
        <div class="flex-1 ">
            <p class="mb-8">
                Giving birth to a new hyperlocal, which disperses through group chats and the spaces of modern cities and proliferates through social media to all corners of the globe.
            </p> 
            <p class="">
                We are born from such experimentations. A team of artists experimenting with new forms of self-sovereign technologies and the affective force of artistic originality as they coalesce within modern cities and disperse across global networks of communication. Developing new means to discover, curate, develop and connect with art.
            </p>
        </div>
    </div>
</div>
