<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';

	let {
		size = 'h1',
		tag = 'h1',
		color = 'primary',
		children,
	}: {
		size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		color?: 'primary' | 'secondary' | 'brand' | 'inverse';
		children?: Snippet;
	} = $props();
</script>

<svelte:element
	this={tag}
	class={classnames(
		'headline',
		`headline--size-${size}`,
		`headline--color-${color}`,
	)}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.headline {
		font-family: var(--typography-font-family-headline);
		line-height: var(--typography-line-height-headline);
		margin: 0;
		letter-spacing: -0.065em;
	}

	/* Sizes */
	.headline--size-h1 {
		font-size: var(--typography-font-size-headline-01);
	}

	.headline--size-h2 {
		font-size: var(--typography-font-size-headline-02);
	}

	.headline--size-h3 {
		font-size: var(--typography-font-size-headline-03);
	}

	.headline--size-h4 {
		font-size: var(--typography-font-size-headline-04);
	}

	.headline--size-h5 {
		font-size: var(--typography-font-size-headline-05);
	}

	.headline--size-h6 {
		font-size: var(--typography-font-size-headline-06);
	}

	/* Colors */
	.headline--color-primary {
		color: var(--color-semantic-foreground-primary);
	}

	.headline--color-brand {
		color: var(--color-semantic-foreground-brand);
	}

	.headline--color-secondary {
		color: var(--color-core-neutral-500);
	}

	.headline--color-inverse {
		color: var(--color-semantic-foreground-inverse);
	}
</style>
