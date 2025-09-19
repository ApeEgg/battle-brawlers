<script lang="ts">
  import { untrack } from 'svelte';
  import app from '$src/app.svelte';
  import type { Ability, AbilityRef } from '$src/types/ability';
  import { calculateAvailableAbilitiesByCharacter } from '$src/ts/Utils';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import ABILITIES from '$src/constants/ABILITIES';
  import type { Character } from '$src/types/character';

  let { character, renderSides }: { character: Character; renderSides?: boolean } = $props();

  let availableAbilities: AbilityRef[] = $state([]);
  let dropFromOthersDisabled = $state(false);
  let constrainAxisY = $state(false);
  let showAvailableAbilities = $state(false);

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
        ABILITIES(a, true).name.localeCompare(ABILITIES(b, true).name)
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

    // Earlier .id instead of .uuid
    if (
      JSON.stringify(abs.map((a) => a?.uuid).sort((a, b) => a.localeCompare(b))) !==
      JSON.stringify(character.abilities.map((a) => a.uuid).sort((a, b) => a.localeCompare(b)))
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
        ABILITIES(a, true).name.localeCompare(ABILITIES(b, true).name)
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
</script>

<crow vertical class="w-full gap-2">
  <crow left class="!items-stretch !justify-stretch overflow-hidden">
    {#if renderSides}
      <crow
        class={tw(
          'pointer-events-none relative w-40 !flex-none bg-contain bg-center bg-no-repeat transition-all duration-200',
          renderSides && 'w-20'
        )}
        style="background-image: urlllll(/images/races/{character.image});"
      >
        <img src="/images/races/{character.image}" class="absolute top-0 right-0 left-0" alt="" />
      </crow>
    {/if}

    <crow class="relative w-full" vertical left up>
      {#if !renderSides}
        <crow class="w-full !justify-between">
          <h5>Active abilities</h5>
        </crow>
      {/if}
      <AbilityBar
        {character}
        abilities={character.overrides.abilities}
        {considerCharacterAbilities}
        {finalizeCharacterAbilities}
        {transformDraggedCharacterAbility}
        {constrainAxisY}
        minimalistic={renderSides}
      />
    </crow>

    {#if renderSides}
      <crow class={tw('w-0 !flex-none transition-all duration-200', renderSides && 'w-20')}>
        <Button
          onclick={() => (showAvailableAbilities = !showAvailableAbilities)}
          tertiary
          class="py-1.5"
        >
          <Icon name="down" class={tw(showAvailableAbilities && '-scale-y-[1]')} />
        </Button>
      </crow>
    {/if}
  </crow>

  <Accordion isOpen={!renderSides || showAvailableAbilities}>
    <div>
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
    </div>
  </Accordion>
</crow>

<!-- <Debug data={character} /> -->
