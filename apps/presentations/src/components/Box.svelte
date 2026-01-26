<script lang="ts">
	import classnames from 'classnames';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		textAlign = 'center',
		justifyContent = 'center',
		flexDirection = 'column',
		alignItems = 'start',
		alignContent = 'center',
		gap = 'none',
		class: className,
		children,
		...rest
	}: {
		textAlign?: 'left' | 'center' | 'right';
		justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
		flexDirection?: 'row' | 'column';
		alignItems?: 'start' | 'end' | 'center' | 'stretch';
		alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around';
		gap?: 'none' | 'small' | 'medium' | 'large' | 'x-large';
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const classes = $derived(
		classnames(
			'box',
			`justify-content--${justifyContent}`,
			`align-items--${alignItems}`,
			`align-content--${alignContent}`,
			`flex-direction--${flexDirection}`,
			`text-align--${textAlign}`,
			`gap--${gap}`,
			className,
		),
	);
</script>

<div class={classes} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.box {
		display: flex;
	}

	/* Text align */

	.text-align--left {
		text-align: left;
	}
	.text-align--center {
		text-align: center;
	}
	.text-align--right {
		text-align: right;
	}

	/* Direction */

	.flex-direction--row {
		flex-direction: row;
	}

	.flex-direction--column {
		flex-direction: column;
	}

	/* Justify content */

	.justify-content--start {
		justify-content: start;
	}

	.justify-content--center {
		justify-content: center;
	}

	.justify-content--end {
		justify-content: end;
	}

	.justify-content--space-between {
		justify-content: space-between;
	}

	.justify-content-space-around {
		justify-content: space-around;
	}

	/* Align items */

	.align-items--start {
		align-items: start;
	}

	.align-items--end {
		align-items: end;
	}

	.align-items--center {
		align-items: center;
	}

	.align-items--stretch {
		align-items: stretch;
	}

	/* Align content */

	.align-content--start {
		align-content: start;
	}

	.align-content--end {
		align-content: end;
	}

	.align-content--center {
		align-content: center;
	}

	.align-content--stretch {
		align-content: stretch;
	}

	.align-content--space-between {
		align-content: space-between;
	}

	.align-content--space-around {
		align-content: space-around;
	}

	/* Gap */

	.gap--none {
		gap: 0;
	}

	.gap--small {
		gap: 8px;
	}

	.gap--medium {
		gap: 16px;
	}

	.gap--large {
		gap: 24px;
	}

	.gap--x-large {
		gap: 40px;
	}
</style>
