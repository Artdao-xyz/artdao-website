<script>
    export let banner;
    export let name;
</script>

<div class="flex flex-col lp:hidden">
    <div>
        <img class="rounded-t-xl" src={banner} alt="Drop">
    </div>
    <div class="bg-black w-full py-5 items-center flex flex-col gap-1 rounded-b-xl">
        <p class="text-white text-xl lp:text-2xl uppercase clas font-medium">{name}</p>
        <a class="text-[10px] lp:text-xs mx-auto text-white flex items-center justify-center gap-2 underline" href={"#"}>Explore drop<img class="invert" src="/link-arrow-black.svg" alt="Link arrow"></a>
    </div>
</div>
