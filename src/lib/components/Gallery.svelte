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
  let isFullscreen = $state(false);
  let movingContainer = $state<HTMLElement | null>(null);
  let startX = 0;
  let isDragging = $state(false);
  let trackPointerPos = $state(false);
  let distance = $state(0);
  let isInterrupting = $state(false);

  // Set your threshold ratio here (e.g., 0.25 = 25%, 0.5 = 50%)
  const SWIPE_THRESHOLD_RATIO = 0.25;

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }

  /* SWIPING BETWEEN IMAGES */

  function handleMovingContainerPointerDown(e: PointerEvent) {
    if (scale !== 1.0) return;

    /*     activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); */

    if (movingContainer /*  && activePointers.size === 1 */) {
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
    trackPointerPos = true;
  }

  function handleMovingContainerPointerUp(e: PointerEvent) {
    if (!trackPointerPos) return;

    const target = e.currentTarget as HTMLElement;

    // Prevent Android Chrome from queuing synthetic legacy mouse/click events
    if (e.pointerType === "touch") {
      e.preventDefault();
    }

    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }

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
    trackPointerPos = false;
    isDragging = false;
    distance = 0;
    isInterrupting = false;
    startX = 0;
  }

  function handleMovingContainerPointerMove(e: PointerEvent) {
    if (!trackPointerPos) return;

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
    if (!isFullscreen) return;

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

  /* ZOOMING IMAGE */

  let scale = $state(1);
  let translateX = $state(0);
  let translateY = $state(0);

  // Track active pointer touches
  let activePointers = new Map<number, { x: number; y: number }>();
  let initialPinchDistance = 0;
  let initialScale = 1;
  let panStartX = 0;
  let panStartY = 0;
  let initialTranslateX = 0;
  let initialTranslateY = 0;
  let initialFocalX = 0;
  let initialFocalY = 0;
  let currentImageContainerWidth: number = 0;
  let currentImageContainerHeight: number = 0;
  let currentImageWidth: number = 0;
  let currentImageHeight: number = 0;
  let isScaling: boolean = false;

  function getDistance(
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  function getMidpoint(
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

  function handleImagePointerDown(e: PointerEvent) {
    if (e.pointerType !== "touch") return;

    if (e.isPrimary && activePointers.size > 0) {
      activePointers.clear();
    }

    const target = e.currentTarget as HTMLElement;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size >= 2 || scale > 1) {
      e.stopPropagation();
      target.setPointerCapture(e.pointerId);
    }

    if (activePointers.size === 2) {
      // Two fingers: Start Pinch-Zoom
      const points = Array.from(activePointers.values());
      initialPinchDistance = getDistance(points[0], points[1]);
      initialScale = scale;
      isScaling = true;

      const mid = getMidpoint(points[0], points[1]);
      initialFocalX = mid.x - window.innerWidth / 2;
      initialFocalY = mid.y - window.innerHeight / 2;
    } else if (activePointers.size === 1 && scale > 1) {
      // Single finger while zoomed: Start Panning
      panStartX = e.clientX;
      panStartY = e.clientY;
      initialTranslateX = translateX;
      initialTranslateY = translateY;

      const currentImageContainer = e.currentTarget as HTMLElement;
      currentImageContainerWidth = currentImageContainer.clientWidth;
      currentImageContainerHeight = currentImageContainer.clientHeight;

      const targetImage = e.target as HTMLImageElement;
      currentImageWidth = targetImage.clientWidth;
      currentImageHeight = targetImage.clientHeight;
    }
  }

  function handleImagePointerMove(e: PointerEvent) {
    if (!activePointers.has(e.pointerId)) return;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const zoomedImageWidth = currentImageWidth * scale;
    const zoomedImageHeight = currentImageHeight * scale;

    const maxTranslateX = Math.max(
      0,
      (zoomedImageWidth - currentImageContainerWidth) / 2,
    );
    const maxTranslateY = Math.max(
      0,
      (zoomedImageHeight - currentImageContainerHeight) / 2,
    );

    if (activePointers.size === 2) {
      e.stopPropagation();

      // Handle Pinch Scaling
      const points = Array.from(activePointers.values());
      const currentDistance = getDistance(points[0], points[1]);
      if (initialPinchDistance > 0) {
        const targetScale = Math.min(
          Math.max((currentDistance / initialPinchDistance) * initialScale, 1),
          4,
        );
        // Calculate new mid-point location as user moves fingers during pinch
        const currentMid = getMidpoint(points[0], points[1]);
        const currentFocalX = currentMid.x - window.innerWidth / 2;
        const currentFocalY = currentMid.y - window.innerHeight / 2;

        const nextScale =
          (currentDistance / initialPinchDistance) * initialScale;
        const scaleFactor = targetScale / initialScale;

        let newTx =
          currentFocalX - (initialFocalX - initialTranslateX) * scaleFactor;
        let newTy =
          currentFocalY - (initialFocalY - initialTranslateY) * scaleFactor;

        // Clamp scale between 1x and 4x
        scale = Math.min(Math.max(nextScale, 1.0), 4);
        translateX = Math.min(Math.max(newTx, -maxTranslateX), maxTranslateX);
        translateY = Math.min(Math.max(newTy, -maxTranslateY), maxTranslateY);
      }
    } else if (activePointers.size === 1 && scale > 1) {
      e.stopPropagation();
      // Handle Panning when zoomed in
      const deltaX = e.clientX - panStartX;
      const deltaY = e.clientY - panStartY;

      translateX = Math.min(
        Math.max(initialTranslateX + deltaX, -maxTranslateX),
        maxTranslateX,
      );
      translateY = Math.min(
        Math.max(initialTranslateY + deltaY, -maxTranslateY),
        maxTranslateY,
      );

      /*     translateX = deltaX
      translateY = deltaY */
    }
  }

  function handleImagePointerUp(e: PointerEvent) {
    activePointers.delete(e.pointerId);

    if (activePointers.size < 2) {
      initialPinchDistance = 0;
    }

    // Reset offsets if zoomed out back to 1x
    if (scale <= 1) {
      resetZoom();
    }

    isScaling = false;

    console.log(activePointers);
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    activePointers.clear();
  }
</script>

<!-- <svelte:window onkeydown={handleKeyDown} /> -->

{#snippet galleryContent()}
  <div class="gallery-inner" class:disableMoving={scale !== 1}>
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
      onpointerdown={handleMovingContainerPointerDown}
      onpointermove={handleMovingContainerPointerMove}
      onpointerup={handleMovingContainerPointerUp}
      onpointercancel={handleMovingContainerPointerUp}
      role="region"
      aria-label="Kuva-galleria"
    >
      {#each images as image, index}
        {@const isActive = index === currentImageIndex}
        <div
          class="image-container"
          onpointerdown={handleImagePointerDown}
          onpointermove={handleImagePointerMove}
          onpointerup={handleImagePointerUp}
          onpointercancel={handleImagePointerUp}
          onlostpointercapture={handleImagePointerUp}
          role="region"
          style:touch-action={scale !== 1.0 ? "none" : "pan-y"}
        >
          <img
            class="image"
            src={asset(image)}
            alt={data[currentImageIndex].description}
            loading="lazy"
            style:transform={isActive
              ? `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`
              : "none"}
          />
        </div>
      {/each}
    </div>
  </div>
  {#if data[currentImageIndex].description}
    <div class="description">
      <p>
        <i> {data[currentImageIndex].description}</i>
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
    aspect-ratio: 4 / 5;
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

  .gallery-inner.disableMoving .hud {
    opacity: 0;
    pointer-events: none;

    .button {
      pointer-events: none;
    }
  }

  .image-container {
    --scale: 1;
    --x: 0;
    --y: 0;

    min-width: 100%;
    height: 100%;
    padding: 0.5rem;
    position: relative;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    transform: scale(var(--scale)) translate(var(--x), var(--y));
    will-change: transform;
  }

  .image {
    --scale: 1;
    --x: 0;
    --y: 0;

    width: auto;
    height: 100%;
    margin: 0 auto;
    object-fit: contain;
    display: block;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;

    transform: scale(var(--scale)) translate(var(--x), var(--y));
    will-change: transform;
    transition: transform 0.05s ease-out; /* Smooth rendering adjustments */
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
    transition: opacity 200ms linear;
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
    .gallery-inner {
      aspect-ratio: 16 / 9;
    }
  }
</style>
