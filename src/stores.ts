import { writable } from 'svelte/store';

interface ascii {
	str: string;
	encoding: string;
	color: string;
}

interface ascii_row {
	ascii: ascii[];
	color: string;
}

export let color = writable<string>('#000000');
export let ascii_struct = writable<ascii_row[]>([]);

ascii_struct.set([{ ascii: [], color: '#000000' }]);

export let ascii = writable<string[][]>([[]]);
export let ascii_encoding = writable<string[][]>([[]]);
export let pointer = writable<number>(0);
