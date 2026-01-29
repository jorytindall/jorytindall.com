<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Getting Started" title="Demo">
	<Box flexDirection="column" justifyContent="center" alignItems="center" gap="medium">
		<img
			src="./images/designing-in-the-browser/cat-typing.gif"
			alt="Demo Time Illustration"
			style="width: 300px; height: auto;"
		/>
		<Headline tag="h2" size="h2" color="brand" textAlign="center"
			>Let me show you with a live demo!</Headline
		>
	</Box>
	<Notes>
		<p>
			Now let's jump out of the slides and into a live demo. I'll walk through a few
			real-world examples of designing in the browser so you can see what this workflow
			actually looks like in practice.
		</p>
	</Notes>
</Slide>
