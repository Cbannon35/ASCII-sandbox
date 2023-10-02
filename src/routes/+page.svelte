<script lang="ts">
	import { writable } from 'svelte/store';
	import figlet from 'figlet';
	import Menu from './menu.svelte';

	/*** MENU LOGIC FOR ASCII STYLES ***/
	let backgroundColor: String = '#FFFF00';
	let text: string = 'text-3xl font-bold underline ';

	export let ascii: string[][] = writable([[]]);
	export let pointer = writable(0);

	const ascii_render: string[][] = [[]];
	/*** FIGLET LOGIC FOR ASCII RENDER ***/
	figlet.defaults({ fontPath: 'node_modules/figlet/fonts' });
	figlet('Hello\n World!!', function (err: any, data: String) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(data);
	});

	import on_key_down from './keyboardlogic';
</script>

{@debug ascii}
<svelte:window on:keydown={on_key_down} />

<!-- {@debug $backgroundColor} -->
<main style="background-color: {backgroundColor}">
	<Menu bind:backgroundColor />
	<h1 class={text}>Hello world!</h1>

	<div>
		{#each ascii as arr, index}
			<div>
				{#each arr as char, index}
					<span>{char}</span>
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
