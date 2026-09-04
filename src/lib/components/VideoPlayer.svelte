<script>
  import { asset } from "$app/paths";

  let { videoSrc = "", posterSrc = "", description = "" } = $props();
</script>

<div class="video-wrapper">
  <video
    src={asset(videoSrc)}
    poster={asset(posterSrc)}
    controls
    preload="none"
    width="100%"
  >
    <track kind="captions" />
    Your browser does not support the video tag.
  </video>

  <!-- Only renders the box if a description prop is provided -->
  {#if description}
    <div class="video-description">
      <p><i>{description}</i></p>
    </div>
  {/if}
</div>

<style>
  .video-wrapper {
    width: 100%;
    max-width: var(--text-max-width);
  }

  video {
    max-width: var(--text-max-width);
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    background-color: var(--colors-elevation-3);
    display: block;
  }

  /* Adjust video border radius if no description is rendered */
  .video-wrapper:not(:has(.video-description)) video {
    border-radius: 8px;
  }

  .video-description {
    background-color: var(--colors-elevation-3);
    border: 1px solid
      color-mix(
        in oklab,
        var(--colors-elevation-3),
        var(--border-mix-shading) var(--border-strength-1)
      );
    border-top: none;
    border-radius: 0 0 var(--border-radiuses-sm) var(--border-radiuses-sm);
    padding: 0.5rem 1rem;
    line-height: 1.5;
    color: var(--colors-text);
  }

  .video-description p {
    margin: 0;
    font-size: var(--font-sizes-xs);
  }
</style>
