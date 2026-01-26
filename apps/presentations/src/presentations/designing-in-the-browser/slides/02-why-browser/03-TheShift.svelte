<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Design grounded in reality</Headline>
		<Text size="large">
			The browser forces you to confront real constraints:
		</Text>
		<ul>
			<li><Text tag="span" size="large">How does this actually scroll?</Text></li>
			<li><Text tag="span" size="large">What happens when content overflows?</Text></li>
			<li><Text tag="span" size="large">How does this feel on different screen sizes?</Text></li>
			<li><Text tag="span" size="large">Is this interaction actually usable?</Text></li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>The browser doesn't let you cheat</li>
			<li>It forces you to answer questions that Figma lets you defer</li>
			<li>How does this actually scroll? What happens when content overflows?</li>
			<li>These questions have real answers in the browser — you can't just wave your hands</li>
		</ul>
	</Notes>
</Slide>
