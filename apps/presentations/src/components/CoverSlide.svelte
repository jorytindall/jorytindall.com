<script lang="ts">
	import Box from './Box.svelte';
	import Headline from './Headline.svelte';
	import Text from './Text.svelte';
	import type { Snippet } from 'svelte';

	let {
		backgroundImage = '',
		backgroundOverlay = 'rgba(0, 0, 0, 0.5)',
		backgroundPosition = 'center',
		backgroundSize = 'cover',
		title = '',
		subtitle = '',
		titleColor = 'inverse',
		subtitleColor = 'inverse',
		textAlign = 'left',
		autoAnimate = false,
		children,
		notes,
	}: {
		backgroundImage?: string;
		backgroundOverlay?: string;
		backgroundPosition?: string;
		backgroundSize?: string;
		title?: string;
		subtitle?: string;
		titleColor?: 'primary' | 'secondary' | 'brand' | 'inverse';
		subtitleColor?: 'primary' | 'secondary' | 'brand' | 'inverse';
		textAlign?: 'left' | 'center' | 'right';
		autoAnimate?: boolean;
		children?: Snippet;
		notes?: Snippet;
	} = $props();
</script>

<section
	data-background-image={backgroundImage}
	data-background-size={backgroundSize}
	data-background-position={backgroundPosition}
	data-auto-animate={autoAnimate}
>
	<div class="cover-overlay" style="--overlay-color: {backgroundOverlay}">
		<Box
			flexDirection="column"
			{textAlign}
			justifyContent="end"
			gap="medium"
		>
			{#if title}
				<Headline tag="h1" size="h1" color={titleColor}
					>{title}</Headline
				>
			{/if}
			{#if subtitle}
				<Text size="large" color={subtitleColor}>{subtitle}</Text>
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</Box>
	</div>
	{#if notes}
		<aside class="notes">
			{@render notes()}
		</aside>
	{/if}
</section>

<style>
	.cover-overlay {
		position: absolute;
		inset: 0;
		/* background: var(--overlay-color); */
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: var(--r-block-margin);
	}
</style>
