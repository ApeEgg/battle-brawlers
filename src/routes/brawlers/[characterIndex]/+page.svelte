<script lang="ts">
  import app from '$src/app.svelte';
  import { page } from '$app/stores';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { slotsInPrettyName, unequip } from '$src/ts/equipment';
  import EQUIPMENT from '$src/constants/EQUIPMENT';
  import type { EquipmentSlot } from '$src/types/equipment';
  import { calculateCombatStatsByCharacter } from '$src/ts/utils';
  import { goto } from '$app/navigation';
  import { getLevelByExperience } from '$src/ts/level';
  import { confirmWithDialog } from '$src/ts/dialog';
  import type { Character } from '$src/types/character';
  import BasicConfirmation from '$src/components/dialog/BasicConfirmation.svelte';

  const retireCharacter = async (character: Character) => {
    confirmWithDialog(BasicConfirmation as any, {
      text: `You are retiring <span class="text-white">${character.name}</span>.<br /><br />Do you wish to proceed?`,
      confirm: async () => {
        app.selectedBrawlers = app.selectedBrawlers.filter((uuid) => uuid !== character.uuid);
        await goto('/brawlers');
        app.characters = [];
      }
    });
  };

  let characterIndex = $derived($page.params.characterIndex);
  let characterRef = $derived(app.characters[characterIndex as any]);
  let character = $derived(CHARACTERS(characterRef, true));
  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

<GoBack onclick={() => history.back()} />

<Headline text={character.name}>
  <crow class="gap-4" right>
    {#if getLevelByExperience(app.experience) <= 4}
      <crow class="!space-between w-full gap-2" left>
        <Button onclick={() => retireCharacter(character)} tertiary>Retire</Button>
        <span class="text-xs text-gray-400">(possible until level 5)</span>
      </crow>
    {/if}
    <CoreStats {combatStats} />
  </crow>
</Headline>

<crow vertical class="mt-4 gap-4">
  <crow left up class="gap-4">
    <CharacterAvatar {...character} />
    <!-- <crow vertical up left>
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
    </crow> -->
    <crow class="!flex-2" vertical up left>
      <CharacterEquipment {character} />
    </crow>
  </crow>
  <AbilitySelection {character} />
</crow>
