<script lang="ts">
	import classnames from 'classnames';
	import type { HTMLAttributes } from 'svelte/elements';

	interface TocItem {
		emoji?: string;
		title: string;
		slideIndex: number;
	}

	let {
		items,
		class: className,
		...rest
	}: {
		items: TocItem[];
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<nav class={classnames('toc', className)} {...rest}>
	<ul class="toc__list">
		{#each items as item, i}
			<li class="toc__item">
				<a href={`#/${item.slideIndex}`} class="toc__link">
					{#if item.emoji}
						<span class="toc__emoji">{item.emoji}</span>
					{/if}
					<span class="toc__title">{item.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.toc {
		width: 100%;
	}

	.toc__list {
		list-style: none;
		margin: 0;
		padding: 0 0 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toc__item {
		margin: 0;
		padding: 0 0 0 0.5rem;
		position: relative;
	}

	.toc__item::before {
		content: '';
		width: 20px;
		height: 20px;
		position: absolute;
		background: url('/arrow-right.png');
		background-size: cover;
		background-position: center;
		top: 0.15em;
		left: -1.5rem;
	}

	.toc__link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--typography-font-family-body);
		font-size: var(--typography-font-size-body-lead);
		color: var(--color-semantic-foreground-primary);
		text-decoration: underline;
		transition: color 0.15s ease;
	}

	.toc__link:hover {
		color: var(--color-semantic-foreground-brand);
	}

	.toc__emoji {
		flex-shrink: 0;
	}

	.toc__title {
		text-align: left;
	}
</style>
