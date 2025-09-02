<script lang="ts">
  import { untrack } from 'svelte';
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import app from '$src/app.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Ability } from '$src/types/ability';
  import AbilityTooltip from '$src/components/tooltips/Ability.svelte';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import { slotsInPrettyName, unequip } from '$src/ts/equipment';
  import EquipmentLink from '$src/components/EquipmentLink.svelte';
  import type { EquipmentSlot } from '$src/types/equipment';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import Button from '$src/components/form/Button.svelte';
  import {
    calculateAvailableAbilitiesByCharacter,
    calculateCombatStatsByCharacter
  } from '$src/ts/Utils';
  import ABILITIES from '$src/constants/ABILITIES';

  const flipDurationMs = 300;

  let characterIndex = $derived($page.params.characterIndex);
  let character = $derived(app.characters[characterIndex as any]);
  let availableAbilities: Ability[] = $state([]);
  let dropFromOthersDisabled = $state(false);

  const considerCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };

  const transformDraggedCharacterAbility = (draggedElement: any, data: any, _index: any) => {
    if (
      ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(
        data.abilityName
      )
    ) {
      dropFromOthersDisabled = true;
    } else {
      dropFromOthersDisabled = false;
    }
    app.tooltip = undefined;
  };

  const considerAvailableAbilities = (e: any) => {
    e.detail.items
      .sort((a: Ability, b: Ability) => a.prettyName.localeCompare(b.prettyName))
      .sort((a: Ability, b: Ability) => a.ticks - b.ticks);
    availableAbilities = e.detail.items;
  };

  const finalizeAvailableAbilities = (e: any) => {
    availableAbilities = e.detail.items;
  };

  const transformDraggedAvailableAbility = (draggedElement: any, _data: any, _index: any) => {
    const ticks = draggedElement.querySelector('.ticks');
    if (ticks) {
      ticks.remove();
    }
    app.tooltip = undefined;
  };

  const containsAll = (base: Ability[], target: Ability[]) => {
    if (base.length === 0 || target.length === 0) return false;

    // Build frequency map for target
    const targetCounts: Record<string, number> = {};
    for (const t of target) {
      targetCounts[t.abilityName] = (targetCounts[t.abilityName] ?? 0) + 1;
    }

    // Check that base requirements are satisfied
    for (const b of base) {
      if (!targetCounts[b.abilityName]) {
        return false; // missing or not enough
      }
      targetCounts[b.abilityName]--;
    }

    return true;
  };

  $effect(() => {
    // const isDualWielding = !!(
    //   character.equipment.mainHand &&
    //   character.equipment.offHand &&
    //   character.equipment.offHand.slotsIn !== 'offHand'
    // );
    const isShield = !!character.equipment.offHand;
    const isTwoHanded = !!(
      character.equipment.mainHand && character.equipment.mainHand.slotsIn === 'twoHand'
    );

    const defaultAbilities = isTwoHanded
      ? [ABILITIES.basicAttackSlow(), ABILITIES.basicAttackSlow(), ABILITIES.basicAttackSlow()]
      : isShield
        ? [
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast(),
            ABILITIES.block(),
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast()
          ]
        : [
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast(),
            ABILITIES.basicAttackFast()
          ];

    if (!containsAll(defaultAbilities, character.abilities)) {
      character.abilities = character.abilities.filter(
        (a) =>
          !['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(
            a.abilityName
          )
      );
      character.abilities = [...defaultAbilities, ...untrack(() => character.abilities)];
    }
  });

  $effect(() => {
    $state.snapshot(character.equipment);
    const abilities = calculateAvailableAbilitiesByCharacter(character);

    // Decide what abilities a character can use
    availableAbilities = abilities
      .filter(({ icon }) => !untrack(() => character.abilities.find((a) => a.icon === icon))) // fix this to look at ID
      // .map(([_, fn]) => fn())
      .filter(
        (ability) =>
          !['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(
            ability.abilityName
          )
      )
      .sort((a: Ability, b: Ability) => a.prettyName.localeCompare(b.prettyName))
      .sort((a: Ability, b: Ability) => a.ticks - b.ticks);

    // Remove abilities that are no longer available from character
    character.abilities = untrack(() => character.abilities).filter(
      (ability) =>
        abilities.some(({ abilityName }) => abilityName === ability.abilityName) ||
        ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(
          ability.abilityName
        )
    );
  });

  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

<Clickable class="crow gap-1" onclick={() => goto('/creatures')}>
  <Icon name="left" class="text-xs" />
  Go back
</Clickable>

<h2>{character.name}</h2>

<crow vertical class="mt-4 gap-6">
  <crow left up class="gap-4">
    <div class="h-40">
      <img src="/images/races/{character.race}/01.png" alt="" class="h-full" />
    </div>
    <crow vertical up left>
      <!-- <crow class="gap-2">
        <div class="font-bold">ID:</div>
        <div>{character.id}</div>
      </crow> -->
      <crow class="gap-2">
        <div class="font-bold">Race:</div>
        <div>{character.race}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Health:</div>
        <div>{combatStats?.maxHealth}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Damage:</div>
        <div>{combatStats?.damage}</div>
      </crow>
      <crow class="gap-2">
        <div class="font-bold">Armor:</div>
        <div>{combatStats?.armor}</div>
      </crow>
    </crow>
    <crow vertical up left>
      {#each Object.entries(character.equipment) as [slot, equipment]}
        <crow class="gap-2">
          <div class="font-bold">{slotsInPrettyName(slot as EquipmentSlot)}:</div>

          {#if slot === 'offHand' && character.equipment.mainHand !== null && character.equipment.mainHand.slotsIn === 'twoHand'}
            {EQUIPMENT[character.equipment.mainHand.id]().prettyName}
          {:else if equipment}
            <EquipmentLink {...EQUIPMENT[equipment.id]()} />
            <Button onclick={() => unequip(equipment, slot as EquipmentSlot)}>Unequip</Button>
          {:else}
            -
          {/if}
        </crow>
      {/each}
    </crow>
  </crow>

  <crow class="relative w-full gap-2 overflow-hidden p-1" vertical left up>
    <crow class="w-full !justify-between">
      <h4>Abilities</h4>
    </crow>
    <AbilityBar
      abilities={character.abilities}
      {considerCharacterAbilities}
      {finalizeCharacterAbilities}
      {transformDraggedCharacterAbility}
    />
  </crow>

  <crow
    left
    class="available-abilities min-h-[98px] w-full !flex-none gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 inset-shadow-sm"
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
    {#each availableAbilities as ability (ability.id)}
      <crow
        class="relative h-20 w-20 !flex-none gap-2 rounded border border-black bg-white"
        use:tooltip={{
          children: AbilityTooltip,
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
  </crow>
</crow>

<!-- <code class="overflow-hidden text-xs">
  <pre>{JSON.stringify(character, null, 2)}
  </pre>
</code> -->

<style>
  :global(.TESTING) {
    background: black;
  }
</style>
