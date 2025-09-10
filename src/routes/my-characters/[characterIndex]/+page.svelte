<script lang="ts">
  import { untrack } from 'svelte';
  import app from '$src/app.svelte';
  import { page } from '$app/stores';
  import type { Ability, AbilityRef } from '$src/types/ability';
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
  import CHARACTERS from '$src/constants/CHARACTERS';

  let characterIndex = $derived($page.params.characterIndex);
  let characterRef = $derived(app.characters[characterIndex as any]);
  let availableAbilities: AbilityRef[] = $state([]);
  let dropFromOthersDisabled = $state(false);
  let constrainAxisY = $state(false);
  let character = $derived(CHARACTERS(characterRef, true));
  let characterEquipment = $derived(character.overrides.equipment);

  const considerCharacterAbilities = (e: any) => {
    character.overrides.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.overrides.abilities = e.detail.items;
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

  const ensureDefaultAbilities = () => {
    const isShield = !!(
      characterEquipment.offHand &&
      EQUIPMENT(characterEquipment.offHand, true).slotsIn === 'offHand'
    );
    const isTwoHanded = !!(
      characterEquipment.mainHand &&
      EQUIPMENT(characterEquipment.mainHand, true).slotsIn === 'twoHand'
    );
    const isOneHandedMainhand = !!(
      characterEquipment.mainHand &&
      EQUIPMENT(characterEquipment.mainHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedOffhand = !!(
      characterEquipment.offHand &&
      EQUIPMENT(characterEquipment.offHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedWeapon = isOneHandedMainhand || isOneHandedOffhand;

    const mainHandAbilities = characterEquipment.mainHand
      ? EQUIPMENT(characterEquipment.mainHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability) => ({ ...ABILITIES(ability), uuid: crypto.randomUUID() }))
      : [];

    const offHandAbilities = characterEquipment.offHand
      ? EQUIPMENT(characterEquipment.offHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability) => ({ ...ABILITIES(ability), uuid: crypto.randomUUID() }))
      : [];

    // Unarmed
    let defaultAbilities = [
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch'),
      ABILITIES('punch')
    ];

    if (isTwoHanded) {
      defaultAbilities = mainHandAbilities;
    } else if (isShield) {
      defaultAbilities = [];

      if (isOneHandedWeapon) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(ABILITIES('punch'), ABILITIES('punch'), ABILITIES('punch'));
      }

      defaultAbilities.push(...offHandAbilities);
    } else if (isOneHandedWeapon) {
      defaultAbilities = [];
      if (isOneHandedMainhand) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(ABILITIES('punch'), ABILITIES('punch'), ABILITIES('punch'));
      }
      if (isOneHandedOffhand) {
        defaultAbilities.push(...offHandAbilities);
      } else {
        defaultAbilities.push(ABILITIES('punch'), ABILITIES('punch'), ABILITIES('punch'));
      }
    }

    const currentAbilities = character.abilities.map((ability) =>
      !ABILITIES(ability, true).basic ? ability : undefined
    );

    const abs = [
      ...currentAbilities
        .map((ability) => {
          if (ability) return $state.snapshot(ability);

          const defaultAbility = defaultAbilities.shift();

          return defaultAbility;
        })
        .filter((a) => a),
      ...defaultAbilities
    ] as Ability[];

    if (
      JSON.stringify(abs.map((a) => a?.id).sort((a, b) => a.localeCompare(b))) !==
      JSON.stringify(character.abilities.map((a) => a.id).sort((a, b) => a.localeCompare(b)))
    ) {
      character.overrides.abilities = abs;
    }
  };

  const ensureAvailableAbilities = () => {
    const abilities = calculateAvailableAbilitiesByCharacter(character);

    // Decide what abilities a character can use
    availableAbilities = abilities
      .filter(({ uuid }) => !character.overrides.abilities.find((a) => a.uuid === uuid))
      .filter((ability) => !ABILITIES(ability, true).basic)
      .sort((a: AbilityRef, b: AbilityRef) =>
        ABILITIES(a, true).prettyName.localeCompare(ABILITIES(b, true).prettyName)
      )
      .sort((a: AbilityRef, b: AbilityRef) => ABILITIES(a, true).ticks - ABILITIES(b, true).ticks);

    // Remove abilities that are no longer available from character
    character.overrides.abilities = character.overrides.abilities.filter(
      (ability) =>
        abilities.some(({ uuid }) => uuid === ability.uuid) || ABILITIES(ability, true).basic
    );
  };

  $effect(() => {
    $state.snapshot(characterEquipment);

    untrack(() => {
      ensureDefaultAbilities();
      ensureAvailableAbilities();
    });
  });

  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

<h2>{character.name}</h2>

<crow vertical class="mt-4 gap-6">
  <crow left up class="gap-4">
    <div class="h-40">
      <img src="/images/races/{character.race}/01.png" alt="" class="h-full" />
    </div>
    <crow vertical up left>
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
        <div>{combatStats?.maxArmor}</div>
      </crow>
    </crow>
    <crow vertical up left>
      {#each Object.entries(character.equipment) as [slot, equipment]}
        <crow left class="w-full !justify-between gap-2">
          <crow left>
            <div class="w-20 font-bold">{slotsInPrettyName(slot as EquipmentSlot)}:</div>

            {#if slot === 'offHand' && character.equipment.mainHand && EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'twoHand'}
              <span class="text-gray-400">
                {EQUIPMENT(character.equipment.mainHand, true).prettyName}
              </span>
            {:else if slot === 'mainHand' && !character.equipment.mainHand}
              <span class="text-gray-400">Fist</span>
            {:else if slot === 'offHand' && !character.equipment.offHand}
              <span class="text-gray-400">Fist</span>
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

  <crow class="relative w-full gap-2 overflow-hidden px-1 py-2" vertical left up>
    <crow class="w-full !justify-between">
      <h5>Active abilities</h5>
    </crow>
    <AbilityBar
      {character}
      abilities={character.overrides.abilities}
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
      {character}
      {availableAbilities}
      {considerAvailableAbilities}
      {finalizeAvailableAbilities}
      {transformDraggedAvailableAbility}
      {dropFromOthersDisabled}
    />
  </crow>
</crow>

<Debug data={character} />
