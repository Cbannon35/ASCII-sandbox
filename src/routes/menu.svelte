<script lang="ts">
	import { ColorMode, update_color_mode } from '../types';
	export let backgroundColor: String;
	export let c: String;
	export let mode: ColorMode;
</script>

<div style="display: flex; flex-direction: row">
	<input type="color" bind:value={backgroundColor} id="backgroundColor" />
	<input type="color" bind:value={c} id="color" />
	<button
		on:click={() => {
			mode = update_color_mode(mode);
		}}>change mode</button
	>
</div>
