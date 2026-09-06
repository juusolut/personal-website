<!-- src/lib/components/Reveal.svelte -->
<script lang="ts">
  import { intersect } from "$lib/actions/intersect.svelte";
  import type { Snippet } from "svelte";

  let {
    threshold = 0.25,
    children,
  }: {
    threshold?: number;
    children: Snippet<[boolean]>;
  } = $props();

  let isVisible = $state(false);

  function handleIntersect(value: boolean) {
    if (!isVisible && value) {
      isVisible = true;
    }
  }
</script>

<div
  use:intersect={{
    threshold,
    onIntersect: (value) => handleIntersect(value),
  }}
  class="reveal-on-scroll {isVisible ? 'is-visible' : ''}"
>
  <!-- Pass `isVisible` down to children snippet if needed -->
  {@render children(isVisible)}
</div>
