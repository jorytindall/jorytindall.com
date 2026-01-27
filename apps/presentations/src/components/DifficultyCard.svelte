<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import ProgressBar from './ProgressBar.svelte';
	import Headline from './Headline.svelte';
	import Text from './Text.svelte';

	let {
		title,
		description,
		level,
		maxLevel = 5,
		progressLabel,
		appearance = 'brand',
		showValue = false,
		fragmentIndex,
		class: className,
		children,
		...rest
	}: {
		title: string;
		description?: string;
		level: number;
		maxLevel?: number;
		progressLabel?: string;
		appearance?: 'default' | 'brand' | 'success' | 'warning';
		showValue?: boolean;
		fragmentIndex?: number;
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={classnames('difficulty-card', className)}
	class:fragment={fragmentIndex !== undefined}
	data-fragment-index={fragmentIndex}
	{...rest}
>
	<div class="difficulty-card__content">
		<Headline tag="h4" size="h5" color="primary">{title}</Headline>
		{#if description}
			<Text size="small" color="secondary">{description}</Text>
		{/if}
		{#if children}
			<div class="difficulty-card__extra">
				{@render children()}
			</div>
		{/if}
	</div>
	<div class="difficulty-card__meter">
		<ProgressBar
			value={level}
			max={maxLevel}
			label={progressLabel}
			{appearance}
			{showValue}
			size="medium"
		/>
	</div>
</div>

<style>
	.difficulty-card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		background-color: var(--color-core-neutral-100);
		border-radius: 8px;
		border-left: 4px solid var(--color-semantic-foreground-brand);
	}

	.difficulty-card__content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.difficulty-card__extra {
		margin-top: 8px;
	}

	.difficulty-card__meter {
		margin-top: auto;
	}

	/* Fragment support */
	.difficulty-card.fragment {
		opacity: 0;
	}

	.difficulty-card.fragment.visible {
		opacity: 1;
	}
</style>
