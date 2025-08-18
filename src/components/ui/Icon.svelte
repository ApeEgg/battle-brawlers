<script lang="ts">
  import icons from '$src/icons/icons.json';
  import type { IconName } from '$src/icons/types';
  
  export let name: IconName;
  export let multiColor: boolean = false;
  export let ratio: number = 1;
 
  const { elements, fills, strokes, viewBoxWidth, viewBoxHeight, widthRatio, heightRatio } =
    icons[name];

  $: ({ class: classes, ...rest } = $$restProps);
</script>

<svg
  class={tw(`icon-${name}`, classes)}
  viewBox={viewBoxWidth && viewBoxHeight ? `0 0 ${viewBoxWidth} ${viewBoxHeight}` : undefined}
  width={`${ratio * widthRatio}em`}
  height={`${ratio * heightRatio}em`}
  style={multiColor
    ? [
        ...fills.map((fill, i) => fill && `--${name}-fill-color-${i}: ${fill};`),
        ...strokes.map((stroke, i) => stroke && `--${name}-stroke-color-${i}: ${stroke};`)
      ]
        .filter(Boolean)
        .join('')
    : undefined}
  {...rest}
>
  {@html elements.join('')}
</svg>
