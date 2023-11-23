<script>
	import Slide from '../../../lib/Slide.svelte';
	import Box from '../../../components/Box.svelte';
	import Notes from '../../../components/Notes.svelte';
</script>

<Slide>
	<Box flexDirection="column" justifyContent="start" textAlign="left">
		<h2>What is the DOM?</h2>
		<p>
			<strong>Document Object Model (DOM):</strong> the data
			representation of the objects that comprise the structure and
			content of a document on the web. (<a
				href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
				>Source</a
			>)
		</p>
		<ul>
			<li class="fragment" data-fragment-index="1">
				The logical semantic tree structure of an HTML document
			</li>
			<li class="fragment" data-fragment-index="2">
				Can be styled to change the visual appearance
			</li>
			<li class="fragment" data-fragment-index="3">
				Can be used with JavaScript to add interactivity
			</li>
		</ul>
	</Box>
	<Notes>
		When we're in the world of single page applications and JavaScript
		frameworks things can get a bit complicated, but that's a story for
		another day.
	</Notes>
</Slide>
