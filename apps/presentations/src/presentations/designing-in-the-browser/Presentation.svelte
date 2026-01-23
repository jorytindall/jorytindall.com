<script>
	// 01 - Introduction
	import Title from './slides/01-introduction/Title.svelte';
	import Hook from './slides/01-introduction/Hook.svelte';
	import About from './slides/01-introduction/About.svelte';
	import Overview from './slides/01-introduction/Overview.svelte';

	// 02 - Why design in the browser?
	import TheGap from './slides/02-why-browser/TheGap.svelte';
	import WhatYouGain from './slides/02-why-browser/WhatYouGain.svelte';
	import TheShift from './slides/02-why-browser/TheShift.svelte';

	// 03 - How to get started
	import LiveDemoIntro from './slides/03-getting-started/LiveDemoIntro.svelte';
	import ToolsApproaches from './slides/03-getting-started/ToolsApproaches.svelte';
	import MinimumSkillset from './slides/03-getting-started/MinimumSkillset.svelte';
	import StartingPoints from './slides/03-getting-started/StartingPoints.svelte';

	// 04 - The honest downsides
	import WhatsHarder from './slides/04-downsides/WhatsHarder.svelte';
	import WhereToolsWin from './slides/04-downsides/WhereToolsWin.svelte';
	import WhenNot from './slides/04-downsides/WhenNot.svelte';

	// 05 - Where do existing tools fit?
	import FigmaRole from './slides/05-existing-tools/FigmaRole.svelte';
	import FigmaMake from './slides/05-existing-tools/FigmaMake.svelte';
	import HybridWorkflow from './slides/05-existing-tools/HybridWorkflow.svelte';

	// 06 - The bigger questions
	import ProductionReady from './slides/06-bigger-questions/ProductionReady.svelte';
	import ProductionReadyNuance from './slides/06-bigger-questions/ProductionReadyNuance.svelte';
	import FigmaInvestment from './slides/06-bigger-questions/FigmaInvestment.svelte';
	import WhatIsProductDesigner from './slides/06-bigger-questions/WhatIsProductDesigner.svelte';
	import DesignerRefresh from './slides/06-bigger-questions/DesignerRefresh.svelte';

	// 07 - Actionable next steps
	import StartMonday from './slides/07-actionable/StartMonday.svelte';
	import Resources from './slides/07-actionable/Resources.svelte';

	// 08 - Conclusion
	import QA from './slides/08-conclusion/QA.svelte';
</script>

<!-- 01 - Introduction (1-2 min) -->
<Title />
<Hook />
<About />
<Overview />

<!-- 02 - Why Design in the Browser? (3-4 min) -->
<TheGap />
<WhatYouGain />
<TheShift />

<!-- 03 - How to Get Started (4-5 min) -->
<LiveDemoIntro />
<ToolsApproaches />
<MinimumSkillset />
<StartingPoints />

<!-- 04 - The Honest Downsides (2-3 min) -->
<WhatsHarder />
<WhereToolsWin />
<WhenNot />

<!-- 05 - Where Do Existing Tools Fit? (2-3 min) -->
<FigmaRole />
<FigmaMake />
<HybridWorkflow />

<!-- 06 - The Bigger Questions (3-4 min) -->
<ProductionReady />
<ProductionReadyNuance />
<FigmaInvestment />
<WhatIsProductDesigner />
<DesignerRefresh />

<!-- 07 - Start Monday: Actionable Next Steps (2 min) -->
<StartMonday />
<Resources />

<!-- 08 - Q&A (remaining time) -->
<QA />
