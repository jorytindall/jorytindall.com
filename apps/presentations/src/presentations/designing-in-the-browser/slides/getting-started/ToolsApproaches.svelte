<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Multiple levels of fidelity</Headline>
		<ul>
			<li><Text tag="span" size="large"><strong>Hands-on:</strong> HTML, CSS, JavaScript directly</Text></li>
			<li><Text tag="span" size="large"><strong>AI-assisted:</strong> Tools like Claude, Cursor — helpful, but not great with design systems yet</Text></li>
			<li><Text tag="span" size="large"><strong>In-application:</strong> Working within your actual codebase and its patterns</Text></li>
		</ul>
	</Box>
	<Notes>
		<p>There's no single right approach. You can work directly with HTML/CSS/JS if you have that skillset. AI tools are helpful for scaffolding but struggle with design system constraints. The gold standard is working within your actual application — using the real components, the real patterns.</p>
	</Notes>
</Slide>
