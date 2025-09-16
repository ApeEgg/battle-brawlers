<script lang="ts">
  import type { Snippet } from 'svelte';

  type ButtonProps = {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    blur?: boolean;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  };

  const props = $props();

  let {
    primary = true,
    secondary = false,
    tertiary = false,
    blur = false,
    class: classes,
    onclick,
    children,
    disabled = false,
    type = 'button'
  } = props as ButtonProps;

  let inputRef: HTMLButtonElement;

  $effect(() => {
    blur && inputRef && inputRef === document.activeElement && inputRef.blur();
  });
</script>

<button
  {onclick}
  bind:this={inputRef}
  class={tw(
    'cursor-pointer rounded-sm px-2 py-2 text-xs leading-1 active:enabled:translate-y-px',
    primary && 'bg-blue-600 text-white',
    secondary && 'bg-gray-200 text-gray-500',
    tertiary && 'bg-transparent text-gray-500 hover:enabled:underline',
    disabled && !tertiary && 'bg-gray-400 text-white',
    classes
  )}
  {disabled}
  type={type}
>
  {@render children()}
</button>
