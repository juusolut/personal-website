<script lang="ts">
  let {
    workplace,
    jobTitle,
    tasks,
    timePeriods,
    currentJob = false,
    offsetLeft = "2rem",
  }: {
    workplace: string;
    jobTitle: string;
    tasks: string[];
    timePeriods: string[];
    currentJob?: boolean;
    offsetLeft?: string;
  } = $props();

  const parsedPeriods = $derived(
    timePeriods.map((period) => {
      const parts = period.split(" – ");
      return {
        start: parts[0] ?? period,
        end: parts[1] ?? null,
      };
    }),
  );
</script>

<li
  class="workplace"
  class:isHighlighted={currentJob}
  /*   style="--offset-left: {offsetLeft};" */
>
  {#if currentJob}
    <span class="current-job">Nykyinen työpaikka</span>
  {/if}
  <div class="left">
    <strong>{workplace}</strong><br />
    <i>{jobTitle}</i>
    <ul class="workplace-details">
      {#each tasks as task}
        <li>{task}</li>
      {/each}
    </ul>
  </div>
  <ul class="right time-periods">
    {#each parsedPeriods as { start, end }}
      <li class="period-row">
        <time class="date start">{start}</time>
        {#if end}
          <span class="dash">–</span>
          <time class="date end">{end}</time>
        {:else if currentJob}
          <span class="dash">–</span>
          <span class="present">Nykyhetki</span>
        {/if}
      </li>
    {/each}
  </ul>
</li>

<style>
  .workplace {
    --offset-left: 1.5rem;

    padding: 1rem 2rem;
    /*     min-width: 30rem; */
    margin-left: var(--offset-left);
    /*     margin-left: 2rem; */
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
    display: flex;
    flex-direction: column;
    gap: 0rem;
    width: calc(100% - var(--offset-left) - 1rem);
    max-width: 40rem;
    justify-content: space-between;
    /*     align-items: center; */

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
      /*       width: 2rem; */
      height: 2px;
      background-color: var(--colors-secondary);
      right: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(0px);
      width: 12px;
      height: 12px;
      background-color: var(--colors-secondary);
      right: calc(100% - 5px);
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

  .left {
    max-width: 20rem;
  }

  .right {
    margin: 0;
    padding: 0;
    list-style-type: none;

    > li {
      white-space: nowrap;
    }
  }

  .time-periods {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 1rem;
  }

  .period-row {
    display: grid;
    /* Columns: [Start Date] [Dash] [End Date/Present] */
    grid-template-columns: minmax(min-content, 2rem) 1rem 1fr;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;

    /* Key for date alignment: forces 0-9 to take equal width */
    font-variant-numeric: tabular-nums;
    font-size: var(--font-sizes-xs);
    color: var(--colors-text-light);
    font-weight: var(--font-weights-bold);
  }

  .date.start {
    text-align: left; /* Lines up start dates flush against the dash */
  }

  .date.end,
  .present {
    text-align: left; /* Lines up end dates outward */
  }

  .dash {
    color: var(--colors-secondary);
    text-align: center;
  }

  @container (width > 50rem) {
    .workplace {
      --offset-left: 4rem;
    }
  }

  @container (width > 40rem) {
    .workplace {
      flex-direction: row;
      align-items: center;
    }
    .period-row {
      grid-template-columns: minmax(min-content, 5.5rem) auto 1fr;
      margin-top: 0rem;
    }

    .date.start {
      text-align: right;
    }

    .date.end,
    .present {
      text-align: right; /* Lines up end dates outward */
    }
  }
</style>
