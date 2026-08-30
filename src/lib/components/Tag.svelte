<script lang="ts">
    import Icon from "./Icon.svelte";
    let { bg, icon, label } = $props();
</script>

<li class="tag-chip" style="--bg-color: {bg};">
    {#if icon}
        <Icon name={icon} size="1.25rem" />
    {/if}
    <span class="tag-label">{label}</span>
</li>

<style>
    .tag-chip {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.1rem 0.5rem;
        border-radius: var(--border-radiuses-full);
        font-size: var(--font-sizes-xs);
        font-weight: var(--font-weights-medium);
        background-color: color-mix(in oklch, var(--bg-color) 30%, transparent);
        border: 1px solid
            color-mix(
                in oklch,
                var(--bg-color),
                var(--border-mix-shading) var(--border-strength-1)
            );

        > span {
            color: color-mix(in oklch, var(--bg-color), var(--colors-text) 90%);
/*             font-weight: var(--font-weights-bold); */
        }
    }
</style>
