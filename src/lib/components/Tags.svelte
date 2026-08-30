<script lang="ts">
    import Tag from "./Tag.svelte";
    import { getTagInfo, type TagConfig } from "$lib/config/tags";
    let { tags } = $props();
</script>

<ul class="tag-list">
    {#each tags as tagKey}
        {@const tag: TagConfig = getTagInfo(tagKey)}
        <Tag bg={tag.bg} icon={tag.icon} label={tag.label} />
    {/each}
</ul>

<style>
    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
/*         padding: 0.5rem 1.25rem 1.25rem 1.25rem; */
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
