<script lang="ts">
  let { current, max } = $props();
</script>

<div class="relative h-5 overflow-hidden rounded-xs bg-gray-500">
  <div
    class="h-full bg-yellow-600 transition-all duration-500 ease-in-out"
    style="width: {Math.max(0, (current / max) * 100)}%"
  ></div>
  <div class="absolute top-0.5 left-2 text-xs text-white text-shadow-xs">
    {current} / {max}
  </div>
</div>
