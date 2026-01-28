<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="AI Design Tools">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Where do AI design tools fit?</Headline>
		<Text size="large">
			Figma Make is an interesting attempt to integrate AI into the design process. However…
		</Text>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1">
				The middle step isn't eliminated…yet.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2">
				There's a benefit to eliminating a step entirely.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3">
				Going directly to the browser removes an entire layer of translation.
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			Figma sees where the software development industry is going and is trying to be the
			end-to-end design to code solution. Figma Make is an interesting attempt to integrate AI
			directly into the design process however…
		</p>
		<ul>
			<li>They don't eliminate the middle step…yet.</li>
			<li>
				But here's the thing: why add AI to the middle step when you could eliminate the
				middle step entirely?
			</li>
			<li>Going directly to the browser removes an entire layer of translation</li>
		</ul>
		<p>
			Obviously some of these points are opinionated and meant to be provocative, but I
			encourage you to really think about them in a way that encourages discussion and
			critical thinking about how your design process could evolve over the next 5 years.
		</p>
		<p>You're not going to prompt your way to perfection just yet.</p>
	</Notes>
</Slide>
