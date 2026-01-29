<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="AI Design Tools">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Figma can be a bottleneck</Headline>
		<Text size="large">Sometimes updating a mockup adds friction rather than value.</Text>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1">
				Minor refinements don't always need a round-trip through Figma.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2">
				The mockup becomes an extra step between feedback and implementation.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3">
				Going directly to the browser removes an entire layer of translation.
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			Figma is incredibly powerful, but sometimes it adds friction rather than value to the
			design process. When you receive feedback on spacing, want to explore an interaction, or
			need to test with real data, updating a mockup can become a bottleneck.
		</p>
		<ul>
			<li>
				Minor refinements like spacing tweaks or hover states don't always need a round-trip
				through Figma. You can iterate faster by going straight to the browser.
			</li>
			<li>
				When you update a mockup just to hand it off again, the mockup becomes an extra step
				between receiving feedback and implementing the change.
			</li>
			<li>
				Going directly to the browser removes an entire layer of translation and lets you
				work with the real thing.
			</li>
		</ul>
		<p>
			You're probably saying "well, hey Jory! Figma is my source of truth for the most
			up-to-date and refined UI!" And I'm sorry to say that I've seen your files, and that is
			not true...
		</p>
		<p>
			So let's look at some specific scenarios where skipping Figma can speed up your
			workflow.
		</p>
	</Notes>
</Slide>
