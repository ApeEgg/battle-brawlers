<script lang="ts">
  import type { Equipment } from '$src/types/equipment';
  import AbilityInventory from '$src/components/character/AbilityInventory.svelte';
  import ABILITIES from '$src/constants/ABILITIES';

  let { prettyName, description, combatStats, abilities }: Equipment = $derived(app.tooltip.props);

  const prettyCombatStatKey = (key: string) =>
    ({
      armor: 'Armor',
      damage: 'Damage',
      maxHealth: 'Health'
    })[key] || key;
</script>

<crow
  left
  vertical
  class="pointer-events-none !w-60 gap-2 rounded bg-gradient-to-br from-gray-50 to-gray-200 px-2.5 pt-1.5 pb-3 text-sm leading-[18px] text-gray-700"
>
  <crow class="w-full !justify-between">
    <strong class="text-lg text-black">{prettyName}</strong>
  </crow>
  {#if Object.entries(combatStats).length > 0}
    <crow vertical left>
      {#each Object.entries(combatStats) as [key, value]}
        <crow class="bg-green w-full !justify-between text-sm">
          <strong> {prettyCombatStatKey(key)} </strong>
          {value}
        </crow>
      {/each}
    </crow>
  {/if}
  <span class="text-sm">{description}</span>
  {#if abilities.length > 0}
    <h6>Abilities</h6>
    <AbilityInventory
      availableAbilities={abilities.map((ability) => ABILITIES(ability, true))}
      small
    />
  {/if}
</crow>
