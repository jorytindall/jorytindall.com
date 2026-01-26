<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		color = 'primary',
		class: className,
		children,
		...rest
	}: {
		color?: 'primary' | 'brand' | 'inverse' | 'warning';
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<aside class={classnames('callout', `callout--color-${color}`, className)} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</aside>

<style>
	.callout {
		padding: 16px 20px;
		border-radius: 4px;
		border-width: 1px;
		border-left-width: 4px;
		border-style: solid;
	}

	/* Color variants */
	.callout--color-primary {
		background-color: var(--color-semantic-surface-primary);
		border-color: var(--color-semantic-border-primary);
	}

	.callout--color-brand {
		background-color: color-mix(
			in srgb,
			var(--color-semantic-surface-brand) 15%,
			transparent
		);
		border-color: var(--color-semantic-border-brand);
	}

	.callout--color-inverse {
		background-color: var(--color-semantic-surface-dark);
		border-color: var(--color-semantic-border-dark);
	}

	.callout--color-warning {
		background-color: var(--color-core-secondary-100);
		border-color: var(--color-core-secondary-300);
	}
</style>
