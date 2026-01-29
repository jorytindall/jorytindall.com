<script>
	import Slide from '../../../../components/Slide.svelte';
	import Box from '../../../../components/Box.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import Text from '../../../../components/Text.svelte';
	import Code from '../../../../components/Code.svelte';
	import Notes from '../../../../components/Notes.svelte';
</script>

<Slide section="Where Do Existing Tools Fit" title="Scenario: Form Field Width">
	<Box flexDirection="column" textAlign="left" justifyContent="start" gap="medium">
		<Headline tag="h2" size="h4" color="brand">Scenario: Form field width</Headline>
		<Text size="medium">
			The form's max-width isn't accounting for realistic input values. Instead of guessing in
			Figma, test with real data in your local environment.
		</Text>
		<Box class="fragment" data-fragment-index="1">
			<Code lang="css">
				{`.form-container {
  max-width: 480px; /* Accommodates long email addresses */
}

.input-field {
  width: 100%;
  min-width: 0; /* Prevents flex overflow */
}`}
			</Code>
		</Box>
	</Box>
	<Notes>
		<p>
			Forms are notoriously difficult to get right in static mockups. The width that looks
			good with placeholder text often breaks with real user input.
		</p>
		<ul>
			<li>Open your locally running application</li>
			<li>Enter realistic values: long email addresses, international phone numbers, full names</li>
			<li>Adjust the max-width until it accommodates real-world edge cases</li>
			<li>You're testing with actual browser rendering, not Figma's approximation</li>
		</ul>
		<p>
			This is design grounded in reality. You're not guessing what will fit—you're seeing it.
		</p>
	</Notes>
</Slide>
