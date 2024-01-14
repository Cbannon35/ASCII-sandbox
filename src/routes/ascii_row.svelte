<script>
	import { ascii, pointer } from "$lib/stores";

    /** @type {number}*/
    export let x
    /** @type {number}*/
    export let y;
    /** @type {number}*/
    export let id;
    /** @type {string}*/
    export let text;
    /** @type {number}*/
    export let zoom;
    console.log("New row @ x y :", x, y)

    /** @type {number} */
    let padding = 10;
    /** @type {boolean} */
    let moving = false;
	
    /**
     * Function to handle the mouse down event and set the moving flag to true.
     * @citation https://svelte.dev/repl/7d674cc78a3a44beb2c5a9381c7eb1a9?version=4.2.8
     */
	function onMouseDown() {
		moving = true;
	}
    /**
     * Function to handle the mouse move event and update the x and y coordinates.
     * @param {MouseEvent} e - The mouse event object.
     * @citation https://svelte.dev/repl/7d674cc78a3a44beb2c5a9381c7eb1a9?version=4.2.8
     */
	function onMouseMove(e) {
		if (moving) {
			x += e.movementX;
			y += e.movementY;
		}
	}
    /**
     * Function to handle the mouse up event and set the moving flag to false.
     * @citation https://svelte.dev/repl/7d674cc78a3a44beb2c5a9381c7eb1a9?version=4.2.8
     */
	function onMouseUp() {
		moving = false;
	}

   /**
   * Function to handle the drag event and update the x and y coordinates.
   * @param {DragEvent} event - The drag event object.
   */
  function onDrag(event) {
    if (!event.dataTransfer) return;
    const event_x = parseInt(event.dataTransfer.getData('offsetX'), 10);
    const event_y = parseInt(event.dataTransfer.getData('offsetY'), 10);
    console.log(event.dataTransfer.getData('offsetX'), event.dataTransfer.getData('offsetY'))
    const offsetX = event.clientX - event_x;
    const offsetY = event.clientY - event_y;

    x = offsetX;
    y = offsetY;
    console.log(x, y)
  }

  /**
   * Function to handle starting the drag event.
   * @param {DragEvent} event - The drag event object.
  */
    function onDragStart(event) {
        if (!event.dataTransfer) return;
        console.log("starting",event.clientX.toString(), event.clientY.toString())
        event.dataTransfer.setData('offsetX', event.clientX.toString());
        event.dataTransfer.setData('offsetY', event.clientY.toString());
    }

    /**
     * Function to handle ending the drag event. Updates the ascii store with the new x and y coordinates.
     * @param {DragEvent} event - The drag event object.
    */
    function onDragEnd(event) {
        ascii.update((a) => {
            a.map((row) => {
                if (row.id == id) {
                    row.x = x;
                    row.y = y;
                }
                return row;
            })
            return a;
        });
    }
  
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class = "row {$pointer == id ? 'selected' : ''}" 
    style = "left:{x}px; top:{y}px; padding: {padding}px" 
    on:mousedown={(e) => {
        e.stopPropagation();
        pointer.set(id);
    }}
    >
    <div class = "ascii">
        <p>Row {id}</p>
        <p>X {x}</p>
        <p>Y {y}</p>
        <p>Text: {text}</p>

        <div class = "handle" 
        on:mousedown={onMouseDown}
        />
    </div>
</div>

<style lang="postcss">
    .row {
        position: absolute;
        background-color: red;
        z-index: 10;
        cursor: crosshair;
        width: 100px;
        height: 100px;
    }
    .handle {
        position: absolute;
        background-color: blue;
        z-index: 20;
        cursor: grab;
        width: 20px;
        height: 20px;
    }
    .ascii {
        user-select: none;
    }
    .selected {
        border: 4px solid black;
    }
</style>