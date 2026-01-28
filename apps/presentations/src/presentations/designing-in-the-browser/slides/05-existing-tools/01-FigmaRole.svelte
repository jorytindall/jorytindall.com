<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Changing Landscape">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The landscape is changing</Headline>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1">
				Figma remains the best tool for certain parts of the design process.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2"
				>Learning Figma is necessary for the job right now.</Text
			>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3">
				Most high-fidelity mockup creation is still best done in Figma.
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>Let's be clear; Figma isn't going away, but the landscape is changing.</p>
		<ul>
			<li>It's still the best tool for certain parts of the design process</li>
			<li>Learning it was and is necessary for our jobs</li>
			<li>
				Most high-fidelity mockup creation, especially for stakeholder presentations and
				early exploration, is still best done there
			</li>
		</ul>
	</Notes>
</Slide>
