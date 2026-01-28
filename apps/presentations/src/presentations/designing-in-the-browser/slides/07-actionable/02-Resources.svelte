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
		<p>Here are some resources to help you on your journey:</p>
		<ul>
			<li>
				The best resource is an engineer willing to pair with you and answer questions. Don't
				be afraid to ask for help — most engineers love explaining how things work.
			</li>
			<li>
				AI tools like Claude and Cursor are incredible for explaining code and helping you get
				unstuck. Use them as learning tools, not just code generators.
			</li>
			<li>
				MDN Web Docs is the definitive reference for HTML, CSS, and JavaScript fundamentals.
				Bookmark it and use it often.
			</li>
			<li>
				But honestly, the most important resource is your own curiosity — start poking around,
				break things, and learn from the experience.
			</li>
		</ul>
	</Notes>
</Slide>
