<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Bigger Questions" title="Production Ready">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">"Can I ship production-ready work?"</Headline>
		<Text size="large" class="fragment" data-fragment-index="1">
			Probably not today. But the barriers are eroding.
		</Text>
		<Headline
			tag="h3"
			size="h4"
			color="brand"
			class="fragment"
			data-fragment-index="2"
			style="margin-top: 1rem;">What's in reach vs. what's not</Headline
		>
		<ul>
			<Text size="large" tag="li" class="fragment" data-fragment-index="3">
				<strong>In reach:</strong> UI design, presentational JavaScript, cleaning up legacy experiences
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="4">
				<strong>Further out:</strong> Complex APIs, databases, complex functional JavaScript
			</Text>
			<Text size="large" tag="li" class="fragment" data-fragment-index="5">
				Know what's achievable and focus there
			</Text>
		</ul>
	</Box>
	<Notes>
		<p>Can designers ship production-ready code today?</p>
		<ul>
			<li>
				Let's be realistic — in most scenarios, designers won't ship production code yet!
				Fortunately that isn't true in all scenarios, and as I've mentioned, the landscape
				is changing!
			</li>
			<li>There are organizational blockers, processes, ownership issues</li>
			<li>
				But these barriers are starting to erode for technically minded designers. My own
				experience is an example of this, where code that I've written is being used in
				applications of a (now) Fortune 100 company.
			</li>
		</ul>
		<p>What's realistically in reach for designers today? There's a spectrum here.</p>
		<ul>
			<li>
				In reach: UI development/engineering work, presentational JavaScript, cleaning up
				legacy experiences
			</li>
			<li>Further out: Complex APIs, database work, heavy functional JavaScript</li>
			<li>Know what's achievable and within your bounds, focus there</li>
		</ul>
	</Notes>
</Slide>
