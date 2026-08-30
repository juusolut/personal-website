<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import FloatingHead from "$lib/components/FloatingHead.svelte";
  import Comment from "$lib/components/Comment.svelte";
  import { onMount } from "svelte";
  import ProjectItem from "$lib/components/ProjectItem.svelte";

  let isLoaded = $state(false);
  const heroSrc = asset("/images/me.png");

  onMount(() => {
    const img = new Image();
    img.src = heroSrc;

    // decode() ensures the image is downloaded AND GPU-decoded before revealing
    img
      .decode()
      .then(() => {
        isLoaded = true;
        console.log("Reveal!");
      })
      .catch(() => {
        // Fallback in case of decoding errors or broken links
        isLoaded = true;
      });
  });

  function viewport(node) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function scrollToElement(target) {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // 'start', 'center', 'end', or 'nearest'
        inline: "nearest",
      });
    }
  }

  let element: HTMLDivElement | null = $state(null);

  let normalizedX = $state(0);
  let normalizedY = $state(0);

  function handleMouseMove(event: MouseEvent) {
    return;
    const center_x = window.innerWidth / 2;
    const center_y = window.innerHeight / 2;

    normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

    console.log(normalizedY);
  }

  let { data } = $props();
</script>

<svelte:window onmousemove={handleMouseMove} />

<section class="nutshell h-padding">
  <div class="nutshell__info section-content">
    <div class="nutshell__gradient-border"></div>
    <div class="nutshell_content" class:is-visible={isLoaded}>
      <div
        class="nutshell__title reveal"
        style:--offset-x="{normalizedX * -50}px"
        style:--offset-y="{normalizedY * -50}px"
      >
        <h1 class="nutshell__hey">Hei!</h1>
        <h1 class="nutshell__im">
          Olen &lt; <span class="mr-dafoe-regular">Juuso</span> /&gt;
        </h1>
      </div>
      <div class="buttons">
        <a
          href="https://www.linkedin.com/in/juusolut/"
          target="_blank"
          class="button button__linkedin">LinkedIn</a
        >
        <a
          href="https://github.com/juusolut"
          target="_blank"
          class="button button__github">GitHub</a
        >
      </div>
      <img
        src={asset("/images/me.png")}
        alt="Juuso Luttinen"
        class="nutshell__image reveal"
      />
      <!--       <img
        src={asset("/images/me.png")}
        alt="Juuso Luttinen"
        class="nutshell__image styled reveal"
      /> -->
      <div class="nutshell__bg-image-container reveal"></div>
      <div class="nutshell__bg-blueprint reveal"></div>
    </div>
  </div>
  <button
    class="nutshell__scroll-button"
    onclick={() => scrollToElement(".projects")}
  >
    <span class="scroll-arrow" aria-hidden="true"></span><span
      >Vieritä alas</span
    ><span class="scroll-arrow" aria-hidden="true"></span></button
  >
</section>
<section class="details"></section>
<section class="projects h-padding">
  <div class="projects__inner section-content">
    <h1 class="view-title">Korostetut projektit</h1>
    <div class="projects__grid">
      {#each data.projects as item (item.slug)}
        <ProjectItem
          id={item.slug}
          title={item.title}
          description={item.description}
          tags={item.tags}
          imageSrc={item.thumbnail}
          href="/projects/{item.slug}"
        />
      {/each}
      <a href={resolve("/projects")} class="all-projects-link"
        >Näytä kaikki projektit ({data.projectCount})</a
      >
    </div>
  </div>
</section>
<section class="recommendation h-padding">
  <div class="recommendation__inner section-content">
    <h1 class="toni-heading">Kommentteja minusta</h1>
    <div class="comments">
      <Comment
        name="Toni Pennanen"
        firm="Alfame Systems Oy"
        linkedInURL="https://www.linkedin.com/in/toni-pennanen-17278924a/"
        text="Olemme tehneet Juuson kanssa useita koulu- ja harrasteprojekteja yhdessä, minkä perusteella voin suositella häntä kaikenlaiseen ohjelmistokehitystyöhön. Juuso on erittäin osaava ja ahkera ongelmanratkaisija, jolla on jo hallussaan useita teknologioita, minkä lisäksi hän on aina halukas oppimaan uutta. Hänen kriittinen ja looginen ajattelukykynsä sekä nopea oppimiskykynsä ovat aivan omaa luokkaansa, ja hänen osaamisensa on jo nyt tasolla, joka ei jää jälkeen muutaman vuoden työkokemuksen omaavien ohjelmistokehittäjien tasosta. Ennen kaikkea Juuso on kuitenkin erittäin mukava ja luotettava henkilö, jonka kanssa on helppo ja miellyttävä työskennellä!"
        imageURL="/images/toni.png"
        reverse={false}
        {viewport}
      />
      <Comment
        name="Virpi Ruotsalainen"
        firm="Luonnon Syli"
        linkedInURL="https://www.linkedin.com/in/virpi-ruotsalainen/"
        text="Teki annetut työtehtävät hyvällä asenteella ja moitteettomasti. Huolellinen ja tarkka, mutta ripeäotteinen. Sopeutuu hyvin niin itsenäisesti tehtäviin kuin porukalla tehtäviin töihin. Täsmällinen ja luotettava työntekijä. Halu oppia uusia asioita ja ennakkoluuloton asenne työntekoon."
        imageURL=""
        reverse={true}
        color="var(--colors-secondary)"
        {viewport}
      />
    </div>
  </div>
</section>

<footer class="h-padding">
  <span>Rakennettu <a href="https://svelte.dev/">Sveltellä</a></span>
</footer>

<FloatingHead />

<style>
  .nutshell {
    width: 100%;
    padding-top: 1rem;
    height: calc(100svh - var(--navbar-height));
    display: flex;
    flex-direction: column;
    position: relative;
    container-type: inline-size;
    container-name: hero;
  }

  .nutshell__info {
    height: 100%;
    width: 100%;
    background-color: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    font-weight: var(--font-weights-bold);
    color: var(--colors-text);
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    flex: 1;
    box-shadow: var(--shadows-xs);
  }

  .nutshell__gradient-border {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -2;
    pointer-events: none;

    &::before {
      content: "";
      position: absolute;
      height: calc(100% + 4px);
      width: calc(100% + 4px);
      left: -2px;
      top: -2px;
      background: linear-gradient(
        135deg,
        var(--colors-secondary),
        var(--colors-elevation-2) 50%
      );
      border-radius: var(--border-radiuses-lg);
    }

    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      /*       background-color: color-mix(in oklab, var(--colors-primary), white 60%); */
      background: radial-gradient(
        circle at 100% 120%,
        color-mix(
            in oklab,
            var(--colors-primary),
            var(--colors-elevation-2) 80%
          )
          10%,
        var(--colors-elevation-2) 80%
      );
      opacity: 1;
      border-radius: var(--border-radiuses-lg);
    }
  }

  .nutshell_content {
    padding-inline: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: var(--border-radiuses-lg);
    container-type: inline-size;
    display: none;

    &.is-visible {
      display: flex !important;
    }
  }

  .nutshell__bg-blueprint {
    --opacity-to: 0.2;
    --y-from: 2rem;
    --speed: 4s;

    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background-repeat: repeat;
    background-size: 8rem auto;
    /* GPU-optimized execution */
    will-change: transform;

    /* Adjust duration (20s) to control scrolling speed */
    /*       animation: scrollPattern 200s linear infinite; */
    background-color: var(--colors-secondary);
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    mask-repeat: repeat;
    mask-size: 10rem auto;
    opacity: 0.2;
    z-index: -1;
  }

  .nutshell__hey {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 800;
    font-style: normal;
    margin: 0;
    font-size: clamp(var(--font-sizes-xxl), 2cqw + 5cqh, 5rem) !important;
  }

  .nutshell__im {
    margin: 0;
    font-size: clamp(var(--font-sizes-lg), 0.5cqw + 4cqh, 4rem) !important;
    white-space: nowrap;

    > span {
      font-size: 1.3em;
      color: var(--colors-secondary);
      text-shadow: 0.03em 0.03em 0.08em
        color-mix(in oklch, var(--colors-secondary) 40%, rgba(0, 0, 0, 0.1));
      -webkit-text-stroke-width: 0rem;
      text-transform: none;
    }
  }

  .nutshell__title {
    /*     --offset-x: 0px;
    --offset-y: 0px; */

    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    /*    padding-top: 30%;
    margin-bottom: 3em; */
    top: 20%;
    position: absolute;
    z-index: 1;
    color: color-mix(in oklab, var(--colors-secondary) 20%, var(--colors-text));
    font-family: "IBM Plex Mono", monospace;
    font-weight: 800;
    font-style: normal;
    /*     transform: translate3d(var(--offset-x), var(--offset-y), 0) !important;
    transition: transform 30ms ease-out !important;
    will-change: transform; */
  }

  .nutshell__image-mask {
    width: 90%;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    z-index: -1;
  }

  .nutshell__image {
    --speed: 3s;
    --opacity-from: 1;

    width: 90%;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    z-index: 0;
    object-fit: contain;
    max-height: 70%;
    user-select: none;
  }

  .styled {
    --color: var(--colors-elevation-2);
    /*     --speed: 2s !important; */
    filter: drop-shadow(1.5px 0px 0 var(--color))
      drop-shadow(-1.5px 0px 0 var(--color))
      drop-shadow(0px 1.5px 0 var(--color))
      drop-shadow(0px -1.5px 0 var(--color)) drop-shadow(1px 1px 0 var(--color))
      drop-shadow(-1px -1px 0 var(--color)) drop-shadow(1px -1px 0 var(--color))
      drop-shadow(-1px 1px 0 var(--color));
    z-index: -1;
  }

  @media (width > 40rem) {
    .nutshell {
      height: auto;
      padding-bottom: calc(var(--navbar-height) + 4rem);
    }

    .nutshell__info {
      aspect-ratio: 9 / 3;
      height: auto;
    }

    .nutshell__title {
      justify-content: left;
      height: auto;
      padding-top: unset;
      margin-bottom: unset;

      > h1 {
        font-size: clamp(var(--font-sizes-md), 5cqi + 0.5rem, 5cqi);
      }
    }

    .nutshell__image {
      height: 95%;
      width: auto;
      margin: unset;
      right: 5%;
      max-height: 95%;
    }

    .buttons {
      justify-content: flex-start !important;
      left: 15% !important;
      z-index: 2;
    }

    .nutshell__scroll-button {
      display: none !important;
    }
  }

  .buttons {
    display: flex;
    position: absolute;
    bottom: 2%;
    width: 100%;
    left: 0;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
  }

  .button {
    padding: 0.5rem 2rem;
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

    &::after {
      content: "↗";
      position: absolute;
      right: 0.5rem;
      top: 0.2rem;
    }
  }

  .button__linkedin {
    --bg-color: #0a66c2;
  }

  .button__github {
    --bg-color: rgb(46, 46, 46);
  }

  @keyframes scrollPattern {
    from {
      transform: translateX(-50%);
    }

    to {
      /* Shifts the pattern by 100% of its container's width */
      transform: translateX(0%);
    }
  }

  .nutshell__bg-image-container {
    --speed: 4s;
    --opacity-from: 1;
    --y-from: 10rem;

    position: absolute;
    height: 60%;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: -2;
    overflow: hidden;
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 0 100%, 0 80%);
    /*     clip-path: polygon(0% 0%, 100% 0%, 100% 53.25%, 0% 88.75%, 0% 100%, 100% 100%, 100% 75.76%, 100% 0%, 36.25% 0%, 0% 12.75%); */
    /*     filter: blur(5px); */
    background-color: var(--colors-secondary);
    /*     border-top-right-radius: var(--border-radiuses-lg);
    border-bottom-right-radius: var(--border-radiuses-lg); */

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background-repeat: repeat;
      background-size: 8rem auto;
      /* GPU-optimized execution */
      will-change: transform;

      /* Adjust duration (20s) to control scrolling speed */
      animation: scrollPattern 60s linear infinite;
      background-color: var(--colors-elevation-2);
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
      mask-repeat: repeat;
      mask-size: 0.4rem auto;
      opacity: 0.3;
      transform: translateX(-50%);
    }
  }

  .nutshell__scroll-button {
    width: 100%;
    background-color: transparent;
    color: var(--colors-text);
    padding: 1rem 0;
    text-transform: uppercase;
    font-weight: var(--font-weights-bold);
    font-size: var(--font-sizes-xs);
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  .scroll-arrow {
    position: relative;
    display: inline-block;
    transform: translateY(-0.8rem) rotate(45deg);
  }

  /* Base shape for both arrows */
  .scroll-arrow::before,
  .scroll-arrow::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 12px;
    height: 12px;
    border-right: 2.5px solid var(--colors-text);
    border-bottom: 2.5px solid var(--colors-text);
    animation: arrowPulse 2s infinite ease-in-out;
  }

  /* Top Arrow */
  .scroll-arrow::before {
    top: -0.2rem;
    left: -0.2rem;
    animation-delay: 0s;
  }

  /* Bottom Arrow (Layered below with delay) */
  .scroll-arrow::after {
    top: 0.2rem;
    left: 0.2rem;
    animation-delay: 0.1s;
  }

  /* Downward bounce & fade animation */
  @keyframes arrowPulse {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .details {
    display: none;
    height: calc(30rem);
    /* max-width: var(--site-width); */
    background-color: var(--colors-elevation-2);
    /*     background: linear-gradient(
      0deg in oklab,
      color-mix(in oklab, var(--colors-primary), black 55%),
      var(--colors-primary)
    ); */
    border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-primary),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .projects {
    width: 100%;
    border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .projects__inner {
    width: 100%;
    color: var(--colors-text);
    display: flex;
    flex-direction: column;
    gap: 0rem;
    padding-bottom: 5rem;
  }

  .projects__grid {
    width: 100%;
    color: var(--colors-text);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    /*     grid-template-rows: 20rem; */
    gap: 1rem;
  }

  .all-projects-link {
    background: var(--colors-elevation-2);
    border-radius: var(--border-radiuses-lg);
    overflow: hidden;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
    color: var(--colors-text);
    min-height: 5rem;
  }

  .recommendation {
    width: 100%;
    background-color: var(--colors-elevation-2);
    padding: 4rem 0;
    overflow: hidden;
        border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-2),
        var(--border-mix-shading) var(--border-strength-1)
      );
  }

  .recommendation__inner {
    width: 100%;
    /*     max-width: 60rem; */
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
  }

  .comments {
    display: flex;
    flex-direction: column;
    width: 100%;
    container-type: inline-size;
    gap: 2rem;
    margin-top: 2rem;
    padding-bottom: 8rem;
  }

  .toni-heading {
    margin: 0;
    padding: 0;
    grid-area: title;
    color: var(--colors-text);
    position: relative;
    padding-left: 1rem;

    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 5px;
      height: 100%;
      background-color: var(--colors-primary);
      border-radius: var(--border-radiuses-sm);
    }
  }

  footer {
    background-color: var(--colors-elevation-0);
    display: flex;
    justify-content: center;
    color: var(--colors-text);
    padding-top: 2rem;
    padding-bottom: 2rem;
    > span > a {
      color: var(--colors-primary);
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-thickness: 3px;
    }
  }
</style>
