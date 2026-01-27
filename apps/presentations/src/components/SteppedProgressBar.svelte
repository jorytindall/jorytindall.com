<script lang="ts">
	import { onMount } from 'svelte';
	import classnames from 'classnames';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Step {
		label: string;
		description?: string;
	}

	let {
		steps,
		appearance = 'brand',
		size = 'medium',
		fragmentStartIndex = 0,
		class: className,
		...rest
	}: {
		steps: Step[];
		appearance?: 'default' | 'brand' | 'success' | 'warning';
		size?: 'small' | 'medium' | 'large';
		fragmentStartIndex?: number;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let currentStep = $state(0);
	let fragmentContainer: HTMLDivElement;

	const percentage = $derived((currentStep / steps.length) * 100);

	onMount(() => {
		// Use MutationObserver to watch for Reveal.js adding/removing 'visible' class on fragments
		const observer = new MutationObserver((mutations) => {
			// Count how many fragments currently have the 'visible' class
			const visibleFragments = fragmentContainer.querySelectorAll('.fragment.visible');
			currentStep = visibleFragments.length;
		});

		// Observe the fragment container for class changes on its children
		observer.observe(fragmentContainer, {
			subtree: true,
			attributes: true,
			attributeFilter: ['class'],
		});

		// Initial check in case fragments are already visible
		const visibleFragments = fragmentContainer.querySelectorAll('.fragment.visible');
		currentStep = visibleFragments.length;

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class={classnames('stepped-progress', `stepped-progress--size-${size}`, className)} {...rest}>
	<!-- Progress bar -->
	<div class="stepped-progress__bar">
		<div
			class="stepped-progress__track"
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={0}
			aria-valuemax={steps.length}
			aria-label={`Step ${currentStep} of ${steps.length}`}
		>
			<div
				class={classnames(
					'stepped-progress__fill',
					`stepped-progress__fill--appearance-${appearance}`,
				)}
				style="width: {percentage}%"
			></div>
		</div>
		<div class="stepped-progress__markers">
			{#each steps as step, index}
				<div
					class={classnames('stepped-progress__marker', {
						'stepped-progress__marker--active': index < currentStep,
						'stepped-progress__marker--current': index === currentStep - 1,
					})}
					style="left: {((index + 1) / steps.length) * 100}%"
				></div>
			{/each}
		</div>
	</div>

	<!-- Hidden fragments for Reveal.js to track -->
	<div class="stepped-progress__fragments" bind:this={fragmentContainer}>
		{#each steps as step, index}
			<span
				class="fragment stepped-progress__fragment"
				data-fragment-index={fragmentStartIndex + index}
			></span>
		{/each}
	</div>

	<!-- Step content -->
	<div class="stepped-progress__content">
		{#each steps as step, index}
			<div
				class={classnames('stepped-progress__step', {
					'stepped-progress__step--active': index === currentStep - 1,
					'stepped-progress__step--past': index < currentStep - 1,
				})}
			>
				<span class="stepped-progress__step-label">{step.label}</span>
				{#if step.description}
					<span class="stepped-progress__step-description">{step.description}</span>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.stepped-progress {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}

	/* Progress bar track */
	.stepped-progress__bar {
		position: relative;
		width: 100%;
	}

	.stepped-progress__track {
		width: 100%;
		background-color: var(--color-core-neutral-300);
		border-radius: 100px;
		overflow: hidden;
		border: 2px solid var(--color-core-neutral-400);
	}

	.stepped-progress--size-small .stepped-progress__track {
		height: 6px;
	}

	.stepped-progress--size-medium .stepped-progress__track {
		height: 10px;
	}

	.stepped-progress--size-large .stepped-progress__track {
		height: 14px;
	}

	.stepped-progress__fill {
		height: 100%;
		border-radius: 100px;
		transition: width 0.5s ease-out;
	}

	.stepped-progress__fill--appearance-default {
		background-color: var(--color-semantic-foreground-primary);
	}

	.stepped-progress__fill--appearance-brand {
		background-color: var(--color-semantic-foreground-brand);
	}

	.stepped-progress__fill--appearance-success {
		background-color: var(--color-core-green-500);
	}

	.stepped-progress__fill--appearance-warning {
		background-color: var(--color-core-yellow-500);
	}

	/* Markers */
	.stepped-progress__markers {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		pointer-events: none;
	}

	.stepped-progress__marker {
		position: absolute;
		top: 50%;
		width: 32px;
		height: 32px;
		background-color: var(--color-core-neutral-300);
		border: 3px solid var(--color-core-neutral-400);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition:
			background-color 0.3s ease,
			transform 0.2s ease;
	}

	.stepped-progress__marker--active {
		background-color: var(--color-semantic-foreground-brand);
		border-color: var(--color-core-primary-300);
	}

	.stepped-progress__marker--current {
		transform: translate(-50%, -50%) scale(1.5);
	}

	/* Hidden fragments - visually hidden but still in DOM for Reveal.js */
	.stepped-progress__fragments {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}

	.stepped-progress__fragment {
		display: block;
	}

	/* Step content */
	.stepped-progress__content {
		position: relative;
		min-height: 100px;
	}

	.stepped-progress__step {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.4s ease,
			transform 0.4s ease;
		pointer-events: none;
	}

	.stepped-progress__step--active {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.stepped-progress__step--past {
		opacity: 0;
		transform: translateY(-10px);
	}

	.stepped-progress__step-label {
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-headline-h4);
		font-weight: 600;
		color: var(--color-semantic-foreground-primary);
	}

	.stepped-progress__step-description {
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-body-primary);
		color: var(--color-core-neutral-600);
		line-height: 1.5;
	}
</style>
