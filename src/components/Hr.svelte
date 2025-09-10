<script lang="ts">
  let { left, class: classes } = $props();
</script>

<hr
  class={tw(
    'mt-1 mb-2 h-[0.5px] w-full border-0 bg-gradient-to-r',
    !left && 'from-transparent via-gray-800/40 to-transparent',
    left && 'from-gray-800/40 to-transparent',
    classes
  )}
/>
