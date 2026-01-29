<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="The Bigger Questions" title="Production Ready">
	<Box flexDirection="column" alignItems="center" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h3" color="brand">"Can I ship production-ready work?"</Headline>
		<Text size="large" class="fragment" data-fragment-index="1">
			Probably not today. But the barriers are eroding.
		</Text>
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
				But these barriers are starting to erode for technically minded designers, my own
				experience is an example of this, where code that I've written is being used in
				applications of a (now) Fortune 100 company.
			</li>
			<li>
				I can imagine a near future where designers ship production code that's been
				reviewed by experienced engineers, and quite frankly the faster we can get to
				implmentation around traditional design tools, the better.
			</li>
		</ul>
	</Notes>
</Slide>
