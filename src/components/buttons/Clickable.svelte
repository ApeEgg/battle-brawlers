<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    class: classes,
    onclick,
    href,
    style
  }: {
    class?: string;
    onclick?: (e: Event) => void;
    href?: string;
    children: Snippet;
    style?: string;
  } = $props();
</script>

{#if href}
  <a {href} {onclick} class={tw('border-0 bg-none outline-none', classes)} {style}>
    {@render children()}
  </a>
{:else}
  <button {onclick} class={tw('border-0 bg-none outline-none', classes)} {style}>
    {@render children()}
  </button>
{/if}
