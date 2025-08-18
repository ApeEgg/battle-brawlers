<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, class: classes } = $props<{ children: Snippet }>();
</script>

<div class={tw('rounded p-2 bg-white', classes)}>
  {@render children()}
</div>
