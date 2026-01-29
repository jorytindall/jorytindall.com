<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Code from '../../../../components/Code.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Scenario: Hover Animation">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h4" color="brand">Scenario: Hover animation</Headline>
		<Text size="medium">
			You want to add some whimsy to a card's hover interaction. Instead of wrestling with
			Figma's animation and prototyping tools, prototype it directly in your demo app with AI
			assistance.
		</Text>
		<Box class="fragment" data-fragment-index="1">
			<Code lang="css">
				{`.card {
  transition: transform 200ms ease-out,
              box-shadow 200ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}`}
			</Code>
		</Box>
	</Box>
	<Notes>
		<p>
			You want to add a subtle hover interaction to make the UI feel more polished. Figma can
			do basic prototyping, but getting the exact feel of an animation is difficult.
		</p>
		<ul>
			<li>Use AI tooling to quickly generate a starting point for the animation</li>
			<li>Tweak the timing, easing, and transform values in the browser</li>
			<li>Feel the interaction in real-time as you adjust</li>
			<li>Hand off the exact CSS keyframe or transition values to your engineer</li>
		</ul>
		<p>The browser is where this interaction will actually live. Why not design it there?</p>
		<p>
			And, in reality, CSS transitions are not super complex, so it might be easier to just
			write one yourself!
		</p>
	</Notes>
</Slide>
