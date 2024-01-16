<script>
	import { ascii, pointer } from "$lib/stores";
    import FontSelector from "$lib/components/font_selector.svelte";
	import DragAbstr from "$lib/components/drag_abstr.svelte";

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
    let p_top = 2;
    /** @type {number} */
    let p_right = 2;
    /** @type {number} */
    let p_bottom = 2;
    /** @type {number} */
    let p_left = 2;
    /** @type {boolean} */
    let moving = false;
    /** @type {string} */
    let font = "standard"
	
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class = "row"
    style = "left:{x}px; top:{y}px; padding-top:{p_top}px; padding-right:{p_right}px; padding-bottom:{p_bottom}px; padding-left:{p_left}px; font-size:{zoom}em; font-family:{font};" 
    on:mousedown={(e) => {
        e.stopPropagation();
        pointer.set(id);
    }}
    >
    <div class = "ascii">
        <p>{text}</p>
    </div>
    {#if $pointer == id}
       <DragAbstr bind:p_top bind:p_bottom bind:p_left bind:p_right bind:x bind:y/>
    {/if}
</div>


<style lang="postcss">
    .row {
        position: absolute;
        background-color: red;
        z-index: 10;
        cursor: crosshair;
    }
    .ascii {
        user-select: none;
        font-size: medium;
    }
</style>