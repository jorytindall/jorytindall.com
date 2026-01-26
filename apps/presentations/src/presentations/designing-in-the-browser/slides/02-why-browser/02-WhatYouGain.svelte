<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">What you gain</Headline>
		<ul>
			<li><Text tag="span" size="large"><strong>Faster iteration</strong> — skip the handoff, see changes immediately</Text></li>
			<li><Text tag="span" size="large"><strong>Realistic experience</strong> — what users actually see and feel</Text></li>
			<li><Text tag="span" size="large"><strong>Grounded interaction design</strong> — real hover states, real transitions, real feedback</Text></li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>When you design in the browser, you're working with reality</li>
			<li>Faster iteration because there's no handoff step</li>
			<li>You see exactly what users will experience</li>
			<li>Your interaction design is grounded in what's actually possible — real hover states, real transitions, real system feedback</li>
		</ul>
	</Notes>
</Slide>
