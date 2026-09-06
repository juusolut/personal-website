<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Snippet } from "svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { outclick } from '$lib/actions/outclick.svelte';

  let { children }: { children?: Snippet } = $props();

  let isOpen = $state(false);
</script>

<div class="menu-container" class:isOpen use:outclick={() => (isOpen = false)}>
  <button
    aria-label="Avaa asetusvalikko"
    onclick={() => (isOpen = !isOpen)}
    class:isOpen
  >
    <Icon name="Cog" />
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
  .menu-container {
    position: relative;
    display: block;
    z-index: 0;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.25rem;
    aspect-ratio: 1 / 1;
    background: transparent;
    color: var(--colors-text);
    z-index: 0;
    border-color: transparent;
  }

  button.isOpen {
    background: var(--colors-elevation-2);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-radius: var(--border-radiuses-sm);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: transparent;
  }

  .menu {
    display: none;
    width: 100vw;
    max-width: 15rem;
    background-color: var(--colors-elevation-2);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-radius: var(--border-radiuses-sm);
    border-top-right-radius: 0;
    position: absolute;
    z-index: 9999;
    top: calc(100% - 1px);
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
