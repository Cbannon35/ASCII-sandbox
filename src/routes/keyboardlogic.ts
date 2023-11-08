import { ascii_struct, font, pointer_char, pointer_row } from '../stores.js';

let pointer_value: number;
let pointer_cursor: number;
let f: string;
let $ascii_struct: any;
pointer_row.subscribe((value) => {
	pointer_value = value;
});
pointer_char.subscribe((value) => {
	pointer_cursor = value;
});
font.subscribe((value) => {
	f = value;
});
ascii_struct.subscribe((value) => {
	$ascii_struct = value;
});

import figlet from 'figlet';
figlet.defaults({ fontPath: '/fonts' });

async function handleKey(key: string) {
	console.log('handleKey', key);
	await figlet(key, f, function (err: any, data: string) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		ascii_struct.update((arr) => {
			console.log(arr);
			// console.log('updating ascii_struct', arr, arr[pointer_value]);
			arr[pointer_value].ascii.splice(pointer_cursor, 0, {
				str: key,
				encoding: data,
				color: '#000000'
			});
			return arr;
		});
	});
	pointer_char.update((n) => n + 1);
}
/* on font change must reset every character to appropriate font */
export async function updateAscii(flag: boolean): Promise<number> {
	if (flag) return -1; // if flag is true, do not recompute ascii --> allows mismatching fonts
	console.log('recomputeAscii');
	// console.log('ascii_struct', $ascii_struct);
	ascii_struct.update((arr) => {
		arr.forEach((row) => {
			row.ascii.forEach((ascii) => {
				figlet(ascii.str, f, function (err: any, data: string) {
					if (err) {
						console.log('Something went wrong...');
						console.dir(err);
						return;
					}
					ascii.encoding = data;
				});
			});
		});
		return arr;
	});
	return 1;
}

function handleBackspace() {
	console.log('handleBackspace');

	ascii_struct.update((arr) => {
		if (pointer_cursor === 0) {
			if (pointer_value === 0) {
				return arr;
			}
			arr[pointer_value - 1].ascii.push(...arr[pointer_value].ascii);

			pointer_row.update((n) => {
				if (n > 0) {
					return n - 1;
				}
				return n;
			});
			pointer_char.update((n) => {
				return arr[pointer_value].ascii.length;
			});
			return arr.slice(0, -1);
		} else {
			arr[pointer_value].ascii.splice(pointer_cursor - 1, 1);
			pointer_char.update((n) => {
				return n - 1;
			});
			return arr;
		}
	});

	// ascii_struct.update((arr) => {
	// 	if (arr[pointer_value].ascii.length === 0) {
	// 		pointer_row.update((n) => {
	// 			if (n > 0) {
	// 				return n - 1;
	// 			}
	// 			return n;
	// 		});
	// 		pointer_char.update((n) => {
	// 			return arr[pointer_value].ascii.length;
	// 		});
	// 		return arr.slice(0, -1);
	// 	}
	// 	arr[pointer_value].ascii.pop(); //pop last element in row
	// 	pointer_char.update((n) => {
	// 		return n - 1;
	// 	});
	// 	return arr;
	// });
}

function handleEnter() {
	console.log('handleEnter');
	ascii_struct.update((arr) => {
		arr.push({ ascii: [], color: '#000000' });
		return arr;
	});
	pointer_row.update((n) => n + 1);
	pointer_char.update((n) => 0);
	console.log(ascii_struct);
}

function moveCursor(key: string) {
	let max_row = $ascii_struct.length - 1;
	switch (key) {
		case 'ArrowLeft':
			pointer_char.update((n) => {
				if (n > 0) {
					return n - 1;
				}
				return n;
			});
			break;
		case 'ArrowRight':
			pointer_char.update((n) => {
				return n + 1;
			});
			break;
		case 'ArrowUp':
			pointer_row.update((n) => {
				if (n > 0) {
					return n - 1;
				}
				return n;
			});
			pointer_char.update((n) => {
				console.log('yo');
				if (n >= $ascii_struct[pointer_value].ascii.length) {
					console.log('n', n);
					return $ascii_struct[pointer_value].ascii.length;
				}
				return n;
			});
			break;
		case 'ArrowDown':
			pointer_row.update((n) => {
				if (n < max_row) {
					return n + 1;
				}
				if (n > $ascii_struct[n].ascii.length) {
					return $ascii_struct[n].ascii.length;
				}
				return n;
			});
			break;
	}
}

function on_key_down(event: KeyboardEvent) {
	// `keydown` event is fired while the physical key is held down.

	// Assuming you only want to handle the first press, we early
	// return to skip.
	// if (event.repeat) return;
	const key = event.key;
	if (
		key === 'Shift' ||
		key === 'Meta' ||
		key === 'Alt' ||
		key === 'Control' ||
		key === 'CapsLock' ||
		key === 'Tab' ||
		key === 'Escape'
	) {
		// event.preventDefault();
	} else if (key == 'ArrowLeft' || key == 'ArrowRight' || key == 'ArrowUp' || key == 'ArrowDown') {
		event.preventDefault();
		moveCursor(key);
	} else if (key === 'Backspace') {
		event.preventDefault();
		handleBackspace();
	} else if (key === 'Enter') {
		event.preventDefault();
		handleEnter();
	} else {
		event.preventDefault();
		handleKey(key);
	}
	console.log('pointer_row', pointer_value);
	console.log('pointer_char', pointer_cursor);
}

export default on_key_down;
