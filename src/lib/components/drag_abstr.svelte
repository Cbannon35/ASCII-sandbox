<!-- 

    Allows me to abstract the drag functionality from the components that use it.
    It will take in the padding of an element to alter it.

 -->


<script>
	import Xsvg from "./Xsvg.svelte";
    import { ascii, pointer } from "$lib/stores.js";


    /** @type {number} */
    export let p_top;
    /** @type {number} */
    export let p_right;
    /** @type {number} */
    export let p_bottom;
    /** @type {number} */
    export let p_left;
    /** @type {number} */
    export let x;
    /** @type {number} */
    export let y;

    /** @type {boolean} */
    let moving = false;
    /** @type {boolean} */
    let dragging = false;
    /** @type {string[]} */
    let move_dir = [];

    /** @citation https://svelte.dev/repl/7d674cc78a3a44beb2c5a9381c7eb1a9?version=4.2.8 */
	function onMouseUp() {
		moving = false;
        move_dir = [];
        dragging = false;
	}
    /**
     * Function to handle the mouse move event and update the x and y coordinates.
     * @param {MouseEvent} e - The mouse event object.
     */
    function onMouseMove(e) {
        if (moving) {
            if (move_dir.indexOf("right") > -1) {
                p_right += e.movementX /2;
                p_left += e.movementX /2;
            }
            if (move_dir.indexOf("bottom") > -1) {
                p_bottom += e.movementY /2;
                p_top += e.movementY /2;
            }
        }
        if (dragging) {
			x += e.movementX;
			y += e.movementY;
		}
    }

</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="left {dragging ? "dragging" : ""}" on:mousedown={(e) => {
    dragging = true
    }}></div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="right" on:mousedown={() => {
    moving = true;
    move_dir.push("right");
    move_dir.push("left");
    }}></div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bot" on:mousedown={() => {
    moving = true;
    move_dir.push("bottom");
    move_dir.push("top");
    }}></div>

<div class="top"><button on:click={(e) => {
    e.stopPropagation();
    ascii.update((n) => n.filter((a) => a.id != $pointer));
    pointer.set(-1);
}}>X</button></div>



<style>
    .left {
        position: absolute;
        left: -5px;
        top: 0;
        bottom: 0;
        width: 5px;
        background-color: green;
        cursor: grab;
    }
    .dragging {
        cursor: grabbing;
    }
    .right {
        position: absolute;
        right: -5px;
        top: 0;
        bottom: 0;
        width:5px;
        background-color: green;
        cursor: ew-resize;
    }
    .top {
        position: absolute;
        left: -5px;
        /* right: 0; */
        top: -25px;
        width: calc(100% + 10px);
        height: 25px;
        cursor: ns-resize;
        background-color: greenyellow;
        font-size: 12px;
    }
    .bot {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        height: 5px;
        background-color: green;
        cursor: ns-resize;
    }
</style>