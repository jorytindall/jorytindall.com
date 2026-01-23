<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The landscape is changing</Headline>
		<Text size="large">
			Figma is trying to keep up with AI tooling.
		</Text>
		<Text size="large">
			But there's a benefit to eliminating a step entirely.
		</Text>
	</Box>
	<Notes>
		<p>Figma sees what's coming and is adapting — Figma Make and other AI features are attempts to stay relevant. But here's the thing: why add AI to the middle step when you could eliminate the middle step? Going directly to the browser removes an entire layer of translation.</p>
	</Notes>
</Slide>
