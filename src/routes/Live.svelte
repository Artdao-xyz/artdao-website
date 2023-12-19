<script>
    let isLive = false;
    let state = 'coming';

    export let source;
    
    const openLive = _ => {
        isLive ? isLive = false : isLive = true;
        console.log(isLive)
    }
</script>

<div class={isLive ? "transition-all duration-300 ease-in-out fixed flex h-[100px] w-[500px] top-1/4 right-[-0px] bg-black rounded-l-2xl shadow-xl z-10 items-center" : "transition-all duration-300 ease-in-out fixed flex h-[100px] w-[500px] top-1/4 right-[-380px] bg-black rounded-l-2xl shadow-xl z-10 items-center"}>
    <div class="flex flex-col h-full w-[120px] gap-0">
        <div class="h-2/3 mx-auto">
            <a on:click={() => openLive()} href={"#"}><img class="relative -top-9" src={source[0]} alt="Banner"></a>
        </div>

        {#if state == 'coming'}
            <div class="shrink flex justify-between m-auto gap-2">
                <img class="" src={"/coming-soon.svg"} alt="">
                <p class="text-white text-[10px] font-clash-display font-semibold normal-case tracking-wider">04w 12d 00h</p>
            </div>
        {/if}

        {#if state == 'live'}
            <div class="shrink flex justify-between m-auto gap-2">
                <img class="" src="/live.svg" alt="">
                <p class="text-white text-[10px] font-clash-display font-semibold uppercase ">Live</p>
            </div>
        {/if}
    </div>

    <div class="">
        <a href="https://www.psipsikoko.com/" target="_blank"><img class="" src={source[1]} alt="Banner Psisikoko"></a>
    </div>
</div>

