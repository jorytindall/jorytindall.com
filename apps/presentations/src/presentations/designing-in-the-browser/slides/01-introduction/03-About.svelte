<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Notes from '../../../../components/Notes.svelte';
	import Callout from '../../../../components/Callout.svelte';
	import Link from '../../../../components/Link.svelte';
</script>

<Slide section="Introduction" title="About Me">
	<Box flexDirection="column" gap="x-large" justifyContent="start">
		<Box
			flexDirection="column"
			textAlign="left"
			justifyContent="start"
			gap="medium"
		>
			<Headline tag="h2" size="h3" color="brand">About me</Headline>
			<ul>
				<Text
					size="large"
					tag="li"
					class="fragment"
					data-fragment-index="1"
				>
					Lead Product Designer on the Helios Design System
				</Text>
				<Text
					size="large"
					tag="li"
					class="fragment"
					data-fragment-index="2">"Part time engineer"</Text
				>
				<Text
					size="large"
					tag="li"
					class="fragment"
					data-fragment-index="3">Based in Seattle, WA</Text
				>
				<Text
					size="large"
					tag="li"
					class="fragment"
					data-fragment-index="4">Saxophonist and musician</Text
				>
			</ul>
		</Box>
		<Callout color="primary" class="fragment" data-fragment-index="5">
			<Box
				flexDirection="column"
				gap="small"
				justifyContent="start"
				alignItems="start"
			>
				<Headline size="h5" color="brand" tag="h3">
					💅 Fun fact
				</Headline>
				<Text size="small" tag="p">
					This presentation was designed and built entirely in the
					browser using a web application that I've built using
					Svelte! You can check it out at <Link
						color="brand"
						href="https://presentations.jorytindall.com/designing-in-the-browser"
						>https://presentations.jorytindall.com/designing-in-the-browser</Link
					>.
				</Text>
			</Box>
		</Callout>
	</Box>
	<Notes>
		<p>
			Many of you already know me from Slack, or the various memes that I
			circulate through our channels. But if this is your first time
			seeing me, let me introduce myself.
		</p>
		<ul>
			<li>
				I'm a lead product designer on the Helios Design System,
				HashiCorp's enterprise design system (currently in the process
				of smoothing the transition over to IBM's Carbon design system).
			</li>
			<li>
				I say "part time" engineer because while my technical job title
				is Product Designer, many of the projects I work on bridge the
				gap between design and engineering. You might also call this
				role a "design technologist" or "design engineer."
			</li>
			<li>I'm based in the Seattle, Washington, in the USA.</li>
			<li>
				I'm also a saxophonist and musician in the local music scene
				here in the Pacific Northwest.
			</li>
		</ul>
		<p>
			An interesting note about this presentation is that is was designed
			and written entirely in the browser and runs as a Svelte
			application. It's a pretty cool Svelte app built with Reveal.js to
			handle the slide deck functionality, but that's a conversation for a
			different presentation!
		</p>
	</Notes>
</Slide>
