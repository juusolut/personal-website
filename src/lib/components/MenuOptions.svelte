<script lang="ts">
  import { settings, toggleTransitions } from "$lib/stores/settings.svelte";
  import Icon from "./Icon.svelte";
</script>

<ul class="menu-list">
  <strong class="menu-item-title">Asetukset</strong>
  <li class="menu-item">
    <div class="menu-option">
      <label for="animations-checkbox">
        <span>Käytä siirtymäanimaatioita</span>
        <input
          id="animations-checkbox"
          type="checkbox"
          bind:checked={settings.transitionsEnabled}
          onchange={(e) => toggleTransitions(e.currentTarget.checked)}
        />
        <div class="checkbox"></div>
      </label>
    </div>
  </li>
<!--   <li class="menu-item">
    <div class="menu-option">
      <label for="animations-checkbox">
        <span>Käytä ääniä</span>
        <input
          id="animations-checkbox"
          type="checkbox"
          bind:checked={settings.transitionsEnabled}
          onchange={(e) => toggleTransitions(e.currentTarget.checked)}
        />
        <div class="checkbox"></div>
      </label>
    </div>
  </li> -->
</ul>

<style>
  .menu-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .menu-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /*     background-color: red; */
  }

  .menu-item-title {
  }

  .menu-option {
    display: flex;
    justify-content: space-between;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:focus + .checkbox {
    outline: 3px solid var(--colors-primary);
    outline-offset: 2px;
  }

  /*   .checkbox {
    --bg: var(--colors-elevation-2);
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background: var(--bg);
    color: transparent;
    border: 2px solid color-mix(in oklab, var(--bg), var(--colors-text) 50%);
    border-radius: var(--border-radiuses-sm);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  } */
  .checkbox {
    display: inline-block;
    width: 2.5rem;
    height: 1.25rem;
    background: grey;
    background: oklch(from var(--colors-primary) 0.7 0.015 h);
    /*     border: 2px solid color-mix(in oklab, var(--bg), var(--colors-text) 50%); */
    border-radius: var(--border-radiuses-lg);
    position: relative;
    user-select: none;

    &::after {
      content: "";
      position: absolute;
      height: 1rem;
      aspect-ratio: 1 / 1;
      background-color: white;
      border-radius: 100%;
      top: 50%;
      left: 0;
      transform: translateY(-50%) translateX(calc(0% + 0.15rem));
      transition: transform var(--anim-speed-medium) var(--anim-easing-circ);
    }
  }

  input:checked + .checkbox {
    background-color: var(--colors-primary);
    &::after {
      transform: translateY(-50%) translateX(calc(100% + 0.35rem));
    }
  }

  label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  label > span {
    user-select: none;
  }
</style>
