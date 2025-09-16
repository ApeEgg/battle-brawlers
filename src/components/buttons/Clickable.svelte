<script lang="ts">
  import type { Snippet } from 'svelte';

  type ClickableProps = {
    children: Snippet;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    href?: string;
  };

  const props = $props();

  let { children, class: classes, onclick, href } = props as ClickableProps;
</script>

{#if href}
  <a {href} {onclick} class={tw('border-0 bg-none outline-none', classes)}>
    {@render children()}
  </a>
{:else}
  <button {onclick} class={tw('border-0 bg-none outline-none', classes)}>
    {@render children()}
  </button>
{/if}
