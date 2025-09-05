<script lang="ts">
  import { untrack } from 'svelte';
  import app from '$src/app.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { AbilityRef } from '$src/types/ability';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import { slotsInPrettyName, unequip } from '$src/ts/equipment';
  import EquipmentLink from '$src/components/EquipmentLink.svelte';
  import type { EquipmentSlot } from '$src/types/equipment';
  import Button from '$src/components/form/Button.svelte';
  import {
    calculateAvailableAbilitiesByCharacter,
    calculateCombatStatsByCharacter
  } from '$src/ts/Utils';
  import AbilityInventory from '$src/components/character/AbilityInventory.svelte';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import ABILITIES from '$src/constants/ABILITIES';

  let characterIndex = $derived($page.params.characterIndex);
  let character = $derived(app.characters[characterIndex as any]);
  let availableAbilities: AbilityRef[] = $state([]);
  let dropFromOthersDisabled = $state(false);
  let constrainAxisY = $state(false);

  const considerCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.abilities = e.detail.items;
  };

  const transformDraggedCharacterAbility = (draggedElement: any, data: any, _index: any) => {
    if (ABILITIES(data, true).basic) {
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
      .sort((a: AbilityRef, b: AbilityRef) =>
        ABILITIES(a, true).prettyName.localeCompare(ABILITIES(b, true).prettyName)
      )
      .sort((a: AbilityRef, b: AbilityRef) => ABILITIES(a, true).ticks - ABILITIES(b, true).ticks);

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

  const containsAll = (base: AbilityRef[], target: AbilityRef[]) => {
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
    const isShield = !!(
      character.equipment.offHand &&
      EQUIPMENT(character.equipment.offHand, true).slotsIn === 'offHand'
    );
    const isTwoHanded = !!(
      character.equipment.mainHand &&
      EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'twoHand'
    );
    const isOneHandedMainhand = !!(
      character.equipment.mainHand &&
      EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedOffhand = !!(
      character.equipment.offHand &&
      EQUIPMENT(character.equipment.offHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedWeapon = isOneHandedMainhand || isOneHandedOffhand;
    const isDualWielding = isOneHandedMainhand && isOneHandedOffhand;

    const mainHandAbilities = character.equipment.mainHand
      ? EQUIPMENT(character.equipment.mainHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability) => ABILITIES(ability))
      : [];

    const offHandAbilities = character.equipment.offHand
      ? EQUIPMENT(character.equipment.offHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability) => ABILITIES(ability))
      : [];

    // Unarmed
    let defaultAbilities = [
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular'),
      ABILITIES('basicAttackRegular')
    ];

    if (isTwoHanded) {
      defaultAbilities = mainHandAbilities;
    } else if (isShield) {
      defaultAbilities = [];

      if (isOneHandedWeapon) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular')
        );
      }

      defaultAbilities.push(...offHandAbilities);
    } else if (isOneHandedWeapon) {
      defaultAbilities = [];
      if (isOneHandedMainhand) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular')
        );
      }
      if (isOneHandedOffhand) {
        defaultAbilities.push(...offHandAbilities);
      } else {
        defaultAbilities.push(
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular'),
          ABILITIES('basicAttackRegular')
        );
      }
    }

    character.abilities = defaultAbilities.map((ability) => ({
      ...ABILITIES(ability),
      uuid: crypto.randomUUID()
    }));
    // if (!containsAll(defaultAbilities, character.abilities)) {
    //   character.abilities = character.abilities.filter(
    //     (ability) => !ABILITIES(ability, true).basic
    //   );
    //   character.abilities = [...defaultAbilities, ...untrack(() => character.abilities)];
    // }
  });

  $effect(() => {
    $state.snapshot(character.equipment);
    const abilities = calculateAvailableAbilitiesByCharacter(character);

    // Decide what abilities a character can use
    availableAbilities = abilities
      .filter(({ id }) => !untrack(() => character.abilities.find((a) => a.id === id))) // fix this to look at ID
      .filter((ability) => !ABILITIES(ability, true).basic)
      .sort((a: AbilityRef, b: AbilityRef) =>
        ABILITIES(a, true).prettyName.localeCompare(ABILITIES(b, true).prettyName)
      )
      .sort((a: AbilityRef, b: AbilityRef) => ABILITIES(a, true).ticks - ABILITIES(b, true).ticks);

    // Remove abilities that are no longer available from character
    character.abilities = untrack(() => character.abilities).filter(
      (ability) => abilities.some(({ id }) => id === ability.id) || ABILITIES(ability, true).basic
    );
  });

  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

<!-- <Clickable class="crow gap-1" onclick={() => goto('/')}>
  <Icon name="left" class="text-xs" />
  Go back
</Clickable> -->

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
        <div class="w-15 font-bold">Race:</div>
        <div>{character.race}</div>
      </crow>
      <crow class="gap-2">
        <div class="w-15 font-bold">Health:</div>
        <div>{combatStats?.maxHealth}</div>
      </crow>
      <crow class="gap-2">
        <div class="w-15 font-bold">Damage:</div>
        <div>{combatStats?.damage}</div>
      </crow>
      <crow class="gap-2">
        <div class="w-15 font-bold">Armor:</div>
        <div>{combatStats?.armor}</div>
      </crow>
    </crow>
    <crow vertical up left>
      {#each Object.entries(character.equipment) as [slot, equipment]}
        <crow left class="w-full !justify-between gap-2">
          <crow left>
            <div class="w-20 font-bold">{slotsInPrettyName(slot as EquipmentSlot)}:</div>

            {#if slot === 'mainHand' && !character.equipment.mainHand}
              <span class="text-gray-400">Fist</span>
            {:else if slot === 'offHand' && !character.equipment.offHand}
              <span class="text-gray-400">Fist</span>
            {:else if slot === 'offHand' && character.equipment.mainHand && EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'twoHand'}
              <span class="text-gray-400">
                {EQUIPMENT(character.equipment.mainHand, true).prettyName}
              </span>
            {:else if equipment}
              <EquipmentLink {...EQUIPMENT(equipment, true)} />
            {:else}
              -
            {/if}
          </crow>

          {#if equipment}
            <Button secondary onclick={() => unequip(equipment, slot as EquipmentSlot)}>
              Unequip
            </Button>
          {/if}
        </crow>
      {/each}
    </crow>
  </crow>

  <crow class="relative w-full gap-2 overflow-hidden p-1" vertical left up>
    <crow class="w-full !justify-between">
      <h5>Active abilities</h5>
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
      <h5>Available abilities</h5>
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

<Debug data={availableAbilities} />
