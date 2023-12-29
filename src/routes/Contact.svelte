<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    const handleButtonClick = () => {
        dispatch('matcapUpdate');
    };
</script>

<div class="flex items-center gap-6">
    <button on:click={handleButtonClick}>
        <img class="p-0.5 border-solid border-[1px] border-black rounded-full" src="/material.png" alt="Material">
    </button>
    <a href={'https://twitter.com/Artdao_xyz'} target="_blank"><img class="" src="/x.svg" alt="X Logo"></a> 
    <a href={'https://www.instagram.com/artdao.xyz/'} target="_blank"><img src="/instagram.svg" alt="Instagram Logo"></a> 
    <a href={'#'} class='text-base underline font-medium flex gap-2'>Join our Discord<img src="/link-arrow.svg" alt="Link Arrow"></a>
</div>
