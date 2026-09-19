<script lang="ts">
  import { asset } from "$app/paths";

  interface props {
    imageSrc: string;
    outlined?: boolean;
  }

  const { imageSrc, outlined = false }: props = $props();
</script>

<div class="profile-image-container waves-pattern" class:outlined>
  <img class="top-part" src={asset(imageSrc)} alt="Juuso Luttinen" />
  <div class="bottom-part-anchor">
    <img class="bottom-part" src={asset(imageSrc)} alt="Juuso Luttinen" />
  </div>
</div>

<style>
  .profile-image-container {
    background-color: var(--colors-secondary);
    border-radius: 100%;
    position: relative;
    width: 100%;
    max-width: 15rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;

    &.outlined {
      border: 10px solid color-mix(in oklab, var(--colors-secondary), white 20%);
      box-shadow: var(--shadows-xs);
    }
  }

  .top-part {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: inset(0 0 50% 0);
  }

  .bottom-part-anchor {
    border-radius: 100%;
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .bottom-part {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
