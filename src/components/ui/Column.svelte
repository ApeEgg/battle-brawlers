<script lang="ts">
  export let up: boolean = false;
  export let right: boolean = false;
  export let down: boolean = false;
  export let left: boolean = false;
  export let style: string | undefined = undefined;

  $: ({ class: classes, ...rest } = $$restProps);
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
  <slot />
</div>
