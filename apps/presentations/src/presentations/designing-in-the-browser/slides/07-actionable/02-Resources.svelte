<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Actionable Next Steps" title="Resources">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Resources</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				Your friendly neighborhood engineer
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Claude, Cursor, or your AI tool of choice
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				MDN Web Docs for fundamentals
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="4">
				Your own curiosity
			</Text>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>The best resource is an engineer willing to pair with you and answer questions</li>
			<li>AI tools are great for explaining code and helping you get unstuck</li>
			<li>MDN Web Docs is the definitive reference for HTML, CSS, and JavaScript fundamentals</li>
			<li>But honestly, the most important resource is your own curiosity — start poking around</li>
		</ul>
	</Notes>
</Slide>
