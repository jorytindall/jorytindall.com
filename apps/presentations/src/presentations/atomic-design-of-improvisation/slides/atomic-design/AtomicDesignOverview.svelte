<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box textAlign="center" alignItems="center">
		<h2>What is Atomic Design?</h2>
		<img
			src="/images/atomic-design-categories.png"
			alt="Categories of Atomic Design"
		/>
		<p>
			<em
				><a href="https://bradfrost.com/blog/post/atomic-web-design/"
					>Reference for those interested.</a
				></em
			>
		</p>
	</Box>
	<Notes>
		Atomic Design is a concept and design methodology (envisioned originally
		by Brad Frost) that we should all be familiar with, but here's a brief
		overview to make sure we're on the same page.
		<ul>
			<li>
				Cells: the lowest level primitive in Atomic design (colors, type
				ramp, spacing)
			</li>
			<li>
				Molecules: built upon cells, more at the component level
				(buttons, badges, simple components)
			</li>
			<li>Organisms: combinations of multiple molecules</li>
			<li>Templates</li>
			<li>Pages</li>
		</ul>
	</Notes>
</Slide>
