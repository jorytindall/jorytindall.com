<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Bigger Questions" title="What's In Reach">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">What's in reach vs. what's not</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				<strong>In reach:</strong> UI design, presentational JavaScript, cleaning up legacy experiences
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				<strong>Further out:</strong> Complex APIs, databases, complex functional JavaScript
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Know what's achievable and focus there
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>What's realistically in reach for designers today? There's a spectrum here.</p>
		<ul>
			<li>
				In reach: UI development/engineering work, presentational JavaScript, cleaning up
				legacy experiences
			</li>
			<li>Further out: Complex APIs, database work, heavy functional JavaScript</li>
			<li>Know what's achievable and within your bounds, focus there</li>
		</ul>
	</Notes>
</Slide>
