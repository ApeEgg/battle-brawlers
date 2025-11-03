<script lang="ts">
  import CoreStats from '$src/components/character/CoreStats.svelte';
  import CHARACTER, { ALL_CHARACTERS } from '$src/constants/CHARACTERS';
  import { calculateCombatStatsByCharacter } from '$src/ts/utils';

  let chosenCharacter = $state('elfMale');

  let characterPool = $derived([
    CHARACTER(chosenCharacter, false, { overrides: { level: 1 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 2 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 3 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 4 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 5 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 6 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 7 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 8 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 9 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 10 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 11 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 12 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 13 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 14 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 15 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 16 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 17 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 18 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 19 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 20 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 21 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 22 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 23 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 24 } }),
    CHARACTER(chosenCharacter, false, { overrides: { level: 25 } })
  ]);
</script>

<Headline text="character scaling" />

<!--onchange={({ target: { value } }) => console.info(value)}-->
<Dropdown
  options={Object.keys(ALL_CHARACTERS)}
  value={chosenCharacter}
  onchange={({ target: { value } }: any) => (chosenCharacter = value)}
/>

<crow vertical left class="bg-gray-100 p-4">
  <Headline text="Equipment" small />
  <CharacterEquipment character={CHARACTER(characterPool[0], true)} />
</crow>

{#each characterPool as character, i (`${character.id}_${i}`)}
  {@const hydratedCharacter = {
    ...CHARACTER(character, true),
    combatStats: calculateCombatStatsByCharacter(CHARACTER(character, true))
  }}
  <crow left class="!justify-between gap-2">
    <crow left class="gap-2">
      level {i + 1}

      <EquipmentLink {...hydratedCharacter} />
    </crow>
    <CoreStats {...hydratedCharacter} small />
  </crow>
{/each}

<!-- <Debug data={equipment} /> -->
