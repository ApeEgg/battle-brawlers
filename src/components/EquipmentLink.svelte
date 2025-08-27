<script lang="ts">
  import TooltipEquipment from '$src/components/tooltips/TooltipEquipment.svelte';

  let props = $props();
</script>

<div
  class="cursor-pointer border-b border-transparent leading-4 text-blue-500 hover:border-blue-500"
  use:tooltip={{
    children: TooltipEquipment,
    props,
    direction: 'up'
  }}
>
  {props.prettyName}
</div>
