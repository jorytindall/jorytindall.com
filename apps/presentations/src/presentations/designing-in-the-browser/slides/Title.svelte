<script>
	import Slide from '../../../components/Slide.svelte';
	import Box from '../../../components/Box.svelte';
	import Presenters from '../../../components/Presenters.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start">
		<h1>Designing & Prototyping in the Browser</h1>
		<p>
			Exploring a realistic approach to a "realistic" application
			development.
		</p>
		<Presenters
			presenters={[
				{
					name: 'Jory Tindall',
					image: './images/jory-square-avatar.png',
					website: 'https://jorytindall.com',
				},
			]}
		/>
	</Box>
</Slide>
