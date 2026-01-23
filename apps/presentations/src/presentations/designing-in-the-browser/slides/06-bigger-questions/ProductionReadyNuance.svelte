<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">What's in reach vs. what's not</Headline>
		<ul>
			<li><Text tag="span" size="large"><strong>In reach:</strong> UI design, presentational JavaScript, cleaning up legacy experiences</Text></li>
			<li><Text tag="span" size="large"><strong>Further out:</strong> Complex APIs, databases, complex functional JavaScript</Text></li>
		</ul>
	</Box>
	<Notes>
		<p>There's a spectrum here. UI design work, presentational JavaScript, cleaning up legacy experiences — that's well within reach for most designers. Complex APIs, database work, heavy functional JavaScript — that's probably out of reach for now. Know what's achievable and focus there.</p>
	</Notes>
</Slide>
