<script>
    import * as config from '$lib/config.js';
    export let currentSection;
    export let setSection
    export let matcapIndex

    let header

    $:if (header) {
        header.style.backgroundColor = config.default.estilos[matcapIndex].color;
    }
    
</script>

<header bind:this={header} class="sticky top-0 left-0 flex justify-between items-center p-6 z-10">
    <div class="left-head">
        <a href='/'><img src="/artdao-logo.svg" alt="Artdao Logo"></a>
    </div>
    <nav>
        <ul class="font-semibold m-0 flex justify-between items-center gap-5 p-0">
            <li><a on:click={() => setSection(0)} class="{currentSection == 0 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s3_white.svg" alt="Section 1"><span class="{currentSection == 0 ? 'invert' : 'invisible'}">Mission</span></a></li> 
            <li><a on:click={() => setSection(1)} class="{currentSection == 1 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s4_white.svg" alt="Section 2"><span class="{currentSection == 1 ? 'invert' : 'invisible'}">drops</span></a></li>
            <li><a on:click={() => setSection(2)} class="{currentSection == 2 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s1_white.svg" alt="Section 3"><span class="{currentSection == 2 ? 'invert' : 'invisible'}">Events</span></a></li>
            <li><a on:click={() => setSection(3)} class="{currentSection == 3 ? 'invert' : ''}" href={"#"}><img class="m-auto mb-2" src="/s2_white.svg" alt="Section 5"><span class="{currentSection == 3 ? 'invert' : 'invisible'}">Studio</span></a></li>
        </ul>
    </nav>
</header>