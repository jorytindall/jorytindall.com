<script lang="ts">
	import { getSlideContext } from '../lib/slideContext.svelte';

	const context = getSlideContext();

	const currentSlide = $derived(context?.currentSlide);
	const totalSlides = $derived(context?.totalSlides ?? 0);

	const shouldShow = $derived(
		currentSlide &&
			!currentSlide.hideHeader &&
			(currentSlide.section || currentSlide.title),
	);
</script>

{#if shouldShow && currentSlide}
	<header class="slide-header">
		<div class="slide-header__content">
			{#if currentSlide.section}
				<span class="slide-header__section">{currentSlide.section}</span>
			{/if}
			{#if currentSlide.section && currentSlide.title}
				<span class="slide-header__separator">/</span>
			{/if}
			{#if currentSlide.title}
				<span class="slide-header__title">{currentSlide.title}</span>
			{/if}
		</div>
		<div class="slide-header__number">
			{currentSlide.index + 1} / {totalSlides}
		</div>
	</header>
{/if}

<style>
	.slide-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 32px;
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-body-primary);
		color: var(--color-core-neutral-500);
		z-index: 100;
		pointer-events: none;
	}

	.slide-header__content {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.slide-header__section {
		font-weight: 600;
		color: var(--color-semantic-foreground-brand);
	}

	.slide-header__separator {
		opacity: 0.5;
	}

	.slide-header__title {
		opacity: 0.8;
	}

	.slide-header__number {
		font-variant-numeric: tabular-nums;
	}
</style>
