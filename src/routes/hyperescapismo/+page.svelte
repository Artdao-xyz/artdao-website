<script>
    export let data;

    import "/src/style.css"
    import { onMount } from 'svelte';

    let { t, locale, locales } = data;

    onMount(() => {
        const userLanguage = navigator.language;
        if (userLanguage.startsWith('es')) {
            $locale = 'es';
        } else if (userLanguage.startsWith('pt')) {
            $locale = 'pt';
        } else {
            $locale = 'en';
        }
    });
</script>


<svelte:head>
	<title>Hyperescapismo</title>
	<meta name="description" content="Join us."/>
	<meta name="google-site-verification" content="WI3Z_jERr-qBan3Ht8rXSUuy2RzrO_HhfFlzVd3DXaA" />
</svelte:head>

<div class="h-svh lp:h-screen max-h-screen font-monda text-white font-bold tracking-wide leading-none bg-center bg-no-repeat bg-cover p-8 lp:px-40 lp:py-20 brightness-125" style="background-image: url(hyperescapismo/bg.png);">
    
    <div class="bg-black bg-opacity-50 rounded-[64px] h-full flex flex-col justify-around gap-4 py-14 lp:py-8 bg:py-16 px-9 lp:px-20 bg:px-40">
        <img draggable="false" class="outline-none select-none pointer-events-none absolute left-0 top-0 p-4 lp:py-16 lp:px-36 z-10" src="hyperescapismo/corner.png" alt="corner">
        <img draggable="false" class="outline-none select-none pointer-events-none absolute right-0 top-0  p-4 lp:py-16 lp:px-36 z-10 scale-x-[-1]" src="hyperescapismo/corner.png" alt="corner">
        <img draggable="false" class="outline-none select-none pointer-events-none absolute left-0 bottom-0 p-4 lp:py-16 lp:px-36 z-10 scale-y-[-1]" src="hyperescapismo/corner.png" alt="corner">
        <img draggable="false" class="outline-none select-none pointer-events-none absolute right-0 bottom-0 p-4 lp:py-16 lp:px-36 z-10 scale-x-[-1] scale-y-[-1]" src="hyperescapismo/corner.png" alt="corner">
        
        
        <div class="flex flex-col lp:flex-row-reverse justify-between items-center">
            <div class="flex items-center gap-2 font-semibold">
                <button class="{$locale == "en" ? "opacity-100" :"opacity-50"}" on:click={()=>$locale='en'}>EN</button>
                <span>/</span>
                <button class="{$locale == "pt" ? "opacity-100" :"opacity-50"}" on:click={()=>$locale='pt'}>PT</button>
                <span>/</span>
                <button class="{$locale == "es" ? "opacity-100" :"opacity-50"}" on:click={()=>$locale='es'}>ES</button>
            </div>
            <img class="lp:-ml-4" src="hyperescapismo/logo.png" alt="Hyperescapismo Logo">
        </div>

        <!-- Scrollable text container -->
        <div class="flex-grow overflow-y-scroll lp:overflow-y-auto font-normal leading-tight space-y-4 lp:space-y-2 flex">
            <div class="my-auto space-y-4 bg:space-y-8">
                <h3 class="">{$t("curated")}</h3>
                <p>{$t("p1")}</p>
                <p>{$t("p2")}</p>
                <p>{$t("p3")}</p>
                <p>{$t("p4")}</p>
            </div>
        </div>

        <div class="self-center lp:self-start mt-2">
            <a href="https://calendly.com/tomas-pwa/hyperescapismo-drop?month=2024-09" target="_blank" class="font-garamond text-xl uppercase font-semibold border-y border-y-white py-1">{$t("join")}</a>
        </div>
    </div>
</div>
 