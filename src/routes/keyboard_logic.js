import { ascii, pointer } from '$lib/stores.js';

/**@type {number} */
let $pointer;
pointer.subscribe((val) => {
	$pointer = val;
});

/**@type {any}*/
const keysPressed = {};

/**
 * Handles a general key press. Adds what the user types to the current text object.
 * @param {string} key - The key that was pressed
 * @returns nothing
 */
function handleKey(key) {
	ascii.update((ascii) => {
		ascii[$pointer].text += key;
		return ascii;
	});
}

/**
 * Handles the backspace key. Removes the last character from the current text object.
 * @returns nothing
 */
function handleBackspace() {
	ascii.update((ascii) => {
		if (ascii[$pointer].text.length > 0) {
			ascii[$pointer].text = ascii[$pointer].text.slice(0, -1);
		}
		return ascii;
	});
}

/**
 * Handles the enter key. Appends a newline character to the current text object.
 */
function handleEnter() {
	ascii.update((ascii) => {
		ascii[$pointer].text += '\n';
		return ascii;
	});
}

/**
 * Moves all elements on the canvas.
 */
function moveCanvas() {
	let dx = 0;
	let dy = 0;

	if (keysPressed['ArrowLeft']) {
		dx = -1;
	}
	if (keysPressed['ArrowRight']) {
		dx = 1;
	}
	if (keysPressed['ArrowUp']) {
		dy = -1;
	}
	if (keysPressed['ArrowDown']) {
		dy = 1;
	}

	ascii.update((ascii) => {
		ascii.forEach((c) => {
			c.x += dx;
			c.y += dy;
		});
		return ascii;
	});
}

/**
 * Moves the selected element.
 * @returns nothing
 */
function moveAscii() {
	let dx = 0;
	let dy = 0;

	if (keysPressed['ArrowLeft']) {
		dx = -1;
	}
	if (keysPressed['ArrowRight']) {
		dx = 1;
	}
	if (keysPressed['ArrowUp']) {
		dy = -1;
	}
	if (keysPressed['ArrowDown']) {
		dy = 1;
	}

	ascii.update((ascii) => {
		ascii[$pointer].x += dx;
		ascii[$pointer].y += dy;
		return ascii;
	});
}
/**
 * Handles the keydown event
 * @param {KeyboardEvent} event
 * @returns nothing
 */
export function on_key_down(event) {
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
		return;
	}

	event.preventDefault();
	keysPressed[event.key] = true;

	if (key == 'ArrowLeft' || key == 'ArrowRight' || key == 'ArrowUp' || key == 'ArrowDown') {
		if ($pointer < 0) {
			moveCanvas();
		} else {
			moveAscii();
		}
	} else if (key === 'Backspace') {
		handleBackspace();
	} else if (key === 'Enter') {
		handleEnter();
	} else {
		handleKey(key);
	}
}

/**
 * Handles the keyup event
 * @param {KeyboardEvent} event
 */
export function on_key_up(event) {
	event.preventDefault();
	keysPressed[event.key] = false;
}
