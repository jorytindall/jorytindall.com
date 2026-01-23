<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Starting points by comfort level</Headline>
		<ul>
			<li>
				<Text tag="span" size="large"><strong>Never touched code:</strong> Start with AI tools, focus on understanding output</Text>
			</li>
			<li>
				<Text tag="span" size="large"><strong>Know some HTML/CSS:</strong> Start modifying existing components, use AI to fill gaps</Text>
			</li>
			<li>
				<Text tag="span" size="large"><strong>Comfortable with code:</strong> Work directly in the application codebase</Text>
			</li>
		</ul>
	</Box>
	<Notes>
		<p>There's no single entry point. If you've never written code, AI tools can get you started — focus on understanding what they generate. If you know some HTML/CSS, start modifying existing components and use AI to help where you get stuck. If you're comfortable with code, dive straight into the application.</p>
	</Notes>
</Slide>
