<script lang="ts">
  import { asset } from "$app/paths";
  import { tick } from "svelte";
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
    /*  if (!document.fullscreenElement) {
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
    } */

    isFullscreen = !isFullscreen;
  }

  let movingContainer = $state<HTMLElement | null>(null);
  let startX = 0;
  let isDragging = $state(false);
  let trackMousePos = $state(false);
  let distance = $state(0);
  let isInterrupting = $state(false);

  function handleMouseDown(e: PointerEvent) {
    if (movingContainer) {
      const style = window.getComputedStyle(movingContainer);
      const transform = style.transform;

      // Check if matrix transform exists (animating mid-slide)
      if (transform && transform !== "none") {
        const matrixValues = transform.match(/matrix\((.+)\)/);
        if (matrixValues) {
          const values = matrixValues[1].split(", ");
          const currentTranslateX = parseFloat(values[4]); // Current exact pixel offset

          const elementWidth = movingContainer.clientWidth;
          const currentBaseX = -currentImageIndex * elementWidth;

          // Calculate visual difference from current target index
          const caughtOffset = currentTranslateX - currentBaseX;

          // If caught mid-anim (more than 1px shift), freeze transition
          if (Math.abs(caughtOffset) > 1) {
            isInterrupting = true;
            distance = caughtOffset; // Locks current visual offset into --offset-x
          }
        }
      }
    }

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

    // Set your threshold ratio here (e.g., 0.25 = 25%, 0.5 = 50%)
    const SWIPE_THRESHOLD_RATIO = 0.25;

    const elementWidth = target.clientWidth;
    const threshold = elementWidth * SWIPE_THRESHOLD_RATIO;
    const absDistance = Math.abs(distance);

    if (absDistance > threshold) {
      // Calculates how many full pages were swiped past the initial threshold
      const multiplier = Math.max(
        1,
        Math.floor((absDistance - threshold) / elementWidth) + 1,
      );
      const direction = distance < 0 ? 1 : -1; // Negative = forward (left swipe), Positive = backward (right swipe)

      currentImageIndex = Math.min(
        Math.max(0, currentImageIndex + direction * multiplier),
        images.length - 1,
      );
    }

    // Reset drag tracking state
    trackMousePos = false;
    isDragging = false;
    distance = 0;
    isInterrupting = false;
    startX = 0;
  }

  function handleMouseMove(e: PointerEvent) {
    if (!trackMousePos) return;

    const currentDistance = e.clientX - startX;

    // 1. Only start capturing/dragging if moved more than 5px (ignores static taps/clicks)
    if (!isDragging && Math.abs(currentDistance) > 0) {
      isDragging = true;
      const target = e.currentTarget as HTMLElement;
      if (target && target.setPointerCapture) {
        target.setPointerCapture(e.pointerId);
      }
    }

    if (isDragging) {
      distance = isInterrupting ? distance + currentDistance : currentDistance;
      if (isInterrupting) {
        startX = e.clientX;
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    /*     if (!isFullscreen) return; */

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        currentImageIndex = Math.max(0, currentImageIndex - 1);
        break;

      case "ArrowRight":
      case " ": // Spacebar to advance
        e.preventDefault();
        currentImageIndex = Math.min(images.length - 1, currentImageIndex + 1);
        break;

      case "f":
      case "F":
        e.preventDefault();
        isFullscreen = !isFullscreen; // Toggle off via 'F' key
        break;

      // 'Escape' is handled natively by <dialog>, but you can add explicit actions here if needed
    }
  }

  let dialogRef = $state<HTMLDialogElement | null>(null);

  // Sync Svelte state with dialog's top-layer elevation
  $effect(() => {
    if (isFullscreen) {
      dialogRef?.showModal();
    } else if (dialogRef?.open) {
      dialogRef.close();
    }
  });
</script>

<!-- <svelte:window onkeydown={handleKeyDown} /> -->

{#snippet galleryContent()}
  <div class="gallery-inner">
    <div class="hud">
      <div class="hud-inner">
        <div class="image-counter button">
          <Icon name="Image" size="1rem" /><span
            >{currentImageIndex + 1} / {data.length}</span
          >
        </div>
        <button class="fullscreen-button button" onclick={toggleFullscreen}
          ><Icon name={isFullscreen ? "FullscreenExit" : "Fullscreen"} />
        </button>
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
      </div>
    </div>
    <div
      class="moving-container"
      bind:this={movingContainer}
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
      <p>
        <i
          ><!-- {startX}
          {distance}
          {isInterrupting} -->
          {data[currentImageIndex].description}</i
        >
      </p>
    </div>
  {/if}
{/snippet}

<!-- Inline Version -->
{#if !isFullscreen}
  <div class="gallery">
    {@render galleryContent()}
  </div>
{/if}

<!-- Fullscreen Top-Layer Dialog -->
{#if isFullscreen}
  <dialog
    bind:this={dialogRef}
    onkeydown={handleKeyDown}
    class="gallery-dialog"
    class:isFullscreen
    oncancel={() => {
      isFullscreen = false;
    }}
  >
    {@render galleryContent()}
  </dialog>
{/if}

<style>
  .gallery {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
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
    justify-content: space-between;
  }

  .gallery-dialog {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
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
    justify-content: space-between;
  }

  .gallery-dialog:modal {
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    max-width: 100dvw;
    max-height: 100dvh;
    margin: 0;
    padding: 0;
    inset: 0;
    border: none;
    border-radius: 0;
    align-items: center;
  }

  /* Disable background scroll when menu is open */
  :global(html:has(.gallery-dialog:modal)) {
    overflow: hidden;
  }
  .gallery-inner {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    display: block;
    flex: 1;
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
    transition: 600ms transform cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }

  .image-container {
    min-width: 100%;
    height: 100%;
    padding: 0.5rem;
    position: relative;
    /*     &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: black;
      top: 0;
      transform: translateX(-50%);
      left: 50%;
    } */
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

  .gallery-dialog:modal .description {
    background-color: var(--colors-elevation-4);
    min-height: min-content;
    width: calc(100vw - 2rem);
    max-width: var(--text-max-width);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1rem;
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-4),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-radius: var(--border-radiuses-lg);
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
    background: var(--colors-elevation-4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: var(--colors-text);
    border: 2px solid
      color-mix(
        in oklab,
        var(--colors-elevation-4),
        var(--border-mix-shading) var(--border-strength-4)
      );
    pointer-events: auto;
    touch-action: none;
  }

  .button:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .button:active {
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
    width: auto;
    border-radius: var(--border-radiuses-sm);
    gap: 0.5rem;
    padding: 0 0.5rem;
    font-size: var(--font-sizes-xs);
    background: color-mix(in oklab, var(--colors-elevation-3) 70%, transparent);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-4),
        var(--border-mix-shading) var(--border-strength-1)
      );
    background: var(--colors-elevation-4);
    top: 0;
    left: 0;

    & > span {
      height: 1em;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .button {
      --size: 2.25rem;
    }
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
