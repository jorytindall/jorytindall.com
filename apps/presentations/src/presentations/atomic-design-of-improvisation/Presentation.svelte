<script>
	import Title from './slides/intro/Title.svelte';
	import Introduction from './slides/intro/Introduction.svelte';
	import MusicIntro from './slides/intro/MusicIntro.svelte';
	import Overview from './slides/intro/Overview.svelte';
	import OverviewItems from './slides/intro/OverviewItems.svelte';
	import NotPrepared from './slides/intro/NotPrepared.svelte';

	import AtomicDesignOverview from './slides/atomic-design/AtomicDesignOverview.svelte';

	import WhatIsImprovisation from './slides/improvisation/WhatIsImprovisation.svelte';
	import SharedLanguage from './slides/improvisation/SharedLanguage.svelte';
	import TheLick from './slides/improvisation/TheLick.svelte';

	import AtomicImprovisation from './slides/atomic-improvisation/AtomicImprovisation.svelte';
	import AtomicImprovCategories from './slides/atomic-improvisation/AtomicImprovCategories.svelte';
	import InPractice from './slides/atomic-improvisation/InPractice.svelte';
	import AssembleTheLick from './slides/atomic-improvisation/AssembleTheLick.svelte';

	import Conclusion from './slides/conclusion/Conclusion.svelte';
	import Goodbye from './slides/conclusion/Goodbye.svelte';
</script>

<!-- Intro -->
<Title />
<Introduction />
<MusicIntro />
<Overview />
<OverviewItems />
<NotPrepared />

<!--Atomic Design -->
<AtomicDesignOverview />

<!-- Improvisation -->
<WhatIsImprovisation />
<SharedLanguage />
<TheLick />

<!-- Atomic Improvisation -->
<AtomicImprovisation />
<AtomicImprovCategories />
<InPractice />
<AssembleTheLick />

<!-- Conclusion -->
<Conclusion />
<Goodbye />
