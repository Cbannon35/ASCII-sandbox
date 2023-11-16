<script lang="ts">
	import Menu from './menu.svelte';
	import { ascii, ascii_struct, textColor, pointer_row, pointer_char } from '../stores';
	import { ColorMode, update_color_mode } from '../types';

	/*** MENU LOGIC FOR ASCII STYLES ***/
	let showMenu = false;
	let backgroundColor: string = '#000000';
	let alignment: string = 'flex-start';
	let color: string = $textColor;
	let mode: ColorMode = ColorMode.GLOBAL;
	function getColor(mode: ColorMode, row: number, char: number) {
		switch (mode) {
			case ColorMode.GLOBAL:
				return color;
			case ColorMode.ROW:
				return $ascii_struct[row].color;
			case ColorMode.CHAR:
				return $ascii_struct[row].ascii[char].color;
			default:
				return color;
		}
	}
	let fontChanges: number = 0;

	/* Keydown logic */
	import on_key_down from './keyboardlogic';

	/* Cursor logic */
	let cursor_display = true;
	const cursor = () => (cursor_display = !cursor_display);
	let clear: number | undefined;
	$: {
		clearInterval(clear);
		clear = setInterval(cursor, 1000);
	}
</script>

<svelte:window
	on:keydown={(event) => {
		on_key_down(event, showMenu);
	}}
/>

<main style="--bg: {backgroundColor}; --color: {color}">
	<Menu bind:backgroundColor bind:color bind:mode bind:fontChanges bind:showMenu bind:alignment />
	{#key fontChanges}
		<div class="content">
			{#each $ascii_struct as row, i}
				<div class="row" style="--align: {alignment}">
					{#each row.ascii as a, j}
						<span
							class={j === $pointer_char - 1 && i == $pointer_row && cursor_display && !showMenu
								? 'element'
								: ''}
							style="--c: {getColor(mode, i, j)}"
						>
							<pre>{a.encoding}</pre>
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{/key}
</main>

<style lang="postcss">
	main {
		@apply min-h-screen min-w-max bg-[var(--bg)] text-[var(--color)];
	}
	.content {
		@apply pr-8;
	}
	.row {
		@apply flex flex-row;
		justify-content: var(--align);
	}

	/*Thank you chat gpt */
	.element::before {
		content: ''; /* Required for pseudo-elements */
		width: 20px; /* Border width, adjust as needed */
		height: 80%; /* Half of the element's height */
		background-color: var(--c);
		position: absolute;
		top: 10%; /* Center the border vertically by adjusting the top position */
		right: -22px; /* Position on the right side */
	}
	.element {
		position: relative; /* Position relative so that we can position the pseudo-element */
	}
</style>
