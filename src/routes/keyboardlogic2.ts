import { ascii_struct, pointer } from '../stores.js';

let pointer_value: number;
pointer.subscribe((value) => {
	pointer_value = value;
});

import figlet from 'figlet';
figlet.defaults({ fontPath: '/fonts' });

async function handleKey(key: string) {
	console.log('handleKey', key);
	await figlet(key, function (err: any, data: string) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(ascii_struct);
		ascii_struct.update((arr) => {
			console.log('updating ascii_struct', arr, arr[pointer_value]);
			arr[pointer_value].ascii.push({
				str: key,
				encoding: data,
				color: 'white'
			});
			return arr;
		});
	});
}

function handleBackspace() {
	console.log('handleBackspace');

	ascii_struct.update((arr) => {
		if (arr[pointer_value].ascii.length === 0) {
			pointer.update((n) => n - 1);
			return arr;
		}
		arr[pointer_value].ascii.pop();
		return arr;
	});
}

function handleEnter() {
	console.log('handleEnter');
	ascii_struct.update((arr) => {
		arr.push({ ascii: [], color: '#000000' });
		return arr;
	});
	pointer.update((n) => n + 1);
	console.log(ascii_struct);
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
		key === 'Tab'
	) {
		event.preventDefault();
	} else if (key == 'ArrowLeft' || key == 'ArrowRight' || key == 'ArrowUp' || key == 'ArrowDown') {
		// potential cursor manipulation?
		event.preventDefault();
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
}

export default on_key_down;
