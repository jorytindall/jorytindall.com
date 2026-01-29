<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Figma Workflow">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Where Figma fits in the workflow</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				Early exploration and ideation
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Stakeholder presentations and alignment
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Design documentation and handoff artifacts
			</Text>
		</ul>
		<Text size="medium" class="fragment" data-fragment-index="4">
			Figma is a powerful tool for certain stages of the design process, but it's not the only
			tool in your toolbox. Understanding where it fits best can help you leverage its
			strengths while avoiding its limitations.
		</Text>
	</Box>
	<Notes>
		<p>In a hybrid workflow, Figma excels at specific stages of the design process:</p>
		<ul>
			<li>
				Early exploration and ideation — when you need to quickly sketch out ideas and
				explore different directions without worrying about implementation details. Or even
				storyboarding or crazy eights if you're familiar with that practice.
			</li>
			<li>
				Stakeholder presentations and alignment — Figma's presentation features and easy
				sharing make it ideal for getting buy-in and feedback from non-technical
				stakeholders, especially early on in the process.
			</li>
			<li>
				Design documentation and handoff artifacts — creating specs, component
				documentation, and design system guidelines that need to be referenced by multiple
				teams.
			</li>
		</ul>
		<p>
			More importantly, you want to consider who is going to be using these artifacts. If
			somebody else is going to be using them, probably beneficial to use Figma for these
			stages. Use your best judgement based on the gravity of the change, project, audience,
			and version history.
		</p>
	</Notes>
</Slide>
