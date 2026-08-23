<script>
  import me from "$lib/assets/me.png";
  import head from "$lib/assets/head.png";
  import FloatingHead from "$lib/components/FloatingHead.svelte";
</script>

<section class="nutshell h-padding">
  <div class="nutshell__info">
    <div class="nutshell_content">
      <div class="nutshell__title">
        <h1>Moikka!</h1>
        <h1>Olen <span class="mr-dafoe-regular">Juuso.</span></h1>
      </div>
      <div class="buttons">
        <a
          href="https://www.linkedin.com/in/juuso-luttinen/"
          target="_blank"
          class="button button__linkedin">LinkedIn</a
        >
        <a
          href="https://github.com/juusoluttinen"
          target="_blank"
          class="button button__github">GitHub</a
        >
      </div>
      <img src={me} alt="Juuso Luttinen" class="nutshell__image" />
      <div class="nutshell__bg-image-container">
        <img src="/images/view.jpg" alt="View of the city" />
      </div>
    </div>
  </div>
</section>
<section class="details"></section>
<section class="projects"><div class="projects__grid"></div></section>
<FloatingHead />

<style>
  .nutshell {
    height: auto;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 6rem;
    border-bottom: 1px solid var(--colors-text);
  }

  .nutshell__info {
    max-width: var(--site-width);
    margin: 0 auto;
    aspect-ratio: 10 / 5;
    background-color: var(--colors-elevation-2);
    border: 1px solid var(--colors-text);
    /*     border-radius: clamp(0px, (100cqi - 100%) * 1e5, var(--border-radiuses-lg)); */
    border-radius: var(--border-radiuses-lg);
    font-weight: var(--font-weights-bold);
    color: var(--colors-text);
    position: relative;
    overflow: hidden;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    container-type: inline-size;
    container-name: nutshell-info;
  }

  .nutshell_content {
    padding-inline: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nutshell__title {
    display: flex;
    flex-direction: column;
    align-items: left;
    > h1 {
      margin: 0;
      font-size: clamp(var(--font-sizes-md), 5cqi + 0.5rem, 6cqi);
    }

    > h1 > span {
      font-size: 1.3em;
      color: var(--colors-secondary);
    }
  }

  .nutshell__image {
    height: 95%;
    width: auto;
    position: absolute;
    bottom: 0;
    right: 5%;
    z-index: -1;
  }

  @container (width > 40rem) {
    .nutshell__info {
      aspect-ratio: 9 / 3;
    }
    .nutshell__title {
      flex-direction: row;
      justify-content: left;
      align-items: center;
      gap: 1rem;
    }
    .nutshell__image {
      height: 95%;
    }
  }

  .buttons {
    display: flex;
    position: absolute;
    bottom: 2%;
    gap: 0.5rem;
  }

  .button {
    background: none;
    border: 1px solid var(--colors-text);
    border-radius: var(--border-radiuses-md);
    padding: 0.5rem 2rem;
    position: relative;
    width: fit-content;
    font-weight: var(--font-weights-bold);
    color: var(--colors-text);
    &::after {
      content: "↗";
      position: absolute;
      right: 0.5rem;
      top: 0.2rem;
    }
  }
  .button__linkedin {
    background: rgb(56, 189, 248);
  }

  .button__github {
    background: rgb(155, 158, 165);
  }

  .nutshell__bg-image-container {
    position: absolute;
    height: 100%;
    width: 50%;
    right: 0;
    top: 0;
    z-index: -2;
    overflow: hidden;
    clip-path: polygon(70% 0, 110% 0, 100% 100%, 0 100%, 0 100%);
    /*     filter: blur(5px); */
    background-color: var(--colors-secondary);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000000' fill-opacity='0.09' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    > img {
      display: none;
      width: 100%;
      object-fit: cover;
      object-position: center;
      height: 100%;
    }
  }

  .details {
    height: calc(30rem);
    /* max-width: var(--site-width); */
    background-color: var(--colors-primary);
    border-bottom: 1px solid var(--colors-text);
  }

  .projects {
    height: 30rem;
    padding: 2rem;
    /* max-width: var(--site-width); */
    background-color: var(--colors-elevation-0);
    &__grid {
      display: grid;

      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      gap: 2rem;
    }
  }
</style>
