<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Code from '../../../../components/Code.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Scenario: Spacing Feedback">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h4" color="brand">Scenario: Spacing feedback</Headline>
		<Text size="medium">
			Your PM gives feedback on the spacing between elements. Instead of updating the mockup,
			use the browser's inspect tool to explore options and pass specs directly to your
			engineer.
		</Text>
		<Box class="fragment" data-fragment-index="1">
			<Code lang="css">
				{`.card-grid {
  gap: 24px; /* Try 16px, 24px, or 32px */
}

.card-content {
  padding: 16px 20px;
}`}
			</Code>
		</Box>
	</Box>
	<Notes>
		<p>
			Here's a common scenario: your product manager gives feedback that the spacing between
			cards feels off. Instead of going back to Figma to create a new version of the mockup...
		</p>
		<ul>
			<li>Open your browser's dev tools and inspect the element</li>
			<li>
				Live-edit the CSS to try different spacing values (I'll show you this in a second)
			</li>
			<li>Once you find what works, pass those exact values to your engineer</li>
		</ul>
		<p>
			This takes seconds instead of the round-trip of updating Figma, exporting, and handing
			off again. You're working with the real layout, real content, and the real constraints
			of the web.
		</p>
	</Notes>
</Slide>
