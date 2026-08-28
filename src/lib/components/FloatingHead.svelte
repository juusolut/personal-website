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
    bottom: 1rem;
    right: 1rem;
    width: 4rem;
    height: 4rem;
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
    right: -15%;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    color: var(--colors-text);
    border-radius: var(--border-radiuses-md);
    font-size: var(--font-sizes-xs);
    font-weight: var(--font-weights-medium);
    white-space: nowrap;
    opacity: 1;
    transform: translate(-1rem, 0rem);
    box-shadow: var(--shadows-xs-light);
    z-index: 1;
    isolation: isolate;

    a {
      color: var(--colors-primary);
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: var(--colors-elevation-2);
      border: 1px solid color-mix(in oklch, var(--colors-elevation-3), var(--border-mix-shading) var(--border-strength-2));
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
      top: 60%;
      right: 1rem;
      height: 1rem;
      width: 1rem;
      transform: rotate(45deg);
      background-color: var(--colors-elevation-2);
      border: 1px solid color-mix(in oklch, var(--colors-elevation-3), var(--border-mix-shading) var(--border-strength-2));
      box-shadow: var(--shadows-xs-light);
      z-index: 1;
    }
  }
</style>
