<script lang="ts">
  import { preloadData, goto } from "$app/navigation";
  import { asset } from "$app/paths";
  import { resolve } from "$app/paths";
  import { getTagInfo, type TagConfig } from "$lib/config/tags";
  import Icon from "$lib/components/Icon.svelte";
  import Tags from "./Tags.svelte";

  // Destructure properties from the $props rune
  let {
    id,
    title,
    description,
    tags = [],
    imageSrc,
    imageAlt = title,
    href = undefined,
    isSelected = false,
    onselect = () => {},
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
      <div
        style="view-transition-name: project-tags-{id}; view-transition-class: project-morph project-tags"
      >
        <Tags {tags} />
      </div>
    </div>
  </a>
</article>

<style>
  .grid-item {
    background: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    overflow: hidden;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    color: var(--colors-text);
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
    /*     object-position: 0% 20%; */
    object-position: top;
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
    flex: 1;
  }
</style>
