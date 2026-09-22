<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Snippet } from "svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { outclick } from "$lib/actions/outclick.svelte";

  let { children }: { children?: Snippet } = $props();

  let isOpen = $state(false);

  let isAnimating = $state(false);

  function triggerAnimation() {
    isAnimating = true;
  }
  function handleAnimationEnd() {
    isAnimating = false; // Reset so it can be re-triggered on next press
  }

  $effect(() => {
    if (!isOpen) return;

    function handleScroll() {
      isOpen = false;
    }

    // { passive: true } improves scrolling performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<div class="menu-container" class:isOpen use:outclick={() => (isOpen = false)}>
  <button
    aria-label="Avaa asetusvalikko"
    onclick={() => {
      isOpen = !isOpen;
      isAnimating = true;
    }}
    class:isOpen
    onanimationend={handleAnimationEnd}
  >
    <div class="cross"></div>
    <div class="icon-wrapper" /* class:spin={isAnimating} */>
      <Icon name="Cog" size="1.25rem" />
    </div>
  </button>
  {#if isOpen}
    <div
      class="menu isOpen"
      /*     class:isOpen */
      in:fly={{ duration: 200, y: -5 }}
      out:fly={{ duration: 200, y: -5 }}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>

<style>
  @keyframes slowSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  .cross {
    pointer-events: none;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition:
      transform var(--anim-speed-slow) var(--anim-easing-circ),
      opacity var(--anim-speed-slow) linear;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 3px;
      height: 70%;
      background-color: var(--colors-text);
      left: 50%;
      top: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  /*
  cubic-bezier(0.25, 0.1, 0.25, 1) */

  .icon-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    transition:
      transform var(--anim-speed-slow) var(--anim-easing-circ),
      opacity var(--anim-speed-slow) linear;
    position: relative;
  }
  .menu-container {
    position: relative;
    display: block;
    z-index: 0;

    &.isOpen {
      .icon-wrapper {
        transform: rotate(180deg);
        opacity: 0;
      }
      .cross {
        opacity: 1;
        transform: rotate(180deg);
      }
    }
  }
  button {
    color: var(--colors-text);
    aspect-ratio: 1 / 1;
    height: 1.75rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    border-radius: var(--border-radiuses-sm);
    background: var(--colors-elevation-2);
    position: relative;
    z-index: 0;
    overflow: hidden;
    border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  button.isOpen {
    background: var(--colors-elevation-2);
    border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-5)
      );
    border-radius: var(--border-radiuses-sm);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-width: 0;
  }

  .menu {
    display: none;
    width: 100vw;
    max-width: 15rem;
    background-color: var(--colors-elevation-2);
    border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-5)
      );
    border-radius: var(--border-radiuses-sm);
    border-top-right-radius: 0;
    position: absolute;
    z-index: 9999;
    top: calc(100% - 2px);
    right: 0;
    z-index: -2;
    padding: 1rem;
    padding-bottom: 2rem;
    box-shadow: var(--shadows-sm);
  }

  .menu.isOpen {
    display: flex;
  }
</style>
