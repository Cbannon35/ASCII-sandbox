<script>
	import { ascii, pointer } from "$lib/stores";
    import FontSelector from "$lib/components/font_selector.svelte";
	import DragAbstr from "$lib/components/drag_abstr.svelte";

    /** @type {Ascii_obj} */
    export let a;

    /** @type {number}*/
    let x = a.x;
    /** @type {number}*/
    let y = a.y
    // /** @type {number}*/
    // export let id;
    // /** @type {string}*/
    // export let text;
    // /** @type {number}*/
    // export let zoom;

    console.log("New row @ x y :", a.x, a.y)

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
    let font = "Standard"

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class = "obj"
    style = "left:{x}px; top:{y}px; padding-top:{p_top}px; padding-right:{p_right}px; padding-bottom:{p_bottom}px; padding-left:{p_left}px; font-family:{font};" 
    on:mousedown={(e) => {
        e.stopPropagation();
        pointer.set(a.id);
    }}
    >
    <div class = "ascii">
        {#each a.asciis as row}
        <div class="row">
            {#each row as char}
                <pre>{char.ascii}</pre>
            {/each}
        </div>
        {/each}
    </div>
    {#if $pointer == a.id}
       <DragAbstr bind:p_top bind:p_bottom bind:p_left bind:p_right bind:x bind:y/>
    {/if}
</div>


<style lang="postcss">
    .obj {
        position: absolute;
        background-color: red;
        z-index: 10;
        cursor: crosshair;
    }
    .ascii {
        user-select: none;
        font-size: medium;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
</style>