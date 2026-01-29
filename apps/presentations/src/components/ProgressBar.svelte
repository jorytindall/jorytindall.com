<script lang="ts">
	import classnames from 'classnames';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		value = 0,
		max = 100,
		label,
		appearance = 'default',
		size = 'medium',
		showValue = false,
		ariaLabel,
		class: className,
		...rest
	}: {
		value: number;
		max?: number;
		label?: string;
		appearance?: 'default' | 'brand' | 'success' | 'warning' | 'inverse';
		size?: 'small' | 'medium' | 'large';
		showValue?: boolean;
		ariaLabel?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
</script>

<div
	class={classnames('progress-bar', `progress-bar--size-${size}`, className)}
	{...rest}
>
	{#if label}
		<div class="progress-bar__header">
			<span class="progress-bar__label">{label}</span>
			{#if showValue}
				<span class="progress-bar__value">{value}/{max}</span>
			{/if}
		</div>
	{/if}
	<div
		class="progress-bar__track"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-label={ariaLabel ?? label ?? `Progress: ${value} of ${max}`}
	>
		<div
			class={classnames(
				'progress-bar__fill',
				`progress-bar__fill--appearance-${appearance}`,
			)}
			style="width: {percentage}%"
		></div>
	</div>
</div>

<style>
	.progress-bar {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.progress-bar__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.progress-bar__label {
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-body-secondary);
		font-weight: 500;
		color: var(--color-semantic-foreground-primary);
	}

	.progress-bar__value {
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-body-tertiary);
		font-variant-numeric: tabular-nums;
		color: var(--color-core-neutral-500);
	}

	.progress-bar__track {
		width: 100%;
		background-color: var(--color-core-neutral-200);
		border-radius: 100px;
		overflow: hidden;
	}

	/* Sizes */
	.progress-bar--size-small .progress-bar__track {
		height: 4px;
	}

	.progress-bar--size-medium .progress-bar__track {
		height: 8px;
	}

	.progress-bar--size-large .progress-bar__track {
		height: 12px;
	}

	/* Fill bar */
	.progress-bar__fill {
		height: 100%;
		border-radius: 100px;
		transition: width 0.4s ease-out;
	}

	/* Appearances */
	.progress-bar__fill--appearance-default {
		background-color: var(--color-semantic-foreground-primary);
	}

	.progress-bar__fill--appearance-brand {
		background-color: var(--color-semantic-foreground-brand);
	}

	.progress-bar__fill--appearance-success {
		background-color: var(--color-core-green-500);
	}

	.progress-bar__fill--appearance-warning {
		background-color: var(--color-core-yellow-500);
	}

	.progress-bar__fill--appearance-inverse {
		background-color: var(--color-semantic-foreground-inverse);
	}
</style>
