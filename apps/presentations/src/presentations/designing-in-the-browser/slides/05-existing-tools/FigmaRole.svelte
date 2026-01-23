<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Figma is a tool</Headline>
		<Text size="large">
			Learning Figma is necessary for the job right now.
		</Text>
		<Text size="large">
			Most high-fidelity mockup creation is still best done in Figma.
		</Text>
	</Box>
	<Notes>
		<p>Let's be clear: Figma isn't going away. It's still the best tool for certain parts of the design process. Learning it was and is necessary for the job. Most high-fidelity mockup creation, especially for stakeholder presentations and early exploration, is still best done there.</p>
	</Notes>
</Slide>
