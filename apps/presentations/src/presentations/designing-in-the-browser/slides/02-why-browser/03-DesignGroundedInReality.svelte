<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Why Design in the Browser" title="Design Grounded in Reality">
	<Box
		flexDirection="column"
		textAlign="left"
		justifyContent="start"
		gap="medium"
	>
		<Headline tag="h2" size="h3" color="brand"
			>Design grounded in reality</Headline
		>
		<Text size="large" class="fragment" data-fragment-index="1">
			The browser doesn't let you cheat! It forces you to answer questions
			that Figma lets you defer.
		</Text>
		<ul class="fragment" data-fragment-index="2">
			<Text tag="li" size="large">How does this actually scroll?</Text>
			<Text tag="li" size="large"
				>What happens when content overflows?</Text
			>
			<Text tag="li" size="large"
				>How does this feel on different screen sizes?</Text
			>
			<Text tag="li" size="large"
				>Is this interaction actually usable?</Text
			>
			<Text tag="li" size="large"
				>Is there logical keyboard navigation?</Text
			>
			<Text tag="li" size="large">
				Does this work with a screen reader and other assistive
				technologies?
			</Text>
			<Text tag="li" size="large"
				>Is my design intent actually clear and achievable?</Text
			>
		</ul>
	</Box>
	<Notes>
		<p>
			A couple of additional notes around what "design grounded in
			reality" actually means. The browser doesn't let you cheat. It
			forces you to answer questions that Figma lets you defer.
		</p>
		<ul>
			<li>How does this actually scroll?</li>
			<li>What happens when content overflows?</li>
			<li>How does this feel on different viewport sizes?</li>
			<li>Is this interaction actually usable?</li>
			<li>Is there logical keyboard navigation?</li>
			<li>
				Does this work with a screen reader and other assistive
				technologies?
			</li>
			<li>Is my design intent actually clear and achievable?</li>
		</ul>
		<p>
			These questions have real answers in the browser — you can't just
			wave your hands
		</p>
	</Notes>
</Slide>
