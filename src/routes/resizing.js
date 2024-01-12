/* potential use for resizing the page? idk */
/**
 * @typedef {Object} Coordinate
 * @property {number} x - The x-coordinate of the object.
 * @property {number} y - The y-coordinate of the object.
 */
/** @type {Coordinate}*/
let upperLeft = { x: 0, y: 0 };
/** @type {Coordinate}*/
let upperRight = { x: 0, y: 0 };
/** @type {Coordinate}*/
let lowerLeft = { x: 0, y: 0 };
/** @type {Coordinate}*/
let lowerRight = { x: 0, y: 0 };

function handleResize() {
	console.log(window.innerWidth);
	console.log(window.innerHeight);
}

// onMount(() => {
//     window.addEventListener('resize', handleResize);
// });

// onDestroy(() => {
//     window.removeEventListener('resize', handleResize);
// });
