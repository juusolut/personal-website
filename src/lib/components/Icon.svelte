<!-- src/lib/components/Icon.svelte -->
<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import type { IconName } from '../../types/icon-names';

  interface Props extends SVGAttributes<SVGSVGElement> {
    name: IconName;
    size?: string;
    class?: string;
  }

  const ICON_VERSION = "v1.0";

  let {
    name,
    size = '1.5rem',
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  class={className}
  aria-hidden="true"
  {...restProps}
>
  <!-- Points to public folder sprite sheet with browser caching -->
  <use href={`/icon_spritesheet.svg?v=${ICON_VERSION}#${name}`} />
</svg>