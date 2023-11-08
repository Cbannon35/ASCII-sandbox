<script lang="ts">
	import { ColorMode, update_color_mode } from '../types';
	/* Params */
	export let backgroundColor: String;
	export let color: String;
	export let mode: ColorMode;
	export let fontChanges: number;
	export let showMenu: boolean;
	export let alignment: string;

	let mixnmatch: boolean = false;
	import { fonts, font } from '../stores';
	import { updateAscii } from './keyboardlogic';

	async function update() {
		let updated = await updateAscii(mixnmatch);
		if (updated !== -1 && !mixnmatch) fontChanges++;
	}
</script>

<div style="--bg: {backgroundColor}; --color: {color}">
	<div class="menu" style="display: {showMenu ? '' : 'none'}">
		<input type="color" bind:value={backgroundColor} id="backgroundColor" />
		<input type="color" bind:value={color} id="color" />
		<button
			on:click={() => {
				mode = update_color_mode(mode);
			}}>change mode</button
		>
		<select
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
			>
			<button
				on:click={() => {
					alignment = 'flex-end';
				}}>R</button
			>
		</div>
		<button
			on:click={() => {
				showMenu = !showMenu;
			}}>Hide Menu</button
		>
	</div>
	<div class="menuItem" style="--bg: {backgroundColor}">balls</div>
</div>

<style lang="postcss">
	.menu {
		@apply h-[100px] w-screen flex flex-row  items-center justify-around;
	}
	.menuItem {
		@apply bg-[var(--color)] text-[var(--bg)];
	}
	.fonts {
		@apply h-min text-[var(--bg)];
	}
</style>
