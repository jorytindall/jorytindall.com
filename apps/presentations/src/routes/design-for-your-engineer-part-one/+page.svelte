<script>
	// Import Reveal styles
	import 'reveal.js/dist/reveal.css';
	// Import theme
	import '../../styles/theme.css';
	// Import CSS for plugins
	import 'reveal.js/plugin/highlight/monokai.css';

	import Reveal from 'reveal.js';
	import { onMount, tick } from 'svelte';
	import Presentation from '../../pres/design-for-your-engineer-part-one/Presentation.svelte';

	export let reveal;

	onMount(async () => {
		await tick();
		const deck = new Reveal(reveal);
		deck.initialize();
	});
</script>

<svelte:head>
	<title>Design For Your Engineer: Part I</title>
</svelte:head>

<div class="reveal">
	<div class="slides">
		<Presentation />
	</div>
</div>
