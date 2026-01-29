<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Why Design in the Browser" title="Benefits">
	<Box
		flexDirection="column"
		textAlign="left"
		justifyContent="start"
		gap="medium"
	>
		<Headline tag="h2" size="h3" color="brand">What you gain</Headline>
		<ul>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="1"
			>
				<strong>Realistic experience</strong> — you see more or less exactly
				what users will experience.
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="2"
			>
				<strong>Faster iteration</strong> — working with many frames in Figma
				can sometimes be slow and clunky; in the browser, you can iterate
				quickly on small design and experience elements.
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="3"
			>
				<strong>Avoid accessibility pitfalls</strong> — catch issues early
				with real DOM structure, focus management, and screen reader testing
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="4"
			>
				<strong>Content design and reflow</strong> — content reflows within
				the viewport, giving you a better sense of copy length and complexity
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="5"
			>
				<strong>Grounded interaction design</strong> — real hover states,
				real transitions, real feedback
			</Text>
			<Text
				tag="li"
				size="large"
				class="fragment"
				data-fragment-index="6"
			>
				<strong>Reduced time-to-value</strong> — by eliminating the mockup-to-code
				translation step, features reach users faster with fewer rounds of revision
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			So what benefits do you actually gain when you design in the
			browser?
		</p>
		<ul>
			<li>
				When you design in the browser, you're working with reality; you
				see exactly what users will experience
			</li>
			<li>
				Faster iteration - working with many frames in Figma can
				sometimes be slow and clunky; in the browser, you can iterate
				quickly on small design and experience elements.
			</li>
			<li>
				You can avoid accessibility pitfalls early — working in the real
				DOM means you can test focus management, screen reader behavior,
				and keyboard navigation as you design rather than discovering
				issues after implementation.
			</li>
			<li>
				Content design and reflow — content will reflow within the
				viewport, giving you a better idea of the exact length and
				perceived complexity of micro copy and long-form content.
			</li>
			<li>
				(and this is the most important) Your design is grounded in
				what's actually possible — real hover states, real transitions,
				real system feedback having this level of grounded/realistic
				design from the beginning makes a huge difference when handing
				off and capturing the unique aspects of a design to an engineer.
			</li>
			<li>
				When you're working directly in the medium that ships, you're cutting
				out a translation step. This means faster iteration cycles, fewer
				misunderstandings between design and engineering, and ultimately
				features reaching users sooner.
			</li>
		</ul>
	</Notes>
</Slide>
