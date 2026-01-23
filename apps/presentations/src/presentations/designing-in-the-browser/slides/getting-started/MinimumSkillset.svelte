<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Working within the application</Headline>
		<Text size="large">
			The most powerful approach: design using the structures already in place.
		</Text>
		<ul>
			<li><Text tag="span" size="large">Design system components</Text></li>
			<li><Text tag="span" size="large">Local/application-specific components</Text></li>
			<li><Text tag="span" size="large">Existing patterns and conventions</Text></li>
			<li><Text tag="span" size="large">Running the application locally</Text></li>
		</ul>
	</Box>
	<Notes>
		<p>This is where the real power is. Instead of designing in isolation, you're designing within the actual application. You're using real design system components, real local components, following real patterns. You can run Terraform locally, use the existing structure, and see exactly how your design fits into the bigger picture.</p>
	</Notes>
</Slide>
