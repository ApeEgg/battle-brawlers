<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';

  let props = $props();

  let character = $derived(app.characters[0] || CHARACTERS('elf'));
</script>

<div
  class="cursor-pointer border-b border-transparent leading-4 text-stone-500 hover:border-stone-500"
  use:tooltip={{
    children: TooltipEquipment,
    props: { ...props, character: CHARACTERS(character, true) },
    direction: 'up'
  }}
>
  {props.name}
</div>
