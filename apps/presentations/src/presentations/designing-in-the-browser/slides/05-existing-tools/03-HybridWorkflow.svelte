<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The hybrid workflow</Headline>
		<ul>
			<li><Text tag="span" size="large"><strong>Figma:</strong> Early exploration, stakeholder alignment, documentation</Text></li>
			<li><Text tag="span" size="large"><strong>Browser:</strong> Iteration, interaction design, testing, final refinement</Text></li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>In practice, most of us will use both</li>
			<li>Figma: early exploration, stakeholder presentations, documentation</li>
			<li>Browser: iteration, nailing interaction design, testing with real data, final refinement before shipping</li>
		</ul>
	</Notes>
</Slide>
