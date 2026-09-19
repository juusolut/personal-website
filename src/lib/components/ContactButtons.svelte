<script lang="ts">
  import { asset } from "$app/paths";
</script>

<div class="buttons">
  <a
    href={asset("/resume.pdf")}
    target="_blank"
    rel="noopener noreferrer"
    class="button button__resume to-light-cv"
    ><span class="offsite-link">CV</span></a
  >
  <a
    href={asset("/resume-dark.pdf")}
    target="_blank"
    rel="noopener noreferrer"
    class="button button__resume to-dark-cv"
    ><span class="offsite-link">CV</span></a
  >
  <a
    href="https://www.linkedin.com/in/juusolut/"
    target="_blank"
    rel="noopener noreferrer"
    class="button button__linkedin"
    ><span class="offsite-link">LinkedIn</span></a
  >
  <a
    href="https://github.com/juusolut"
    target="_blank"
    rel="noopener noreferrer"
    class="button button__github"><span class="offsite-link">GitHub</span></a
  >
</div>

<style>
  .button {
    flex: 1;
    padding: 0.5rem 0;
    text-align: center;
    position: relative;
    width: fit-content;
    font-weight: var(--font-weights-bold);
    color: color-mix(in oklch, var(--bg-color), white 90%);
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    text-decoration: none;
    backdrop-filter: blur(5px);
    background: color-mix(in oklch, var(--bg-color) 70%, transparent);
    border: 2px solid
      color-mix(in oklch, var(--bg-color), white var(--border-strength-1));
    border-radius: var(--border-radiuses-md);
  }

  .button__resume {
    --bg-color: color-mix(in oklab, var(--colors-secondary), white 20%);
  }

  .button__linkedin {
    --bg-color: #0a66c2;
  }

  .button__github {
    --bg-color: rgb(46, 46, 46);
  }

  .buttons {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
    padding: 0 0.5rem;

    @container (width > 30rem) {
      .button {
        padding: 0.5rem 2rem;
/*         flex: unset; */
      }
    }
  }
</style>
