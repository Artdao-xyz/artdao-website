<script>
    export let section;
    let sectionContent;
  
    $: if (section === 0) {
      sectionContent = `A new age\nof culture`;
    } else if (section === 1) {
      sectionContent = "Bringing visionary\nart to life";
    } else if (section === 2) {
      sectionContent = "Between the global\n& Hyperlocal";
    } else if (section === 3) {
      sectionContent = "Artist driven\ndesign";
    } else {
      sectionContent = "";
    }
  </script>

<main class="">
    <section class={section == 0 ? "transition-opacity duration-2000 min-h-[100vh] p-5" : "transition-opacity duration-2000	min-h-[100vh] p-5 opacity-0"}>
        <h1 class="font-neue-power inline-block text-5xl font-bold tracking-wider mt-24 whitespace-pre-line	">{@html sectionContent}</h1>
      </section>
    <section class={section == 1 ? "transition-opacity duration-2000 min-h-[100vh] p-5" : "transition-opacity duration-2000	min-h-[100vh] p-5 opacity-0"}>
        <h1 class="font-neue-power inline-block text-5xl font-bold tracking-wider mt-24 whitespace-pre-line	">{@html sectionContent}</h1>
      </section>
    <section class={section == 2 ? "transition-opacity duration-2000 min-h-[100vh] p-5" : "transition-opacity duration-2000	min-h-[100vh] p-5 opacity-0"}>
        <h1 class="font-neue-power inline-block text-5xl font-bold tracking-wider mt-24 whitespace-pre-line	">{@html sectionContent}</h1>
      </section>
    <section class={section == 3 ? "transition-opacity duration-2000 min-h-[100vh] p-5" : "transition-opacity duration-2000 min-h-[100vh] p-5 opacity-0"}>
        <h1 class="font-neue-power inline-block text-5xl font-bold tracking-wider mt-24 whitespace-pre-line	">{@html sectionContent}</h1>
      </section>
</main>
