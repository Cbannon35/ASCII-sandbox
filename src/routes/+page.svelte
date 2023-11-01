<script lang="ts">
	import Menu from './menu.svelte';
	import { ascii_struct, color, pointer } from '../stores';
	/*** MENU LOGIC FOR ASCII STYLES ***/
	let backgroundColor: String = '#FFFF00';
	let c: string;
	color.subscribe((value) => {
		console.log('changing', value);
		c = value;
	});
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

<svelte:window on:keydown={on_key_down} />

<main style="background-color: {backgroundColor}; color: {c}">
	<Menu bind:backgroundColor bind:c />
	<div>
		{#each $ascii_struct as row, i}
			<div style="display: flex">
				{#each row.ascii as a, j}
					<span
						class={j === row.ascii.length - 1 && i == $pointer && cursor_display ? 'element' : ''}
						style="--c: {c}"
					>
						<pre>{a.encoding}</pre>
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
