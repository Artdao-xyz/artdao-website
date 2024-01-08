<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    
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

    const handleFooterUpdated = () => {
        openFooter();
        dispatch('footerUpdate', { isFooter });
    };
</script>

{#if isFooter}
    <div 
        class="h-full lp:flex flex-col justify-center leading-10 normal-case tracking-[1px] mt-8"    
        in:fade={{ delay: 250, duration: 750 }}
        out:fade={{ delay: 250, duration: 150 }}
        >
        
        <div class="lp:flex h-full text-base lp:text-xl   justify-between items-center gap-10 lp:mt-4">
            <div class=" lp:w-1/2 lp:self-start">
                <p class="mb-8 ">
                    We believe the development of digital technologies opens a path to new relationships between ourselves and the world around us.
                </p>
                <p class="mb-8">
                    By making tangible the provenance and ownership of digital assets at a time of rapid technological transformation, new opportunities emerge for those able to construct worlds of feeling from software, pixels and code.
                    No longer bound by geographical confines, a new commons opens into which new talent and aesthetic resonances emerge.
                </p>
                <p class="mb-8">
                    No longer bound by geographical confines, a new commons opens into which new talent and aesthetic resonances emerge. 
                </p>
                <p>
                    In the overcoming of past barriers, new challenges emerge. Confronted by a mass of content we lack a means to effectively discover and connect across the digital terrain. 
                </p>
            </div>
            <div class="h-full w-full lp:flex-1 mb-8 ">
                <p class="mb-8 mt-4 ">
                    Giving birth to a new hyperlocal, which disperses through group chats and the spaces of modern cities and proliferates through social media to all corners of the globe.
                </p> 
                <p class=" mb-8 ">
                    We are born from such experimentations. A team of artists experimenting with new forms of self-sovereign technologies and the affective force of artistic originality as they coalesce within modern cities and disperse across global networks of communication.  Developing new means to discover, curate, develop and connect with art.
                </p>
            </div>
        </div>
    </div>
{/if}