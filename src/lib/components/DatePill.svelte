<script lang="ts">
  let { date = "---", identifier }: { date: string; identifier: string } =
    $props();
</script>

<span
  class="date"
  style="
  view-transition-name: project-date-{identifier};
  view-transition-class: project-morph project-date">{date === "" ? "---" : date}</span
>

<style>
  .date {
    display: inline-flex;
    align-items: center;
    background-color: color-mix(in oklab, var(--colors-primary), var(--colors-elevation-0) 60%);
    color: var(--colors-text);
    font-size: var(--font-sizes-xs);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-0),
        var(--colors-primary) 80%
      );
    border-radius: var(--border-radiuses-full);
    padding: 0.25rem 0.5rem;
  }
</style>
