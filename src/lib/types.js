/**
 * @typedef  {Object} Ascii_char
 * @property {import("figlet").Fonts} font     - The font used to generate the ascii.
 * @property {string} color    - The color of the text.
 * @property {string} bg_color - The color of the text.
 * @property {string} text     - The base string that encodes ascii.
 * @property {string | undefined} ascii    - The ascii string we render.
 */

/**
 * @typedef  {Object} Ascii_obj
 * @property {number} x        - The x-coordinate of the object.
 * @property {number} y        - The y-coordinate of the object.
 * @property {number} id       - Component id. Used to identify the component. Matches up with the index of the component in the ascii array.
 * @property {import("figlet").Fonts} font     - The font used to generate the ascii.
 * @property {string} color    - The color of the text.
 * @property {string} bg_color - The color of the text.
 * @property {number} pointer   - Keeps track of the 2 dimensional structure of the ascii object separated by newlines.
 * @property {Ascii_char[][]} asciis  - Our ascii objects.
 */
