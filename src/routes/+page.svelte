<script>
    import { on_key_down, on_key_up } from "./keyboard_logic.js";
    import Menu from "./menu.svelte";
    import AsciiRow from './ascii_row.svelte';
    let backgroundColor = '#000000';
	let color = "#FFFFFF";
    let pointer = -1;

    /**
   * @typedef {Object} Ascii_obj
   * @property {number} x - The x-coordinate of the text object.
   * @property {number} y - The y-coordinate of the text object.
   * @property {number} id - Component id. Used to identify the component. Matches up with the index of the component in the ascii array.
   * @property {string} text - The text to be displayed.
   */

    /** @type {Ascii_obj[]} */
    let ascii = [];

    /**
     * Sets the ascii array to the given array.
     * @param {Ascii_obj[]} newAscii - The new ascii array.
     */
    function setAscii(newAscii) {
        ascii = newAscii;
    }

    /**
   * Handles click events on the "canvas".
   * @param {MouseEvent} event - The click event object.
   */
  function handleCanvasClick(event) {
    if (!event.target) return;
    const x = event.clientX;
    const y = event.clientY;

    /** @type {Ascii_obj} */
    const coord = { x, y, id: 0 + ascii.length, text: ""};
    pointer = coord.id;
    ascii = [...ascii, coord];
  }

  /**
   * Handles scroll events on the canvas.
   * @param {WheelEvent} event - The wheel event object.
   */
  function handleCanvasScroll(event) {
    ascii = ascii.map(c => ({
      ...c,
      x: c.x + event.deltaX,
      y: c.y + event.deltaY
    }));
  }

  /**
   * Will set the pointer to the element with the given id.
   * @param {number} id - The id of the element selected.
   */
  function select(id) {
    console.log("selecting", id)
    pointer = id;
  }

</script>

<svelte:window
	on:keydown={(event) => {
        console.log("keydown", ascii, pointer)
		on_key_down(event, pointer < 0, pointer, ascii, setAscii);
	}}
    on:keyup={(event) => {
        on_key_up(event);
    }}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<main style="--bg: {backgroundColor}; --color: {color}; position: fixed">
    <Menu bind:backgroundColor bind:color bind:pointer/>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="canvas" on:click={handleCanvasClick} on:wheel={handleCanvasScroll}>
    {#each ascii as a}
        <AsciiRow bind:x={a.x} bind:y={a.y} id={a.id} text={a.text} select={select} />
    {/each}
  </div>
</main>

<style lang="postcss">
    .canvas {
        width: 100vw;
        height: calc(100vh - 100px);
        background-color: purple;
        z-index: 0;
    }
</style>
