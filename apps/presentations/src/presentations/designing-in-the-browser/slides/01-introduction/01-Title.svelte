<script>
	import CoverSlide from '../../../../components/CoverSlide.svelte';
	import Presenters from '../../../../components/Presenters.svelte';
</script>

<CoverSlide
	backgroundImage="./images/apex-cover.png"
	title="Designing in the Browser"
	subtitle="A realistic approach to realistic application design"
	hideHeader
>
	{#snippet notes()}
		<p>
			Hey everybody! My name is Jory Tindall I'm really excited to get
			into my APEX 2026 talk, "Designing in the Browser." I call this a
			realistic approach to realistic application design because I think a
			lot of the conversations around designing in the browser are
			somewhat unrealistic, I want to use this time to clarify some of the
			strategies that I use, where I think the industry is going, and
			introduce some practical methods that you can use in your own work.
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
