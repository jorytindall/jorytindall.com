<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Getting Started" title="Options">
	<Box flexDirection="column" textAlign="center" justifyContent="center" gap="medium">
		<Headline tag="h2" size="h2" color="brand">Let's get started</Headline>
		<Text size="large" class="fragment" data-fragment-index="1">
			There are multiple ways to design in the browser, each with its own strengths.
		</Text>
	</Box>
	<Notes>
		<p>
			Now that we've covered why designing in the browser matters, let's talk
			about how you can actually get started. The good news is there are several
			approaches, and you can choose based on your comfort level and goals.
		</p>
	</Notes>
</Slide>
