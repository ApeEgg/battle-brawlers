<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import TooltipAbility from '$src/components/tooltips/TooltipAbility.svelte';
  import { calculateTickStart } from '$src/ts/Utils';
  import { flip } from 'svelte/animate';
  import type { Ability } from '$src/types/ability';

  let flipDurationMs = 300;
  let dragDisabled = $state(false);

  let {
    abilities,
    transformDraggedCharacterAbility,
    considerCharacterAbilities,
    finalizeCharacterAbilities,
    dndDisabled = false,
    constrainAxisY = false
  }: {
    abilities: Ability[];
    transformDraggedCharacterAbility?: (draggedElement: any, data: any, _index: any) => void;
    considerCharacterAbilities?: (e: any) => void;
    finalizeCharacterAbilities?: (e: any) => void;
    dndDisabled?: boolean;
    constrainAxisY?: boolean;
  } = $props();
</script>

<div class="relative w-[calc((100%/18)*18)]">
  <crow class="w-full" up>
    {#each Array(15) as _, i}
      <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
    {/each}

    {#if !dndDisabled}
      <div class="absolute -top-2 -bottom-2 left-[calc((100%/15)*12)] w-px border-r border-dashed">
        <crow vertical right class="absolute bottom-full text-center text-xs">
          <strong class="text-black">Min</strong>12&nbsp;ticks
        </crow>
      </div>
    {/if}
    <div class="absolute -top-2 -bottom-2 left-[calc((100%/15)*15)] w-px border-r border-dashed">
      <crow vertical right class="absolute bottom-full text-center text-xs">
        {#if !dndDisabled}
          <strong class="text-black">Max</strong>
        {/if}
        15&nbsp;ticks
      </crow>
    </div>
  </crow>

  <crow
    up
    left
    class="absolute inset-0 w-full rounded-lg"
    use:dndzone={{
      items: abilities,
      flipDurationMs,
      constrainAxisY,
      transformDraggedElement: transformDraggedCharacterAbility,
      dropTargetStyle: { outline: 'rgba(100, 100, 100, 0.5) solid 2px' },
      dragDisabled: dndDisabled || dragDisabled
    }}
    onconsider={considerCharacterAbilities}
    onfinalize={finalizeCharacterAbilities}
  >
    {#each abilities as ability, i (ability.id)}
      {@const tickStart = calculateTickStart(abilities, i)}
      <crow
        role="listitem"
        animate:flip={{ duration: flipDurationMs }}
        onmouseenter={() => {
          if (
            ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
              ability.abilityName
            )
          )
            dragDisabled = true;
        }}
        onmouseleave={() => {
          dragDisabled = false;
        }}
        use:tooltip={{
          children: TooltipAbility,
          props: ability,
          direction: 'up',
          lockInPlace: true
        }}
        class={tw(
          'relative -ml-px h-full !flex-none rounded border border-gray-800 bg-white',
          ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow'].includes(
            ability.abilityName
          ) && !dndDisabled
            ? 'border-gray-400 bg-gray-100'
            : 'z-10',
          tickStart > 15 && 'pointer-events-none border-red-400 bg-red-100 text-red-400 opacity-50'
        )}
        style="width: calc(((100% / 15)*{ability.ticks}) + 1px);"
      >
        <Icon name={ability.icon} />
        <!-- {ability.id.substring(0, 5)} -->
      </crow>
    {/each}
  </crow>
</div>
