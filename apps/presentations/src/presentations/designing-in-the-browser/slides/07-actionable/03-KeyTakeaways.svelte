<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Actionable Next Steps" title="Key Takeaways">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Key takeaways</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				The browser grounds your design in reality
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Figma and browser work best together in a hybrid workflow
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				The skill gap is real, but attainable
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="4">
				Start small and build gradually
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="5">
				AI tools + browser workflow = faster time-to-value
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>To recap the key takeaways from this presentation:</p>
		<ul>
			<li>
				The browser grounds your design in reality — you're working with the actual medium,
				not a simulation of it. This leads to better designs and fewer surprises during
				implementation.
			</li>
			<li>
				Figma and browser work best together — use Figma for early exploration, stakeholder
				alignment, and documentation. Use the browser for iteration, interaction design,
				testing, and final refinement.
			</li>
			<li>
				The skill gap is real, but attainable — you don't need to become a senior engineer.
				The basics of HTML and CSS are within reach, and AI tools can help fill the gaps.
			</li>
			<li>
				Start small and build gradually — pick the level of entry that works for you, whether
				that's browser DevTools, CodePen, or running locally. Every step forward is progress.
			</li>
			<li>
				The combination of AI-assisted development and browser-based design dramatically
				reduces the time from idea to shipped feature. This is increasingly what
				organizations will expect from modern product designers.
			</li>
		</ul>
	</Notes>
</Slide>
