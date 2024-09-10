import { t, locale, locales } from "$lib/i18n.ts";
// import type { LayoutLoad } from '@sveltejs/kit';

export const load: LayoutLoad = async () => {
    return { t, locale, locales };
};
