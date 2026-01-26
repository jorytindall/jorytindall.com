<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The title is due for a refresh</Headline>
		<Text size="large">
			Technical knowledge + AI tools + creative thinking = a new kind of designer.
		</Text>
		<Text size="large">
			Organizations that embrace this flexibility will move faster. Those that don't will fall behind.
		</Text>
	</Box>
	<Notes>
		<ul>
			<li>With a little technical knowledge, a paired AI tool, and some creative thinking, the term "designer" is set for a refresh</li>
			<li>There's also a risk: firms that maintain a strict view of what a designer "is" will fall behind</li>
			<li>Those that embrace a more flexible description will reap the rewards</li>
			<li>Moving design closer to users</li>
		</ul>
	</Notes>
</Slide>
