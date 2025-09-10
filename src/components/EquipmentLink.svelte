<script lang="ts">
  import TooltipEquipment from '$src/components/tooltips/TooltipEquipment.svelte';
  import CHARACTERS from '$src/constants/CHARACTERS';

  let props = $props();

  let character = $derived(app.characters[0]);
</script>

<div
  class="cursor-pointer border-b border-transparent leading-4 text-blue-500 hover:border-blue-500"
  use:tooltip={{
    children: TooltipEquipment,
    props: { ...props, character: CHARACTERS(character, true) },
    direction: 'up'
  }}
>
  {props.prettyName}
</div>
