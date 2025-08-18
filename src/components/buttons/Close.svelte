<script lang="ts">
  let { onclick }: any = $props();
</script>

<button {onclick} class="close row absolute top-0 right-0 w-8 h-8 active:translate-y-px">
  <Icon class="text-red-500" name="cross" />
</button>
