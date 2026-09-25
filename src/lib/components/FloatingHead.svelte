<script>
  /*   import head from "$lib/assets/head.png"; */
  import { scale, fade } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { asset } from "$app/paths";
  import { resolve } from "$app/paths";
  import Icon from "./Icon.svelte";

  // 1. Declare state using the $state rune
  let scrollY = $state(0);

  // 2. Derive visibility automatically using the $derived rune
  let isVisible = $derived(scrollY > 100);

  let isClosed = $state(false);
</script>

<!-- Bind window scroll position -->
<svelte:window bind:scrollY />

{#if isVisible && !isClosed}
  <div
    class="floating-head"
    in:scale={{ duration: 400, start: 0.5, easing: backOut }}
    out:fade={{ duration: 200 }}
  >
    <img
      src={asset("/images/favicons/favicon-96x96.png")}
      alt="Juuso Luttinen"
    />
    <div class="anchor">
      <div class="floating-head__bubble">
        <span>
          Psst! Löydät yhteystietoni <a href={resolve("/contact")}>täältä</a>.
        </span>
      </div>
    </div>
    <button class="close-button" onclick={() => (isClosed = true)}
      ><Icon name="X" /></button
    >
  </div>
{/if}

<style>
  /*   @keyframes type {
    from {
      width: 0;
    }
  }
  .test {
    display: inline-block;
    width: 24ch;
    white-space: nowrap;
    overflow: hidden;
    animation: type 1s steps(24) forwards;
  } */

  .anchor {
    position: absolute;
/*     background-color: red; */
    left: 50%;
    transform: translateX(-50%);
    top: -.25rem;
  }
  .close-button {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: var(--colors-elevation-2);
    color: var(--colors-text);
    box-shadow: var(--shadows-xs);
    border: 2px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }
  .floating-head {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: clamp(3.5rem, 10vw, 5rem);
    aspect-ratio: 1 / 1;
    border: none;
    z-index: 1;

    img {
      height: 100%;
      background-position: center;
    }
  }

  .floating-head__bubble {
    position: absolute;
    padding: 0.5rem 1rem;
    color: var(--colors-text);
    border-radius: var(--border-radiuses-md);
    font-size: var(--font-sizes-xs);
    font-weight: var(--font-weights-medium);
    white-space: nowrap;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%);
    top: -2.5rem;
    left: -5.25rem;
    box-shadow: var(--shadows-xs);
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
      border: 2px solid
        color-mix(
          in oklch,
          var(--colors-elevation-2),
          var(--border-mix-shading) var(--border-strength-1)
        );
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
      bottom: -0.35rem;
      right: 1rem;
      height: .75rem;
      width: .75rem;
      transform: rotate(45deg);
      background-color: var(--colors-elevation-2);
      border-bottom: 2px solid
        color-mix(
          in oklch,
          var(--colors-elevation-2),
          var(--border-mix-shading) var(--border-strength-1)
        );
      border-right: 2px solid
        color-mix(
          in oklch,
          var(--colors-elevation-2),
          var(--border-mix-shading) var(--border-strength-1)
        );
      /*       box-shadow: var(--shadows-xs); */
      z-index: 2;
    }
  }
</style>
