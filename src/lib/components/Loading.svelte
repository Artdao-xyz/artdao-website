<script>
    export let progress;
  
    let progressBar
    let progressBarContainer
    
    $: if (progressBar) {
        progressBar.value = progress;

        if (progress == 100) {
            setTimeout(() => {
                progressBarContainer.style.display = 'none';
            }, 1000);
        }
      }
  </script>
  
  <!-- Loading GIF -->
  <div bind:this={progressBarContainer} class="bg-white absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center gap-4 z-20">
    <label class="h-[25%]" for={progressBar}><img loading="lazy" class="h-full" src="/loading.gif" alt="Loading gif"></label>
    <progress bind:this={progressBar} class="invisible" value="{progress}" max="100"></progress>
  </div>
  