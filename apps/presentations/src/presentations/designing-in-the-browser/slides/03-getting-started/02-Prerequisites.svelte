<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
	import Callout from '../../../../components/Callout.svelte';
</script>

<Slide section="Getting Started" title="Prerequisites">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Prerequisites</Headline>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1">
				<strong>Basic HTML/CSS understanding</strong> — you don't need to be an expert, but knowing
				the fundamentals helps
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2">
				<strong>Familiarity with browser DevTools</strong> — the inspect panel is your best friend
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3">
				<strong>Curiosity and willingness to experiment</strong> — you'll learn by doing, and
				that means breaking things sometimes
			</Text>
		</ul>
		<Callout color="brand" class="fragment" data-fragment-index="4">
			<Text size="medium" tag="p">
				🎷 Don't worry if you're not an expert in these areas. I have a degree in the jazz
				saxophone!
			</Text>
		</Callout>
	</Box>
	<Notes>
		<p>Before diving in, here are some prerequisites that can be helpful to have:</p>
		<ul>
			<li>
				A basic understanding of HTML and CSS — you don't need to be a frontend engineer,
				but knowing how elements are structured and styled makes everything easier. If you
				don't have any experience here, we're lucky to have some great corporate resources
				through IBM and O'Reilly that can help you get up to speed.
			</li>
			<li>
				Some familiarity with browser DevTools — the inspect panel is an excellent tool, so
				getting comfortable with it is essential.
			</li>
			<li>
				A willingness to experiment — you're going to break things, and that's okay. That's
				how you learn what works and what doesn't.
			</li>
		</ul>
		<p>
			Fun fact about me: I have a degree in the jazz saxophone, which in no way equates to a
			design/front-end development skillset. But I'm a curious person and brought these skills
			into my arsenal through much trial and error, breaking things, and creating really
			terrible websites.
		</p>
	</Notes>
</Slide>
