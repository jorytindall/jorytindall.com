<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The infinite canvas problem</Headline>
		<Text size="large">
			Figma's infinite canvas doesn't present a realistic experience.
		</Text>
		<Text size="large">
			Your users don't have infinite space. They have viewports, scroll behavior, and real device constraints.
		</Text>
	</Box>
	<Notes>
		<p>Figma's infinite canvas is great for exploration, but it creates a fundamental disconnect. Your users experience your design within the constraints of their browser, their screen size, their device. When you design on an infinite canvas, you're designing in a vacuum.</p>
	</Notes>
</Slide>
