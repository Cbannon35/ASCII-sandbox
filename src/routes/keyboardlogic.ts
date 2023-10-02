import { ascii, pointer } from '../stores.js';
let pointer_value: number;
let ascii_value: string[][];

pointer.subscribe((value) => {
	pointer_value = value;
});
ascii.subscribe((value) => {
	ascii_value = value;
});

function addChar(char: string) {
	$ascii = [...$ascii, { char }];
}

function handleBackspace() {
	console.log('handleBackspace');
	if (pointer_value === 0) return;
	if (ascii_value.length === 0) return;

	let arr: string[] | undefined = ascii_value.pop();
	if (arr !== undefined && arr.length > 0) {
		arr.pop();
		ascii_value.push(arr);
	} else {
		pointer.update((n) => n - 1);
	}

	// Handle case of neg pointer
	if (pointer_value < 0) {
		ascii_value.push([]);
		pointer.set(0);
	}
	ascii.set(ascii_value);
}

function handleEnter() {
	console.log('handleEnter');
	ascii.update((arr) => {
		arr.push([]);
		return arr;
	});
	pointer.update((n) => n + 1);
	console.log(ascii_value);
}

function handleKey(key: string) {
	console.log('handleKey', key);
	ascii.update((arr) => {
		arr[arr.length - 1].push(key);
		return arr;
	});
	console.log(ascii_value);
}

function on_key_down(event: KeyboardEvent) {
	// `keydown` event is fired while the physical key is held down.

	// Assuming you only want to handle the first press, we early
	// return to skip.
	if (event.repeat) return;
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
