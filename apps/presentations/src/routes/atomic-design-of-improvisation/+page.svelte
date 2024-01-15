<script>
	// Import Reveal styles
	import 'reveal.js/dist/reveal.css';
	// Import theme
	import '../../styles/theme.css';
	// Import CSS for plugins
	import 'reveal.js/plugin/highlight/monokai.css';

	import Reveal from 'reveal.js';
	import RevealNotes from 'reveal.js/plugin/notes/notes';
	import { onMount, tick } from 'svelte';
	import Presentation from '../../presentations/atomic-design-of-improvisation/Presentation.svelte';

	export let reveal;

	onMount(async () => {
		await tick();
		const deck = new Reveal(reveal);
		deck.initialize({
			// Transition style
			transition: 'fade',
			transitionSpeed: 'fast',
			plugins: [RevealNotes],
			// Use 1 based indexing for # links to match slide number (the default is 0)
			hashOneBasedIndex: false,
			// Add the current slide number to the URL hash so that reloading the page/copying the URL will return you to the same slide.
			hash: true,
			jumpToSlide: true,
			// Flags whether to include the current fragment in the URL, so that reloading brings you to the same fragment position.
			fragmentInURL: true,
			// Global override for autoplaying embedded media (video/audio/ifram)
			// - null: Media will only autoplay if data-autoplay is present
			// - true: All media will autoplay, regardless of individual setting
			// - false: No media will autoplay, regardless of individual setting,
			autoPlayMedia: null,
			// Hide the cursor if inactive
			hideInactiveCursor: true,
			// Time before the cursor is hidden in ms
			hideCursorTime: 5000, // 5 seconds
		});
	});
</script>

<svelte:head>
	<title>The Atomic Design of Jazz Improvisation</title>
</svelte:head>

<div class="reveal">
	<div class="slides">
		<Presentation />
	</div>
</div>
