<script lang="ts">
  import { preloadData, goto } from "$app/navigation";
  import { asset } from "$app/paths";
  import { resolve } from "$app/paths";
  import { getTagInfo, type TagConfig } from "$lib/config/tags";
  import Icon from "$lib/components/Icon.svelte";

  // Destructure properties from the $props rune
  let {
    id,
    title,
    description,
    tags = [],
    imageSrc,
    imageAlt = title,
    href = undefined,
    isSelected,
    onselect,
  } = $props();

  function handleClick(e) {
    e.preventDefault();
    // Notify parent to set this item as selected right before navigating
    onselect?.(id);
    goto(resolve(href));
  }
</script>

<article
  class="grid-item"
  style="view-transition-name: project-bg-{id}; view-transition-class: project-morph project-bg"
  style:z-index={isSelected ? 9999 : "auto"}
>
  <a href={resolve(href)} class="grid-item__link" onclick={handleClick}>
    <div
      class="grid-item__image-wrapper"
      style="view-transition-name: project-img-{id}; view-transition-class: project-morph project-img"
    >
      <img src={asset(imageSrc)} alt={imageAlt} loading="lazy" />
    </div>
    <div class="grid-item__content">
      <h4
        style="view-transition-name: project-title-{id}; view-transition-class: project-morph project-title"
      >
        {title}
      </h4>
      <p
        style="view-transition-name: project-desc-{id}; view-transition-class: project-morph project-desc"
      >
        {description}
      </p>
    </div>
    <ul class="tag-list">
      {#each tags as tagKey}
        {@const tag: TagConfig = getTagInfo(tagKey)}
        <li
          class="tag-list__tag-chip"
          style="--bg-color: {tag.bg};"
        >
          <Icon name={tag.icon} />
          <span class="tag-label">{tag.label}</span>
        </li>
      {/each}
    </ul>
  </a>
</article>

<style>
  .grid-item {
    background: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    overflow: hidden;
    box-shadow: var(--shadows-xs);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--colors-text);
  }

  .grid-item:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadows-sm);
  }

  .grid-item__link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .grid-item__image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #f3f4f6;
  }

  .grid-item__image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    object-position: top;
  }

  .grid-item:hover .grid-item__image-wrapper img {
    /*     transform: scale(1.05); */
  }

  .grid-item__content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }

  .grid-item__content h4 {
    display: inline-block;
    width: fit-content;
    margin: 0;
  }

  .grid-item__content p {
    margin: 0;
    font-size: var(--font-sizes-sm);
    color: var(--colors-text-light);
    line-height: 1.5;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem 1.25rem 1.25rem;
    margin: 0;
    list-style: none;
  }

  .tag-list__tag-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radiuses-full);
    font-size: var(--font-sizes-xs);
    font-weight: var(--font-weights-medium);
    background-color: var(--bg-color);
    border: 1px solid var(--colors-text);

    > span {
      color: var(--colors-text);
    }
  }
</style>
