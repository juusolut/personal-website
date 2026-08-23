<script>
/*   import head from "$lib/assets/head.png"; */
  import { scale, fade } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { asset } from "$app/paths";
  import { resolve } from '$app/paths';

  // 1. Declare state using the $state rune
  let scrollY = $state(0);

  // 2. Derive visibility automatically using the $derived rune
  let isVisible = $derived(scrollY > 100);
</script>

<!-- Bind window scroll position -->
<svelte:window bind:scrollY />

{#if isVisible}
  <div
    class="floating-head"
    in:scale={{ duration: 400, start: 0.5, easing: backOut }}
    out:fade={{ duration: 200 }}
  >
    <img src={asset("/images/head.png")} alt="Juuso Luttinen" />
    <div class="floating-head__bubble">
      <span> Psst! Löydät yhteystietoni <a href={resolve("/contact")}>täältä</a>.</span>
    </div>
  </div>
{/if}

<style>
  .floating-head {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    border: none;
    background: none;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .floating-head__bubble {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    color: var(--colors-text);
    border-radius: var(--border-radiuses-md);
    font-size: var(--font-sizes-sm);
    font-weight: var(--font-weights-medium);
    white-space: nowrap;
    opacity: 1;
    transform: translate(-1rem, 0rem);
    box-shadow: var(--shadows-xs);
    z-index: 1;
    isolation: isolate;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: var(--colors-white);
      border-radius: inherit;
      z-index: 1;
    }

    > span {
      position: relative;
      z-index: 2;
    }

    &::before {
      content: "";
      position: absolute;
      top: 75%;
      right: 1rem;
      height: 1rem;
      width: 1rem;
      transform: rotate(45deg);
      background-color: var(--colors-white);
      box-shadow: var(--shadows-xs);
      z-index: 0;
    }
  }
</style>
