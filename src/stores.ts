import { writable } from 'svelte/store';

export let ascii = writable<string[][]>([[]]);
export let ascii_encoding = writable<string[][]>([[]]);
export let pointer = writable<number>(0);
