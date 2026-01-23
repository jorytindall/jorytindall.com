<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Resources</Headline>
		<ul>
			<li><Text tag="span" size="large">Your friendly neighborhood engineer</Text></li>
			<li><Text tag="span" size="large">Claude, Cursor, or your AI tool of choice</Text></li>
			<li><Text tag="span" size="large">MDN Web Docs for fundamentals</Text></li>
			<li><Text tag="span" size="large">Your own curiosity</Text></li>
		</ul>
	</Box>
	<Notes>
		<p>The best resource is an engineer willing to pair with you and answer questions. AI tools are great for explaining code and helping you get unstuck. MDN Web Docs is the definitive reference for HTML, CSS, and JavaScript fundamentals. But honestly, the most important resource is your own curiosity — start poking around.</p>
	</Notes>
</Slide>
