import { writable } from 'svelte/store';

export const indexSectionStore = writable(0);
export const indexStyleStore = writable(0);
export const isOpen = writable(false);
export const openMenu = writable(false);
export const progress = writable(0);
