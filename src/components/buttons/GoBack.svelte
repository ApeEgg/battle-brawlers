<script lang="ts">
  let { onclick, class: classes }: any = $props();
</script>

<Button
  class={tw(
    'crow absolute -top-7 -left-5.5 gap-1 border border-gray-400 py-1 text-xs active:translate-y-px',
    classes
  )}
  secondary
  {onclick}
>
  <span>‹</span> Go back
</Button>
