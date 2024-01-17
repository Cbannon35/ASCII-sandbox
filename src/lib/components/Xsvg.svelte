<script>
    /** @type {boolean }*/
    let toggled = false;

    export let w = 2;
    export let h = 2;

    function toggleShape() {
        toggled = !toggled;
        console.log(toggled);
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div style="" on:click={toggleShape}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class={`lines ${toggled ? "pos-0" : "pos-1"}`}>
        <line class="line" x1="20" y1="20" x2="80" y2="80" />
        <line class="line" x1="80" y1="20" x2="20" y2="80" />
    </g>
    </svg>
</div>

<style>
.line {
  stroke: black;
  stroke-width: 8;
}

.pos-0 {
  transform: rotate(0deg);
}

.pos-1 {
  transform: rotate(45deg);
}

.lines {
  transform-origin: center;
  transition: all ease-in-out 100;

}
</style>