<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Getting Started" title="Levels of Entry">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">Different levels of entry</Headline>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1">
				<strong>Browser inspect tools</strong> — great for quick tweaks, refining details on the
				fly, or iterating with an engineer in real-time
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2">
				<strong>CodePen or demo apps</strong> — ideal for exploration, iterating on small patterns,
				or testing ideas in isolation
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3">
				<strong>Running the app locally</strong> — best for mapping out UX, testing large layouts,
				pushing boundaries, or updating legacy designs
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>
			There are different levels at which you can start designing in the browser, each serving
			a different purpose and being suited for different parts of the design process and
			development lifecycle:
		</p>
		<ul>
			<li>
				<strong>Browser inspect tools:</strong> Perfect for quick adjustments and refinements
				or identifying exactly what type of design language is used in a specific element (the
				CSS styles applied to an element). This is especially useful when you're working with
				an engineer on a call — you can tweak values live and see changes immediately.
			</li>
			<li>
				<strong>CodePen or demo apps:</strong> Great for exploration and experimentation. When
				you want to iterate on a small pattern or component without the overhead of a full application.
			</li>
			<li>
				<strong>Running the app that your working on locally:</strong> This is where you get the
				full picture. You can map out complete UX flows, test responsive layouts at scale, explore
				what's actually possible with real design system components or application-specific patterns.
				This level is also ideal for updating and modernizing existing designs through an iterative
				process.
			</li>
		</ul>
	</Notes>
</Slide>
