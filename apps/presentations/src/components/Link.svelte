<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';

	let {
		href,
		color = 'inherit',
		external = false,
		children,
	}: {
		href: string;
		color?: 'inherit' | 'brand' | 'primary';
		external?: boolean;
		children?: Snippet;
	} = $props();

	const isExternal = $derived(external || href.startsWith('http'));
</script>

<a
	{href}
	class={classnames('link', `link--color-${color}`)}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener noreferrer' : undefined}
>
	{#if children}
		{@render children()}
	{/if}
</a>

<style>
	.link {
		text-decoration: underline;
		text-underline-offset: 0.15em;
		transition: opacity 0.15s ease;
	}

	.link:hover {
		opacity: 0.8;
	}

	/* Colors */
	.link--color-inherit {
		color: inherit;
	}

	.link--color-brand {
		color: var(--color-semantic-foreground-brand);
	}

	.link--color-primary {
		color: var(--color-semantic-foreground-primary);
	}
</style>
