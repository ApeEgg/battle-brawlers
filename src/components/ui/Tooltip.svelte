<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  type Props = {
    children: Snippet;
    class?: string;
  };

  let { class: classes, children }: Props = $props();
</script>

<crow
  left
  vertical
  class={twMerge(
    'pointer-events-none absolute bottom-[calc(100%+theme(spacing.1))] left-1/2 w-full min-w-60 -translate-x-1/2 -translate-y-2 gap-1 rounded bg-gradient-to-br from-gray-50 to-gray-200 px-2.5 py-3 text-sm leading-[18px] text-gray-700 opacity-0 transition-all duration-300 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100',
    classes
  )}
>
  {@render children()}
  <div
    class="absolute top-full left-1/2 aspect-square w-4 -translate-x-1/2 bg-gray-200 [clip-path:polygon(0%_0%,100%_0%,50%_50%)]"
  ></div>
</crow>
