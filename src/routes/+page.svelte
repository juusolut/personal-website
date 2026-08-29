<script>
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

  let { data } = $props();
</script>

<section class="nutshell h-padding">
  <div class="nutshell__info section-content">
    <div class="nutshell__gradient-border"></div>
    <div class="nutshell_content" class:is-visible={isLoaded}>
      <div class="nutshell__title reveal">
        <h1>Hei!</h1>
        <h1>Olen <span class="mr-dafoe-regular">Juuso.</span></h1>
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
    </div>
  </div>
</section>
<section class="details"></section>
<section class="projects">
  <div class="projects__inner section-content">
    <h1 class="toni-heading">Projektit</h1>
    <div class="projects__grid reveal-on-scroll" use:viewport>
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
        >Näytä kaikki projektit ({data.projects.length})</a
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
<FloatingHead />

<style>
  .nutshell {
    width: 100%;
    padding: 1rem 0;
    height: calc(100svh - var(--navbar-height));
    /*     padding: 5rem 0; */
    /*     border-bottom: 1px solid var(--colors-text); */
    /*     background: linear-gradient(180deg, transparent 50%, var(--colors-primary) 50%); */
    position: relative;
    container-type: inline-size;
    container-name: hero;
    /*     border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-0),
        var(--border-mix-shading) var(--border-strength-2)
      ); */
    /*     &::before {
      content: "";
      position: absolute;
      height: 50%;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: var(--colors-primary);
      border-top: 1px solid
        color-mix(
          in oklch,
          var(--colors-primary),
          var(--border-mix-shading) var(--border-strength-1)
        );
    } */
  }

  .nutshell__info {
    /*  aspect-ratio: 10 / 5; */
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
      background-color: var(--colors-elevation-2);
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

  .nutshell__title {
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    /*    padding-top: 30%;
    margin-bottom: 3em; */
    top: 20%;
    position: absolute;
    z-index: 1;

    > h1 {
      font-family: "Raleway";
      margin: 0;
      font-size: 13vw;
      font-size: clamp(var(--font-sizes-lg), 3cqw + 5cqh, 6rem);
      color: color-mix(
        in oklab,
        var(--colors-secondary) 8%,
        var(--colors-text)
      );
      /*       -webkit-text-stroke-width: .1rem;
      -webkit-text-stroke-color: var(--colors-text);
      color: transparent; */
    }

    > h1 > span {
      font-size: 1.3em;
      color: var(--colors-secondary);
      text-shadow: 0.03em 0.03em 0.08em
        color-mix(in oklch, var(--colors-secondary) 40%, rgba(0, 0, 0, 0.1));
      -webkit-text-stroke-width: 0rem;
    }
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

  @container hero (width > 40rem) {
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
        var(--border-mix-shading) var(--border-strength-2)
      );
  }

  .projects {
    padding: 2rem;
    border-bottom: 1px solid
      color-mix(
        in oklch,
        var(--colors-elevation-0),
        var(--border-mix-shading) var(--border-strength-2)
      );
  }

  .projects__inner {
    width: 100%;
    color: var(--colors-text);
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    padding-bottom: 10rem;
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
</style>
