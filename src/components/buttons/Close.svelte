<script lang="ts">
  let { onclick, class: classes }: any = $props();
</script>

<button
  {onclick}
  class={tw('close row absolute -top-2 -right-2 h-8 w-8 active:translate-y-px', classes)}
>
  <Icon name="cross" />
</button>
