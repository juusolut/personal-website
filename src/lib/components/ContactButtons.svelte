<script lang="ts">
  import { asset } from "$app/paths";
  import Icon from "./Icon.svelte";

  const { onlyRow }: { onlyRow?: boolean } = $props();
</script>

<div class="buttons" class:keep-row={onlyRow}>
  <a
    href={asset("/resume.pdf")}
    target="_blank"
    rel="noopener noreferrer"
    class="button button__resume to-light-cv"
  >
    <Icon name="FileCv" size="1.25em" />
    <span class="">CV</span>
    <div class="arrow-icon"><Icon name="ArrowNarrowLeft" size="1.25rem" /></div>
  </a>
  <a
    href={asset("/resume-dark.pdf")}
    target="_blank"
    rel="noopener noreferrer"
    class="button button__resume to-dark-cv"
  >
    <Icon name="FileCv" size="1.25em" />
    <span class="">CV</span>
    <div class="arrow-icon"><Icon name="ArrowNarrowLeft" size="1.25rem" /></div>
  </a>
  <a
    href="https://www.linkedin.com/in/juusolut/"
    target="_blank"
    rel="noopener noreferrer"
    class="button button__linkedin"
  >
    <Icon name="BrandLinkedin (1)" size="1.25em" />
    <span class="">LinkedIn</span>
    <div class="arrow-icon">
      <Icon name="ArrowNarrowLeft" size="1.25rem" />
    </div></a
  >
  <a
    href="https://github.com/juusolut"
    target="_blank"
    rel="noopener noreferrer"
    class="button button__github"
  >
    <Icon name="BrandGithub" size="1.25em" />
    <span class="">GitHub</span>
    <div class="arrow-icon"><Icon name="ArrowNarrowLeft" size="1.25rem" /></div>
  </a>
</div>

<style>
  .arrow-icon {
    position: absolute;
    right: 1rem;
    transform: rotate(180deg);
  }
  .button {
    width: 100%;
    text-align: center;
    position: relative;
    font-weight: var(--font-weights-bold);
/*     font-size: var(--font-sizes-xs); */
    color: color-mix(in oklch, var(--bg-color), white 90%);
    text-decoration: none;
    background: var(--bg-color);
    border: 2px solid
      color-mix(in oklch, var(--bg-color), white var(--border-strength-2));
    border-radius: var(--border-radiuses-md);
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 0;
    padding-left: 1rem;
    gap: 1rem;
    position: relative;
    user-select: none;

    :global(.icon) {
      display: block;
      flex-shrink: 0;
    }
  }

  .button__resume {
    --bg-color: oklch(from oklch(0.73 0.12 68.69) 0.68 c 70);
  }

  .button__linkedin {
    --bg-color: #0a66c2;
  }

  .button__github {
    --bg-color: rgb(46, 46, 46);
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
    width: 100%;

    &.keep-row {
      flex-direction: row;
      /*       padding: 0.5rem; */

      .arrow-icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        transform: rotate(130deg) scale(0.8);
      }

      .button {
        width: auto;
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        padding-right: 2rem;
        padding-left: 0;
        padding-right: 0;
        justify-content: center;
        gap: 0.375em;
        flex: 1;
      }
    }

    /*     padding: 0 0.5rem; */

    @container (width > 28rem) {
      flex-direction: row;
      justify-content: flex-start;
      /*       padding: 0.5rem; */

      .arrow-icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        transform: rotate(130deg) scale(0.8);
      }
      .button {
        width: auto;
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        padding-right: 2rem;
        justify-content: center;
        gap: 0.375em;
        flex: 1;
      }
    }
  }
</style>
