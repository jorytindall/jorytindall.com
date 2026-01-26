<script lang="ts">
	import Box from './Box.svelte';
	import Text from './Text.svelte';

	let {
		presenters = [
			{
				name: '',
				image: '',
				website: '',
				role: '',
			},
		],
		color = 'secondary',
	}: {
		presenters: {
			name: string;
			image: string;
			website: string;
			role: string;
		}[];
		color?: 'primary' | 'secondary' | 'brand' | 'inverse';
	} = $props();
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
			<Box flexDirection="column" gap="x-small">
				<Text size="small" {color}>{presenter.name}</Text>
				<Text size="x-small" {color}>{presenter.role}</Text>
			</Box>
		{/each}
	</Box>
</Box>
