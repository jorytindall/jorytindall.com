<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" justifyContent="start" textAlign="start">
		<h2>What is this talk about?</h2>
		<ul>
			<li class="fragment" data-fragment-index="1">
				Assessing the state of design tooling
			</li>
			<li class="fragment" data-fragment-index="2">
				Overview of the Document Object Model (DOM)
			</li>
			<li class="fragment" data-fragment-index="3">
				Parallels, overlap, and methods of communication
			</li>
		</ul>
	</Box>
	<Notes>So, what is this talk about?</Notes>
</Slide>
