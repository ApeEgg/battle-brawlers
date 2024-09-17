<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    up,
    right,
    down,
    left,
    style,
    class: classes,
    children,
    ...rest
  } = $props<{ children: Snippet }>();
</script>

<div
  class={tw(
    !up && !right && !down && !left && 'column',
    up && !right && !down && !left && 'column-up',
    !up && right && !down && !left && 'column-right',
    !up && !right && down && !left && 'column-down',
    !up && !right && !down && left && 'column-left',
    up && right && !down && !left && 'column-up-right',
    up && !right && !down && left && 'column-up-left',
    !up && right && down && !left && 'column-down-right',
    !up && !right && down && left && 'column-down-left',
    classes
  )}
  {style}
  {...rest}
>
  {@render children()}
</div>
