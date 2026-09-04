<!-- src/lib/components/Icon.svelte -->
<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  import type { IconName } from "../../types/icon-names";
  import { resolve } from "$app/paths";
  import { asset } from "$app/paths";

  interface Props extends SVGAttributes<SVGSVGElement> {
    name: IconName;
    size?: string;
    class?: string;
  }

  const ICON_VERSION = "v1.0";

  let {
    name,
    size = "1.5rem",
    class: className = "",
    ...restProps
  }: Props = $props();

  // Resolve ONLY the asset route, then append query params and fragment identifier after
  const spriteUrl = $derived(
    `${asset("/icon_spritesheet.svg")}?v=${ICON_VERSION}#${name}`,
  );
</script>

<svg
  width={size}
  height={size}
  class={`{className} icon`}
  aria-hidden="true"
  {...restProps}
>
  <!-- Points to public folder sprite sheet with browser caching -->
  <use href={spriteUrl} />
</svg>

<style>
  .icon {
  }
</style>
