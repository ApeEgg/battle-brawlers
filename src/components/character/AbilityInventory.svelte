<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import TooltipAbility from '$src/components/tooltips/TooltipAbility.svelte';
  import { flip } from 'svelte/animate';
  import type { Ability } from '$src/types/ability';

  let flipDurationMs = 300;

  let {
    availableAbilities,
    transformDraggedAvailableAbility,
    considerAvailableAbilities,
    finalizeAvailableAbilities,
    dropFromOthersDisabled = false,
    small = false
  }: {
    availableAbilities: Ability[];
    transformDraggedAvailableAbility?: (draggedElement: any, data: any, _index: any) => void;
    considerAvailableAbilities?: (e: any) => void;
    finalizeAvailableAbilities?: (e: any) => void;
    dropFromOthersDisabled?: boolean;
    small?: boolean;
  } = $props();
</script>

<crow
  class={tw(
    'available-abilities min-h-[calc(98px*3)] w-full !flex-none gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2',
    small ? 'min-h-0 gap-1 border-none bg-transparent p-0' : 'inset-shadow-sm',
    availableAbilities.length ? 'left up' : ''
  )}
  use:dndzone={{
    items: availableAbilities,
    flipDurationMs,
    dropFromOthersDisabled,
    transformDraggedElement: transformDraggedAvailableAbility,
    dropTargetStyle: {}
  }}
  onconsider={considerAvailableAbilities}
  onfinalize={finalizeAvailableAbilities}
>
  {#if availableAbilities.length}
    {#each availableAbilities as ability (ability.id)}
      <crow
        class={tw(
          'relative h-20 w-20 !flex-none gap-2 rounded border border-black bg-white',
          small && 'h-10 w-10 gap-1',
          ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
            ability.abilityName
          ) && 'border-gray-400 bg-gray-100'
        )}
        use:tooltip={{
          children: TooltipAbility,
          props: ability,
          direction: 'up',
          lockInPlace: true
        }}
        animate:flip={{ duration: flipDurationMs }}
      >
        <div class="ticks">{ability.ticks}</div>
        <Icon name={ability.icon} />
        <!-- {ability.id.substring(0, 5)} -->
      </crow>
    {/each}
  {:else}
    Abilities from equipped gear will appear here.
  {/if}
</crow>
