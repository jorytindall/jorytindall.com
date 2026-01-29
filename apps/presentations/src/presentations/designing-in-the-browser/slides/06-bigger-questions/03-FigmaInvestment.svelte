<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Bigger Questions" title="Figma Investment">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">"Did I waste years learning Figma?"</Headline>
		<ul>
			<Text tag="li" size="large" class="fragment" data-fragment-index="1"
				>No. But the landscape is shifting.</Text
			>
			<Text tag="li" size="large" class="fragment" data-fragment-index="2"
				>Figma skills got you here. Browser skills will take you further.</Text
			>
			<Text tag="li" size="large" class="fragment" data-fragment-index="3"
				>There are a lot of transferable skills
			</Text>
			<Text tag="li" size="large" class="fragment" data-fragment-index="4"
				>Designers who can work in both worlds will have an advantage</Text
			>
		</ul>
	</Box>
	<Notes>
		<p>"Hey Jory! Did I waste years learning Figma?"</p>
		<ul>
			<li>Absolutely not, but the landscape is shifting.</li>
			<li>Figma is still necessary for the job today</li>
			<li>
				Those skills — understanding layout, hierarchy, systems thinking — transfer directly
			</li>
			<li>
				But the landscape is shifting — designers who can work in both worlds will have an
				advantage
			</li>
		</ul>
	</Notes>
</Slide>
