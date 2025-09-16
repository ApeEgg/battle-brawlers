<script lang="ts">
  import type { Equipment } from '$src/types/equipment';
  import AbilityInventory from '$src/components/character/AbilityInventory.svelte';
  import ABILITIES from '$src/constants/ABILITIES';
  import AbilityBar from '$src/components/character/AbilityBar.svelte';
  import type { Character } from '$src/types/character';

  let {
    name,
    description,
    combatStats,
    abilities,
    character
  }: Equipment & { character: Character } = $derived(app.tooltip.props);

  const prettyCombatStatKey = (key: string) =>
    ({
      maxArmor: 'Armor',
      damage: 'Damage',
      maxHealth: 'Health'
    })[key] || key;

  let activeAbilities = $derived(abilities?.filter((ability) => ABILITIES(ability, true).basic));
  let availableAbilities = $derived(
    abilities?.filter((ability) => !ABILITIES(ability, true).basic)
  );
</script>

<crow
  left
  vertical
  class="pointer-events-none !w-60 gap-2 rounded-md px-2.5 pt-1.5 pb-3 text-sm leading-[18px] text-gray-700 shadow-sm transition-all"
>
  <crow vertical left class="w-full !justify-between">
    <div class="text-lg text-black">{name}</div>
    <Hr class="mb-0" />
  </crow>
  {#if Object.entries(combatStats).length > 0}
    <crow vertical left class="!w-1/2">
      {#each Object.entries(combatStats) as [key, value]}
        <crow class="bg-green w-full !justify-between text-sm">
          <strong class="text-black"> {prettyCombatStatKey(key)} </strong>
          {value}
        </crow>
      {/each}
    </crow>
  {/if}
  {#if description}
    <span class="text-sm italic">{@html description}</span>
  {/if}

  {#if activeAbilities.length > 0}
    <crow left up vertical class="gap-1">
      <AbilityBar {character} dndDisabled small minimalistic abilities={activeAbilities} />
    </crow>
  {/if}
  {#if availableAbilities.length > 0}
    <Hr class="mb-0.5" />
    <crow class="w-full gap-4">
      <!-- <div class="text-sm text-gray-500">Abilities</div> -->
      <AbilityInventory {character} {availableAbilities} small />
    </crow>
  {/if}
</crow>
