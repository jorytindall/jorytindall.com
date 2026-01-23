<script lang="ts">
	import Box from './Box.svelte';
	import Text from './Text.svelte';
	import type { SvelteComponent } from 'svelte';

	let {
		presenters = [
			{
				name: '',
				image: '',
				website: '',
			},
		],
	}: { presenters: { name: string; image: string; website: string }[] } =
		$props();
</script>

<Box flexDirection="row" gap="large" alignItems="center">
	<Box flexDirection="row" gap="small" alignItems="center">
		{#each presenters as presenter (presenter.name)}
			<a
				href={presenter.website}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={presenter.name}
			>
				<img src={presenter.image} alt={presenter.name} width="50" />
			</a>
			<Text size="small" color="secondary">{presenter.name}</Text>
		{/each}
	</Box>
</Box>
