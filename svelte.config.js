// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(), // currently the adapter does not take any options
        // target: '#svelte',
        // prerender: {
        //     crawl: true,
        //     enabled: true,
        //     force: true,
        //     pages: ['*'],
        // },
    },
  preprocess: vitePreprocess()
};
export default config;