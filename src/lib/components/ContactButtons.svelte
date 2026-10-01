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
    display: none;

    @container button (width > 8rem) {
      display: block;
      position: absolute;
      right: 0.1rem;
      top: -0.2rem;
      transform: rotate(130deg) scale(0.8);
    }

    @container button (width > 14rem) {
      display: block;
      position: absolute;
      top: unset;
      right: 1rem;
      transform: rotate(180deg) scale(1);
    }
  }
  .button {
    --bg-color: var(--colors-primary);
    --hover-color: oklch(from var(--bg-color) calc(l + 0.05) c h);

    width: 100%;
    text-align: center;
    position: relative;
    font-weight: var(--font-weights-bold);
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
    container-type: inline-size;
    container-name: button;
    z-index: 0;
    /*     box-shadow: var(--shadows-sm); */

    &::before {
      content: "";
      position: absolute;
      height: calc(100% + 4px);
      width: calc(100% + 4px);
      top: -2px;
      left: -2px;
      box-shadow: var(--shadows-sm);
      pointer-events: none;
      opacity: 0;
            border-radius: var(--border-radiuses-md);
      z-index: -1;
      transition: opacity var(--anim-speed-medium) linear;
    }

    & > span {
      line-height: 1em;
      display: inline;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .button:hover {
      background: var(--hover-color);

      &.button::before {
        opacity: 1;
      }
    }
  }

  .button__resume {
    --bg-color: oklch(0.68 0.12 70.07);
  }
  .button__linkedin {
    --bg-color: oklch(51.56% 0.16327 254.746);
  }

  .button__github {
    --bg-color: oklch(30.118% 0.00003 271.152);
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

      /*       .arrow-icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        transform: rotate(130deg) scale(0.8);
      } */

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

      /*       .arrow-icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        transform: rotate(130deg) scale(0.8);
      } */
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
