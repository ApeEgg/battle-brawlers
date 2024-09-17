<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    primary = true,
    secondary = false,
    tertiary = false,
    blur = false,
    class: classes,
    onclick,
    children
  } = $props<{ children: Snippet }>();

  let inputRef: HTMLButtonElement;

  $effect(() => {
    blur && inputRef && inputRef === document.activeElement && inputRef.blur();
  });
</script>

<button
  {onclick}
  bind:this={inputRef}
  class={tw(
    'rounded leading-1 px-3 py-2 active:translate-y-px',
    primary && 'bg-blue-500 text-white',
    secondary && 'bg-blue-200 text-blue-500',
    tertiary && 'text-blue-500 bg-transparent hover:underline',
    classes
  )}
>
  {@render children()}
</button>
