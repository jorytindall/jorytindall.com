<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Honest Downsides" title="The Skill Gap">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">The skill gap is real</Headline>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="1">
				New skills for designers.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="2">
				Understanding web development basics is a real time investment.
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				Web development tooling and frameworks move quickly and are always evolving.
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
			Another self-plug, if you're interested in learning more about the overlap between
			design tooling and how the browser works, I have a whole course on the topic! (though, I
			regrettably don't know where that lives anymore with the IBM acquisition)
		</p>
	</Notes>
</Slide>
