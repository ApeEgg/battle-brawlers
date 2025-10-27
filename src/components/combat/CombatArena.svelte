<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="relative aspect-square [grid-area:1/1]">
  {@render children()}
</div>
