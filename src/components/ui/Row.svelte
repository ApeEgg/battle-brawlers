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
    !up && !right && !down && !left && 'row',
    up && !right && !down && !left && 'row-up',
    !up && right && !down && !left && 'row-right',
    !up && !right && down && !left && 'row-down',
    !up && !right && !down && left && 'row-left',
    up && right && !down && !left && 'row-up-right',
    up && !right && !down && left && 'row-up-left',
    !up && right && down && !left && 'row-down-right',
    !up && !right && down && left && 'row-down-left',
    classes
  )}
  {style}
  {...rest}
>
  <slot />
</div>
