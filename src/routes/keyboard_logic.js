import { ascii, pointer } from '$lib/stores.js';
import figlet from 'figlet';

/**@type {number} */
let $pointer;
pointer.subscribe((val) => {
	$pointer = val;
});
/**@type {Ascii_obj[]} */
let $ascii;
ascii.subscribe((val) => {
	$ascii = val;
});

/**@type {any}*/
const keysPressed = {};

/**
 * Calls figlet to generate the ascii text.
 * @param {string} text - The text to be converted to ascii.
 * @param {import("figlet").Fonts} font - The font to use for the conversion.
 * @returns {Promise<string>} - The ascii text.
 */
export async function generate_ascii(text, font) {
	let d = '';
	return d;
}

/**
 * Handles a general key press. Adds what the user types to the current text object.
 * @param {string} key - The key that was pressed
 * @returns nothing
 */
async function handleKey(key) {
	let curr_ascii_obj = $ascii[$pointer];
	figlet.text(
		key,
		{
			font: curr_ascii_obj.font
		},
		function (err, data) {
			if (err) {
				console.log('Something went wrong...');
				console.dir(err);
				return;
			}
			let new_ascii_char = {
				font: curr_ascii_obj.font,
				color: curr_ascii_obj.color,
				bg_color: curr_ascii_obj.bg_color,
				text: key,
				ascii: data
			};

			ascii.update((ascii) => {
				ascii[$pointer].asciis[curr_ascii_obj.pointer].push(new_ascii_char);
				return ascii;
			});
		}
	);
}

/**
 * Handles the backspace key. Removes the last character from the current text object.
 * @returns nothing
 */
function handleBackspace() {
	ascii.update((ascii) => {
		let curr_ascii_obj = ascii[$pointer];
		let curr_text_obj = curr_ascii_obj.asciis[curr_ascii_obj.pointer];
		if (curr_text_obj.length == 0) {
			// Edgecase: no characters at all
			if (curr_ascii_obj.pointer == 0) {
				return ascii;
			}
			// If the current text object is empty, remove it from the ascii object
			curr_ascii_obj.asciis.pop();
			curr_ascii_obj.pointer -= 1;
		}
		curr_text_obj.pop();
		return ascii;
	});
}

/**
 * Handles the enter key. Appends a newline character to the current text object.
 */
function handleEnter() {
	ascii.update((ascii) => {
		let curr_ascii_obj = ascii[$pointer];
		curr_ascii_obj.asciis.push([]);
		curr_ascii_obj.pointer += 1;
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
function moveCursor() {
	/*TODO*/
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
			moveCursor();
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
