<script lang="ts">
  import { untrack } from 'svelte';
  import app from '$src/app.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { Ability } from '$src/types/ability';
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
  import AbilityInventory from '$src/components/character/AbilityInventory.svelte';

  let characterIndex = $derived($page.params.characterIndex);
  let character = $derived(app.characters[characterIndex as any]);
  let availableAbilities: Ability[] = $state([]);
  let dropFromOthersDisabled = $state(false);
  let constrainAxisY = $state(false);

  const considerCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };

  const transformDraggedCharacterAbility = (draggedElement: any, data: any, _index: any) => {
    if (['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(data.id)) {
      dropFromOthersDisabled = true;
      constrainAxisY = true;
    } else {
      dropFromOthersDisabled = false;
      constrainAxisY = false;
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
      targetCounts[t.id] = (targetCounts[t.id] ?? 0) + 1;
    }

    // Check that base requirements are satisfied
    for (const b of base) {
      if (!targetCounts[b.id]) {
        return false; // missing or not enough
      }
      targetCounts[b.id]--;
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
            ABILITIES.basicAttackFast(),
            ABILITIES.block(),
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
        (a) => !['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(a.id)
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
            ability.id
          )
      )
      .sort((a: Ability, b: Ability) => a.prettyName.localeCompare(b.prettyName))
      .sort((a: Ability, b: Ability) => a.ticks - b.ticks);

    // Remove abilities that are no longer available from character
    character.abilities = untrack(() => character.abilities).filter(
      (ability) =>
        abilities.some(({ id }) => id === ability.id) ||
        ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'block'].includes(ability.id)
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
      <h4>Active abilities</h4>
    </crow>
    <AbilityBar
      abilities={character.abilities}
      {considerCharacterAbilities}
      {finalizeCharacterAbilities}
      {transformDraggedCharacterAbility}
      {constrainAxisY}
    />
  </crow>

  <crow class="relative w-full gap-2 overflow-hidden p-1" vertical left up>
    <crow class="w-full !justify-between">
      <h4>Available abilities</h4>
    </crow>
    <AbilityInventory
      {availableAbilities}
      {considerAvailableAbilities}
      {finalizeAvailableAbilities}
      {transformDraggedAvailableAbility}
      {dropFromOthersDisabled}
    />
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
