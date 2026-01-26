<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		size = 'h1',
		tag = 'h1',
		color = 'primary',
		textAlign = 'left',
		class: className,
		children,
		...rest
	}: {
		size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		color?: 'primary' | 'secondary' | 'brand' | 'inverse';
		textAlign?: 'left' | 'center' | 'right';
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:element
	this={tag}
	class={classnames(
		'headline',
		`headline--size-${size}`,
		`headline--color-${color}`,
		`headline--align-${textAlign}`,
		className,
	)}
	{...rest}
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
		letter-spacing: -0.05em;
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

	/* Text align */
	.headline--align-left {
		text-align: left;
	}

	.headline--align-center {
		text-align: center;
	}

	.headline--align-right {
		text-align: right;
	}
</style>
