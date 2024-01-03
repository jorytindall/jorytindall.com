<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide>
	<Box>
		<h2>I'm also a musician!</h2>
		<ul>
			<li class="fragment" data-fragment-index="1">
				I play the saxophone, flute, and clarinet professionally, and
				handful of other instruments in various capacities.
			</li>
			<li class="fragment" data-fragment-index="2">
				I've played with some artists that you probably know: The
				Temptations (twice!), Johnny Mathis, Liv Warfield, The OJ's,
				Kamasi Washington, and many others!
			</li>
			<li class="fragment" data-fragment-index="3">
				I have an album coming out later this year of all original
				music, stay tuned!
			</li>
		</ul>
	</Box>
	<Notes>
		<ul>
			<li>
				I'm also a musician! You may know this from me shamelessly
				plugging what gigs I have coming up, etc.
			</li>
		</ul>
	</Notes>
</Slide>
