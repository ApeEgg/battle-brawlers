<script lang="ts">
  let { children } = $props();
</script>

<div class="relative aspect-square [grid-area:1/1]">
  {@render children()}
</div>
