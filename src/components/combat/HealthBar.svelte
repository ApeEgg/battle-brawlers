<script lang="ts">
  let { currentHealth, maxHealth } = $props();
</script>

<div class="relative h-7 overflow-hidden rounded bg-red-100">
  <div
    class="health-bar h-full bg-red-800 transition-all duration-500 ease-in-out"
    style="width: {Math.max(0, (currentHealth / maxHealth) * 100)}%"
  ></div>
  <div class="absolute top-1.5 left-2 text-xs text-white text-shadow-xs">
    {currentHealth} / {maxHealth}
  </div>
</div>
