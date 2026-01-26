<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		size = 'medium',
		tag = 'p',
		color = 'primary',
		textAlign = 'left',
		class: className,
		children,
		...rest
	}: {
		size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
		tag?: 'p' | 'span' | 'label' | 'div' | 'li';
		color?: 'primary' | 'secondary' | 'brand' | 'inverse';
		textAlign?: 'left' | 'center' | 'right';
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:element
	this={tag}
	class={classnames('text', `text--size-${size}`, `text--color-${color}`, `text--align-${textAlign}`, className)}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.text {
		font-family: var(--typography-font-family-body);
		line-height: var(--typography-line-height-body);
		margin: 0;
	}

	/* Sizes */
	.text--size-x-small {
		font-size: 0.75rem;
	}

	.text--size-small {
		font-size: var(--typography-font-size-body-secondary);
	}

	.text--size-medium {
		font-size: var(--typography-font-size-body-primary);
	}

	.text--size-large {
		font-size: var(--typography-font-size-body-lead);
	}

	.text--size-x-large {
		font-size: var(--typography-font-size-headline-04);
	}

	/* Colors */
	.text--color-primary {
		color: var(--color-semantic-foreground-primary);
	}

	.text--color-brand {
		color: var(--color-semantic-foreground-brand);
	}

	.text--color-secondary {
		color: var(--color-core-neutral-500);
	}

	.text--color-inverse {
		color: var(--color-semantic-foreground-inverse);
	}

	/* Text align */
	.text--align-left {
		text-align: left;
	}

	.text--align-center {
		text-align: center;
	}

	.text--align-right {
		text-align: right;
	}
</style>
