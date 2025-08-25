<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, class: classes, onclick, href } = $props<{ children: Snippet }>();
</script>

{#if href}
  <a {href} class={tw('border-0 bg-none outline-none', classes)}>
    {@render children()}
  </a>
{:else}
  <button {onclick} class={tw('border-0 bg-none outline-none', classes)}>
    {@render children()}
  </button>
{/if}
