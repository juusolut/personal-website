<script lang="ts">
  import Icon from "./Icon.svelte";

  interface DataType {
    title: string;
    content: string;
  }

  const { data }: { data?: DataType[] } = $props();
</script>

{#if data}
  <details>
    <summary
      ><span>TIIVISTELMÄ</span><Icon name="ChevronDown" size="1rem" /></summary
    >
    <div class="content">
      {#each data as item}
        <div class="content-item">
          <b>{item.title}</b>
          <span>{@html item.content}</span>
        </div>
      {/each}
    </div>
  </details>
{/if}

<style>
  .content-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > b {
      min-width: 8rem;
      font-family: var(--fonts-ibm-plex-mono);
      &::before {
        content: "»";
        color: var(--colors-secondary);
        margin-right: 0.5em;
      }
    }
  }
  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    container-type: inline-size;
  }
  summary {
    padding: 1rem;
    user-select: none;
    cursor: pointer;
    font-size: var(--font-sizes-xs);
    font-weight: var(--font-weights-bolder);
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :global(.icon) {
    transform: rotate(0deg);
    transition: transform var(--anim-speed-medium) var(--anim-easing-circ);
  }

  /* Hide default native arrow in WebKit/Safari */

  details {
    width: 100%;
    max-width: var(--text-max-width);
    /*     padding: 1rem; */
    background-color: var(--colors-elevation-4);
    border-radius: var(--border-radiuses-md);
    margin: 1rem 0;
    /*     border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      ); */
    interpolate-size: allow-keywords;
    overflow: hidden;
    &::details-content {
      transition:
        content-visibility var(--anim-speed-slow) allow-discrete,
        height var(--anim-speed-slow) var(--anim-easing-circ);
      height: 0;
    }

    &[open]::details-content {
      height: auto;
    }

    &[open] :global(.icon) {
      transform: rotate(180deg);
    }
  }
</style>
