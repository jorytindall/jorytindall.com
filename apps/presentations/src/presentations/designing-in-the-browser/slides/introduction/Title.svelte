<script>
	import CoverSlide from '../../../../components/CoverSlide.svelte';
	import Presenters from '../../../../components/Presenters.svelte';
</script>

<CoverSlide
	backgroundImage="./images/apex-cover.png"
	title="Designing in the Browser"
	subtitle="A realistic approach to realistic application development"
>
	{#snippet notes()}
		<p>
			Welcome everyone. Today we're going to talk about something that's
			been on my mind a lot lately - the relationship between design tools
			and the browser.
		</p>
	{/snippet}
	<Presenters
		color="inverse"
		presenters={[
			{
				name: 'Jory Tindall',
				image: './images/jory-square-avatar.png',
				website: 'https://jorytindall.com',
				role: 'Lead Designer, Closet Engineer, Helios Design System',
			},
		]}
	/>
</CoverSlide>
