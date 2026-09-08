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
    background-color: var(--colors-elevation-3);
    color: var(--colors-text);
    font-size: var(--font-sizes-xs);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-radius: var(--border-radiuses-full);
    padding: 0 0.5rem;
    padding-top: .06rem;
    height: 1.5rem;
    line-height: 1;
  }
</style>
