<script lang="ts">
  import { asset } from "$app/paths";
  import Icon from "./Icon.svelte";

  interface galleryType {
    imageSrc: string;
    thumbSrc: string;
    description: string;
  }

  let {
    data,
  }: {
    data: galleryType[];
  } = $props();

  const images = $derived(data.map((item) => item.imageSrc));

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

  let startX = 0;
  let isDragging = $state(false);
  let trackMousePos = $state(false);
  let distance = $state(0);

  function handleMouseDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    /*     console.log("Start:" + e.clientX); */
    startX = e.clientX;
    trackMousePos = true;
  }
  function handleMouseUp(e: PointerEvent) {
    if (!trackMousePos) return;

    const target = e.currentTarget as HTMLElement;

    // Prevent Android Chrome from queuing synthetic legacy mouse/click events
    if (e.pointerType === "touch") {
      e.preventDefault();
    }

    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }

    const elementWidth = target.clientWidth;
    // Threshold: 25% of width (or change to elementWidth / 2 for 50%)
    const threshold = elementWidth / 4;

    const multiplier = Math.floor(
      (Math.abs(distance) + threshold * 3) / elementWidth,
    );

    // Swiped LEFT (Negative distance) -> Move to NEXT image
    if (distance < -threshold) {
      currentImageIndex = Math.min(
        images.length - 1,
        currentImageIndex + multiplier,
      );
    }
    // Swiped RIGHT (Positive distance) -> Move to PREVIOUS image
    else if (distance > threshold) {
      currentImageIndex = Math.max(0, currentImageIndex - multiplier);
    }

    // Reset drag tracking state
    trackMousePos = false;
    isDragging = false;
    distance = 0;
  }

  function handleMouseMove(e: PointerEvent) {
    if (!trackMousePos) return;

    const currentDistance = e.clientX - startX;

    // 1. Only start capturing/dragging if moved more than 5px (ignores static taps/clicks)
    if (!isDragging && Math.abs(currentDistance) > 5) {
      isDragging = true;
      const target = e.currentTarget as HTMLElement;
      if (target && target.setPointerCapture) {
        target.setPointerCapture(e.pointerId);
      }
    }

    if (isDragging) {
      distance = currentDistance;
    }
  }
</script>

<div class="gallery" bind:this={targetElement}>
  <div class="gallery-inner">
    <div class="hud">
      <div class="hud-inner">
        <div class="image-counter button">
          <Icon name="Image" size="1rem" /><span
            >{currentImageIndex + 1} / {data.length}</span
          >
        </div>
        <button
          class="change-image-button button"
          aria-label="Siirry edelliseen kuvaan"
          disabled={currentImageIndex <= 0}
          onclick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            currentImageIndex = Math.max(0, currentImageIndex - 1);
          }}
        >
          <Icon name="ArrowNarrowLeft" />
        </button>
        <button
          class="change-image-button button right"
          aria-label="Siirry seuraavaan kuvaan"
          disabled={currentImageIndex >= data.length - 1}
          onclick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            currentImageIndex = Math.min(
              data.length - 1,
              currentImageIndex + 1,
            );
          }}
        >
          <Icon name="ArrowNarrowLeft" />
        </button>
        <button class="fullscreen-button button" onclick={toggleFullscreen}
          ><Icon
            name={isFullscreen ? "FullscreenExit" : "Fullscreen"}
          /></button
        >
      </div>
    </div>
    <div
      class="moving-container"
      style:--index={currentImageIndex}
      style:--offset-x={distance + "px"}
      style:transition={distance !== 0 ? "none" : undefined}
      onpointerdown={handleMouseDown}
      onpointermove={handleMouseMove}
      onpointerup={handleMouseUp}
      role="region"
      aria-label="Kuva-galleria"
    >
      {#each images as image}
        <div class="image-container">
          <img
            class="image"
            src={asset(image)}
            alt={data[currentImageIndex].description}
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  </div>
  {#if data[currentImageIndex].description}
    <div class="description">
      <p><i>{data[currentImageIndex].description}</i></p>
    </div>
  {/if}
</div>

<style>
  .gallery {
    width: 100%;
    max-width: var(--text-max-width);
    max-width: 100%;
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
    position: relative;
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
    --offset-x: 0px;

    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(calc(var(--index) * -100% + var(--offset-x)));
    z-index: -1;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    transition: 200ms transform ease-in-out;
    will-change: transform;
  }

  .image-container {
    min-width: 100%;
    height: 100%;
    padding: 0.5rem;
    /*     background-color: var(--colors-elevation-2); */
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    pointer-events: none;
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
    pointer-events: auto;
    touch-action: none;
  }

  .button:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .change-image-button {
    top: 50%;
    transform: translateY(-50%);
    left: 0;

    &.right {
      left: unset;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .fullscreen-button {
    right: 0;
    top: 0;
    border-radius: var(--border-radiuses-sm);
  }

  .hud {
    --padding: 1rem;

    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    padding: var(--padding);
  }

  .hud-inner {
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  .image-counter {
    height: auto;
    width: auto;
    border-radius: var(--border-radiuses-sm);
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: var(--font-sizes-xs);
    background: color-mix(in oklab, var(--colors-elevation-3) 70%, transparent);
    border: none;
    bottom: 0;
    right: 0;
  }

  @container gallery (width > 40rem) {
    .button {
      --size: 2.25rem;
    }
    .hud {
      --padding: 1.5rem;
    }
  }
</style>
