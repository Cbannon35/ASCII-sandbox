<script lang="ts">
	import { ColorMode, update_color_mode } from '../types';
	/* Params */
	export let backgroundColor: String;
	export let color: String;
	export let mode: ColorMode;
	export let fontChanges: number;
	export let showMenu: boolean;
	export let alignment: string;
	let menu: number = 0;

	let mixnmatch: boolean = false;
	import { fonts, font, ascii_struct } from '../stores';
	import { updateAscii } from './keyboardlogic';

	async function update() {
		let updated = await updateAscii(mixnmatch);
		if (updated !== -1 && !mixnmatch) fontChanges++;
	}
</script>

<div class="menuOverlay" style="display: {showMenu ? '' : 'none'}">
	<div class="menu">
		<div class="titleBar">
			<h1>OPTIONS</h1>
			<button
				class="menuButtonInverse"
				on:click={() => {
					showMenu = false;
				}}>x</button
			>
		</div>

		<div class="menuContents">
			<p class="item-l">BACKGROUND:</p>
			<input class="item-r" type="color" bind:value={backgroundColor} id="backgroundColor" />
			<p class="item-l">COLOR:</p>
			<input class="item-r" type="color" bind:value={color} id="color" />
		</div>

		<button
			on:click={() => {
				mode = update_color_mode(mode);
			}}>change mode</button
		>
		<!-- <select
			class="fonts"
			bind:value={$font}
			on:change={() => {
				// updated = await updateAscii(mixnmatch);
				// if (updated !== -1) fontChanges++;
				update();
			}}
		>
			{#each fonts as f, index}
				<option class="fonts" value={f}>{f}</option>
			{/each}
		</select>
		<button
			on:click={() => {
				mixnmatch = !mixnmatch;
				update();
			}}>mix n match</button
		>
		<div>
			<button
				on:click={() => {
					alignment = 'flex-start';
				}}>L</button
			>
			<button
				on:click={() => {
					alignment = 'center';
				}}>M</button
			> -->
		<!-- <button
				on:click={() => {
					alignment = 'flex-end';
				}}>R</button
			>
		</div> -->
	</div>
</div>
<div class="menuBar" style="--bg: {backgroundColor}">
	<button class="menuButton">&uarr;</button>
	<h1 class="title">ASCII SANDBOX</h1>
	<button
		class="menuButton"
		on:click={() => {
			showMenu = true;
		}}>SETTINGS</button
	>
</div>

<style lang="postcss">
	.menuOverlay {
		@apply h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-10;
	}
	.menu {
		@apply h-5/6 w-9/12 border-4  border-[var(--color)] p-4 flex flex-col bg-[var(--bg)] text-[var(--color)];
	}
	.menu h1 {
		@apply text-4xl border-b-4 border-[var(--color)];
	}
	.exit {
		@apply text-4xl;
	}
	.title {
		@apply text-4xl;
		@media (max-width: 600px) {
			display: none;
		}
	}
	.titleBar {
		@apply flex flex-row justify-between text-3xl p-2 sticky top-0 mb-4;
	}
	.menuBar {
		@apply bg-[var(--color)] text-[var(--bg)] flex flex-row justify-between text-2xl p-2 top-0 w-screen sticky left-0;
	}
	.fonts {
		@apply h-min text-[var(--color)];
	}
	.menuButton {
		@apply px-2 border-4 border-[var(--color)] hover:border-[var(--bg)] active:bg-[var(--bg)] active:text-[var(--color)];
	}
	.menuButtonInverse {
		@apply px-2 border-4 border-[var(--bg)] hover:border-[var(--color)] active:bg-[var(--color)] active:text-[var(--bg)];
	}
	.menuContents {
		@apply grid gap-4 p-2 grid-cols-4;
	}
	.menuContents p {
		@apply text-xl p-1 bg-[var(--color)] text-[var(--bg)];
	}
	.item-r {
		@apply col-start-2;
	}
	.item-l {
		@apply col-start-1;
	}
	/* .options {
		@apply flex flex-col gap-4 w-1/2 border-4 border-[var(--color)];
	}
	.fonts {
		@apply flex flex-col gap-4 w-1/2 border-4 border-[var(--color)];
	} */
</style>
