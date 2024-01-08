<script>
    import { onMount } from 'svelte';
    export let source;
    
    let isLive = false;
    let state = 'coming';

    let countdown = {
    weeks: 0,
    days: 0,
    hours: 0
    };

    const openLive = _ => {
        isLive ? isLive = false : isLive = true;
        console.log(isLive)
    }

    //final date
    const finalDate = new Date('2024-01-17T00:00:00'); 

    function updateCountdown() {
    const now = new Date();
    const timeDifference = finalDate - now;

    if (timeDifference > 0) {
        countdown.weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        countdown.days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
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

<div class="hidden transition-all duration-300 ease-in-out fixed lp:flex h-[100px] w-[500px] top-1/4 bg-black rounded-l-2xl shadow-xl z-10 items-center {isLive ? "right-[0px]" : "right-[-380px]"}">
    <div class="flex flex-col h-full w-[160px] gap-0">
        <div class="h-2/3 mx-auto">
            <a on:click={() => openLive()} href={"#"}><img class="relative -top-9" src={source[0]} alt="Banner"></a>
        </div>

        {#if state == 'coming'}
            <div class="shrink flex justify-between m-auto gap-2">
                <img class="" src={"/coming-soon.svg"} alt="">
                <p class="text-white text-[10px] font-clash-display font-semibold uppercase tracking-widest">{`${countdown.weeks}w ${countdown.days}d ${countdown.hours}h`}</p>
            </div>
        {/if}

        {#if state == 'live'}
            <div class="shrink flex justify-between m-auto gap-2">
                <img class="" src="/live.svg" alt="">
                <p class="text-white text-[10px] font-clash-display font-semibold uppercase">Live</p>
            </div>
        {/if}
    </div>

    <div class="h-full w-full ">
        <a href="https://www.psipsikoko.com/" target="_blank"><img class="h-full w-full" src={source[1]} alt="Banner Psisikoko"></a>
    </div>
</div>

<!-- MOBILE -->

<div class="bg-black fixed left-0 top-20 w-screen h-[7vw] flex items-center justify-between lp:hidden">
    <div class="w-2/3 flex  items-center justify-evenly">
        <div class="scale-[200%]">
            <img class="" src={"/coming-soon.svg"} alt="">
        </div>
        <div class="text-white text-xs tb:text-base font-clash-display font-semibold uppercase tracking-wider">{`${countdown.weeks}w ${countdown.days}d ${countdown.hours}h`}</div>
    </div>
    <div class="w-1/3 h-full ">
        <a class="" href="https://www.psipsikoko.com/" target="_blank"><img class="w-full h-full object-fill object-right "  src={source[1]} alt="Banner Psisikoko"></a>
    </div>
</div>

