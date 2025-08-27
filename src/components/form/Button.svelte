<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    primary = true,
    secondary = false,
    tertiary = false,
    blur = false,
    class: classes,
    onclick,
    children,
    disabled = false
  } = $props<{ children: Snippet } & { class: any; onclick: any }>();

  let inputRef: HTMLButtonElement;

  $effect(() => {
    blur && inputRef && inputRef === document.activeElement && inputRef.blur();
  });
</script>

<button
  {onclick}
  bind:this={inputRef}
  class={tw(
    'rounded px-3 py-2 leading-1 active:enabled:translate-y-px',
    primary && 'bg-blue-500 text-white',
    secondary && 'bg-blue-200 text-blue-500',
    tertiary && 'bg-transparent text-blue-500 hover:underline',
    disabled && 'bg-gray-400',
    classes
  )}
  {disabled}
>
  {@render children()}
</button>
