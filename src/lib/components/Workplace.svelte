<script lang="ts">
  let {
    workplace,
    jobTitle,
    tasks,
    timePeriod,
    currentJob = false,
    offsetLeft = "2rem",
  }: {
    workplace: string;
    jobTitle: string;
    tasks: string[];
    timePeriod: string[];
    currentJob?: boolean;
    offsetLeft?: string;
  } = $props();
</script>

<li
  class="workplace"
  class:isHighlighted={currentJob}
  style="--offset-left: {offsetLeft};"
>
  {#if currentJob}
    <span class="current-job">Nykyinen työpaikka</span>
  {/if}
  <strong>{workplace}</strong><br />
  <i>{jobTitle}</i>
  <ul class="workplace-details">
    {#each tasks as task}
      <li>{task}</li>
    {/each}
  </ul>
</li>

<style>
  .workplace {
    padding: 2rem 2rem;
    margin-left: var(--offset-left);
    position: relative;
    font-size: var(--font-sizes-sm);
    width: fit-content;
    background-color: var(--colors-elevation-2);
    box-shadow: var(--shadows-xs);
    border-radius: var(--border-radiuses-sm);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    line-height: 1.5em;

    &.isHighlighted {
      border-color: var(--colors-secondary);
      border-width: 2px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(0px);
      width: var(--offset-left);
      height: 2px;
      background-color: var(--colors-secondary);
      right: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(0px);
      width: 1rem;
      height: 1rem;
      background-color: var(--colors-secondary);
      right: calc(100% - 0.5rem);
      border-radius: 100%;
    }
  }

  .workplace-details {
    margin: 0;
    padding: 0;
    > li {
      margin-left: 1rem;
    }
  }

  .current-job {
    position: absolute;
    bottom: 100%;
    left: -2px;
    width: calc(100% + 4px);
    background-color: var(--colors-secondary);
    padding: 0.5rem;
    border: 2px solid var(--colors-secondary);
    border-top-left-radius: var(--border-radiuses-sm);
    border-top-right-radius: var(--border-radiuses-sm);
    /*     text-transform: uppercase; */
    font-weight: var(--font-weights-bold);
    font-size: var(--font-sizes-sm);
    text-align: center;
    color: color-mix(in oklab, var(--colors-text) 97%, var(--colors-secondary));
  }
</style>
