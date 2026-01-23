<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">What we'll cover</Headline>
		<ul>
			<li><Text tag="span" size="large">Why design in the browser?</Text></li>
			<li><Text tag="span" size="large">How to get started</Text></li>
			<li><Text tag="span" size="large">The honest downsides</Text></li>
			<li><Text tag="span" size="large">Where existing tools fit</Text></li>
			<li><Text tag="span" size="large">The bigger questions</Text></li>
			<li><Text tag="span" size="large">Actionable next steps</Text></li>
		</ul>
	</Box>
	<Notes>
		<p>Here's our agenda for today. We'll start with the why, move into practical how-to, be honest about trade-offs, and end with concrete things you can do starting Monday.</p>
	</Notes>
</Slide>
