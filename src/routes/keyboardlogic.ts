import { ascii, pointer, ascii_encoding } from '../stores.js';
import figlet from 'figlet';
let pointer_value: number;
let ascii_value: string[][];
let ascii_encoding_value: string[][];

figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });

pointer.subscribe((value) => {
	pointer_value = value;
});
ascii.subscribe((value) => {
	ascii_value = value;
});
ascii_encoding.subscribe((value) => {
	ascii_encoding_value = value;
});

function handleBackspace() {
	if (ascii_value.length === 0) return;

	let encoding_arr: string[] | undefined = ascii_encoding_value.pop();
	let ascii_arr: string[] | undefined = ascii_value.pop();
	if (
		encoding_arr !== undefined &&
		encoding_arr.length > 0 &&
		ascii_arr !== undefined &&
		ascii_arr.length > 0
	) {
		encoding_arr.pop();
		ascii_encoding_value.push(encoding_arr);
		ascii_arr?.pop();
		ascii_value.push(ascii_arr);
	} else {
		pointer.update((n) => n - 1);
	}
	// Handle case of neg pointer
	if (pointer_value < 0) {
		ascii_value.push([]);
		ascii_encoding_value.push([]);
		pointer.set(0);
	}
	ascii.set(ascii_value);
	ascii_encoding.set(ascii_encoding_value);
}

function handleEnter() {
	console.log('handleEnter');
	ascii.update((arr) => {
		arr.push([]);
		return arr;
	});
	ascii_encoding.update((arr) => {
		arr.push([]);
		return arr;
	});
	pointer.update((n) => n + 1);
	console.log(ascii_value);
}

async function handleKey(key: string) {
	console.log('handleKey', key);
	ascii_encoding.update((arr) => {
		arr[arr.length - 1].push(key);
		return arr;
	});
	await figlet(key, function (err: any, data: string) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		ascii.update((arr) => {
			arr[arr.length - 1].push(data);
			return arr;
		});
	});
}

function on_key_down(event: KeyboardEvent) {
	// `keydown` event is fired while the physical key is held down.

	// Assuming you only want to handle the first press, we early
	// return to skip.
	// if (event.repeat) return;
	const key = event.key;

	if (key === 'Backspace') {
		event.preventDefault();
		handleBackspace();
	} else if (key === 'Enter') {
		event.preventDefault();
		handleEnter();
	} else if (key === 'Shift') {
		event.preventDefault();
	} else if (key === 'Meta') {
		event.preventDefault();
	} else {
		event.preventDefault();
		handleKey(key);
	}
}

export default on_key_down;
