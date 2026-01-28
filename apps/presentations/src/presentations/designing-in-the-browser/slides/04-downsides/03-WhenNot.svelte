<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Honest Downsides" title="Attainable Skills">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Attainable addition to your skillset</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				The basics of web development aren't outrageously challenging.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				You don't need to become a senior engineer.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Start small, build gradually, and use AI tools to help fill the gaps.
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			That said, I don't want to leave you with the impression that these challenges are
			insurmountable.
		</p>
		<ul>
			<li>
				The basics of web development aren't outrageously challenging. A rudimentary
				understanding HTML and CSS can be picked up relatively quickly and can be really
				helpful at understanding the implementation phase of your design and discussing your
				design vision in a context and language that matters to engineers.
			</li>
			<li>
				You don't need to become a senior engineer. Many of the basics of building a UI are
				attainable with some effort and practice.
			</li>
			<li>
				Start small, build gradually, and use AI tools to help fill the gaps. But I can't
				stress enough the importance of understanding and contextualizing what a tool like
				Copilot or Claude Code generates. Use this as a learning tool itself.
			</li>
		</ul>
	</Notes>
</Slide>
