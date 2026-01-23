<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">About me</Headline>
		<Text size="large">
			<!-- TODO: Add your background/credibility on this topic -->
		</Text>
	</Box>
	<Notes>
		<p>Quick background on why I'm qualified to talk about this - my experience working across design and development.</p>
	</Notes>
</Slide>
