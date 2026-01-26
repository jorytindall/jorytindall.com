<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Why Design in the Browser" title="The Infinite Canvas Problem">
	<Box
		flexDirection="column"
		textAlign="left"
		justifyContent="start"
		gap="medium"
	>
		<Headline tag="h2" size="h3" color="brand"
			>The infinite canvas problem</Headline
		>
		<ul>
			<Text
				size="large"
				tag="li"
				class="fragment"
				data-fragment-index="1"
			>
				Figma's infinite canvas doesn't present a realistic experience.
				Your users don't have infinite space. They have viewports,
				scroll behavior, and real device constraints.
			</Text>
			<Text
				size="large"
				tag="li"
				class="fragment"
				data-fragment-index="3"
			>
				Designing in a vacuum of the infinite canvas creates a gap
				between your design and the reality of how it's experienced.
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="4"
			>
				<strong>Perspective really matters!</strong> The way you view Figma
				mockups on this canvas creates a perspective disconnect that can skew
				your design desicions.
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="5"
			>
				Elements might appear larger/smaller, spacing might feel
				different, hierarchy might be unclear, etc.
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="6"
				>Not to mention anything related to responsive design!</Text
			>
		</ul>
	</Box>
	<Notes>
		<p>Let's talk about "the infinite canvas problem" in Figma</p>
		<ul>
			<li>
				<strong>No realistic experience.</strong> Users have viewports, scroll
				behavior, and device constraints—not infinite space.
			</li>
			<li>
				<strong>Designing in a vacuum.</strong> Static mockups look great
				in Figma but often feel off when implemented. You lose the sense of
				flow and real interaction that you would get in the browser.
			</li>
			<li>
				<strong>Perspective disconnect.</strong> Zooming in/out skews your
				judgment on visual weight, hierarchy, and proportions.
			</li>
			<li>
				<strong>Your perception of scale shifts.</strong> Spacing and typography
				that look perfect zoomed out may feel wrong at actual size.
			</li>
			<li>
				<strong>Responsive design is hard to validate.</strong> Multiple artboards
				don't effectively capture the fluid nature of the web.
			</li>
		</ul>
	</Notes>
</Slide>
