<script>
	import classnames from 'classnames';

	export let textAlign = 'center';
	export let justifyContent = 'center';
	export let flexDirection = 'column';
	export let alignItems = 'start';
	export let alignContent = 'center';
	export let gap = 'none';

	export const classes = classnames([
		'box',
		`justify-content--${justifyContent}`,
		`align-items--${alignItems}`,
		`align-content--${alignContent}`,
		`flex-direction--${flexDirection}`,
		`text-align--${textAlign}`,
		`gap--${gap}`,
	]);
</script>

<div class={classes}>
	<slot />
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
