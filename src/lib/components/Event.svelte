<script>
    export let banner;
    export let what;
    export let where;
</script>

<a href={"#"}>
    <div class="overflow-y-auto w-4/5 h-full flex flex-col mx-auto mt-8 hover:cursor-pointer">
        <div class="h-full w-full">
            <img class="h-full w-full object-cover rounded-t-xl" src={banner} alt="Drop">
        </div>
        <div class="bg-black w-full py-3 items-center flex flex-col gap-1 rounded-b-xl">
            <p class="text-white text-xs tb:text-xl lp:text-xl text-center uppercase clas font-medium">{what}</p>
            <a class="text-[10px] lp:text-xs mx-auto text-white flex items-center justify-center gap-2 underline" href={"#"}>{where}</a>
        </div>
    </div>
</a>