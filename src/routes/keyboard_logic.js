/**@type {any}*/
const keysPressed = {};

/**
 * Handles a general key press
 * @param {string} key - The key that was pressed
 * @param {Ascii_obj[]} ascii - The ascii chunk that the cursor is currently in
 * @param {number} pointer - The index of the ascii object in the ascii array
 * @param {function} setAscii - Function to reset array
 * @returns nothing
 */
function handleKey(key, ascii, pointer, setAscii) {
	let tmp_ascii = ascii.map((c, i) => {
		if (i === pointer) {
			return {
				...c,
				text: c.text + key
			};
		} else {
			return c;
		}
	});
	setAscii(tmp_ascii);
}

/**
 *
 * @param {Ascii_obj[]} ascii
 * @param {function} setAscii
 */
function moveCanvas(ascii, setAscii) {
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

	console.log(ascii);
	let tmp_ascii = ascii.map((c) => ({
		...c,
		x: c.x + dx,
		y: c.y + dy
	}));
	setAscii(tmp_ascii);
}

/**
 *
 * @param {Ascii_obj[]} ascii
 * @param {number} pointer
 * @param {function} setAscii
 * @returns nothing
 */
function moveAscii(ascii, pointer, setAscii) {
	let dx = 0;
	let dy = 0;
	console.log(keysPressed);

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

	let tmp_ascii = ascii.map((c, i) => {
		if (i === pointer) {
			return {
				...c,
				x: c.x + dx,
				y: c.y + dy
			};
		} else {
			return c;
		}
	});
	setAscii(tmp_ascii);
}

/**
 * @typedef {Object} Ascii_obj
 * @property {number} x - The x-coordinate of the text object.
 * @property {number} y - The y-coordinate of the text object.
 * @property {number} id - Component id. Used to identify the component. Matches up with the index of the component in the coords array.
 * @property {string} text - The text to be displayed.
 */

/**
 * Handles the keydown event
 * @param {KeyboardEvent} event
 * @param {boolean} flag - Whether or not an ascii object is selected (certain functionality is disabled) -> true when no ascii object is selected
 * @param {number} pointer
 * @param {Ascii_obj[]} ascii - The ascii chunk that the cursor is currently in
 * @param {function} setAscii - Function to reset array
 * @returns nothing
 */
export function on_key_down(event, flag, pointer, ascii, setAscii) {
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
	} else {
		event.preventDefault();
		keysPressed[event.key] = true;
		if (key == 'ArrowLeft' || key == 'ArrowRight' || key == 'ArrowUp' || key == 'ArrowDown') {
			event.preventDefault();
			if (flag) {
				moveCanvas(ascii, setAscii);
			} else {
				moveAscii(ascii, pointer, setAscii);
			}
		} else if (key === 'Backspace') {
			event.preventDefault();
			handleBackspace();
		} else if (key === 'Enter') {
			event.preventDefault();
			handleEnter();
		} else {
			event.preventDefault();
			handleKey(key, ascii, pointer, setAscii);
		}
	}
}

/**
 * Handles the backspace key
 * @param {KeyboardEvent} event
 */
export function on_key_up(event) {
	// `keyup` event is fired when the physical key is released.
	// console.log(event.key);
	event.preventDefault();
	console.log(keysPressed);
	keysPressed[event.key] = false;
}
