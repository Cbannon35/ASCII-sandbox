<script>
    import Menu from "./menu.svelte";
    import AsciiRow from './ascii_row.svelte';

    import { on_key_down, on_key_up } from "./keyboard_logic.js";
    import { ascii, pointer, color_global, bg_color_global, font_global } from "../lib/stores.js";

    let color = $color_global;
    let backgroundColor = $bg_color_global;
    let font = $font_global;
    
    let zoom = 100;

    
    /**
   * Handles click events on the "canvas".
   * @param {MouseEvent} event - The click event object.
   */
  function handleCanvasClick(event) {
    if (!event.target) return;
    const x = event.clientX;
    const y = event.clientY -100;

    ascii.update((a) => {
        /**@type {Ascii_obj} */
        let new_ascii = {
            x: x,
            y: y,
            id: a.length,
            font: font,
            color: color,
            bg_color: backgroundColor,
            pointer: 0,
            asciis: [[]],
        }

        pointer.set(new_ascii.id);
        return [...a, new_ascii]
    });
    console.log($ascii)
  }

  /**
   * Handles scroll events on the canvas.
   * TODO: Implement pinching.
   * @param {WheelEvent} event - The wheel event object.
   */
  function handleCanvasScroll(event) {
    let x = event.deltaX;
    let y = event.deltaY;
    ascii.update((a) => {
        a.map((row) => {
            row.x += x;
            row.y += y;
            return row;
        })
        return a;
    });
  }


</script>

<svelte:window
	on:keydown={(event) => {
		on_key_down(event);
	}}
    on:keyup={(event) => {
        on_key_up(event);
    }}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<main style="--bg: {backgroundColor}; --color: {color}; --zoom: {zoom}; position: fixed">
    <Menu bind:color bind:backgroundColor bind:zoom />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="canvas" on:mousedown={handleCanvasClick} on:wheel={handleCanvasScroll}>
    {#each $ascii as a}
        <AsciiRow bind:a />
    {/each}
  </div>
</main>

<style lang="postcss">
    .canvas {
        position: relative;
        width: 100%;
        min-height: 100%;
        height: calc(100vh - 100px);
        /* background-color: purple; */
        z-index: 0;
        /* transform: scale(var(--zoom)/100); */
    }
</style>
