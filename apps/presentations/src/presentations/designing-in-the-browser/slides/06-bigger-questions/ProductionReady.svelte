<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">"Can I ship production-ready work?"</Headline>
		<Text size="large">
			Probably not today. But the barriers are eroding.
		</Text>
	</Box>
	<Notes>
		<p>Let's be realistic. In most scenarios, designers won't ship production code — there are organizational blockers, processes, ownership issues. But these barriers are starting to erode for technically minded designers. I can imagine a near future where designers ship production code that's been reviewed by experienced engineers.</p>
	</Notes>
</Slide>
