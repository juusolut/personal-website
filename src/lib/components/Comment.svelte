<script lang="ts">
  import { asset } from "$app/paths";

  let {
    name,
    firm,
    linkedInURL,
    imageURL,
    text,
    reverse = false,
    color = "var(--colors-primary)",
    viewport
  } = $props();
</script>

<div use:viewport class="comment reveal-on-scroll" class:reversed={reverse} style="--bg-color: {color}">
  <p class="text">
    {text}
  </p>
  <div class="person">
    <div class="person__image waves-pattern">
      {#if imageURL}
        <img class="person__upper-part" src={asset(imageURL)} alt="Commenter" />
        <div class="image-crop-container">
          <img class="person__lower-part" src={asset(imageURL)} alt="Commenter" />
        </div>
      {/if}
    </div>
    <div class="person-introduction">
      <strong>{name}</strong>
      <span>{firm}</span>
      <a href={linkedInURL}>LinkedIn</a>
    </div>
  </div>
</div>

<style>
  .comment {
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
  }
  .person__image {
    background-color: var(--bg-color);
    background: linear-gradient(
      -30deg,
      color-mix(in oklch, var(--bg-color), black 20%) 0%,
      var(--bg-color) 45%,
      color-mix(in oklch, var(--bg-color), white 50%) 90%
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

  .person__upper-part {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -40%) scaleX(-1);
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

  .person__lower-part {
    position: absolute;
    border-radius: 100%;
    width: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -40%) scaleX(-1);
    z-index: 1;
  }

  .person {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;
  }
  .person-introduction {
    color: var(--colors-text);
    left: 50%;
    bottom: 0;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    a {
      margin-top: 0.25rem;
      color: var(--bg-color);
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

  .text {
    color: color-mix(in oklch, var(--colors-primary) 15%, var(--colors-text));
    &::before,
    &::after {
      content: "”";
      font-size: var(--font-sizes-lg);
      line-height: var(--font-sizes-sm);
      display: inline-block;
      color: var(--bg-color);
    }

    &::before {
      margin-right: 0.1em;
    }

    &::after {
      margin-left: 0.1em;
    }
  }

  @container (width > 40rem) {
    .person__image {
      width: 10rem;
      height: 10rem;
    }
    .comment {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      justify-content: flex-start;
      padding-bottom: 5rem;
/*       max-width: 60rem; */
      p {
        max-width: 35rem;
      }
    }

    .text {
      margin: 0;
      padding: 0;
      margin-top: 1rem;
    }

    .person {
      flex-direction: column;
      position: relative;
    }

    .reversed {
      flex-direction: row-reverse;
    }

    .person-introduction {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(calc(100% + 1rem));
    }
  }
</style>
