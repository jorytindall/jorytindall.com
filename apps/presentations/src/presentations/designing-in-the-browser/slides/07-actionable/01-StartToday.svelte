<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Actionable Next Steps" title="Start Today">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Start today</Headline>
		<ol>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				Clone your team's repo and run the application locally
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Find one small UI change and try to make it yourself
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Use an AI tool to help you understand the code
			</Text>
		</ol>
	</Box>
	<Notes>
		<ul>
			<li>Don't leave here without a plan</li>
			<li>First, get the application running locally — ask an engineer to help you</li>
			<li>Second, find one small UI change — a color, some spacing, a label — and try to make it yourself</li>
			<li>Third, use an AI tool like Claude or Cursor to help you understand what you're looking at</li>
			<li>Start small</li>
		</ul>
	</Notes>
</Slide>
