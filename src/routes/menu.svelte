<script lang="ts">
	export let backgroundColor: String;
	export let c: String;
</script>

<div style="display: flex; flex-direction: row">
	<input type="color" bind:value={backgroundColor} id="backgroundColor" />
	<input type="color" bind:value={c} id="color" />
</div>
