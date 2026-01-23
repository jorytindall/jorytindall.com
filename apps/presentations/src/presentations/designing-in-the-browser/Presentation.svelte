<script>
	// Introduction
	import Title from './slides/introduction/Title.svelte';
	import Hook from './slides/introduction/Hook.svelte';
	import About from './slides/introduction/About.svelte';
	import Overview from './slides/introduction/Overview.svelte';

	// Why design in the browser?
	import TheGap from './slides/why-browser/TheGap.svelte';
	import WhatYouGain from './slides/why-browser/WhatYouGain.svelte';
	import TheShift from './slides/why-browser/TheShift.svelte';

	// How to get started
	import LiveDemoIntro from './slides/getting-started/LiveDemoIntro.svelte';
	import ToolsApproaches from './slides/getting-started/ToolsApproaches.svelte';
	import MinimumSkillset from './slides/getting-started/MinimumSkillset.svelte';
	import StartingPoints from './slides/getting-started/StartingPoints.svelte';

	// The honest downsides
	import WhatsHarder from './slides/downsides/WhatsHarder.svelte';
	import WhereToolsWin from './slides/downsides/WhereToolsWin.svelte';
	import WhenNot from './slides/downsides/WhenNot.svelte';

	// Where do existing tools fit?
	import FigmaRole from './slides/existing-tools/FigmaRole.svelte';
	import FigmaMake from './slides/existing-tools/FigmaMake.svelte';
	import HybridWorkflow from './slides/existing-tools/HybridWorkflow.svelte';

	// The bigger questions
	import ProductionReady from './slides/bigger-questions/ProductionReady.svelte';
	import ProductionReadyNuance from './slides/bigger-questions/ProductionReadyNuance.svelte';
	import FigmaInvestment from './slides/bigger-questions/FigmaInvestment.svelte';
	import WhatIsProductDesigner from './slides/bigger-questions/WhatIsProductDesigner.svelte';
	import DesignerRefresh from './slides/bigger-questions/DesignerRefresh.svelte';

	// Actionable next steps
	import StartMonday from './slides/actionable/StartMonday.svelte';
	import Resources from './slides/actionable/Resources.svelte';

	// Conclusion
	import QA from './slides/conclusion/QA.svelte';
</script>

<!-- Introduction (1-2 min) -->
<Title />
<Hook />
<About />
<Overview />

<!-- Why Design in the Browser? (3-4 min) -->
<TheGap />
<WhatYouGain />
<TheShift />

<!-- How to Get Started (4-5 min) -->
<LiveDemoIntro />
<ToolsApproaches />
<MinimumSkillset />
<StartingPoints />

<!-- The Honest Downsides (2-3 min) -->
<WhatsHarder />
<WhereToolsWin />
<WhenNot />

<!-- Where Do Existing Tools Fit? (2-3 min) -->
<FigmaRole />
<FigmaMake />
<HybridWorkflow />

<!-- The Bigger Questions (3-4 min) -->
<ProductionReady />
<ProductionReadyNuance />
<FigmaInvestment />
<WhatIsProductDesigner />
<DesignerRefresh />

<!-- Start Monday: Actionable Next Steps (2 min) -->
<StartMonday />
<Resources />

<!-- Q&A (remaining time) -->
<QA />
