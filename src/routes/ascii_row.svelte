<script>

    /** @type {number}*/
    export let x
    /** @type {number}*/
    export let y;
    /** @type {number}*/
    export let id;
    /** @type {function}*/
    export let select;
    /** @type {string}*/
    export let text;
    /** @type {number}*/
    export let zoom;
    console.log("New row @ x y :", x, y)

   /**
   * Function to handle the drag event and update the x and y coordinates.
   * @param {DragEvent} event - The drag event object.
   */
  function onDrag(event) {
    event.stopPropagation();
    console.log("dragging")
    if (!event.dataTransfer) return;

    const event_x = parseInt(event.dataTransfer.getData('offsetX'), 10);
    const event_y = parseInt(event.dataTransfer.getData('offsetY'), 10);

    const offsetX = event.clientX - event_x;
    const offsetY = event.clientY - event_y;

    // Update the x and y coordinates
    x = offsetX;
    y = offsetY;
  }

    
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class = "row" 
    style = "left:{x}px; top:{y}px; transform: scale({zoom/100})" 
    on:click={(e) => 
        {
            e.stopPropagation(); 
            select(id)
        }
    }>
    <div class = "drag-handle" 
    on:dragstart={(e) => {
        // Set the drag data for offsetX and offsetY
        e.stopPropagation();
        if (!e.dataTransfer) return;
        e.dataTransfer.setData('offsetX', e.clientX.toString());
        e.dataTransfer.setData('offsetY', e.clientY.toString());
    }}
    on:drag={(e) => onDrag(e)}
    on:dragover={(e) => e.preventDefault()}
    >
        <p>Row {id}</p>
        <p>X {x}</p>
        <p>Y {y}</p>
        <p>Text: {text}</p>
    </div>
</div>

<style lang="postcss">
    .row {
        position: absolute;
        background-color: red;
        z-index: 10;
        cursor: grab;
        width: 100px;
        height: 100px;
    }
    .row:hover {
        background-color: blue;
    }
    .drag-handle {
        cursor: grab;
        width: 100%;
        height: 100%;
    }
</style>