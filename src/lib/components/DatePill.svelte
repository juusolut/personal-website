<script lang="ts">
  let {
    date = "---",
    identifier,
    usePrimaryColor = false,
  }: { date: string; identifier: string; usePrimaryColor?: boolean } = $props();
</script>

<span
  class="date"
  style="
  view-transition-name: project-date-{identifier};
  view-transition-class: project-morph project-date"
  class:usePrimaryColor
>
  {date === "" ? "---" : date}
</span>

<style>
  .date {
    display: inline-flex;
    align-items: center;
    background-color: var(--colors-elevation-5);
    color: var(--colors-text);
    font-size: var(--font-sizes-xs);
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-5),
        var(--border-mix-shading) var(--border-strength-2)
      );
    border-radius: var(--border-radiuses-full);
    padding: 0.25rem 0.5rem;
  }

  .date.usePrimaryColor {
    --bg-color: color-mix(
      in oklab,
      var(--colors-primary),
      var(--colors-elevation-0) 60%
    );
    background-color: var(--bg-color);
    border: 1px solid
      color-mix(in oklch, var(--bg-color), var(--border-mix-shading) var(--border-strength-2));
  }
</style>
