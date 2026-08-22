<script>
  // Destructure properties from the $props rune
  let {
    id,
    title,
    description,
    imageSrc,
    imageAlt = title,
    href = undefined,
  } = $props();
</script>

<article class="grid-item" style="view-transition-name: project-bg-{id};">
  <a {href} class="grid-item__link">
    <div
      class="grid-item__image-wrapper"
      style="view-transition-name: project-img-{id};"
    >
      <img src={imageSrc} alt={imageAlt} loading="lazy" />
    </div>
    <div class="grid-item__content">
      <h4 style="view-transition-name: project-title-{id};">{title}</h4>
      <p style="view-transition-name: project-desc-{id};">{description}</p>
    </div>
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
</style>
