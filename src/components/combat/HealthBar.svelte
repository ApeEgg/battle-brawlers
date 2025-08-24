<script lang="ts">
  let { current, max } = $props();
</script>

<div class="relative h-7 overflow-hidden bg-gray-500">
  <div
    class="h-full bg-red-800 transition-all duration-200 ease-in-out"
    style="width: {Math.max(0, (current / max) * 100)}%"
  ></div>

  <div class="absolute top-1 left-2 text-sm text-white text-shadow-xs">
    {current} / {max}
  </div>
</div>
