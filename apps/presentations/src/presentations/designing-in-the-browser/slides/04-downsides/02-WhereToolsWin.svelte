<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Where Figma still wins</Headline>
		<ul>
			<li><Text tag="span" size="large">Rapid iteration on many design variations</Text></li>
			<li><Text tag="span" size="large">Visual comparison of different versions</Text></li>
			<li><Text tag="span" size="large">Component exploration and refinement</Text></li>
			<li><Text tag="span" size="large">Stakeholder presentations and alignment</Text></li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>Figma is genuinely better for certain tasks</li>
			<li>When you need to flesh out many different versions of a design quickly — especially component work</li>
			<li>Figma makes it easy to visually compare variations side by side</li>
			<li>That's hard to replicate in the browser</li>
		</ul>
	</Notes>
</Slide>
