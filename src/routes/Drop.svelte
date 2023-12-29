<script>
    export let banner;
    export let name;
</script>

<div class="bg-black flex flex-col items-center gap-7 p-5 rounded-lg ">
    <div>
        <img class="" src={banner} alt="Drop">
    </div>
    <div class="mx-auto">
        <p class="text-white text-2xl uppercase clas font-medium">{name}</p>
        <a class="text-xs mx-auto text-white flex items-center justify-center gap-2 underline" href={"#"}>Explore drop<img class="invert" src="/link-arrow.svg" alt="Link arrow"></a>
    </div>
</div>
