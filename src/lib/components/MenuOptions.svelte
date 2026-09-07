<script lang="ts">
  import { settings, toggleTransitions } from '$lib/stores/settings.svelte';
  import Icon from './Icon.svelte';

</script>

<ul class="menu-list">
  <li class="menu-item">
    <strong class="menu-item-title">Animaatiot</strong>
    <div class="menu-option">
      <label for="animations-checkbox">
        <span>{settings.transitionsEnabled ? "Päällä" : "Pois Päältä"}</span>
        <input
          id="animations-checkbox"
          type="checkbox"
          bind:checked={settings.transitionsEnabled}
          onchange={(e) => (toggleTransitions(e.currentTarget.checked))}
        />
        <div class="checkbox"><Icon name="Check"/></div>
      </label>
    </div>
  </li>
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

  .checkbox {
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
    margin-right: 0.75rem;
    margin-left: 0.25rem;
    user-select: none;
  }

  input:checked + .checkbox {
    background-color: var(--colors-primary);
    border-color: var(--colors-primary);
    color: color-mix(in oklab, var(--colors-primary), white 90%);
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
