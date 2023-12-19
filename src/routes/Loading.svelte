<script>
	import { onMount } from "svelte";
    export let progress;

    let progressBar;
    
    onMount(() => {
        progressBar.value = progress;

        console.log(progress);
    });
</script>
  
<div class="bg-black absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center z-20">
    <label class="text-white text-4xl h-[5%]" for="{progressBar}">Loading...</label>
    <progress bind:this={progressBar} class="w-1/3 h-[2%] mt-[0.5%]" value="0" max="100"></progress>
</div>