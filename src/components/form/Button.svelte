<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    primary = false,
    secondary = false,
    tertiary = false,
    blur = false,
    class: classes,
    onclick,
    children,
    disabled = false,
    bgColor = '',
    big = false
  }: {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    blur?: boolean;
    class?: string;
    onclick: () => void;
    disabled?: boolean;
    children: Snippet;
    bgColor?: string;
    big?: boolean;
  } = $props();

  let inputRef: HTMLButtonElement;

  $effect(() => {
    blur && inputRef && inputRef === document.activeElement && inputRef.blur();
  });

  let finalBgColor = $derived(
    bgColor || (primary ? 'bg-blue-500' : secondary ? 'bg-stone-50' : '')
  );
</script>

<button
  {onclick}
  bind:this={inputRef}
  class={tw(
    'group !grid cursor-pointer overflow-hidden rounded-xs text-xs leading-1 text-white',
    // primary && 'bg-blue-600 text-white',
    // secondary && 'bg-gray-200 text-gray-500',
    // tertiary && 'bg-transparent text-gray-500 hover:enabled:underline',
    tertiary &&
      'bg-stone-200 text-xs text-gray-500 shadow-[0.5px_1px_0_theme(color.gray.400)] active:enabled:translate-x-[0.5px] active:enabled:translate-y-px active:enabled:shadow-none',
    tertiary && disabled && 'shadow-[0.5px_1px_0_theme(color.white)]',
    disabled && 'text-gray-400 opacity-80 grayscale'
  )}
  {disabled}
>
  {#if !tertiary}
    <div
      class="bg-[url('/images/ui/button/center.jpg')] bg-[length:auto_300%] bg-position-[0%_0%] [grid-area:1/1] group-hover:group-enabled:bg-position-[0%_50%] group-active:group-enabled:bg-position-[0%_100%]"
    ></div>
    <div
      class="bg-[url('/images/ui/button/left.jpg')] bg-[length:auto_300%] bg-position-[0%_0%] bg-no-repeat [clip-path:polygon(0_0,16px_0,16px_100%,0_100%)] [grid-area:1/1] group-hover:group-enabled:bg-position-[0%_50%] group-active:group-enabled:bg-position-[0%_100%]"
    ></div>
    <div
      class="bg-[url('/images/ui/button/right.jpg')] bg-[length:auto_300%] bg-position-[100%_0%] bg-no-repeat [clip-path:polygon(100%_0,100%_100%,calc(100%-16px)_100%,calc(100%-16px)_0)] [grid-area:1/1] group-hover:group-enabled:bg-position-[100%_50%] group-active:group-enabled:bg-position-[100%_100%]"
    ></div>
    <div class={tw('relative m-px bg-stone-600 mix-blend-hue [grid-area:1/1]', finalBgColor)}></div>
  {/if}

  <crow
    class={tw(
      'relative gap-1 px-3 py-1 leading-4 [grid-area:1/1]',
      tertiary && 'border-[0.5px] border-gray-300 px-2 py-0.5',
      big && 'px-5 py-1 text-lg',
      classes
    )}
  >
    {@render children()}
  </crow>
</button>
