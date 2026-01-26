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
		<ul>
			<li>Figma's infinite canvas is great for exploration, but it creates a fundamental disconnect</li>
			<li>Your users experience your design within the constraints of their browser, their screen size, their device</li>
			<li>When you design on an infinite canvas, you're designing in a vacuum</li>
		</ul>
	</Notes>
</Slide>
