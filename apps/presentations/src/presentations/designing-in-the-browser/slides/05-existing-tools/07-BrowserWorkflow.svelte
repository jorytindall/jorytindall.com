<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Browser Workflow">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Where the browser fits in the workflow</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				Rapid iteration on interaction design
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Testing with real data and real constraints
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Final refinement and VQA before shipping
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>The browser shines at different stages of the design process:</p>
		<ul>
			<li>
				Rapid iteration on interaction design — working with real hover states, transitions,
				and animations to nail the feel of an interaction.
			</li>
			<li>
				Testing with real data and real constraints — seeing how your design holds up with
				actual content, edge cases, and real-world scenarios. A good example of this is
				using real table data to see exactly how it will be rendered, espcially in complex
				scenarios.
			</li>
			<li>
				Final refinement and VQA before shipping — catching visual bugs, ensuring
				pixel-perfect alignment, and making those final tweaks that matter.
			</li>
		</ul>
	</Notes>
</Slide>
