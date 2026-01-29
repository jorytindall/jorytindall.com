<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
	import Callout from '../../../../components/Callout.svelte';
	import TableOfContents from '../../../../components/TableOfContents.svelte';

	const tocItems = [
		{ emoji: '🤨', title: 'What/Why design in the browser?', slideIndex: 4 },
		{ emoji: '🛠️', title: 'How to get started', slideIndex: 7 },
		{ emoji: '👎', title: 'The honest downsides', slideIndex: 11 },
		{ emoji: '🧑‍💻', title: 'Where existing tools fit', slideIndex: 14 },
		{ emoji: '🤔', title: 'The bigger questions', slideIndex: 22 },
		{ emoji: '🚀', title: 'Actionable next steps', slideIndex: 27 }
	];
</script>

<Slide section="Introduction" title="Overview">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="x-large">
		<Headline tag="h2" size="h3" color="brand">What we'll cover</Headline>
		<TableOfContents items={tocItems} />
		<Callout color="warning" class="fragment" data-fragment-index="1">
			<Box flexDirection="column" gap="medium" justifyContent="start" alignItems="start">
				<Headline tag="h3" size="h5">🙋 Note on questions</Headline>
				<Text size="x-small" tag="p">
					I'll leave time at the end for questions, otherwise feel free to drop anything
					in the APEX Slack channel (#apex2026) and I'll follow-up after this session.
				</Text>
			</Box>
		</Callout>
	</Box>
	<Notes>
		<p>Here's a high-level outline of our agenda for today:</p>
		<ul>
			<li>
				We'll start with what I mean when I say "design in the browser" and why it matters.
			</li>
			<li>
				Then we'll explore how to get started with designing in the browser effectively.
			</li>
			<li>Next, we'll discuss the honest downsides and challenges of this approach.</li>
			<li>We'll also look at where existing design tools fit into this workflow.</li>
			<li>
				Then we'll wrap up with some of the bigger questions around this process and some
				actionable next steps.
			</li>
		</ul>
		<p>
			I'll leave a bit of time at the end for questions, otherwise feel free to drop anything
			in the APEX Slack channel and I'll follow-up after this session.
		</p>
	</Notes>
</Slide>
