<script>
    import { pointer } from "$lib/stores.js";
    export let backgroundColor;
    export let color;
    
    /** @type {number}*/
    export let zoom;
</script>

<div class = "menu">
    <h1>ASCII SANDBOX</h1>
    <div>
        <button on:click={() => zoom += .1}>+</button>
        <button on:click={() => zoom -= .1}>-</button>
        <button on:click={() => {pointer.set(-1)}}>Deselect </button>
    </div>
</div>

<style lang="postcss">
    .menu {
        z-index: 100;
        width: calc(100vw - 40px);
        height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px ;
        background-color: var(--bg);
        color: var(--color);
    }
</style>