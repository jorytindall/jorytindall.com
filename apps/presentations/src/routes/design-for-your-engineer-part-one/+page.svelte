<script>
	// import 'reveal.js/dist/reveal.css';
	import '../../../node_modules/reveal.js/dist/reveal.css';

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
