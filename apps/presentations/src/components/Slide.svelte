<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSlideContext } from '../lib/slideContext.svelte';

	let {
		bgColor = 'var(--color-tertiary-50)',
		autoAnimate = false,
		section,
		title,
		hideHeader = false,
		children,
		...rest
	}: {
		bgColor?: string;
		autoAnimate?: boolean;
		section?: string;
		title?: string;
		hideHeader?: boolean;
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();

	let slideIndex = $state<number | null>(null);

	onMount(() => {
		try {
			const context = getSlideContext();
			if (context) {
				slideIndex = context.registerSlide({ section, title, hideHeader });
			}
		} catch {
			// Context not available (e.g., in isolation), that's fine
		}
	});
</script>

<section
	data-background-color={bgColor}
	data-auto-animate={autoAnimate}
	data-slide-index={slideIndex}
	data-slide-section={section}
	data-slide-title={title}
	data-slide-hide-header={hideHeader || undefined}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</section>
