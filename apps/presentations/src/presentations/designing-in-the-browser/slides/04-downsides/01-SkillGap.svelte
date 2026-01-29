<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Honest Downsides" title="The Skill Gap">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The skill gap is real...</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				New skills for designers.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Understanding web development basics is a real time investment.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Web development tooling and frameworks move quickly.
			</Text>
		</ul>
		<Headline
			tag="h3"
			size="h4"
			color="brand"
			class="fragment"
			data-fragment-index="4"
			style="margin-top: 1rem;">...but it's attainable</Headline
		>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="5">
				The basics of web development aren't outrageously challenging.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="6">
				You don't need to become a senior engineer.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="7">
				Start small, build gradually, and use AI tools to help fill the gaps.
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			Let's be honest about some of the challenges of designing within the browser. The skill
			gap is real.
		</p>
		<ul>
			<li>These are new skills that aren't part of a typical designer's job description</li>
			<li>
				Learning how the browser works, understanding web dev basics, efficient workflows —
				it's a real investment.
			</li>
			<li>
				The web development space moves so quickly that if you're focused on design most of
				the time, it can be hard to keep up
			</li>
		</ul>
		<p>
			That said, I don't want to leave you with the impression that these challenges are
			insurmountable.
		</p>
		<ul>
			<li>
				The basics of web development aren't outrageously challenging. A rudimentary
				understanding HTML and CSS can be picked up relatively quickly and can be really
				helpful at understanding the implementation phase of your design.
			</li>
			<li>
				You don't need to become a senior engineer. Many of the basics of building a UI are
				attainable with some effort and practice.
			</li>
			<li>
				Start small, build gradually, and use AI tools to help fill the gaps. But I can't
				stress enough the importance of understanding and contextualizing what a tool like
				Copilot or Claude Code generates.
			</li>
		</ul>
	</Notes>
</Slide>
