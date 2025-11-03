<script lang="ts">
  import { goto } from '$app/navigation';
  import { RECRUITABLE_CHARACTERS } from '$src/constants/RECRUITABLE_CHARACTERS';
  import CHARACTERS from '$src/constants/CHARACTERS';
  import { ALL_ELEMENTS } from '$src/constants/ELEMENTS';
  import type { IconName } from '$src/Iconice';
  import type { CharacterRef } from '$src/types/character';
  import { confirmWithDialog } from '$src/ts/dialog';
  import { allowedNumberOfCharacters } from '$src/ts/level';
  import BasicConfirmation from '$src/components/dialog/BasicConfirmation.svelte';
  import { notify } from '$src/ts/actions';
  import { correctHealth } from '$src/ts/equipment';
  import CoreStats from '$src/components/character/CoreStats.svelte';

  let characters = RECRUITABLE_CHARACTERS;

  let characterCapped = $derived(app.characters.length >= allowedNumberOfCharacters());

  const pickCharacter = (characterRef: Required<CharacterRef>) => {
    if (characterCapped) {
      notify({ warning: 'You cannot recruit more brawlers. Level up your ludus first.' });
      return;
    }

    confirmWithDialog(BasicConfirmation as any, {
      text: `You are recruiting <span class="text-white">${CHARACTERS(characterRef, true).name}</span> to your Ludus.<br /><br />Do you wish to proceed?`,
      confirm: () => {
        app.characters.push(correctHealth(characterRef));

        goto(`/brawlers/${app.characters.length - 1}`);
      }
    });
  };
</script>

<Headline text="brawlers" />

<crow class="cinzel my-12 text-center">
  {#if !app.characters.length}
    Select your first brawler
  {:else if characterCapped}
    Level up your ludus in order<br />to recruit new brawlers
  {:else}
    Select a brawler
  {/if}
</crow>

<crow class="!flex-wrap gap-4" left>
  {#each characters as char}
    {@const character = CHARACTERS(char, true)}
    {@const isRecruited = app.characters.find(({ id }) => id === character.id)}
    {@const { primary, secondary } = ALL_ELEMENTS[character.element].color}
    <!-- {@const combatStats = Object.entries(character.combatStats).filter(
      ([key]) => !['limits', 'currentArmor', 'currentHealth'].includes(key)
    )} -->
    {@const combatStats = character.combatStats}
    <Clickable
      class={tw(
        'crow vertical up !h-70 w-60 !flex-none overflow-hidden bg-gray-100 p-2',
        isRecruited
          ? 'cursor-not-allowed opacity-50 grayscale'
          : 'cursor-pointer active:translate-y-px'
      )}
      onclick={() =>
        isRecruited
          ? notify({ warning: `${character.name} is already recruited` })
          : pickCharacter(char)}
      style="border: 0.5px solid {primary}; background: linear-gradient(135deg, {primary}20, {secondary}20);"
    >
      <div class="cinzel text-2xl">{character.name}</div>
      <Hr />
      <crow left class="w-full gap-4">
        <CharacterAvatar {...character} class="w-20" />
        <crow vertical left class="gap-2">
          <CoreStats {combatStats} vertical />
          <!-- {#each combatStats as [stat, value]}
            <crow class="!flex-none gap-2 pl-6 text-2xl">
              <div class="font-bold">
                <Icon
                  class="drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.5)]"
                  original
                  name={stat as IconName}
                />
              </div>
              <div>{value}</div>
            </crow>
          {/each} -->
        </crow>
      </crow>
      <!-- <div class="absolute inset-0 top-auto h-2 bg-gradient-to-t from-white to-transparent"></div> -->
    </Clickable>
  {/each}
</crow>
