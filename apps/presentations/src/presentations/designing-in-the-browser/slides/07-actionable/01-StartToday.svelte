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
				Open DevTools and inspect an element — understand how it's built
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Clone your team's repo and get the application running locally
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Find one small UI change and try to make it yourself
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="4">
				Use an AI tool to help you understand the code
			</Text>
		</ol>
	</Box>
	<Notes>
		<p>Here's my call-to-action for you. Don't leave here without a plan:</p>
		<ul>
			<li>
				First, start with browser DevTools — right-click any element and inspect it. This is
				the lowest barrier to entry and you can do it right now.
			</li>
			<li>
				Second, get the application running locally — ask an engineer to help you with the
				setup. This is where the real magic happens.
			</li>
			<li>
				Third, find one small UI change — a color, some spacing, a label — and try to make it
				yourself. Start small and build confidence.
			</li>
			<li>
				Fourth, use an AI tool like Claude or Cursor to help you understand what you're
				looking at. These tools are incredible for learning and getting unstuck.
			</li>
		</ul>
		<p>
			Remember the levels of entry we discussed: browser inspect tools, CodePen/demo apps, and
			running locally. Pick the level that feels right for you and start there.
		</p>
	</Notes>
</Slide>
