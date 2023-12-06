<script>
	export let bgColor = 'var(--color-tertiary-50)';
	export let autoAnimate = false;
</script>

<section data-background-color={bgColor} data-auto-animate={autoAnimate}>
	<slot />
</section>
