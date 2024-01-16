<script>
    import { fonts } from "$lib/stores.js";

    /** @type {string} */
    export let font;

    /** 
     * Flag to indicate if the font selector is open or not.
     * @type {boolean} 
     * */
    let open = false;

    let width = 160;

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fontSelector" style="--width: {width}px">
    <div class="title" on:click={(e) => {
        open = !open;
        e.stopPropagation();
    }}>
        FONT: <span class="selectedFont">{font}</span> {#if !open} &darr; {:else} &#10006; {/if}
    </div>
    {#if open}
    <div class="fontContainer">
    {#each fonts as f, index}
        <div
            class="font"
            on:click={() => {
                // font.update((n) => f);
                font = f;
            }}
        >
            {f}
        </div>
    {/each}
    </div>
    {/if}
</div>


<style>
    .fontSelector {
        width: var(--width);
        position:absolute;
        left: 0;
        bottom: -30px;
        max-height: 200px;
        border: 1px solid black;
    }
    .title {
        color: var(--color);
        background-color: var(--bg);
        padding: 5px;
        cursor: pointer;
    }
    .fontContainer {
        width: var(--width);
        display: flex;
        flex-direction: column;
        position: absolute;
    }
    .font {
        width: 100%;
        height: 20px;
        background-color: var(--bg);
        color: var(--color);
        padding: 5px;
        cursor: pointer;
        overflow: hidden;
    }
    .font:hover {
        background-color: var(--color);
        color: var(--bg);
    }
    
</style>