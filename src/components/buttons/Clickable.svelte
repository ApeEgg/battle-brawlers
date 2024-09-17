<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, class: classes, onclick } = $props<{ children: Snippet }>();
</script>

<button {onclick} class={tw('bg-none border-0 outline-none', classes)}>
  {@render children()}
</button>
