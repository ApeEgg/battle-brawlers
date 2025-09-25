<script lang="ts">
  import CHARACTERS from '$src/constants/CHARACTERS';

  let props = $props();

  let character = $derived(app.characters[0] || CHARACTERS('elf'));

  const tier = (level: number) => {
    const tierLevel = Math.floor(props.level % 5);
    if (tierLevel === 0) return 'I';
    if (tierLevel === 1) return 'II';
    if (tierLevel === 2) return 'III';
    if (tierLevel === 3) return 'VI';
    if (tierLevel === 4) return 'V';
  };
</script>

<div
  class={tw(
    'cursor-pointer border-b border-transparent leading-4 text-gray-600'
    // props.level >= 5 && 'text-green-500 hover:border-green-700',
    // props.level >= 10 && 'text-blue-500 hover:border-blue-700',
    // props.level >= 15 && 'text-purple-500 hover:border-purple-700',
    // props.level >= 20 && 'text-orange-500 hover:border-orange-700',
    // props.level >= 25 && 'text-red-500 hover:border-red-700'
  )}
  use:tooltip={{
    children: TooltipEquipment,
    props: { ...props, character: CHARACTERS(character, true) },
    direction: 'up'
  }}
>
  <div class="!grid h-5 !place-content-stretch">
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(19px_0%,calc(100%-17px)_0%,calc(100%-17px)_100%,19px_100%)] [grid-area:1/1]',
        props.level >= 5 && 'bg-green-700',
        props.level >= 10 && 'bg-blue-700',
        props.level >= 15 && 'bg-purple-700',
        props.level >= 20 && 'bg-orange-700',
        props.level >= 25 && 'bg-red-700'
      )}
      style="
        mask: url('/images/brush-center.png') repeat-x 0 0 / auto 20px;
      "
    ></div>
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(0_0,19px_0,19px_100%,0_100%)] [grid-area:1/1]',
        props.level >= 5 && 'bg-green-700',
        props.level >= 10 && 'bg-blue-700',
        props.level >= 15 && 'bg-purple-700',
        props.level >= 20 && 'bg-orange-700',
        props.level >= 25 && 'bg-red-700'
      )}
      style="
        mask: url('/images/brush-left.png') no-repeat 0 0 / auto 20px;
      "
    ></div>
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(100%_0,100%_100%,calc(100%-17px)_100%,calc(100%-17px)_0)] [grid-area:1/1]',
        props.level >= 5 && 'bg-green-700',
        props.level >= 10 && 'bg-blue-700',
        props.level >= 15 && 'bg-purple-700',
        props.level >= 20 && 'bg-orange-700',
        props.level >= 25 && 'bg-red-700'
      )}
      style="
        mask: url('/images/brush-right.png') no-repeat 100% 0 / auto 20px;
      "
    ></div>
    <crow
      class="relative !flex-none px-2 text-center font-bold tracking-wide text-nowrap text-white [grid-area:1/1]"
      left
    >
      {props.name}
    </crow>
  </div>
  <!-- {tier(props.level)} -->
</div>
