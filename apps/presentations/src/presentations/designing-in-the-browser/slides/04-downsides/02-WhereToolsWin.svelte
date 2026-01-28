<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Honest Downsides" title="Where Figma Wins">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Where Figma still wins</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				Rapid iteration on many design variations
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Visual comparison of different versions
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Component exploration and refinement
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="4">
				Stakeholder presentations and alignment
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			I've talked up the browser quite a bit, but Figma is still an exceptional tool and still
			excels in many different areas.
		</p>
		<ul>
			<li>
				When you need to flesh out many different versions of a design quickly — especially
				component work
			</li>
			<li>When visually comparing design explorations and variations side by side</li>
			<li>
				Parts of the component exploration process are much better in Figma. It's easy to
				get messy in Figma and I see this as a core part of the design process.
			</li>
			<li>
				And finally, stakeholder presentations and alignment. Figma is great for review and
				collaboration and should be leveraged as such.
			</li>
		</ul>
	</Notes>
</Slide>
