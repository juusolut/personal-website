<!-- src/lib/components/Reveal.svelte -->
<script lang="ts">
  import { intersect } from '$lib/actions/intersect.svelte';
  import type { Snippet } from 'svelte';

  let {
    threshold = 0.2,
    children
  }: {
    threshold?: number;
    children: Snippet<[boolean]>
  } = $props();

  let isVisible = $state(false);
</script>

<div
  use:intersect={{
    threshold,
    onIntersect: (v) => (isVisible = v)
  }}
  class="reveal-on-scroll {isVisible ? 'is-visible' : ''}"
>
  <!-- Pass `isVisible` down to children snippet if needed -->
  {@render children(isVisible)}
</div>