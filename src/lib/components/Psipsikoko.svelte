<script>
    export let banner;
    export let name;
</script>

<div class="hidden lp:flex lp:flex-col">
    <div>
        <img class="rounded-t-xl" src={banner} alt="Drop">
    </div>
    <div class="text-white bg-black w-full py-5 items-center flex justify-between p-6 rounded-b-xl">
        <p class=" text-2xl uppercase clas font-medium">{name}</p>
        <p>By Frenetik Void  & Juilian Brangold</p>
        <a class="text-xs text-white flex items-center justify-center gap-2 underline" href={"#"}>Explore drop<img class="invert" src="/link-arrow-black.svg" alt="Link arrow"></a>
    </div>
</div>
