<script lang="ts">
  import type { Snippet } from 'svelte';

  let { text, right, children }: { text: string; right?: boolean; children?: Snippet } = $props();
</script>

<crow class={tw('gap-4', right ? 'right' : 'left')}>
  <h3>{text}</h3>
  {#if children}
    {@render children()}
  {/if}
</crow>

<Hr class="mt-2 mb-4" left={!right} {right} />
