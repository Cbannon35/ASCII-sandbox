<script lang="ts">
	import Menu from './menu.svelte';

	/*** MENU LOGIC FOR ASCII STYLES ***/
	let backgroundColor: String = '#FFFF00';
	let text: string = 'text-3xl font-bold underline ';

	import { ascii } from '../stores';
	/*** FIGLET LOGIC FOR ASCII RENDER ***/

	import on_key_down from './keyboardlogic';
</script>

<svelte:window on:keydown={on_key_down} />

<!-- {@debug $backgroundColor} -->
<main style="background-color: {backgroundColor}">
	<Menu bind:backgroundColor />
	<div>
		{#each $ascii as arr, index}
			<div style="display: flex">
				{#each arr as char, index}
					<span>
						<pre>{char}</pre>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</main>

<style lang="postcss">
	main {
		@apply h-screen w-screen;
	}
</style>
