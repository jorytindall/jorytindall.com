<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		trim = true,
		noescape = false,
		lineNumbers = false,
		lineStartFrom = undefined,
		lang = undefined,
		children
	}: {
		trim?: boolean;
		noescape?: boolean;
		lineNumbers?: boolean;
		lineStartFrom?: number;
		lang?: string;
		children?: Snippet;
	} = $props();
</script>

<pre><code
		class={lang ? `language-${lang}` : undefined}
		data-trim={trim}
		data-noescape={noescape}
		data-line-numbers={lineNumbers}
		data-ln-start-from={lineStartFrom}>{#if children}{@render children()}{/if}</code
	></pre>
