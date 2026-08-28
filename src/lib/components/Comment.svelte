<script lang="ts">
  import { asset } from "$app/paths";

  let { name, firm, linkedInUrl } = $props();
</script>

<div class="recommendation__text-box">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolores
    voluptatem odit officia, explicabo quaerat repellendus facere, distinctio
    temporibus, odio velit. Exercitationem commodi aperiam minima excepturi
    nihil eius, beatae laboriosam. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Libero dolores voluptatem odit officia, explicabo quaerat
    repellendus facere, distinctio temporibus, odio velit. Exercitationem
    commodi aperiam minima excepturi nihil eius, beatae laboriosam.
  </p>
</div>
<div class="toni-container">
  <div class="profile-image-container waves-pattern">
    <img
      class="me-sticking-out"
      src={asset("/images/toni.png")}
      alt="Juuso Luttinen"
    />
    <div class="image-crop-container">
      <img
        class="profile-image"
        src={asset("/images/toni.png")}
        alt="Juuso Luttinen"
      />
    </div>
  </div>
  <div class="toni-introduction">
    <strong>Toni Pennanen</strong>
    <span>Alfame Systems Oy</span>
    <a href="https://www.linkedin.com/in/toni-pennanen-17278924a/">LinkedIn</a>
  </div>
</div>

<style>
  .profile-image-container {
    background-color: var(--colors-elevation-2);
    background: linear-gradient(
      -30deg,
      var(--colors-primary) 50%,
      color-mix(in oklch, var(--colors-primary), white 70%)
    );
    border-radius: 100%;
    position: relative;
    height: 5rem;
    width: 5rem;
    aspect-ratio: 1 / 1;
    z-index: 0;
    font-size: var(--font-sizes-sm);

    &::after {
      display: none;
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23000000' fill-opacity='0.09' fill-rule='evenodd'/%3E%3C/svg%3E");
      border-radius: 100%;
      z-index: 0;
    }
  }

  .me-sticking-out {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -40%) scaleX(-100%);
    clip-path: inset(0 0 70% 0);
    z-index: 1;
  }

  .image-crop-container {
    border-radius: 100%;
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .profile-image {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -40%) scaleX(-100%);
    z-index: 1;
  }

  .toni-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    /*     margin-top: 2rem;
    margin-bottom: 1rem; */
    align-items: center;
    /*     background-color: blue; */
    grid-area: image;
    margin-top: 1rem;
  }
  .toni-introduction {
    color: var(--colors-text);
    left: 50%;
    bottom: 0;
    white-space: nowrap;
    z-index: 2;

    /*     padding: 0.5rem; */
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    /*     background-color: var(--colors-elevation-2); */
    /*     border: 1px solid var(--colors-text); */
    /*     border-radius: var(--border-radiuses-sm); */
    /*     margin: 1rem; */

    a {
      margin-top: 0.25rem;
      color: var(--colors-primary);
      position: relative;
      width: min-content;
      &::after {
        content: "↗";
        font-size: var(--font-sizes-xs);
        position: absolute;
        top: -0.1em;
        right: -1em;
      }
    }
  }

  .recommendation__text-box {
    display: flex;
    flex-direction: column;
    grid-area: text;
  }

</style>
