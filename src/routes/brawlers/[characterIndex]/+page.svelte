<script lang="ts">
  import app from '$src/app.svelte';
  import { page } from '$app/stores';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { slotsInPrettyName, unequip } from '$src/ts/equipment';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import type { EquipmentSlot } from '$src/types/equipment';
  import { calculateCombatStatsByCharacter } from '$src/ts/Utils';

  let characterIndex = $derived($page.params.characterIndex);
  let characterRef = $derived(app.characters[characterIndex as any]);
  let character = $derived(CHARACTERS(characterRef, true));

  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

<Headline text={character.name} />
<Close onclick={() => history.back()} />

<crow vertical class="mt-4 gap-4">
  <crow left up class="gap-4">
    <crow class="aspect-square w-40 !flex-none">
      <img src="/images/races/{character.race}/01.png" alt="" class="h-full" />
    </crow>
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
      {#each Object.entries(character.equipment) as [slot, equipment] (`${character.uuid}-${slot}-${equipment?.uuid}`)}
        <crow left class="w-full !justify-between gap-2">
          <crow left>
            <div class="w-20 font-bold">{slotsInPrettyName(slot as EquipmentSlot)}:</div>

            {#if slot === 'offHand' && character.equipment.mainHand && EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'twoHand'}
              <span class="text-gray-400">
                {EQUIPMENT(character.equipment.mainHand, true).name}
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
  <AbilitySelection {character} />
</crow>
