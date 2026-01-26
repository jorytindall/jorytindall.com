<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The skill gap is real</Headline>
		<ul>
			<li><Text tag="span" size="large">Learning how the browser actually works</Text></li>
			<li><Text tag="span" size="large">Understanding web development basics</Text></li>
			<li><Text tag="span" size="large">Efficient development workflows</Text></li>
			<li><Text tag="span" size="large">Keeping up — the web moves fast</Text></li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>Let's be honest about the challenge</li>
			<li>These are new skills that aren't part of a typical designer's job description</li>
			<li>Learning how the browser works, understanding web dev basics, efficient workflows — it's a real investment</li>
			<li>The web development space moves so quickly that if you're focused on design most of the time, it can be hard to keep up</li>
		</ul>
	</Notes>
</Slide>
