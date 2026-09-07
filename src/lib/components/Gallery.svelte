<script lang="ts">
  import { asset } from "$app/paths";
  import Icon from "./Icon.svelte";
  let {
    images,
    description = "No desc",
  }: {
    images: string[];
    description: string;
  } = $props();

  let currentImageIndex = $state(0);

  let targetElement: HTMLElement | null = $state(null);
  let isFullscreen = $state(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      targetElement
        ?.requestFullscreen()
        .then(() => {
          isFullscreen = true;
        })
        .catch((err) => {
          console.error(`Error enabling fullscreen: ${err.message}`);
        });
    } else {
      document.exitFullscreen().then(() => {
        isFullscreen = false;
      });
    }
  }

  function handleFullscreenChange() {
    isFullscreen = !!document.fullscreenElement;
  }
</script>

<div class="gallery" bind:this={targetElement}>
  <div class="gallery-inner">
    <div class="moving-container" style:--index={currentImageIndex}>
      {#each images as image}
        <div class="image-container">
          <img
            class="image"
            src={asset(image)}
            alt="My design work for dashboard"
          />
        </div>
      {/each}
    </div>
    <button
      class="change-image-button button"
      aria-label="Siirry edelliseen kuvaan"
      onclick={() => {
        if (currentImageIndex === 0) {
          currentImageIndex = images.length - 1;
          return;
        }
        currentImageIndex -= 1;
      }}
    >
      <Icon name="ArrowNarrowLeft" />
    </button>
    <button
      class="change-image-button button right"
      aria-label="Siirry seuraavaan kuvaan"
      onclick={() => {
        if (currentImageIndex === images.length - 1) {
          currentImageIndex = 0;
          return;
        }
        currentImageIndex += 1;
      }}
    >
      <Icon name="ArrowNarrowLeft" />
    </button>
    <button class="fullscreen-button button" onclick={toggleFullscreen}
      ><Icon name={isFullscreen ? "FullscreenExit" : "Fullscreen"} /></button
    >
  </div>
  {#if description}
    <div class="description">
      <p><i>{description} {currentImageIndex + 1}/{images.length}</i></p>
    </div>
  {/if}
</div>

<style>
  .gallery {
    width: 100%;
    max-width: var(--text-max-width);
    display: block;
    background-color: var(--colors-elevation-3);
    margin-bottom: 2rem;
    margin-top: 2rem;
    border-radius: var(--border-radiuses-lg);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      );
    overflow: hidden;
    container-type: inline-size;
    container-name: gallery;
  }

  .gallery:fullscreen .gallery-inner {
    width: 100vw;
    height: 100vh;
    aspect-ratio: unset;
  }

  .gallery-inner {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    display: block;
    overflow: hidden;
    z-index: 0;
  }

  .moving-container {
    --index: 0;
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(calc(var(--index) * -100%));
    z-index: -1;
    transition: 200ms transform ease-in-out;
    will-change: transform;
  }

  .image-container {
    min-width: 100%;
    height: 100%;
    padding: 0.5rem;
    background-color: var(--colors-elevation-2);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;

    user-select: none;
    -webkit-user-drag: none;
  }

  .description {
    padding: 0.5rem 1rem;
    line-height: 1.5;
    color: var(--colors-text);
  }

  .description p {
    margin: 0;
    font-size: var(--font-sizes-xs);
  }

  .button {
    --size: 1.5rem;
    --h-margin: 1rem;

    z-index: 2;
    height: var(--size);
    width: var(--size);
    border-radius: 100%;
    background: var(--colors-elevation-3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: var(--colors-text);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .change-image-button {
    top: 50%;
    transform: translateY(-50%);
    left: var(--h-margin);

    &.right {
      left: unset;
      right: var(--h-margin);
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .fullscreen-button {
    right: var(--h-margin);
    top: var(--h-margin);
    border-radius: var(--border-radiuses-sm);
  }

  @container gallery (width > 40rem) {
    .button {
      --size: 2.25rem;
      --h-margin: 2rem;
    }
  }
</style>
