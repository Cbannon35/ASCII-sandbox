import { writable } from 'svelte/store';

export const ascii = writable([[]]);
export const pointer = writable(0);

function addChar(char: string) {
	ascii = [...ascii, { char }];
}
