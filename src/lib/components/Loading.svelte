<script>
	import { progress } from '$lib/store.js'
</script>

<div
	class="bg-white absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center gap-4 z-50"
>
	<div class="h-[25%]"
		><img  class="h-full" src="/loading.gif" alt="Loading gif" /></div
	>
	<progress class="invisible" value={$progress} max="100"></progress>
</div>
